import React, {Component} from 'react';
import Button from '../../components/Button';
import styles from './heading.module.scss';

export default class Intro extends Component {
    constructor(){
        super();
        this.state={
            activeTab: 'mentor',
            mentorActiveStatus : 'outline',
            menteeActiveStatus : 'disabled',
        }
    }

    toggleBtn(value){
        if(this.state.activeTab !== value && value==='mentor'){
            this.setState({
                activeTab:value,
                menteeActiveStatus:'disabled',
                mentorActiveStatus:'outline'
            })
        }else if(this.state.activeTab !== value && value==='mentee'){
            this.setState({
                activeTab:value,
                menteeActiveStatus:'outline',
                mentorActiveStatus:'disabled'
            })
        }
    }

    render() {
        return (
            <div className={styles.headingParentDiv}>
                <div className={styles.heading}>
                    <div>
                        <span>What can we </span>
                        <span className="color-red">help </span>
                        <span>you with?</span>
                    </div>
                </div>
                <div className={styles.iAmA}>
                    <p>I am a</p>
                </div>
                <div className={styles.toggleParentDiv}>
                    <Button onClick={() => this.toggleBtn('mentor')} className={styles.mentorMenteeButton} text='Mentor' type={this.state.mentorActiveStatus} />
                    <span className={styles.bar}></span>
                    <Button onClick={() => this.toggleBtn('mentee')} className={styles.mentorMenteeButton} type={this.state.menteeActiveStatus} text='Mentee' />
                </div>
            </div>
        )
    }
}