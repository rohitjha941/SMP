import React, { Component } from "react";
import styles from "./ComingSoon.module.scss";
import ComingSoonImg from "assets/images/comingSoon.svg";

class ComingSoon extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className={styles.mainDiv}>
          <img
            className={styles.mainImage}
            src={ComingSoonImg}
            alt="Coming Soon"
          />
          <div className={styles.text}>
            Stay Tuned <br /> Page is Under Construction
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ComingSoon;
