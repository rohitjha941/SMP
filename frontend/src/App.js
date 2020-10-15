import React, { useState } from "react";
import "./style/App.scss";
import Loadable from "react-loadable";
import Loader from "./components/Loader";
import { Flash } from "./components/Flash";
import Bus from "utils/Bus";

var methods = require("./api/methods/");

const Header = Loadable({
  loader: () => import("./components/Header"),
  loading: () => <Loader />,
});
const RouterView = Loadable({
  loader: () => import("./components/Router/RouterView"),
  loading: () => <Loader />,
});
const Footer = Loadable({
  loader: () => import("./components/Footer"),
  loading: () => <Loader />,
});

function App() {
  const [blogs, setBlogs] = useState({});
  const [blogCategory, setBlogCategory] = useState([]);
  const [events, setEvents] = useState({});
  const [teamPosition, setTeamPosition] = useState([]);
  const [team, setTeam] = useState([]);
  const [mentors, setMentors] = useState({});
  const [mentorInterns, setMentorInterns] = useState([]);
  const [mentorPlacements, setMentorPlacements] = useState([]);
  const [mentorAchievements, setMentorAchievements] = useState([]);
  const [mentorsDocs, setMentorsDocs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [branches, setBranches] = useState([]);
  const [interests, setInterests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [freshersGuideUrl, setFreshersGuideUrl] = useState("");
  const [canFetch, setFetchableStatus] = useState({
    blogs: true,
    blogCategory: true,
    events: true,
    teamPosition: true,
    team: true,
    mentors: true,
    mentorInterns: {},
    mentorPlacements: {},
    mentorAchievements: {},
    mentorDocs: true,
    faqs: true,
    branches: true,
    interests: true,
    groups: true,
    freshers: true,
  });

  window.flash = (message, type = "success") =>
    Bus.emit("flash", { message, type });

  const fetchBlogsIfEmpty = () => {
    if (canFetch.blogs) {
      setFetchableStatus({ ...canFetch, blogs: false });
      const blogListToMap = (blogList) => {
        const blogMap = {};
        blogList.forEach((blog) => {
          blogMap[blog.id] = blog;
        });
        return blogMap;
      };
      methods.getBlogs().then((data) => {
        setBlogs(blogListToMap(data));
      });
    }
  };
  const fetchEventsIfEmpty = () => {
    if (canFetch.events) {
      setFetchableStatus({ ...canFetch, events: false });
      methods.getEvents().then((data) => setEvents(data));
    }
  };
  const fetchTeamPositionIfEmpty = () => {
    if (canFetch.teamPosition) {
      setFetchableStatus({ ...canFetch, teamPosition: false });
      methods.getTeamPosition().then((data) => setTeamPosition(data));
    }
  };
  const fetchTeamIfEmpty = () => {
    if (canFetch.team) {
      setFetchableStatus({ ...canFetch, team: false });
      methods.getTeam().then((data) => setTeam(data));
    }
  };
  const fetchMentorsIfEmpty = () => {
    if (canFetch.mentors) {
      const mentorListToMap = (mentorList) => {
        const mentorsMap = {};
        const mentorsDataMap = {};
        mentorList.forEach((mentor) => {
          mentorsMap[mentor.id] = mentor;
          mentorsDataMap[mentor.id] = true;
        });
        return [mentorsMap, mentorsDataMap];
      };
      methods.getMentors().then((data) => {
        const [mentors, mentorsData] = mentorListToMap(data);
        setMentors(mentors);
        setFetchableStatus({
          ...canFetch,
          mentors: false,
          mentorInterns: { ...mentorsData },
          mentorAchievements: { ...mentorsData },
          mentorPlacements: { ...mentorsData },
        });
      });
    }
  };
  const fetchMentorInternsIfEmpty = (id) => {
    if (canFetch.mentorInterns[id] && !canFetch.mentors) {
      let mentorInternFetch = { ...canFetch.mentorInterns };
      mentorInternFetch[id] = false;
      setFetchableStatus({ ...canFetch, mentorInterns: mentorInternFetch });
      methods.getMentorInterns(mentors[id].mentor_intern).then((data) => {
        let mentorIntern = { ...mentorInterns };
        mentorIntern[id] = data;
        setMentorInterns(mentorIntern);
      });
    }
  };
  const fetchMentorPlacementsIfEmpty = (id) => {
    if (canFetch.mentorPlacements[id] && !canFetch.mentors) {
      let mentorPlacementFetch = { ...canFetch.mentorPlacements };
      mentorPlacementFetch[id] = false;
      setFetchableStatus({
        ...canFetch,
        mentorPlacements: mentorPlacementFetch,
      });
      methods.getMentorPlacements(mentors[id].mentor_placement).then((data) => {
        let mentorPlacement = { ...mentorPlacements };
        mentorPlacement[id] = data;
        setMentorPlacements(mentorPlacement);
      });
    }
  };
  const fetchMentorAchievementsIfEmpty = (id) => {
    if (canFetch.mentorAchievements[id] && !canFetch.mentors) {
      let mentorAchievementFetch = { ...canFetch.mentorAchievements };
      mentorAchievementFetch[id] = false;
      setFetchableStatus({
        ...canFetch,
        mentorAchievements: mentorAchievementFetch,
      });
      methods
        .getMentorAchievements(mentors[id].mentor_achievement)
        .then((data) => {
          let mentorAchievement = { ...mentorAchievements };
          mentorAchievement[id] = data;
          setMentorAchievements(mentorAchievement);
        });
    }
  };
  const fetchMentorsDocsIfEmpty = () => {
    if (canFetch.mentorDocs) {
      setFetchableStatus({ ...canFetch, mentorDocs: false });
      methods.getMentorsDocs().then((data) => setMentorsDocs(data));
    }
  };
  const fetchFAQsIfEmpty = () => {
    if (canFetch.faqs) {
      setFetchableStatus({ ...canFetch, faqs: false });
      methods.getFAQs().then((data) => setFaqs(data));
    }
  };
  const fetchBranchesIfEmpty = () => {
    if (canFetch.branches) {
      setFetchableStatus({ ...canFetch, branches: false });
      methods.getBranch().then((data) => setBranches(data));
    }
  };
  const fetchInterestsIfEmpty = () => {
    if (canFetch.interests) {
      setFetchableStatus({ ...canFetch, interests: false });
      methods.getInterests().then((data) => setInterests(data));
    }
  };
  const fetchGroupsIfEmpty = () => {
    if (canFetch.groups) {
      setFetchableStatus({ ...canFetch, groups: false });
      methods.getGroups().then((data) => setGroups(data));
    }
  };
  const fetchBlogCategoryIfEmpty = () => {
    if (canFetch.blogCategory) {
      setFetchableStatus({ ...canFetch, blogCategory: false });
      methods.getBlogCategory().then((data) => setBlogCategory(data));
    }
  };

  const fetchFreshersGuideUrlIfEmpty = () => {
    if (canFetch.freshers) {
      setFetchableStatus({ ...canFetch, freshers: false });
      methods.getFreshersGuideUrl().then((data) => setFreshersGuideUrl(data));
    }
  };
  const fetchSingleBlogIfEmpty = (blogID) => {
    return new Promise((resolve, reject) => {
      const result = `${blogID}` in blogs;
      if (result) {
        resolve();
      } else {
        methods
          .getSingleBlog(blogID)
          .then((data) => {
            setBlogs({
              ...blogs,
              [data.id]: data,
            });
            resolve();
          })
          .catch((e) => reject());
      }
    });
  };
  const getBlogList = () => {
    return Object.keys(blogs).map((id) => blogs[id]);
  };
  const getMentorList = () => {
    return Object.keys(mentors).map((id) => mentors[id]);
  };
  const getSingleBlog = (id) => {
    if (`${id}` in blogs) {
      return { ...blogs[id], error: false };
    } else {
      return {
        error: true,
        message: "Does not exist",
      };
    }
  };
  const getSingleMentor = (id) => {
    if (`${id}` in mentors) {
      return { ...mentors[id], error: false };
    } else {
      return {
        error: true,
        message: "Does not exist",
      };
    }
  };
  const getMentorInterns = (id) => {
    if (`${id}` in mentorInterns) {
      return { data: [...mentorInterns[id]], error: false };
    } else {
      return {
        error: true,
        message: "Does not exist",
      };
    }
  };
  const getMentorPlacement = (id) => {
    if (`${id}` in mentorPlacements) {
      return { data: [...mentorPlacements[id]], error: false };
    } else {
      return {
        error: true,
        message: "Does not exist",
      };
    }
  };
  const getMentorAchievement = (id) => {
    if (`${id}` in mentorAchievements) {
      return { data: [...mentorAchievements[id]], error: false };
    } else {
      return {
        error: true,
        message: "Does not exist",
      };
    }
  };
  const fetcherCollection = {
    blogs: fetchBlogsIfEmpty,
    events: fetchEventsIfEmpty,
    teamPosition: fetchTeamPositionIfEmpty,
    team: fetchTeamIfEmpty,
    mentors: fetchMentorsIfEmpty,
    mentorInterns: fetchMentorInternsIfEmpty,
    mentorPlacements: fetchMentorPlacementsIfEmpty,
    mentorAchievements: fetchMentorAchievementsIfEmpty,
    mentorDocs: fetchMentorsDocsIfEmpty,
    faq: fetchFAQsIfEmpty,
    branches: fetchBranchesIfEmpty,
    interests: fetchInterestsIfEmpty,
    groups: fetchGroupsIfEmpty,
    blogCategory: fetchBlogCategoryIfEmpty,
    freshersGuideUrl: fetchFreshersGuideUrlIfEmpty,
    singleBlog: fetchSingleBlogIfEmpty,
  };
  return (
    <div className="App">
      <Header />
      <div className="router-footer-container">
        <Flash />
        <RouterView
          blogs={getBlogList()}
          getBlogById={getSingleBlog}
          events={events}
          blogCategory={blogCategory}
          teamPosition={teamPosition}
          team={team}
          mentors={getMentorList()}
          getMentorById={getSingleMentor}
          mentorInterns={getMentorInterns}
          mentorPlacements={getMentorPlacement}
          mentorAchievements={getMentorAchievement}
          mentorsDocs={mentorsDocs}
          faqs={faqs}
          branches={branches}
          interests={interests}
          groups={groups}
          freshersGuideUrl={freshersGuideUrl}
          fetchers={fetcherCollection}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
