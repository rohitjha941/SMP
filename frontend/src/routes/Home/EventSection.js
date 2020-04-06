import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EventCard from '../../components/EventCard';
import Button from '../../components/Button';

import styles from './EventSection.module.scss';

class EventSection extends Component {
    constructor(){
        super();
        this.state ={
            mobView : window.innerWidth < 600,
            tabView: window.innerWidth<1000,
            eventData:[]
        }
    }
    resize  = () => {
        let tabWidth =  window.innerWidth < 1000;
        this.setState({ tabView : tabWidth});
        let mobWidth = window.innerWidth < 600;
        this.setState({mobView:mobWidth});
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize);
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
                },
                isUpcoming: value.isUpcoming,
                isThisWeek: value.isThisWeek
            }
        });
        this.setState({eventData: eventData});
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
    render() { 
        let eventData = this.state.eventData;
        return ( 
            <React.Fragment>
                <div className={styles.eventParentDiv}>
                    <div className={styles.sectionHeading}>Upcoming Events</div>
                    {eventData.length > 0 ?(
                    <>
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData[0]} 
                        type={this.state.mobView ? 'sm' : this.state.tabView ? 'lg' : 'side'}
                    />
                    <EventCard 
                        className={styles.eventCardCommon} 
                        eventData={eventData[1]} 
                        type={window.innerWidth < 600 ? 'sm' : window.innerWidth < 1000 ? 'lg' : 'side'}
                    />
                    </>) :null}
                    <Link to='/events'><Button className={styles.eventsButton} text='View More' type='outline'/></Link>
                    </div>
            </React.Fragment>
         );
    }
}
 
export default EventSection;