import React from "react";
import styles from "./TeamCard.module.scss";
import fbsrc from "assets/images/fb.svg";
import callsrc from "assets/images/call.svg";
import linkedinsrc from "assets/images/linkedin.svg";
function WrappedComponent(props) {
  const fb = props.member.fb;
  const linkedin = props.member.linkedin;
  const contact = props.member.contact;
  const availability = [
    {
      name: "fb",
      isAvailable: fb !== undefined && fb !== null && fb !== "",
      link: fb,
      src: fbsrc,
    },
    {
      name: "linkedin",
      isAvailable:
        linkedin !== undefined && linkedin !== null && linkedin !== "",
      link: linkedin,
      src: linkedinsrc,
    },
    {
      name: "call",
      isAvailable: contact !== undefined && contact !== null && contact !== "",
      link: contact,
      src: callsrc,
    },
  ];
  let final = availability.filter((item) => {
    return item.isAvailable;
  });
  if (final.length > 2) final.pop();
  else if (final.length === 1) {
    if (final[0].name === "fb") final.push(availability[1]);
    else final.unshift(availability[0]);
  } else if (final.length === 0) {
    final.push(availability[0]);
    final.push(availability[1]);
  }
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
        {final.map((item, index) => {
          return (
            <span
              className={!item.isAvailable ? styles.disabled : null}
              key={index}
            >
              <a href={(item.name === "call" ? "tel:" : "") + item.link}>
                <div className={styles[item.name]}>
                  <img src={item.src} alt={item.name} />
                </div>
              </a>
            </span>
          );
        })}
      </div>
    </div>
  );
}
const TeamCard = React.memo(WrappedComponent);
export default TeamCard;
