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
    return (
      <React.Fragment>
        <div className={styles.mainDiv}>
          {window.innerWidth < 1000 ? (
            <MobileView events={this.props.events} />
          ) : (
            <DesktopView events={this.props.events} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Events;
