const BASE_URL = process.env.REACT_APP_API_BASE;
export const BASE_MEDIA_URL = process.env.REACT_APP_MEDIA_API_BASE;

const apiConstants = {
  base: BASE_URL,
  media: BASE_MEDIA_URL,
  blogs: "blogs",
  events: "events",
  team: "team",
  mentors: "mentors/",
  mentorAchievements: "mentors/achievements/",
  mentorIntern: "mentors/intern/",
  mentorsDocs: "mentorsDocs",
  faqs: "faq",
  branch: "branch",
  interests: "interests/",
  groups: "campusGroups",
  blogcategory: "blogCategory",
  raiseQuery: "raise-query/",
  freshersGuide: "/documents/freshers-guide",
};

export const BLOGS = apiConstants.base + apiConstants.blogs;
export const BLOGCATEGORY = apiConstants.base + apiConstants.blogcategory;
export const EVENTS = apiConstants.base + apiConstants.events;
export const TEAM = apiConstants.base + apiConstants.team;
export const MENTORS = apiConstants.base + apiConstants.mentors;
export const MENTORSINTERN = apiConstants.base + apiConstants.mentorIntern;
export const MENTORSACHIEVEMENTS =
  apiConstants.base + apiConstants.mentorAchievements;
export const MENTORSDOCS = apiConstants.base + apiConstants.mentorsDocs;
export const FAQS = apiConstants.base + apiConstants.faqs;
export const BRANCH = apiConstants.base + apiConstants.branch;
export const INTERESTS = apiConstants.base + apiConstants.interests;
export const GROUPS = apiConstants.base + apiConstants.groups;
export const RAISEQUERY = apiConstants.base + apiConstants.raiseQuery;
export const FRESHERS_GUIDE = apiConstants.media + apiConstants.freshersGuide;
