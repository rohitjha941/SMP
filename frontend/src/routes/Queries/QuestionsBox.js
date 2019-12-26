import React, { Component } from 'react';
import downArrow from '../../assets/images/down-arrow.svg'
import downArrow2 from '../../assets/images/down-arrow-2.svg'
import styles from './QuestionsBox.module.scss';
<<<<<<< HEAD
import Answer from './Answer';
=======
>>>>>>> refactor css stylesheets

let image;

if(window.innerWidth<600){
    image = downArrow2; 
}else{
    image = downArrow;
}
class QuestionsBox extends Component {
    constructor(){
        super();
        this.state ={
            visibility:false,
        }
    }
    toggleAnswer = () => {
        this.setState((prevState) => {
            return{
                visibility : !prevState.visibility
            }
        })
    }

    render() { 
        return ( 
            <div className={styles.questionBox}>
                <div className={styles.parentContentDiv}>
                    <div className={styles.textArea}>
<<<<<<< HEAD
                        {this.props.query.question}
                        <Answer answer={this.props.query.answer} visibility={this.state.visibility}/>
                    </div>
                    <div onClick = {this.toggleAnswer} className={styles.downArrow}>
                        <img className={styles.arrow + ' ' +(this.state.visibility ? (styles.up) : null)} src={image} alt='drop-down'/>
=======
                        {this.props.text}
                    </div>
                    <div className={styles.downArrow}>
                        <img src={image} alt='drop-down'/>
>>>>>>> refactor css stylesheets
                    </div>
                </div>
            </div>
         );
    }
}
 
export default QuestionsBox;