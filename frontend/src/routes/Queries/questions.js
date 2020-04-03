import React, { Component } from 'react';
import QuestionsBox from './QuestionsBox';
import Button from '../../components/Button';
import styles from './questions.module.scss';

class Questions extends Component {
    constructor(){
        super();
        this.state={
            mentorQueryLimit : 8,
            menteeQueryLimit : 8,
            MentorQuestions : [],
            MenteeQuestions: [],
            viewTextMentor:'View More',
            viewTextMentee: 'View More',
        }
    }
    componentDidMount(){
        var MentorQuestions = [];
        var MenteeQuestions = [];
        if(this.props.faqs){
            this.props.faqs.forEach(value => {
                var dat = {
                    question : value.question,
                    answer : value.answer
                };
                value._for === 'mentor' ? MentorQuestions.push(dat)  : MenteeQuestions.push(dat);
          })
        };
        this.setState({MenteeQuestions:MenteeQuestions, MentorQuestions:MentorQuestions})
    }
    handlequerychange = () =>{
        (this.props.activeTab==='mentor' && this.state.mentorQueryLimit === 8) ? this.setState({mentorQueryLimit:this.state.MentorQuestions.length, viewTextMentor:'View Less'}) : this.setState({mentorQueryLimit:8, viewTextMentor:'View More'});
        (this.props.activeTab==='mentee' && this.state.menteeQueryLimit === 8) ? this.setState({menteeQueryLimit:this.state.MenteeQuestions.length, viewTextMentee:'View Less'}) : this.setState({menteeQueryLimit:8, viewTextMentee:'View More'});
    }
    render() {
        return ( 
        <div className={styles.questions}>
            <ul>
                {this.props.activeTab==='mentor' ? 
                (this.state.MentorQuestions.slice(0,this.state.mentorQueryLimit).map((data,i) => {
                    return(
                        <li><QuestionsBox key={i} query={data}/></li>
                    )
                })):
                (this.state.MenteeQuestions.slice(0,this.state.menteeQueryLimit).map((data,i) => {
                    return(
                        <li><QuestionsBox key={i} query={data}/></li>
                    )
                }))
                }
            </ul>
            <Button onClick={this.handlequerychange} className={styles.viewMore} text={this.props.activeTab==='mentor' ? this.state.viewTextMentor : this.state.viewTextMentee} type='outline' />
        </div>
        );
    }
}
 
export default Questions;