import React, { Component } from 'react';
import styles from './QuestionsBox.module.scss';

class Answer extends Component {
    constructor(){
        super();
        this.state = {
            visibility: false,
            answer : '',
        }
    }
    componentDidMount() {
        this.setState({
            visibility : this.props.visibility,
            answer : this.state.answer
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            visibility : nextProps.visibility
        })
    }
    render() { 
        return ( 
            <React.Fragment>
                <div className={styles.answer + ' ' + (this.state.visibility ? styles.visible : styles.hidden)}>
                    {this.props.answer}
                </div>
            </React.Fragment>
         );
    }
}
 
export default Answer;