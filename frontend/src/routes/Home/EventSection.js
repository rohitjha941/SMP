import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EventCard from '../../components/EventCard';
import Button from '../../components/Button';

import styles from './EventSection.module.scss';

class EventSection extends Component {
    render() { 
        const eventData = this.props.events.map(value => {
            return {
                event_id: value.id,
                imgSrc: value.thumbnail,
                imgAlt: value.title,
                heading: value.title,
                text: value.content,
                metadata: {
                    d1: value.date,
                    d2: value.time + ' hrs',
                    d3: value.venue,
                }
            }
        })
        return ( 
            <React.Fragment>
                <div className={styles.eventParentDiv}>
                    <div className={styles.sectionHeading}>Upcoming Events</div>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData[0]} 
                        type={window.innerWidth < 600 ? 'sm' : window.innerWidth < 1000 ? 'lg' : 'side'}
                    />
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData[1]} 
                        type={window.innerWidth < 600 ? 'sm' : window.innerWidth < 1000 ? 'lg' : 'side'}
                    />
                    <Link to='/events'><Button className={styles.eventsButton} text='View More' type='outline'/></Link>
                </div>
            </React.Fragment>
         );
    }
}
 
export default EventSection;