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
    const pastEvents = this.props.pastEvents;
    const futureEvents = this.props.futureEvents;
    return (
      <>
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeading}>
            We Conduct <span className="color-red">Events</span> year-round
          </div>
          <div className={styles.innerMainWrapper}>
            {futureEvents.length > 0 ? (
              <div className={styles.container1}>
                <div className={styles.sectionHeading}>Upcoming Events</div>
                <ul className={styles.ul1}>
                  {futureEvents.map((event, index) => {
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
