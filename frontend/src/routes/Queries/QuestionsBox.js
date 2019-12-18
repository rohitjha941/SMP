import React, { Component } from 'react';
import downArrow from './src/down-arrow.svg'

class QuestionsBox extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='questions-box'>
                <div><span className='text-area'>{this.props.text}</span><span className='down-arrow'><img src={downArrow} alt='drop-down'/></span></div>
            </div>
         );
    }
}
 
export default QuestionsBox;