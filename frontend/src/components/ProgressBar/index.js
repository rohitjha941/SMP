import React, { Component } from "react";
import styles from "./ProgressBar.module.scss";

class ProgessBar extends Component {
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
    document.getElementById("progress-bar").style.width = scrolled + "%";
  };
  render() {
    return (
      <>
        <div className={styles.progressParent + " " + this.props.className}>
          <div id="progress-bar" className={styles.progress}></div>
        </div>
      </>
    );
  }
}

export default ProgessBar;
