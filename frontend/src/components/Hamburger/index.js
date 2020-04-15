import React, { Component } from "react";

import styles from "./Hamburger.module.scss";

export default class Hamburger extends Component {
  render() {
    const hamburgerStyle = `${styles.hamburger} ${
      this.props.showMenu ? styles.cross : ""
    }`;
    return (
      <div className={hamburgerStyle} onClick={this.props.toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
