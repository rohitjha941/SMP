import React, { Component } from "react";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      mobileView: window.innerWidth < 600,
    };
  }
  resize = () => {
    let mobWidth = window.innerWidth < 600;
    this.setState({ mobileView: mobWidth });
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  render() {
    return <>{this.state.mobileView ? <MobileView /> : <DesktopView />}</>;
  }
}

export default Footer;
