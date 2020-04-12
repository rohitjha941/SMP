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
        let upcomingEvents = [];
        let pastEvents = [];
        eventData.forEach(event=>{
            if(event.isThisWeek){
                upcomingEvents.unshift(event);
            }else if(event.isUpcoming){
                upcomingEvents.push(event);
            }
            else{
                pastEvents.push(event);
            }
        })
        this.setState({
            upcomingEvents:upcomingEvents,
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