import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
import Button from "../../components/Button";

import styles from "./EventSection.module.scss";

class EventSection extends Component {
  constructor() {
    super();
    this.state = {
      mobView: window.innerWidth < 600,
      tabView: window.innerWidth < 1000,
    };
  }
  resize = () => {
    let tabWidth = window.innerWidth < 1000;
    this.setState({ tabView: tabWidth });
    let mobWidth = window.innerWidth < 600;
    this.setState({ mobView: mobWidth });
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  render() {
    const events = this.props.events ? this.props.events : [];
    const pastEvents =
      events.past && events.past.length > 0
        ? events.past.map((value) => {
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
    const thisWeekEvents =
      events.this_week && events.this_week.length > 0
        ? events.this_week.map((value) => {
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
              isThisWeek: true,
            };
          })
        : [];
    const upcomingEvents =
      events.upcoming && events.upcoming.length > 0
        ? events.upcoming.map((value) => {
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
    const futureEvents = [...thisWeekEvents, ...upcomingEvents];
    const eventData =
      futureEvents.length > 0
        ? futureEvents
        : pastEvents.length > 0
        ? pastEvents
        : [];
    return (
      <React.Fragment>
        <div className={styles.eventParentDiv}>
          <div className={styles.eventWrapper}>
            <div className={styles.sectionHeading}>
              {upcomingEvents.length > 0 ? "Upcoming Events" : "SMP Events"}
            </div>
            {eventData.length > 0
              ? eventData.map((event, index) => {
                  if (index < 2) {
                    return (
                      <EventCard
                        className={styles.eventCardCommon}
                        eventData={event}
                        key={index}
                        type={
                          this.state.mobView
                            ? "sm"
                            : this.state.tabView
                            ? "lg"
                            : "side"
                        }
                      />
                    );
                  }
                  return null;
                })
              : null}
            <Link to="/events">
              <Button
                className={styles.eventsButton}
                text="View More"
                type="outline"
              />
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventSection;
