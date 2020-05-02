export const BASE_URL = process.env.REACT_APP_API_BASE;

const apiConstants = {
  pages: BASE_URL + "/backend/pages/",
  mentors: BASE_URL + "/backend/mentors/",
  docs: BASE_URL + "/backend/documents/",
  blogs: "blogs/",
  events: "events/",
  team: "team/",
  mentorsDocs: "mentor-docs/",
  faqs: "faq/",
  branch: "branch/",
  interests: "interests/",
  groups: "campusGroups/",
  blogcategory: "blogCategory/",
  raiseQuery: "raise-query/",
  freshersGuide: "freshers-guide/",
};

export const BLOGS = apiConstants.pages + apiConstants.blogs;
export const BLOGCATEGORY = apiConstants.pages + apiConstants.blogcategory;
export const EVENTS = apiConstants.pages + apiConstants.events;
export const TEAM = apiConstants.pages + apiConstants.team;
export const MENTORS = apiConstants.mentors;
export const MENTORSDOCS = apiConstants.docs + apiConstants.mentorsDocs;
export const FAQS = apiConstants.pages + apiConstants.faqs;
export const BRANCH = apiConstants.pages + apiConstants.branch;
export const INTERESTS = apiConstants.mentors + apiConstants.interests;
export const GROUPS = apiConstants.pages + apiConstants.groups;
export const RAISEQUERY = apiConstants.pages + apiConstants.raiseQuery;
export const FRESHERS_GUIDE = apiConstants.docs + apiConstants.freshersGuide;
