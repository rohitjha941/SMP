import React, { Component } from 'react';
import downArrow from '../../assets/images/down-arrow.svg'
import downArrow2 from '../../assets/images/down-arrow-2.svg'
import styles from './QuestionsBox.module.scss';

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
            <div className={styles.questionBox}>
                <div className={styles.parentContentDiv}>
                    <div className={styles.textArea}>
                        {this.props.text}
                    </div>
                    <div className={styles.downArrow}>
                        <img src={image} alt='drop-down'/>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default QuestionsBox;