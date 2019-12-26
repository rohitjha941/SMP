import React, { Component } from 'react';
import QuestionsBox from './QuestionsBox';
import Button from '../../components/Button';
import styles from './questions.module.scss';

var questionText1 = [
    { question : 'How much time should we devote to the mentorship program?', answer:'The program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person.'},
    { question : 'What’s in it for us by joining as a mentor in this program?', answer:'The program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person.'},
    { question :'What if the mentees themselves are not interested in joining this program?', answer:'The program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person.'},
    { question :'How can we meet the mentees? When and where should we meet them?',answer:'The program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person.'},
]

var questionText2 = [
    { question : 'If a mentee is highly addicted to drugs/ alcohol or involved in any wrong...', answer:'The program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person.'},
    { question : 'What should I do if I don’t know about the field my mentee wishes to explore?', answer:'The program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person.'},
    { question : 'There were mentorship programs which were started before but didn’t...', answer:'The program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person.'},
    { question : 'Will I be held accountable if an advice of mine backfires, even if I had the ....', answer:'The program demands at least 2-3 hours per week. Mentors need to stay in touch with their mentees through suitable online and offline means. Small queries can be addressed without meeting in-person.'},
]

class Questions extends Component {
    state = {  }
    render() { 
        return ( 
        <div className={styles.questions}>
<<<<<<< HEAD
            <div className={styles.questionsColumn1}>{questionText1.map((data,i) => <QuestionsBox key={i} query={data}/>)}</div>
            <div className={styles.questionsColumn2}>{questionText2.map((data,i) => <QuestionsBox key={i+4} query={data}/>)}</div>
=======
            <div className={styles.questionsColumn1}>{questionText1.map((data,i) => <QuestionsBox key={i} text={data}/>)}</div>
            <div className={styles.questionsColumn2}>{questionText2.map((data,i) => <QuestionsBox key={i+4} text={data}/>)}</div>
>>>>>>> refactor css stylesheets
            <Button className={styles.viewMore} text='View More' type='outline' />
        </div>
        );
    }
}
 
export default Questions;