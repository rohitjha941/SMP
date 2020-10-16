import React from "react";
import styles from "./TeamCard.module.scss";
import fb from "assets/images/fb.svg";
import call from "assets/images/call.svg";
import linkedin from "assets/images/linkedin.svg";
function WrappedComponent(props) {
  console.log(props.name);
  return (
    <div className={styles.container}>
      <div className={styles.imageparent}>
        <img
          className={styles.image}
          id="profile"
          src={props.member.image}
          alt={props.name}
        />
      </div>
      <div className={styles.name}>{props.member.name}</div>
      <div className={styles.designation}>{props.member.designation}</div>
      <div className={styles.contact}>
        <a href={props.member.fb}>
          <div className={styles.fb}>
            <img className={styles.commonIcon} src={fb} alt={"facebook"} />
          </div>
        </a>
        {props.member.linkedin !== undefined &&
        props.member.linkedin !== null &&
        props.member.linkedin !== "" ? (
          <a href={props.member.linkedin}>
            <div className={styles.fb}>
              <img
                className={styles.commonIcon + " " + styles.linkedin}
                src={linkedin}
                alt={"linkedin"}
              />
            </div>
          </a>
        ) : (
          <a href={"tel:" + props.member.contact}>
            <div className={styles.call}>
              <img className={styles.commonIcon} src={call} alt={"phone"} />
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
const TeamCard = React.memo(WrappedComponent);
export default TeamCard;
