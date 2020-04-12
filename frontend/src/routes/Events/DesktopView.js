import React, { Component } from 'react';
// import ComingSoon from '../../components/ComingSoon';
import styles from './DesktopView.module.scss';
import EventCard from '../../components/EventCard';

class DesktopView extends Component {
    constructor(){
        super();
        this.state ={
            break : window.innerWidth < 1470 ? true : false,
        }
    }
    resize  = () => {
        let mobWidth =  window.innerWidth < 1470;
        this.setState({ break : mobWidth})
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize);
        }
        componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
    render() {
        const eventData = this.props.eventData ? this.props.eventData : null; 
        return ( 
            <>
            <div className={styles.mainWrapper}>
               <div className={styles.mainHeading}>We Conduct <span className='color-red'>Events</span> year-round</div>
               <div className={styles.innerMainWrapper}>
               <div className={styles.container1}>
                    <div className={styles.sectionHeading}>Upcoming Events</div>
                    { eventData ? 
                    <ul className={styles.ul1}>
                        <li><EventCard eventData={eventData[0]} type='side'/></li>
                        <li><EventCard eventData={eventData[1]} type='side'/></li>
                    </ul>
                    :null}
               </div>
               <div className={styles.container2}>
                   <div className={styles.sectionHeading}>SMP Events</div>
                    { eventData ? 
                        <ul className={styles.ul2}>
                        <li><EventCard className={styles.eventcardcommon} eventData={eventData[0]} type={this.state.break ? 'md' : 'lg'}/></li>
                        <li><EventCard className={styles.eventcardcommon} eventData={eventData[1]} type={this.state.break ? 'md' : 'lg'}/></li>
                        <li><EventCard className={styles.eventcardcommon} eventData={eventData[1]} type={this.state.break ? 'md' : 'lg'}/></li>
                        <li><EventCard className={styles.eventcardcommon} eventData={eventData[0]} type={this.state.break ? 'md' : 'lg'}/></li>
                    </ul>
                    :null
                    }   
               </div>
               </div>
            </div>
            </>
         );
    }
}
 
export default DesktopView;