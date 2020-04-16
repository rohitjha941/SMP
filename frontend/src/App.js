import React, { useState, useEffect } from "react";
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
  const [blogs, setBlogs] = useState([]);
  const [blogCategory, setBlogCategory] = useState([]);
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [mentorsDocs, setMentorsDocs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [branches, setBranches] = useState([]);
  const [interests, setInterests] = useState([]);

  window.flash = (message, type = "success") =>
    Bus.emit("flash", { message, type });

  const fetchBlogsIfEmpty = () => {
    if (!blogs || blogs.length === 0) {
      methods.getBlogs().then((data) => setBlogs(data));
    }
  };
  const fetchEventsIfEmpty = () => {
    if (!events || events.length === 0) {
      methods.getEvents().then((data) => setEvents(data));
    }
  };
  const fetchTeamIfEmpty = () => {
    if (!team || team.length === 0) {
      methods.getTeam().then((data) => setTeam(data));
    }
  };
  const fetchMentorsIfEmpty = () => {
    if (!mentors || mentors.length === 0) {
      methods.getMentors().then((data) => setMentors(data));
    }
  };
  const fetchMentorsDocsIfEmpty = () => {
    if (!mentorsDocs || mentorsDocs.length === 0) {
      methods.getMentorsDocs().then((data) => setMentorsDocs(data));
    }
  };
  const fetchFAQsIfEmpty = () => {
    if (!faqs || faqs.length === 0) {
      methods.getFAQs().then((data) => setFaqs(data));
    }
  };
  const fetchBranchesIfEmpty = () => {
    if (!branches || branches.length === 0) {
      methods.getBranch().then((data) => setBranches(data));
    }
  };
  const fetchInterestsIfEmpty = () => {
    if (!branches || branches.length === 0) {
      methods.getInterests().then((data) => setInterests(data));
    }
  };
  const fetchBlogCategoryIfEmpty = () => {
    if (!blogCategory || blogCategory.length === 0) {
      methods.getBlogCategory().then((data) => setBlogCategory(data));
    }
  };

  useEffect(() => {
    fetchBlogsIfEmpty();
    fetchEventsIfEmpty();
    fetchTeamIfEmpty();
    fetchMentorsIfEmpty();
    fetchMentorsDocsIfEmpty();
    fetchFAQsIfEmpty();
    fetchBranchesIfEmpty();
    fetchInterestsIfEmpty();
    fetchBlogCategoryIfEmpty();
  });
  return (
    <div className="App">
      <Header />
      <div className="router-footer-container">
        <Flash />
        <RouterView
          blogs={blogs}
          events={events}
          blogCategory={blogCategory}
          team={team}
          mentors={mentors}
          mentorsDocs={mentorsDocs}
          faqs={faqs}
          branches={branches}
          interests={interests}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
