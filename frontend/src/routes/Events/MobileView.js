import React, { Component } from 'react';
import styles from './MobileView.module.scss';
import Button from '../../components/Button';
import EventCard from '../../components/EventCard';

class MobileView extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className={styles.heading}>We conduct <span className='color-red'>Events </span><span className={styles.dashedWord}>year-round</span></div>
                <div>
                    <div className={styles.categoryHeading}>Upcoming Events</div>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={this.props.eventData}
                        type={window.innerWidth <600 ? 'sm' : 'lg'}
                        // headingTop = {false}
                    />
                    <hr className={styles.hr}/>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={this.props.eventData}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // heading = {false} 
                    />
                    <hr className={styles.hr}/>
                </div>
                <div>
                    <div className={styles.categoryHeading}>SMP Events</div>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={this.props.eventData}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // metadata = {false}
                    />
                    <hr className={styles.hr}/>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={this.props.eventData}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // text = {false}
                    />
                    <hr className={styles.hr}/>
                </div>
                <Button type='outline' text='View More'/>
            </React.Fragment>
         );
    }
}
 
export default MobileView;