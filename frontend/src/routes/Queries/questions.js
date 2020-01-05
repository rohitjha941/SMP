import React, { Component } from 'react';
import QuestionsBox from './QuestionsBox';
import Button from '../../components/Button';
import styles from './questions.module.scss';

var questions = [
    { 
        question : 'How much time should we devote to the mentorship program?', 
        answer : 'At the beginning of every semester, mentors will have frequent meetings with the mentees. Later, specific doubts and queries pertaining to academics/extra-curricular are to be addressed as and when required. Overall, the program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person. Apart from the assigned duties, it will be appreciated if mentors could spend time developing the mentee’s confidence and soft skills through interactive activities. However, taking these up lies in the discretion of the mentor and he/she shall not be forced to do so.'
    },
    { 
        question : 'What’s in it for us by joining as a mentor in this program?', 
        answer : 'Mentors will be awarded a certificate of appreciation by the Dean of Students’ Welfare. Only a few on-campus programs have this privilege. It can be mentioned as a credible position of responsibility in résumés. As mentors, you shall learn to establish a healthy relationship with the mentees. This will help you build strong leadership skills in the long run. '
    },
    { 
        question : 'What if the mentees themselves are not interested in joining this program?', 
        answer : 'During the orientation, the freshmen will be briefed about the features and benefits of SMP. Timely notices will be posted in their Bhawan and Channel-i. This will ensure that the initial level of enthusiasm is high. Initial meetings should be interactive which focuses on making the mentee comfortable with the mentor. Discussions about the mentee’s insecurities, expectations and abilities would be a good bet. If the mentees are still not interested, the mentor should report the same to the SMP team. '
    },
    { 
        question :'How can we meet the mentees? When and where should we meet them?',
        answer : 'You can meet the mentees in public places viz. library steps, senate steps, Georgia, MAC, etc. Avoid meeting them at your or their hostel rooms. Timings should be such that maximum participation is ensured.'
    },
    { 
        question : 'If a mentee is highly addicted to drugs/ alcohol or involved in any wrongdoing, what should I do?', 
        answer : 'Since substance abuse is a sensitive issue, try to address the problem at a personal level first. If the problem persists, discuss the issue with another senior year mentor and ask for help. You may also contact the Counselling Cell. The particular mentee will then be kept under close supervision.'
    },
    { 
        question : 'There were mentorship programs which were started before but didn’t last long. How is this program different?', 
        answer : 'The Student Mentorship Programme is a meticulously drafted initiative that is under the constant scrutiny of the Dean of Student Welfare and a Faculty Advisor. It is proposed to have a  robust structure and constitution. Similar programs exist in other IITs where they have been successful. IIT Bombay has a mentorship program for the last 20 years, while IIT Delhi and IIT Kanpur have followed IIT-B recently. The organizational and operational structure of SMP in IIT Roorkee has been formulated after a rigorous study of their program. SMP mentors are trained before their involvement with the mentees. This ensures homogenous guidance and support to the students. Previous programs failed due to the lack of involvement of students as mentors. Since none except the senior students know about the problems faced by freshmen, team SMP is hopeful to have sound positive outcomes. '
    },
    { 
        question : 'Will I be held accountable if the advice of mine backfires, even if I had the mentee’s best interest in my mind?', 
        answer:'It is always advised for a mentor to consult someone before giving advice on a topic he/she is not sure about. However, if the mentor unknowingly advises a mentee incorrectly, there is no reason for him/her to worry about being reprimanded. There shall be due consideration towards the mentors in case of rare oversights. If the issue becomes serious, the mentor may in that case immediately contact the SMP team.'
    },
    {
        question : 'What should I do if I don’t know about the field my mentee wishes to explore? ',
        answer : 'Avoid giving immature advice. Contact other SMP mentors and ask them to address the mentee. There is only a minimal chance that the particular mentor would not like to help. Also, there would be a provision for swapping of the mentors in case a mentee feels the particular mentor is unable to help or the mentor is unaware of some particular field the mentee wants to explore.'
    }
]

class Questions extends Component {
    state = {  }
    render() { 
        return ( 
        <div className={styles.questions}>
            <ul>
                {questions.map((data,i) => {
                    return(
                        <li><QuestionsBox key={i} query={data}/></li>
                    )
                })}
            </ul>
            <Button className={styles.viewMore} text='View More' type='outline' />
        </div>
        );
    }
}
 
export default Questions;