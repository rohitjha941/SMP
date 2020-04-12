import React, { Component } from 'react';
import styles from './MobileView.module.scss';
import Button from '../../components/Button';
import EventCard from '../../components/EventCard';

class MobileView extends Component {
    constructor(){
        super();
        this.state = {
            upcomingEvents : [],
            pastEvents : []
        }
    }
    componentDidMount(){
        var upcomingEvents = [];
        var pastEvents = [];
        this.props.eventData.map(event=>{
            if(event.isThisWeek){
                return upcomingEvents.unshift(event);
            }else if(event.isUpcoming){
                return upcomingEvents.push(event);
            }
            return pastEvents.push(event);
        })
        this.setState({pastEvents:pastEvents,upcomingEvents:upcomingEvents})
    }
    render() { 
        const upcomingEvents = this.state.upcomingEvents;
        const pastEvents = this.state.pastEvents;
        return ( 
            <React.Fragment>
                <div className={styles.heading}>We conduct <span className='color-red'>Events </span><span className={styles.dashedWord}>year-round</span></div>
                <div className={styles.MainWrapper}>
                <div>
                {upcomingEvents.length>0? 
                    <>
                    <div className={styles.categoryHeading}>Upcoming Events</div>
                    {upcomingEvents.map((event,index)=>{
                        return(
                            <>
                            <EventCard 
                                className={styles.eventCardCommon} 
                                eventData={event}
                                type={window.innerWidth <600 ? 'sm' : 'lg'}
                                key = {index}
                                headingTop = {false}
                            />
                            <hr className={styles.hr}/>
                            </>
                        )
                    })}
                    </>
                    : null}   
                </div>
                <div>
                    <div className={styles.categoryHeading}>SMP Events</div>
                    {pastEvents.length>0 ? 
                    <>
                    {pastEvents.map((event,index)=>{
                        return(
                            <>
                            <EventCard 
                                className={styles.eventCardCommon} 
                                eventData={event}
                                type={window.innerWidth <600 ? 'sm' : 'lg'}
                                key = {index}
                                headingTop = {false}
                            />
                            <hr className={styles.hr}/>
                            </>
                        )
                    })}
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