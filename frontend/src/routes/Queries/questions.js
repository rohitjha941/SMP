import React, { Component } from 'react';
import QuestionsBox from './QuestionsBox';
import Button from '../../components/Button';

var questionText1 = [
    'How much time should we devote to the mentorship program?',
    'What’s in it for us by joining as a mentor in this program?',
    'What if the mentees themselves are not interested in joining this program?',
    'How can we meet the mentees? When and where should we meet them?',
]

var questionText2 = [
    'If a mentee is highly addicted to drugs/ alcohol or involved in any wrong...',
    'What should I do if I don’t know about the field my mentee wishes to explore?',
    'There were mentorship programs which were started before but didn’t...',
    'Will I be held accountable if an advice of mine backfires, even if I had the ....',
]

class Questions extends Component {
    state = {  }
    render() { 
        return ( 
        <div className='questions'>
            <div className='questions-column-1'>{questionText1.map((data,i) => <QuestionsBox key={i} text={data}/>)}</div>
            <div className='questions-column-2'>{questionText2.map((data,i) => <QuestionsBox key={i+4} text={data}/>)}</div>
            <Button className='view-more' text='View More' type='outline' />
        </div>
        );
    }
}
 
export default Questions;