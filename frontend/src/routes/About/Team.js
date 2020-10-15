import React, { Component } from "react";
import styles from "./About.module.scss";
import TeamCard from "../../components/TeamCard";
// import Button from "../../components/Button";
class Team extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  render() {
    const teamPosition = this.props.teamPosition;
    const member = this.props.team.map((value) => {
      return {
        name: value.name,
        image: value.photo,
        designation:
          teamPosition && teamPosition.length !== 0
            ? teamPosition.find((teamPosition) => {
                return teamPosition.id === value.position;
              }).position_name
            : "",
        fb: value.facebook,
        linkedin: value.linkeden,
        contact: value.mobile,
      };
    });
    return (
      <>
        <div className={styles.teamHeading}>
          Team <span className="color-red">SMP</span>
        </div>
        <div className={styles.teamCardContainer}>
          <ul>
            {member && member.length > 0
              ? member.map((member, i) => {
                  return (
                    <li key={i}>
                      <TeamCard key={i} member={member} />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        {/* <Button className={styles.viewMore} text="View More" type="outline" /> */}
      </>
    );
  }
}

export default Team;
