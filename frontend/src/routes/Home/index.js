import React, { Component } from "react";
import EventSection from "./EventSection";
import BlogSection from "./BlogSection";
import navDown from "assets/images/nav-down-arrow.svg";
import styles from "./Home.module.scss";
import people_plant_light from "assets/images/people_plant_light.svg";
// import Title from 'components/Title';
import TextView from "components/TextView";
import Button from "components//Button";
import { Link } from "react-router-dom";

export default class Home extends Component {
  scrollTo(delay = 0) {
    window.setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, delay);
  }
  componentWillMount() {
    this.props.fetch();
  }
  render() {
    const description =
      "Student Mentorship Program is one of the largest on-campus student body initiative which assigns a mentor(a pre-final or final year student) to all the freshmen within the same branch. It ensures bridging the communication gap between senior and first-year students by providing a dynamic environment for healthy discussion, guidance and one to one counseling.";
    return (
      <div className={styles.homeContainer}>
        <div className={styles.InfoSection}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <p>Fostering Senior</p>
              <p>Junior Relationship</p>
            </div>
          </div>
          <div className={styles.illustration}>
            <img src={people_plant_light} alt="People plant light"></img>
          </div>
          <div className={styles.description}>
            <TextView text={description} />
          </div>
          <Link to="/about">
            <Button
              className={styles.learnMore}
              text="Learn More"
              type="outline"
            />
          </Link>
          <Link to="/about">
            <div className={styles.learnMoreText}>Learn More ></div>
          </Link>
          <div onClick={this.scrollTo} className={styles.navDown}>
            <img src={navDown} className={styles.navDown} alt="down-arrow" />
          </div>
        </div>
        <EventSection
          className={styles.EventSection}
          events={this.props.events}
        />
        <BlogSection className={styles.BlogSection} blogs={this.props.blogs} />
      </div>
    );
  }
}
