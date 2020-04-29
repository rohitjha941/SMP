import React, { Component } from "react";
import styles from "./MobileView.module.scss";
// import Button from "../../components/Button";
import EventCard from "../../components/EventCard";

class MobileView extends Component {
  render() {
    const pastEvents = this.props.pastEvents;
    const futureEvents = this.props.futureEvents;
    return (
      <React.Fragment>
        <div className={styles.heading}>
          We conduct <span className="color-red">Events </span>
          <span className={styles.dashedWord}>year-round</span>
        </div>
        <div className={styles.MainWrapper}>
          <div>
            {futureEvents.length > 0 ? (
              <>
                <div className={styles.categoryHeading}>Upcoming Events</div>
                {futureEvents.map((event, index) => {
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
