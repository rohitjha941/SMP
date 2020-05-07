import React, { Component } from "react";
import styles from "./MentorProfile.module.scss";
import facebook from "assets/images/facebook.svg";
import linkedin from "assets/images/linkedin.svg";
import resume from "assets/images/resume.svg";

class MentorProfile extends Component {
  render() {
    const data = this.props.data;
    const id = this.props.id;
    const mentor = data.find((mentor) => {
      return mentor.id === id;
    });
    var branch = "",
      interests = [],
      groups = [];
    if (mentor !== undefined) {
      console.log(mentor);
      branch =
        this.props.branches.length > 0
          ? this.props.branches.find((branch) => {
              return branch.id === mentor.branch;
            })
          : { branch_name: "" };

      if (
        mentor.interest &&
        mentor.interest.length > 0 &&
        this.props.interests.length > 0
      ) {
        mentor.interest.forEach((interest_ID) => {
          const interest = this.props.interests.find((interest) => {
            return interest.id === interest_ID;
          });
          if (interest) {
            return interests.push(interest.interest_name);
          }
        });
      }

      if (
        mentor.groups &&
        mentor.groups.length > 0 &&
        this.props.groups.length > 0
      ) {
        mentor.groups.forEach((group_ID) => {
          const group = this.props.interests.find((group) => {
            return group.id === group_ID;
          });
          if (group) {
            return groups.push(group);
          }
        });
      }
    }

    return (
      <>
        {mentor !== undefined ? (
          <div className={styles.mainWrapper}>
            <div className={styles.infoWrapper}>
              <div className={styles.imageWrapper}>
                <img
                  src={mentor.photo}
                  className={styles.mentorImage}
                  alt={mentor.name}
                />
              </div>
              <div className={styles.infoDetail}>
                <div className={styles.mentorName}>{mentor.name}</div>
                <div className={styles.mentorMeta}>
                  {branch.branch_name + " • " + mentor.year + " Year"}
                </div>
                <div className={styles.mentorInterest}>
                  {interests.map((interest, i) => {
                    return (i ? " • " : "") + interest;
                  })}
                </div>
              </div>
            </div>
            <div className={styles.contactWrapper}>
              <div className={styles.resume}>
                <img src={resume} alt="resume" />
                <div>Resume</div>
              </div>
              <div className={styles.facebook}>
                <img src={facebook} alt="facebook" />
                <div>Facebook</div>
              </div>
              <div className={styles.linkedin}>
                <img src={linkedin} alt="linkedin" />
                <div>LinkedIn</div>
              </div>
            </div>
            <hr />
            <div className={styles.bioWrapper}>
              <div className={styles.categoryHeading}>Campus Groups</div>
              <div className={styles.categoryHeading}>Internship</div>
              <div className={styles.categoryHeading}>Placement</div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default MentorProfile;
