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
        const eventData = this.props.eventData; 
        return ( 
            <>
               <div className={styles.mainHeading}>We Conduct <span className='color-red'>Events</span> year-round</div>
               <div className={styles.conatiner1}>
                    <div className={styles.sectionHeading}>Upcoming Events</div>
                    <ul className={styles.ul1}>
                        <li><EventCard eventData={eventData} type='side'/></li>
                        <li><EventCard eventData={eventData} type='side'/></li>
                    </ul>
               </div>
               <div className={styles.container2}>
                   <div className={styles.sectionHeading}>SMP Events</div>
                    <ul className={styles.ul2}>
                        <li><EventCard className={styles.eventcardcommon} eventData={eventData} type={this.state.break ? 'md' : 'lg'}/></li>
                        <li><EventCard className={styles.eventcardcommon} eventData={eventData} type={this.state.break ? 'md' : 'lg'}/></li>
                        <li><EventCard className={styles.eventcardcommon} eventData={eventData} type={this.state.break ? 'md' : 'lg'}/></li>
                        <li><EventCard className={styles.eventcardcommon} eventData={eventData} type={this.state.break ? 'md' : 'lg'}/></li>
                    </ul>
               </div>
            </>
         );
    }
}
 
export default DesktopView;