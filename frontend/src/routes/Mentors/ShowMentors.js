import React, { Component } from 'react';
import SearchHeader from '../../components/SearchHeader';
import styles from './ShowMentors.module.scss';
import MentorCard from '../../components/MentorCard';

const Data = [
        {
            image:require('assets/images/profile.jfif'),
            name:'Rakshit Kesarwani' ,
            branchShort:'Arch', 
            year:'3rd', 
            skills:['UI Design','UX Design','Interaction Design', 'Illustrator'],
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Laksh Arora' ,
            branchShort:'Arch', 
            year:'3rd', 
            skills:['UI Design','UX Design','Interaction Design', 'Illustrator'],
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Jayesh Chaudhary' ,
            branchShort:'Arch', 
            year:'3rd', 
            skills:['UI Design','UX Design','Interaction Design', 'Illustrator'],
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Apan Jain' ,
            branchShort:'Arch', 
            year:'3rd', 
            skills:['UI Design','UX Design','Interaction Design', 'Illustrator'],
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Harshit Maurya' ,
            branchShort:'Arch', 
            year:'3rd', 
            skills:['UI Design','UX Design','Interaction Design', 'Illustrator'],
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Rohit Jha' ,
            branchShort:'Arch', 
            year:'3rd', 
            skills:['UI Design','UX Design','Interaction Design', 'Illustrator'],
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Amit' ,
            branchShort:'Arch', 
            year:'3rd', 
            skills:['UI Design','UX Design','Interaction Design', 'Illustrator'],
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Rakshit Kesarwani' ,
            branchShort:'Arch', 
            year:'3rd', 
            skills:['UI Design','UX Design','Interaction Design', 'Illustrator'],
        }
]
class MentorShow extends Component {
    state = {  }
    render() { 
        return ( 
            <>
                <div className={styles.container}>
                    <SearchHeader/>
                    <div className={styles.department}>Architecture & Planning</div>
                    <ul id="mentors">
                        {Data.map((data,i) => {
                            return(
                            <>
                                <li className='mentor'><MentorCard 
                                    className={styles.mentorCard}
                                    profile={data}
                                    key={i}
                                />
                                <hr/></li>
                            </>
                            )
                        })}
                    </ul>
                </div>
            </>
         );
    }
}
 
export default MentorShow;