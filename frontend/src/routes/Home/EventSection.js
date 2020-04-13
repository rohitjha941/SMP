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
            upcomingEvents:[],
            pastEvents:[]
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
        const eventData = this.props.events ? this.props.events : [];
        const pastEvents = (eventData.past && eventData.past.length>0)  ? eventData.past.map(value => {
            return {
                event_id: value.id,
                imgSrc: process.env.REACT_APP_IMAGE_API_BASE + value.thumbnail,
                imgAlt: value.title,
                heading: value.title,
                text: value.content,
                metadata: {
                    d1: value.date,
                    d2: value.time + ' hrs',
                    d3: value.venue,
                },
                isThisWeek: false,
            }
        }) : [] ;
        const thisWeekEvents = (eventData.this_week && eventData.this_week.length>0) ? eventData.this_week.map(value => {
            return{
                event_id: value.id,
                imgSrc: process.env.REACT_APP_IMAGE_API_BASE + value.thumbnail,
                imgAlt: value.title,
                heading: value.title,
                text: value.content,
                metadata: {
                    d1: value.date,
                    d2: value.time + ' hrs',
                    d3: value.venue,
                },
                isThisWeek: true,
            }
        }):[];
        const upcomingEvents = (eventData.upcoming && eventData.upcoming.length>0) ? eventData.upcoming.map(value=>{
            return{
                event_id: value.id,
                imgSrc: process.env.REACT_APP_IMAGE_API_BASE + value.thumbnail,
                imgAlt: value.title,
                heading: value.title,
                text: value.content,
                metadata: {
                    d1: value.date,
                    d2: value.time + ' hrs',
                    d3: value.venue,
                },
                isThisWeek: false,
            }
        }): [];
        this.setState({
            upcomingEvents:[...thisWeekEvents,...upcomingEvents],
            pastEvents:pastEvents
        });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
    render() { 
        let eventData = this.state.upcomingEvents.length>0 ? this.state.upcomingEvents : this.state.pastEvents.length>0 ? this.state.pastEvents : [];
        return ( 
            <React.Fragment>
                <div className={styles.eventParentDiv}>
                    <div className={styles.eventInnerWrapper}>
                    <div className={styles.sectionHeading}>Upcoming Events</div>
                    {eventData.length > 0 ?(
                        eventData.map((event, index)=>{
                            if(index!==2){
                            return(
                            <>
                            <EventCard 
                                className={styles.eventCardCommon} 
                                key={index}
                                eventData={event} 
                                type={this.state.mobView ? 'sm' : this.state.tabView ? 'lg' : 'side'}
                            />
                            </>
                            )}
                            return null;
                        })
                    )
                    :null}
                    <Link to='/events'><Button className={styles.eventsButton} text='View More' type='outline'/></Link>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default EventSection;