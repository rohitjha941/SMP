import {
    BLOGS,
    EVENTS,
    TEAM,
    MENTORS, 
    MENTORSDOCS,
    FAQS,
    BRANCH,
    INTERESTS,
    BLOGCATEGORY,
    GROUPS,
    RAISEQUERY,
} from 'api/constants';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const Blogs = function() {
    return new Promise((resolve, reject) => {
        fetch(BLOGS)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const BlogCategory = function() {
    return new Promise((resolve, reject) => {
        fetch(BLOGCATEGORY)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const Events = function() {
    return new Promise((resolve, reject) => {
        fetch(EVENTS)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const Team = function() {
    return new Promise((resolve, reject) => {
        fetch(TEAM)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const Mentors = function() {
    return new Promise((resolve, reject) => {
        fetch(MENTORS)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};

const MentorsDocs = function(){
    return new Promise((resolve,reject) => {
        fetch(MENTORSDOCS)
        .then(data=> data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const Faqs = function() {
    return new Promise((resolve, reject) => {
        fetch(FAQS)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const Branch = function() {
    return new Promise((resolve,reject) => {
        fetch(BRANCH)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const Interests = function() {
    return new Promise((resolve,reject) => {
        fetch(INTERESTS)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const Groups = function() {
    return new Promise((resolve,reject) => {
        fetch(GROUPS)
        .then(data => data.json())
        .then(jsonData => resolve(jsonData))
        .catch(e => reject(e))
    })
};
const PostQuery = function(data) {
    return axios.post(RAISEQUERY,data)
}

export const getBlogs = Blogs;
export const getEvents = Events;
export const getTeam = Team;
export const getMentors = Mentors;
export const getMentorsDocs = MentorsDocs;
export const getFAQs = Faqs;
export const getBranch = Branch;
export const getInterests = Interests;
export const getGroups = Groups ;
export const getBlogCategory = BlogCategory;
export const postQuery = PostQuery;

