import React, { Component } from 'react';
import Heading  from './heading'
import Questions from './questions'
import Contact from './contact'
import redArm from 'assets/images/red-arm.svg'
import blueArm from 'assets/images/blue-arm.svg'
import styles from './Queries.module.scss'

export default class Queries extends Component {
    constructor(){
        super();
        this.state={
            activeTab : 'mentor'
        }
    }

    changeTab = (value) =>{
        this.setState({activeTab:value}); 
    }

    render() {
        return(
            <div className='queries'>
                <Heading changeTab={this.changeTab}/>
                <Questions faqs={this.props.faqs} activeTab={this.state.activeTab}/>
                <img className={styles.redArm} src = {redArm} alt='arm' />
                <img className={styles.blueArm} src = {blueArm} alt='arm' />
                <Contact />
            </div>
        )
    }
}