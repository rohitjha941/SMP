import {
    BLOGS,
    EVENTS,
    TEAM,
    MENTORS, 
    MENTORSINTERN,
    MENTORSACHIEVEMENTS, 
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
const PostQuery = (data) => {
    return axios.post(RAISEQUERY,data)
}
const CreateMentor = (mentorData) => {
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
        linkden,
        groups,
        achievements,
        internships,
    } = mentorData;
    const interestToCreate = interest.filter((i) => typeof i === "string");
    let createdInterest = interest.filter((i) => typeof i === "number");
    const data = {
        interests : interestToCreate
    }
    axios.post(INTERESTS, data)
    .then((response) => {
        // console.log(response)

        createdInterest = [...createdInterest,...response.data.interest_ids];
        let data = new FormData();
        data.append("name", name);
        data.append("year", year);
        data.append("enrollno", enrollno);
        data.append("branch", branch);
        data.append("interest",createdInterest);
        data.append("email", email);
        data.append("mobile", mobile);
        data.append("photo", image);
        data.append("resume", resume);
        data.append("facebook", facebook);
        data.append("linkden", linkden);
        data.append("groups", groups);

        // console.log(data.getAll('interest'));
        // console.log(data.getAll('groups'))

        return axios.post(MENTORS,data)
    })
    .then((response)=>{
        // console.log(response)
        let achievementData = {
            mentor_id: response.data.id,
            achievements: achievements,
        };
  
        let internshipsData = {
            mentor_id: response.data.id,
            interns: internships,
        };
        return axios.all([
            axios.post(MENTORSACHIEVEMENTS,achievementData),
            axios.post(MENTORSINTERN,internshipsData)
        ])
    })
    .then(axios.spread((achievementsRes, internsRes) =>{
        // console.log(achievementsRes)
        // console.log(internsRes)
        return true;
    }))
    .catch((error) => {
        // console.log(error);

        return false;
    });
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
export const createMentor = CreateMentor;

