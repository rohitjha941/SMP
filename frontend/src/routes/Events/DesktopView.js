import React, { Component } from "react";
// import ComingSoon from '../../components/ComingSoon';
import styles from "./DesktopView.module.scss";
import EventCard from "../../components/EventCard";

class DesktopView extends Component {
  constructor() {
    super();
    this.state = {
      break: window.innerWidth < 1470 ? true : false,
    };
  }
  resize = () => {
    let mobWidth = window.innerWidth < 1470;
    this.setState({ break: mobWidth });
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  render() {
    const eventData = this.props.events ? this.props.events : [];
    const pastEvents =
      eventData.past && eventData.past.length > 0
        ? eventData.past.map((value) => {
            return {
              event_id: value.id,
              imgSrc: process.env.REACT_APP_IMAGE_API_BASE + value.thumbnail,
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
              imgSrc: process.env.REACT_APP_IMAGE_API_BASE + value.thumbnail,
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
      <>
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeading}>
            We Conduct <span className="color-red">Events</span> year-round
          </div>
          <div className={styles.innerMainWrapper}>
            {upcomingEvents.length > 0 ? (
              <div className={styles.container1}>
                <div className={styles.sectionHeading}>Upcoming Events</div>
                <ul className={styles.ul1}>
                  {upcomingEvents.map((event, index) => {
                    return (
                      <li key={index}>
                        <EventCard eventData={event} type="side" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
            <div className={styles.container2}>
              <div className={styles.sectionHeading}>SMP Events</div>
              {pastEvents.length > 0 ? (
                <ul className={styles.ul2}>
                  {pastEvents.map((event, index) => {
                    return (
                      <li key={index}>
                        <EventCard
                          className={styles.eventcardcommon}
                          eventData={event}
                          type={this.state.break ? "md" : "lg"}
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DesktopView;
