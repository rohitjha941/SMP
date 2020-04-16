import React, { Component } from "react";
import HeaderBranding from "./HeaderBranding";
import HeaderRoutes from "./HeaderRoutes";
import Hamburger from "components/Hamburger";

import styles from "./Header.module.scss";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  hideMenu() {
    this.setState({
      showMenu: false,
    });
  }
  render() {
    return (
      <div className={styles.headerContainer}>
        <header>
          <div className={styles.headerItems}>
            <HeaderBranding
              hideMenu={() => {
                this.hideMenu();
              }}
            />
            <Hamburger
              showMenu={this.state.showMenu}
              toggleMenu={() => {
                this.toggleMenu();
              }}
            />
            <HeaderRoutes
              showMenu={this.state.showMenu}
              hideMenu={() => {
                this.hideMenu();
              }}
            />
          </div>
        </header>
      </div>
    );
  }
}
