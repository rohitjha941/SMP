import React, { Component } from "react";
import styles from "./About.module.scss";
import TeamCard from "../../components/TeamCard";
// import Button from "../../components/Button";
import { sortTeam } from "../../utils/index";

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
        year: value.year,
        designation:
          teamPosition && teamPosition.length !== 0
            ? teamPosition.find((teamPosition) => {
                return teamPosition.id === value.position;
              }).position_name
            : "",
        fb: value.facebook,
        linkedin: value.linkedin,
        contact: value.mobile,
      };
    });
    const sortedTeam = sortTeam(member);
    return (
      <>
        <div className={styles.teamHeading}>
          Team <span className="color-red">SMP</span>
        </div>
        <div className={styles.teamCardContainer}>
          <ul>
            {sortedTeam && sortedTeam.length > 0
              ? sortedTeam.map((member, i) => {
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
