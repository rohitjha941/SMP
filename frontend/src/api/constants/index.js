const BASE_URL = process.env.REACT_APP_API_BASE;

const apiConstants = {
    base: BASE_URL,
    blogs: 'blogs',
    events:'events',
    team:'team',
    mentors:'mentors'
}


export const BLOGS   = apiConstants.base + apiConstants.blogs;
export const EVENTS  = apiConstants.base + apiConstants.events;
export const TEAM    = apiConstants.base + apiConstants.team;
export const MENTORS = apiConstants.base + apiConstants.mentors;
