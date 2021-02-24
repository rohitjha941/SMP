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
  USER_DETAILS,
} from "api/constants";
import axios from "axios";
import AuthService from "handlers/AuthService";
import qs from "qs";
import { isTokenValid } from "utils";

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

const CreateInterests = async (interestData) => {
  const auth = new AuthService();
  return new Promise(async (resolve, reject) => {
    if (!isTokenValid(auth.getAccessToken())) {
      await getRefreshAccessToken().catch((err) => {
        reject(err);
      });
    }
    axios
      .post(INTERESTS, interestData, {
        headers: {
          authorization: `Bearer ${auth.getAccessToken()}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const postMentorApplication = async (data) => {
  const auth = new AuthService();
  const {
    enroll_no,
    branch,
    year,
    motivation,
    qualities,
    mobile,
    resume,
  } = data;
  let formData = new FormData();
  formData.append("enroll_no", enroll_no);
  formData.append("branch", branch);
  formData.append("year", year);
  formData.append("motivation", motivation);
  formData.append("qualities", qualities);
  formData.append("mobile", mobile);
  formData.append("resume", resume);
  formData.append("g-recaptcha-response", data["g-recaptcha-response"]);
  return new Promise(async (resolve, reject) => {
    if (!isTokenValid(auth.getAccessToken())) {
      await getRefreshAccessToken().catch((err) => reject(err));
    }
    const access_token = auth.getAccessToken();
    axios
      .post(MENTOR_APPLICATION, formData, {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const postMentorFormData = async (postData) => {
  const auth = new AuthService();
  const {
    userId,
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
  // Prevent sending null data
  if (image) {
    formData.append("photo", image);
  }
  if (resume) {
    formData.append("resume", resume);
  }
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
  return new Promise(async (resolve, reject) => {
    if (!isTokenValid(auth.getAccessToken())) {
      await getRefreshAccessToken().catch((err) => reject(err));
    }
    const access_token = auth.getAccessToken();
    axios
      .put(MENTORS + userId + "/", formData, {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
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
          const postMentorData = {
            ...mentorData,
            interest: updatedInterestIds,
          };
          postMentorFormData(postMentorData)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      postMentorFormData(mentorData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
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

export const getRefreshAccessToken = () => {
  const auth = new AuthService();
  return new Promise((resolve, reject) => {
    if (!isTokenValid(auth.getRefreshToken())) {
      auth.logout();
      reject({
        msg: "Please Login Again!",
        logout: true,
      });
    }
    const data = {
      refresh: auth.getRefreshToken(),
    };
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
        auth.logout();
        reject({
          msg: "Please Login Again!",
          logout: true,
        });
      });
  });
};

export const getUserDetails = async () => {
  const auth = new AuthService();
  return new Promise(async (resolve, reject) => {
    if (!isTokenValid(auth.getAccessToken())) {
      await getRefreshAccessToken().catch((err) => reject(err));
    }
    const access_token = auth.getAccessToken();
    axios
      .get(USER_DETAILS, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
export const withdrawApplication = async (userId) => {
  const auth = new AuthService();
  return new Promise(async (resolve, reject) => {
    if (!isTokenValid(auth.getAccessToken())) {
      await getRefreshAccessToken().catch((err) => reject(err));
    }
    const access_token = auth.getAccessToken();
    axios
      .delete(MENTOR_APPLICATION + userId + "/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getMentorFormData = async (userId) => {
  const auth = new AuthService();
  return new Promise(async (resolve, reject) => {
    if (!isTokenValid(auth.getAccessToken())) {
      await getRefreshAccessToken().catch((err) => reject(err));
    }
    const access_token = auth.getAccessToken();
    axios
      .get(MENTORS + userId + "/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(async (res) => {
        const tmpUser = res.data.user;

        // Load this info here instead of App.js because it needs regular updates and is only component specific data
        const interns = await getMentorInterns(tmpUser.mentor_intern);
        const placement = await getMentorPlacements(tmpUser.mentor_placement);
        const achievements = await getMentorAchievements(
          tmpUser.mentor_achievement
        );

        const user = {
          ...tmpUser,
          interns: interns,
          placement: placement,
          achievements: achievements,
        };
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
