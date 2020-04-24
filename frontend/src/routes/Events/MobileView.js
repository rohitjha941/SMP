import React, { Component } from "react";
import styles from "./MobileView.module.scss";
// import Button from "../../components/Button";
import EventCard from "../../components/EventCard";

class MobileView extends Component {
  render() {
    const eventData = this.props.events ? this.props.events : [];
    const pastEvents =
      eventData.past && eventData.past.length > 0
        ? eventData.past.map((value) => {
            return {
              event_id: value.id,
              imgSrc: process.env.REACT_APP_MEDIA_API_BASE + value.thumbnail,
              imgAlt: value.title,
              heading: value.title,
              text: value.content,
              metadata: {
                d1: value.date,
                d2: value.time + " hrs",
                d3: value.venue,
              },
              isThisWeek: false,
            };
          })
        : [];
    const upcomingEvents =
      eventData.upcoming && eventData.upcoming.length > 0
        ? eventData.upcoming.map((value) => {
            return {
              event_id: value.id,
              imgSrc: process.env.REACT_APP_MEDIA_API_BASE + value.thumbnail,
              imgAlt: value.title,
              heading: value.title,
              text: value.content,
              metadata: {
                d1: value.date,
                d2: value.time + " hrs",
                d3: value.venue,
              },
              isThisWeek: false,
            };
          })
        : [];
    return (
      <React.Fragment>
        <div className={styles.heading}>
          We conduct <span className="color-red">Events </span>
          <span className={styles.dashedWord}>year-round</span>
        </div>
        <div className={styles.MainWrapper}>
          <div>
            {upcomingEvents.length > 0 ? (
              <>
                <div className={styles.categoryHeading}>Upcoming Events</div>
                {upcomingEvents.map((event, index) => {
                  return (
                    <>
                      <EventCard
                        className={styles.eventCardCommon}
                        eventData={event}
                        type={window.innerWidth < 600 ? "sm" : "lg"}
                        key={index}
                        headingTop={false}
                      />
                      <hr className={styles.hr} />
                    </>
                  );
                })}
              </>
            ) : null}
          </div>
          <div>
            <div className={styles.categoryHeading}>SMP Events</div>
            {pastEvents.length > 0 ? (
              <>
                {pastEvents.map((event, index) => {
                  return (
                    <>
                      <EventCard
                        className={styles.eventCardCommon}
                        eventData={event}
                        type={window.innerWidth < 600 ? "sm" : "lg"}
                        key={index}
                        headingTop={false}
                      />
                      <hr className={styles.hr} />
                    </>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
        {/* <Button type="outline" text="View More" /> */}
      </React.Fragment>
    );
  }
}

export default MobileView;
