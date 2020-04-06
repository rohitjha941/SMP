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
        this.setState({upcomingEvents:upcomingEvents,pastEvents:pastEvents});
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
            </>
         );
    }
}
 
export default DesktopView;