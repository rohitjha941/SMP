import React from 'react';
import Text from './Text';
import styles from './EventCard.module.scss';
import ThisWeek from 'assets/images/ThisWeek.svg';

function WrappedComponent(props) {
    const event_id = props.eventData.event_id;
    const imageSource =  props.eventData.imgSrc;
    const isThisWeek = props.eventData.isThisWeek;
    const imageAlternativeText = (props.eventData.imgAlt) ? props.eventData.imgAlt : props.eventData.heading;
    const heading = props.heading === undefined ? props.eventData.heading : props.heading ? props.eventData.heading : null;
    const text = props.text === undefined ? props.eventData.text : props.text ? props.eventData.text : null;
    const metadata = props.metadata === undefined ? props.eventData.metadata : props.metadata ? props.eventData.metadata : null;
    const headingTop = props.headingTop ? true :  false;
    return (
        <React.Fragment>
            <div className={
                (props.type === 'sm' ? styles.containersm : null ||
                 props.type === 'lg' ? styles.containerlg : null ||
                 props.type === 'xl' ? styles.containerxl : null ||
                 props.type === 'side' ? styles.containerSide : null ||
                                       styles.containermd)
                +' '+props.className
            } > 
                { headingTop ? 
                    <h3 className={
                        props.type === 'xl' ? styles.headingxl : null ||
                        props.type === 'lg' ? styles.headinglg : null ||
                        props.type === 'sm' ? styles.headingsm : null ||
                                              styles.headingmd
                    }>
                    {heading ? heading : null}
                </h3>
                :
                null}
                {isThisWeek ? <img className={styles.thisWeek} src={ThisWeek} alt='This Week'/>:null}
                <img className={
                    props.type==='side' ? styles.sideViewImg : styles.eventImage} src={imageSource} alt={imageAlternativeText} />
                <Text heading={heading} text={text} metadata={metadata} event_id={event_id} headingTop={headingTop} type={props.type}/>
            </div>
        </React.Fragment>
    )
}

const EventCard = React.memo(WrappedComponent);
export default EventCard;