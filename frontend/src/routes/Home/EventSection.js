import React, { Component } from 'react';
import EventCard from '../../components/EventCard';
import Button from '../../components/Button';

import styles from './EventSection.module.scss';

let eventData = {
    event_id : 'event_id',
    imgSrc : 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    imgAlt : 'students',
    heading : 'Open Talk on Data Science ', 
    text : 'The Student Mentorship Program recently hosted the first talk of the series on Data Science, Artificial Intelligence and Research. We would like to thank our speakers Karan Desai and Hardik Chauhan for their enriching inputs and the students who showed up for this discussion.', 
    metadata : {d1:'21 Dec\'19' , d2:'6:15 pm', d3:'MAC Audi'}
}

class EventSection extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className={styles.eventParentDiv}>
                    <div className={styles.sectionHeading}>Upcoming Events</div>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData} 
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                    />
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData} 
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                    />
                    <Button className={styles.eventsButton} text='View More' type='outline'/>
                </div>
            </React.Fragment>
         );
    }
}
 
export default EventSection;