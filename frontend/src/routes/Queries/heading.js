import React, {Component} from 'react';

export default class Intro extends Component {
    constructor(){
        super();
        this.state={
            activeTab: 'mentor',
            classMentor: 'mentor-mentee-button',
            classMentee: 'mentor-mentee-button disabled'
        }
    }

    toggleBtn(value){
        if(this.state.activeTab !== value && value==='mentor'){
            this.setState({activeTab:value,
                            classMentee:'mentor-mentee-button disabled',
                            classMentor:'mentor-mentee-button'})
        }else if(this.state.activeTab !== value && value==='mentee'){
            this.setState({activeTab:value,
                classMentor:'mentor-mentee-button disabled',
                classMentee:'mentor-mentee-button'})
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
                    <button onClick={() => this.toggleBtn('mentor')} className={this.state.classMentor}>Mentor</button><span className='bar'></span> <button className={this.state.classMentee} onClick={() => this.toggleBtn('mentee')}>Mentee</button>
                </div>
            </div>
        )
    }
}