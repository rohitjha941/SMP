import React, { Component } from "react";
import styles from "./MentorIndex.module.scss";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import ImageText from "components/ImageText";
import becomeAMentor from "assets/images/become_a_mentor.jpeg";
import { getCurrentSession } from "utils";

class MentorIndex extends Component {
  render() {
    const docs = this.props.docs
      ? this.props.docs.map((value) => {
          return {
            name: value.name,
            doc: value.document,
          };
        })
      : null;
    return (
      <React.Fragment>
        <div className={styles.mainDiv}>
          <div className={styles.mainHeading}>
            Know Your <span className="color-red">Mentors</span>
          </div>
          <div className={styles.briefMentors}>
            SMP allows you to meet the mentors that will help you grow, and you
            can find mentors at SMP here and approach them. You can filter the
            mentors according to the field you are interested in or your branch.
          </div>
          <Link to="/mentors/show">
            <Button
              className={styles.viewMentorsButton}
              text={`View Mentors '${getCurrentSession()}`}
              type="outline"
            />
          </Link>

          <div className={styles.infoContainer}>
            <ImageText
              imgSrc={becomeAMentor}
              heading={"Become a mentor with SMP"}
              text={
                "Every year SMP recruits mentors from future 3rd/4th/5th year to guide the coming freshers @ IITR. We want our mentor to guide the first yearities and help them adjust to the R-land."
              }
            />
          </div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdTJvrf8RhphVktoT7iRhriEmepfHwod8zFiWUuM9FCcOpIhg/formResponse">
            <Button className={styles.applyBtn} type="outline" text="Apply" />
          </a>

          <div className={styles.resourceHeading}>Mentor Resources</div>
          <div className={styles.impLinks}>
            {docs
              ? docs.map((value, i) => {
                  return (
                    <>
                      <a
                        key={i}
                        className={styles.links}
                        href={value.doc}
                        target="_new"
                      >
                        {value.name}
                      </a>
                      <br />
                    </>
                  );
                })
              : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MentorIndex;
