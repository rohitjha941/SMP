import React, { Component } from 'react';
import styles from './MobileView.module.scss';
import Button from '../../components/Button';
import EventCard from '../../components/EventCard';

class MobileView extends Component {
    state = {  }
    render() { 
        const eventData = this.props.eventData ? this.props.eventData : null; 
        return ( 
            <React.Fragment>
                <div className={styles.heading}>We conduct <span className='color-red'>Events </span><span className={styles.dashedWord}>year-round</span></div>
                <div className={styles.MainWrapper}>
                <div>
                    <div className={styles.categoryHeading}>Upcoming Events</div>
                    {eventData ? 
                    <>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData[0]}
                        type={window.innerWidth <600 ? 'sm' : 'lg'}
                        // headingTop = {false}
                    />
                    <hr className={styles.hr}/>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData[1]}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // heading = {false} 
                    />
                    <hr className={styles.hr}/>
                    </>
                : null}   
                </div>
                <div>
                    <div className={styles.categoryHeading}>SMP Events</div>
                    {eventData ? 
                    <>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData[1]}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // metadata = {false}
                    />
                    <hr className={styles.hr}/>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData[0]}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // text = {false}
                    />
                    <hr className={styles.hr}/>
                    </>
                    :null}
                </div>
                </div>
                <Button type='outline' text='View More'/>
            </React.Fragment>
         );
    }
}
 
export default MobileView;