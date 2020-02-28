import React, { Component } from 'react';
import QuestionsBox from './QuestionsBox';
import Button from '../../components/Button';
import styles from './questions.module.scss';

class Questions extends Component {
    state = {  }
    render() { 
        var MentorQuestions = [];
        var MenteeQuestions = [];
        this.props.faqs.forEach(value => {
                var dat = {
                    question : value.question,
                    answer : value.answer
                };
                value._for === 'mentor' ? MentorQuestions.push(dat)  : MenteeQuestions.push(dat);
        });
        return ( 
        <div className={styles.questions}>
            <ul>
                {this.props.activeTab==='mentor' ? 
                (MentorQuestions.map((data,i) => {
                    return(
                        <li><QuestionsBox key={i} query={data}/></li>
                    )
                })):
                (MenteeQuestions.map((data,i) => {
                    return(
                        <li><QuestionsBox key={i} query={data}/></li>
                    )
                }))
                }
            </ul>
            <Button className={styles.viewMore} text='View More' type='outline' />
        </div>
        );
    }
}
 
export default Questions;