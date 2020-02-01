const BASE_URL = process.env.REACT_APP_API_BASE;

const apiConstants = {
    base: BASE_URL,
    blogs: 'blogs',
}


export const BLOGS = apiConstants.base + apiConstants.blogs;
