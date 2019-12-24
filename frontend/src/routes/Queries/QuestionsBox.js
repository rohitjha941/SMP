import React, { Component } from 'react';
import downArrow from '../../assets/images/down-arrow.svg'
import downArrow2 from '../../assets/images/down-arrow-2.svg'

let image;

if(window.innerWidth<600){
    image = downArrow2; 
}else{
    image = downArrow;
}
class QuestionsBox extends Component {
    state = {  }

    render() { 
        return ( 
            <div className='questions-box'>
                <div>
                    <div className='text-area'>
                        {this.props.text}
                    </div>
                    <div className='down-arrow'>
                        <img src={image} alt='drop-down'/>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default QuestionsBox;