import React, { Component } from 'react';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import styles from './Events.module.scss';

class Events extends Component {

    constructor(){
        super();
        this.state ={
            mobileView : window.innerWidth < 1000
        }
    }
    resize  = () => {
        let mobWidth =  window.innerWidth < 1000;
        this.setState({ mobileView : mobWidth})
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize);
        }
        componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
       
    eventData = {
        event_id : 'event_id',
        imgSrc : 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        imgAlt : 'students',
        heading : 'Open Talk on Data Science ', 
        text : 'The Student Mentorship Program recently hosted the first talk of the series on Data Science, Artificial Intelligence and Research. We would like to thank our speakers Karan Desai and Hardik Chauhan for their enriching inputs and the students who showed up for this discussion.', 
        metadata : {d1:'21 Dec\'19' , d2:'6:15 pm', d3:'MAC Audi'}
    }

    render() { 
        return ( 
            <React.Fragment>
                <div className={styles.mainDiv}>
                    {
                    (window.innerWidth < 1000) ? 
                        <MobileView eventData={this.eventData}/>
                        :
                        <DesktopView eventData={this.eventData}/>
                    }
                </div>
            </React.Fragment>
         );
    }
}
 
export default Events;