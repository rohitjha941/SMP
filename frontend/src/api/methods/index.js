import {
  BASE_URL,
  BLOGS,
  EVENTS,
  TEAM_POSITION,
  TEAM,
  MENTORS,
  MENTORS_DOCS,
  FAQS,
  BRANCH,
  INTERESTS,
  BLOG_CATEGORY,
  GROUPS,
  RAISE_QUERY,
  FRESHERS_GUIDE,
  MENTOR_APPLICATION,
  MENTOR_INTERNS,
  MENTORS_PLACEMENTS,
  MENTORS_ACHIEVEMENTS,
  EXHCANGE_TOKEN,
  REFRESH_TOKEN,
  CHECK_MENTOR_HAS_APPLIED,
  CHECK_MENTOR_IS_SELECTED,
} from "api/constants";
import axios from "axios";
import AuthService from "handlers/AuthService";
import qs from "qs";
import { isAccessTokenValid } from "utils";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const getBlogs = function () {
  return new Promise((resolve, reject) => {
    fetch(BLOGS)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};

export const getSingleBlog = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BLOGS + `${id}/`)
      .then((data) => resolve(data.data))
      .catch((e) => reject(e));
  });
};

export const getBlogCategory = function () {
  return new Promise((resolve, reject) => {
    fetch(BLOG_CATEGORY)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};
export const getEvents = function () {
  return new Promise((resolve, reject) => {
    fetch(EVENTS)
      .then((data) => data.json())
      .then((jsonData) => {
        let events = {};
        Object.keys(jsonData).forEach((name) => {
          events[name] = jsonData[name].map((event) => {
            return {
              ...event,
              thumbnail: BASE_URL + event.thumbnail,
            };
          });
        });
        resolve(events);
      })
      .catch((e) => reject(e));
  });
};

export const getTeamPosition = function () {
  return new Promise((resolve, reject) => {
    fetch(TEAM_POSITION)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};

export const getTeam = function () {
  return new Promise((resolve, reject) => {
    fetch(TEAM)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};
export const getMentors = function () {
  return new Promise((resolve, reject) => {
    fetch(MENTORS)
      .then((data) => data.json())
      .then((jsonData) => {
        resolve(
          jsonData.map((profile) => {
            return {
              ...profile,
              photo: BASE_URL + profile.photo,
              resume: BASE_URL + profile.resume,
            };
          })
        );
      })
      .catch((e) => reject(e));
  });
};

export const getMentorInterns = (querydata) => {
  return new Promise((resolve, reject) => {
    fetch(
      MENTOR_INTERNS +
        `?ids=${
          querydata && querydata.length > 0
            ? querydata.map((id) => {
                return id;
              })
            : ""
        }`
    )
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};

export const getMentorPlacements = (querydata) => {
  return new Promise((resolve, reject) => {
    fetch(
      MENTORS_PLACEMENTS +
        `?ids=${
          querydata && querydata.length > 0
            ? querydata.map((id) => {
                return id;
              })
            : ""
        }`
    )
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};

export const getMentorAchievements = (querydata) => {
  return new Promise((resolve, reject) => {
    fetch(
      MENTORS_ACHIEVEMENTS +
        `?ids=${
          querydata && querydata.length > 0
            ? querydata.map((id) => {
                return id;
              })
            : ""
        }`
    )
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};

export const getMentorsDocs = function () {
  return new Promise((resolve, reject) => {
    fetch(MENTORS_DOCS)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};
export const getFAQs = function () {
  return new Promise((resolve, reject) => {
    fetch(FAQS)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};
export const getBranch = function () {
  return new Promise((resolve, reject) => {
    fetch(BRANCH)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};
export const getInterests = function () {
  return new Promise((resolve, reject) => {
    fetch(INTERESTS)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};
export const getGroups = function () {
  return new Promise((resolve, reject) => {
    fetch(GROUPS)
      .then((data) => data.json())
      .then((jsonData) => resolve(jsonData))
      .catch((e) => reject(e));
  });
};
export const postQuery = (data) => {
  return axios.post(RAISE_QUERY, data);
};

const CreateInterests = (interestData) => {
  return axios.post(INTERESTS, interestData);
};

export const postMentorApplication = async (data) => {
  const auth = new AuthService();
  if (!isAccessTokenValid(auth.getTokenExp())) {
    await getRefreshAccessToken();
  }
  const {
    email,
    name,
    enrollno,
    branch,
    year,
    motivation,
    qualities,
    mobile,
    resume,
  } = data;
  let formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("enrollno", enrollno);
  formData.append("branch", branch);
  formData.append("year", year);
  formData.append("motivation", motivation);
  formData.append("qualities", qualities);
  formData.append("mobile", mobile);
  formData.append("resume", resume);
  formData.append("g-recaptcha-response", data["g-recaptcha-response"]);
  formData.append("user", auth.getUserId());
  return new Promise((resolve, reject) => {
    axios
      .post(MENTOR_APPLICATION, formData, {
        headers: {
          Authorizarion: `Bearer ${auth.getAccessToken()}`,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const postMentorFormData = (postData, access_token) => {
  const {
    name,
    year,
    enrollno,
    branch,
    interest,
    email,
    mobile,
    image,
    resume,
    facebook,
    linkedin,
    groups,
    achievements,
    internships,
    placement,
    career,
  } = postData;
  let formData = new FormData();
  formData.append("name", name);
  formData.append("year", year);
  formData.append("enrollno", enrollno);
  formData.append("branch", branch);
  formData.append("email", email);
  formData.append("mobile", mobile);
  formData.append("photo", image);
  formData.append("resume", resume);
  formData.append("facebook", facebook);
  formData.append("linkedin", linkedin);
  formData.append("career", career);

  // We need to add each interest separately since
  // DRF reads form data this way. An array can't be
  // sent directly
  interest.forEach((interest_id) => {
    formData.append("interest", interest_id);
  });

  groups.forEach((group_id) => {
    formData.append("groups", group_id);
  });

  // This is also array data but this is being explicitly handled
  // on backend with json parse.
  formData.append("achievements", JSON.stringify(achievements));
  formData.append("interns", JSON.stringify(internships));
  formData.append("placement", JSON.stringify(placement));

  return axios.put(MENTORS, formData, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const createMentor = (mentorData) => {
  const interestToCreate = mentorData.interest.filter(
    (i) => typeof i === "string"
  );
  const existingInterestIds = mentorData.interest.filter(
    (i) => typeof i === "number"
  );
  const interestData = {
    interests: interestToCreate,
  };

  return new Promise((resolve, reject) => {
    if (interestToCreate.length > 0) {
      CreateInterests(interestData)
        .then((response) => {
          const createInterestIds = response.data.interest_ids;
          const updatedInterestIds = [
            ...existingInterestIds,
            ...createInterestIds,
          ];
          mentorData.interest = updatedInterestIds; // This mutation should be avoided
          postMentorFormData(mentorData)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error.response);
            });
        })
        .catch((error) => {
          reject(error.response);
        });
    } else {
      postMentorFormData(mentorData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    }
  });
};

export const getFreshersGuideUrl = () => {
  return new Promise((resolve, reject) => {
    axios.get(FRESHERS_GUIDE).then((response) => {
      resolve(BASE_URL + response.data.document);
    });
  });
};

export const getExchangeToken = (google_id_token) => {
  const data = {
    token: google_id_token,
  };
  return axios.post(EXHCANGE_TOKEN, qs.stringify(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getRefreshAccessToken = (refresh_token) => {
  const data = {
    refresh: refresh_token,
  };
  const auth = new AuthService();
  return new Promise((resolve, reject) => {
    axios
      .post(REFRESH_TOKEN, qs.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        auth.setAccessToken(res.data.access);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkMentorHasApplied = (user_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(CHECK_MENTOR_HAS_APPLIED + user_id + "/")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkMentorIsSelected = (user_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(CHECK_MENTOR_IS_SELECTED + user_id + "/")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const withdrawApplication = async () => {
  const auth = new AuthService();
  if (!isAccessTokenValid(auth.getTokenExp())) {
    await getRefreshAccessToken(auth.getRefreshToken());
  }
  const access_token = auth.getAccessToken();
  return new Promise((resolve, reject) => {
    axios
      .delete(MENTOR_APPLICATION + auth.getUserId() + "/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
