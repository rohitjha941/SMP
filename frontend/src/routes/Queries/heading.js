import React, {Component} from 'react';
import Button from '../../components/Button'

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
            <div className="heading">
                <div className="heading">
                    <div>
                        <span>What can we </span>
                        <span className="color-red">help </span>
                        <span>you with?</span>
                    </div>
                </div>
                <div className="i-am-a">
                    <p>I am a</p>
                </div>
                <div>
                    <Button onClick={() => this.toggleBtn('mentor')} className={'mentor-mentee-button'} text='Mentor' type={this.state.mentorActiveStatus} />
                    <span className='bar'></span>
                    <Button onClick={() => this.toggleBtn('mentee')} className={'mentor-mentee-button'} type={this.state.menteeActiveStatus} text='Mentee' />
                </div>
            </div>
        )
    }
}