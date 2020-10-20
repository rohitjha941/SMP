import React, { Component } from "react";
import Heading from "./heading";
import Questions from "./questions";
import Contact from "./contact";
import redArm from "assets/images/red-arm.svg";
import blueArm from "assets/images/blue-arm.svg";
import styles from "./Queries.module.scss";

export default class Queries extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: "mentor",
    };
  }

  changeTab = (value) => {
    this.setState({ activeTab: value });
  };

  jump = (id) => {
    const el = document.getElementById(id);
    window.scrollTo(0, el.offsetTop);
  };
  componentDidMount() {
    this.props.fetch();
    const hash = window.location.hash;
    if (hash) {
      this.jump(hash.substring(1, hash.length));
    }
  }
  render() {
    return (
      <div className="queries">
        <Heading changeTab={this.changeTab} />
        {this.props.faqs ? (
          <Questions faqs={this.props.faqs} activeTab={this.state.activeTab} />
        ) : null}
        <img className={styles.redArm} src={redArm} alt="arm" />
        <img className={styles.blueArm} src={blueArm} alt="arm" />
        <Contact />
      </div>
    );
  }
}
