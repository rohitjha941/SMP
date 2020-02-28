import {BLOGS,EVENTS,TEAM,MENTORS, MENTORSDOCS,FAQS} from 'api/constants';

const Blogs = function() {
    return new Promise((resolve, reject) => {
        fetch(BLOGS)
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

export const getBlogs = Blogs;
export const getEvents = Events;
export const getTeam = Team;
export const getMentors = Mentors;
export const getMentorsDocs = MentorsDocs;
export const getFAQs = Faqs;
