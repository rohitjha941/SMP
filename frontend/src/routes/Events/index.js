import React, { Component } from 'react';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import styles from './Events.module.scss';

class Events extends Component {

    constructor(){
        super();
        this.state ={
            mobileView : window.innerWidth < 1000
        }
    }
    resize  = () => {
        let mobWidth =  window.innerWidth < 1000;
        this.setState({ mobileView : mobWidth})
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize);
        }
        componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

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
                <div className={styles.mainDiv}>
                    {
                    (window.innerWidth < 1000) ? 
                        <MobileView eventData={eventData}/>
                        :
                        <DesktopView eventData={eventData}/>
                    }
                </div>
            </React.Fragment>
         );
    }
}
 
export default Events;