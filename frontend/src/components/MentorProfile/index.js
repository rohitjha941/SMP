import React, { Component } from "react";
import styles from "./MentorProfile.module.scss";
import facebook from "assets/images/facebook.svg";
import linkedin from "assets/images/linkedin.svg";
import resume from "assets/images/resume.svg";
import facebookDisabled from "assets/images/facebook-disabled.svg";
import linkedinDisabled from "assets/images/linkedin-disabled.svg";
import resumeDisabled from "assets/images/resume-disabled.svg";

class MentorProfile extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  render() {
    const data = this.props.data;
    const id = this.props.id;
    const mentor = data.find((mentor) => {
      return mentor.id === id;
    });
    let branch = "",
      interests = [],
      groups = [],
      interns = [],
      placement = {},
      facebookURL = "#",
      linkedinURL = "#",
      resumeURL = "#";
    if (mentor !== undefined) {
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
          const group = this.props.groups.find((group) => {
            return group.id === group_ID;
          });
          if (group) {
            return groups.push(group);
          }
        });
      }
      if (
        mentor.mentor_intern &&
        mentor.mentor_intern.length > 0 &&
        this.props.mentorInterns.length > 0
      ) {
        mentor.mentor_intern.forEach((intern_ID) => {
          const intern = this.props.mentorInterns.find((intern) => {
            return intern.id === intern_ID;
          });
          if (intern) {
            return interns.push(intern);
          }
        });
      }
      if (
        mentor.mentor_placement &&
        mentor.mentor_placement.length > 0 &&
        this.props.mentorPlacements.length > 0
      ) {
        placement = this.props.mentorPlacements.find((placement) => {
          return placement.id === mentor.mentor_placement[0];
        });
      }
      facebookURL =
        mentor.facebook && mentor.facebook.length > 0 ? mentor.facebook : "#";
      linkedinURL =
        mentor.linkedin && mentor.linkedin.length > 0 ? mentor.linkedin : "#";
      resumeURL =
        mentor.resume && mentor.resume.length > 0 ? mentor.resume : "#";
    }
    return (
      <>
        {mentor !== undefined ? (
          <div className={styles.mainWrapper}>
            {/* Mentor Basic Info */}
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

            {/* Mentor Contact */}
            <div className={styles.contactWrapper}>
              <a
                href={resumeURL}
                target={resumeURL === "#" ? "_self" : "_blank"}
              >
                <div className={styles.resume}>
                  <img
                    src={resumeURL === "#" ? resumeDisabled : resume}
                    alt="resume"
                  />
                  <div>Resume</div>
                </div>
              </a>
              <a
                href={facebookURL}
                target={facebookURL === "#" ? "_self" : "_blank"}
              >
                <div className={styles.facebook}>
                  <img
                    src={facebookURL === "#" ? facebookDisabled : facebook}
                    alt="facebook"
                  />
                  <div>Facebook</div>
                </div>
              </a>
              <a
                href={linkedinURL}
                target={linkedinURL === "#" ? "_self" : "_blank"}
              >
                <div className={styles.linkedin}>
                  <img
                    src={linkedinURL === "#" ? linkedinDisabled : linkedin}
                    alt="linkedin"
                  />
                  <div>LinkedIn</div>
                </div>
              </a>
            </div>
            <hr />

            {/* Mentor Bio */}
            <div className={styles.bioWrapper}>
              {groups.length > 0 ? (
                <div>
                  <div className={styles.groupsTitle}>Campus Groups</div>
                  {groups.map((group) => {
                    return (
                      <div key={group.id}>
                        <div className={styles.groupWrapper}>
                          <div className={styles.groupIcon}>
                            <img src={group.thumbnail} alt={"group_icon"} />
                          </div>
                          <div className={styles.groupName}>
                            {group.group_name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {interns.length > 0 ? (
                <div>
                  <div className={styles.internsTitle}>Internship</div>
                  {interns.map((intern) => {
                    return (
                      <div key={intern.id}>
                        {"company" in intern ? (
                          <div className={styles.internWrapper}>
                            <div className={styles.internCompany}>
                              {intern.company}
                            </div>
                            <div className={styles.internMeta}>
                              {intern.domain + " • " + intern.duration}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {placement.company && placement.company.length > 0 ? (
                <>
                  <div className={styles.placementsTitle}>Placement</div>
                  <div className={styles.placementWrapper}>
                    <div className={styles.placementCompany}>
                      {placement.company}
                    </div>
                    <div className={styles.placementJobTitle}>
                      {placement.job_title}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default MentorProfile;
