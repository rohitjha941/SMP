import React, { Component } from 'react';
// import Button from '../../components/Button';
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
            name:'Rakshit Kesarwani' ,
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
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Rakshit Kesarwani' ,
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
        },
        {
            image:require('assets/images/profile.jfif'),
            name:'Rakshit Kesarwani' ,
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
                    <div className={styles.department}>Architecture & Planning</div>
                    {Data.map((data,i) => {
                        return(
                        <>
                            <MentorCard 
                                className={styles.mentorCard}
                                profile={data}
                                key={i}
                            />
                            <hr/>
                        </>
                        )
                    })}
                </div>
            </>
         );
    }
}
 
export default MentorShow;