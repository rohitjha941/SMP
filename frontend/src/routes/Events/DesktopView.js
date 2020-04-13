import React, { Component } from 'react';
// import ComingSoon from '../../components/ComingSoon';
import styles from './DesktopView.module.scss';
import EventCard from '../../components/EventCard';

class DesktopView extends Component {
    constructor(){
        super();
        this.state ={
            break : window.innerWidth < 1470 ? true : false,
            upcomingEvents : [],
            pastEvents : []
        }
    }
    resize  = () => {
        let mobWidth =  window.innerWidth < 1470;
        this.setState({ break : mobWidth})
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
        const upcomingEvents = this.state.upcomingEvents ;
        const pastEvents = this.state.pastEvents;
        return ( 
            <>
               <div className={styles.mainHeading}>We Conduct <span className='color-red'>Events</span> year-round</div>
               <div className={styles.MainWrapper}>
               { upcomingEvents.length>0 ? 
               <div className={styles.container1}>
                    <div className={styles.sectionHeading}>Upcoming Events</div> 
                    <ul className={styles.ul1}>
                        {upcomingEvents.map((event,index)=>{
                            return(
                            <li key={index}>
                                <EventCard 
                                    eventData={event} 
                                    type='side'
                                />
                            </li>
                            );
                        })}
                    </ul>
               </div>
               :null}
               <div className={styles.container2}>
                   <div className={styles.sectionHeading}>SMP Events</div>
                    { pastEvents.length>0 ? 
                        <ul className={styles.ul2}>
                            {pastEvents.map((event,index) => {
                                return(
                                <li key={index}>
                                    <EventCard 
                                        className={styles.eventcardcommon} 
                                        eventData={event} 
                                        type={this.state.break ? 'md' : 'lg'}
                                    />
                                </li>)
                            })}
                        </ul>
                    :null
                    }   
               </div>
               </div>
            </>
         );
    }
}
 
export default DesktopView;