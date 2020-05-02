import React, { Component } from "react";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import styles from "./Events.module.scss";

class Events extends Component {
  constructor() {
    super();
    this.state = {
      mobileView: window.innerWidth < 1000,
    };
  }
  resize = () => {
    let mobWidth = window.innerWidth < 1000;
    this.setState({ mobileView: mobWidth });
  };
  componentDidMount() {
    this.props.fetch();
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    const pastEvents =
      this.props.events.past && this.props.events.past.length > 0
        ? this.props.events.past.map((value) => {
            return {
              event_id: value.id,
              imgSrc: value.thumbnail,
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
      this.props.events.this_week && this.props.events.this_week.length > 0
        ? this.props.events.this_week.map((value) => {
            return {
              event_id: value.id,
              imgSrc: value.thumbnail,
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
      this.props.events.upcoming && this.props.events.upcoming.length > 0
        ? this.props.events.upcoming.map((value) => {
            return {
              event_id: value.id,
              imgSrc: value.thumbnail,
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
    return (
      <React.Fragment>
        <div className={styles.mainDiv}>
          {window.innerWidth < 1000 ? (
            <MobileView pastEvents={pastEvents} futureEvents={futureEvents} />
          ) : (
            <DesktopView pastEvents={pastEvents} futureEvents={futureEvents} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Events;
