import React, { Component } from "react";
import styles from "./MentorProfile.module.scss";
import facebook from "assets/images/facebook.svg";
import linkedin from "assets/images/linkedin.svg";
import resume from "assets/images/resume.svg";

class MentorProfile extends Component {
  componentDidMount() {
    this.props.fetch(this.props.id);
  }
  render() {
    const mentor = this.props.getMentorById(this.props.id);
    const internData = this.props.mentorInterns(this.props.id);
    const placementData = this.props.mentorPlacements(this.props.id);
    const achievementData = this.props.mentorAchievements(this.props.id);
    const interns = internData.error
      ? []
      : internData.data.map((value) => {
          return value;
        });
    const placement = placementData.error
      ? {}
      : placementData.data.length > 0
      ? placementData.data[0]
      : {};
    const achievements = achievementData.error
      ? []
      : achievementData.data.map((value) => {
          return value;
        });
    let branch = "",
      interests = [],
      groups = [],
      facebookURL = "#",
      linkedinURL = "#",
      resumeURL = "#";
    if (!mentor.error) {
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
            interests.push(interest.interest_name);
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
            groups.push(group);
          }
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
        {!mentor.error ? (
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
            {resumeURL !== "#" || facebookURL !== "#" || linkedinURL !== "#" ? (
              <div className={styles.contactWrapper}>
                {resumeURL !== "#" ? (
                  <a
                    href={resumeURL}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <div className={styles.resume}>
                      <img src={resume} alt="resume" />
                      <div>Resume</div>
                    </div>
                  </a>
                ) : null}
                {facebookURL !== "#" ? (
                  <a
                    href={facebookURL}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <div className={styles.facebook}>
                      <img src={facebook} alt="facebook" />
                      <div>Facebook</div>
                    </div>
                  </a>
                ) : null}
                {linkedinURL !== "#" ? (
                  <a
                    href={linkedinURL}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <div className={styles.linkedin}>
                      <img src={linkedin} alt="linkedin" />
                      <div>LinkedIn</div>
                    </div>
                  </a>
                ) : null}
              </div>
            ) : null}

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
                          <div className={styles.groupNameParent}>
                            <div className={styles.groupName}>
                              {group.group_name}
                            </div>
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
              {achievements && achievements.length > 0 ? (
                <>
                  <div className={styles.achievementsTitle}>Achievements</div>
                  {achievements.map((value) => {
                    return (
                      <li key={value.id} className={styles.achievementsWrapper}>
                        {value.achievement_name}
                      </li>
                    );
                  })}
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
