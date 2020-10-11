import React from "react";
import styles from "./MentorCard.module.scss";
import arrow from "assets/images/down-arrow-2.svg";

function WrappedComponent(props) {
  const id = props.profile.id;
  const mentor = props.profile.image;
  const name = props.profile.name;
  const branch_name = props.profile.branch_name;
  const year = props.profile.year;
  const skills = props.profile.skills;
  return (
    <>
      <div className={styles.container + " " + props.className}>
        <ul>
          <li>
            <div className={styles.imageParent}>
              <img className={styles.image} src={mentor} alt="mentor" />
            </div>
          </li>
          <li className={styles.mentorDetails}>
            <img
              className={styles.arrow}
              src={arrow}
              alt="more"
              onClick={() => props.showMentorDetail(id)}
            />
            <p className={styles.name}>{name}</p>
            <p className={styles.meta}>
              {branch_name + " • " + year + " Year"}
            </p>
            <p className={styles.skills}>
              {skills.map((skill, i) => {
                return (i ? " • " : "") + skill;
              })}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default React.memo(WrappedComponent);
