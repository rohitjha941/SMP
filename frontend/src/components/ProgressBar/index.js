import React, { Component } from "react";
import styles from "./ProgressBar.module.scss";

class ProgessBar extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    this.setState({ progress: scrolled });
  };
  render() {
    const progressBarWidth = this.state.progress;
    return (
      <>
        <div className={styles.progressParent + " " + this.props.className}>
          <div
            className={styles.progress}
            style={{ width: progressBarWidth + "%" }}
          ></div>
        </div>
      </>
    );
  }
}

export default ProgessBar;
