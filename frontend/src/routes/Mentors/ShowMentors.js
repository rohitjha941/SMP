import React, { Component } from "react";
import SearchHeader from "../../components/SearchHeader";
import styles from "./ShowMentors.module.scss";
import MentorCard from "../../components/MentorCard";
import FilterMentors from "./FilterMentors";
import MentorProfile from "components/MentorProfile";

class MentorShow extends Component {
  constructor(props) {
    super(props);
    // TODO: Remove prop dependent data from state and calculate
    // only in render function.
    this.state = {
      filteryear: [],
      filterbranches: [],
      filterinterests: [],
      filterToggle: false,
      filterComponentData: null,
      mentorToggle: false,
      mentorId: null,
    };
  }
  componentDidMount() {
    this.props.fetch();
  }

  //CHANGES FILTER DATA WHEN TRIGGERED FROM FILTERMENTORS COMPONENT
  updateFilter = (value) => {
    const newBranches = value.branch;
    const newYear = value.year;
    const newInterests = value.skill;
    const allbranches = value.allbranches;
    const allinterests = value.allinterests;
    const allyears = value.allyears;
    const filterComponentData = {
      selectedBranch: newBranches,
      selectedYear: newYear,
      selectedSkill: newInterests,
      allyears: allyears,
      allinterests: allinterests,
      allbranches: allbranches,
    };
    this.setState({
      filteryear: newYear,
      filterbranches: newBranches,
      filterinterests: newInterests,
      filterComponentData: filterComponentData,
    });
  };

  // UPDATE BRANCHES ACCORDING TO FILTEREDMENTORS

  updateBranches = (mentors, allbranches) => {
    //create list of all available branches
    let availablebranches_ID = [];
    mentors.forEach((value) => {
      var isAvailable = false;
      //check if branch of mentor is already present in the available list
      availablebranches_ID.forEach((branch) => {
        if (branch === value.branch) {
          isAvailable = true;
        }
      });
      //if not present then add that branch into the list
      if (!isAvailable) {
        availablebranches_ID.push(value.branch);
      }
    });
    let availableBranches = [];
    allbranches.forEach((value) => {
      availablebranches_ID.forEach((branchID) => {
        if (branchID === value.id) {
          return availableBranches.push(value);
        }
      });
    });
    return availableBranches;
  };

  //FILTER MENTORS

  filterMentors = (allmentors) => {
    let { filteryear, filterbranches, filterinterests } = this.state;
    if (
      (!filteryear || filteryear.length === 0) &&
      (!filterbranches || filterbranches.length === 0) &&
      (!filterinterests || filterinterests.length === 0)
    ) {
      return allmentors;
    } else {
      let branchFiltered = [];
      filterbranches.length > 0
        ? filterbranches.map((filterbranch) => {
            return branchFiltered.push(
              ...allmentors.filter(({ branch }) => branch === filterbranch)
            );
          })
        : (branchFiltered = allmentors);
      let yearFiltered = [];
      filteryear.length > 0
        ? filteryear.map((filteryear) => {
            return yearFiltered.push(
              ...branchFiltered.filter(({ year }) => year === filteryear)
            );
          })
        : (yearFiltered = branchFiltered);
      let interestFiltered = [];

      //to compare interest
      let filterinterestsNum = [];
      //..

      filterinterests.forEach((value) => {
        return (filterinterestsNum[value] = 1);
      });
      filterinterests.length > 0
        ? yearFiltered.map((mentor) => {
            for (var i = 0; i < mentor.interests.length; i++) {
              if (filterinterestsNum[mentor.interests[i]]) {
                interestFiltered.push(mentor);
                break;
              }
            }
            return 0;
          })
        : (interestFiltered = yearFiltered);
      return interestFiltered;
    }
  };

  //HANDLE TOGGLE

  handleFilterToggle = () => {
    this.setState({ filterToggle: !this.state.filterToggle });
  };
  handleMentorToggle = () => {
    this.setState({ mentorToggle: !this.state.mentorToggle });
  };

  clearUl = (availableBranches) => {
    availableBranches.forEach((branch) => {
      const branchLi = document.getElementsByClassName(`branch${branch.id}-li`);
      let allClear = true;
      Object.keys(branchLi).forEach((id) => {
        if (branchLi[id].style.display === "") {
          allClear = false;
          return;
        }
      });
      let branchDiv = document.getElementById(`branch${branch.id}-div`);
      if (allClear) {
        branchDiv.style.display = "none";
      } else {
        branchDiv.style.display = "";
      }
    });
  };
  render() {
    const allmentors =
      this.props.mentors &&
      this.props.interests &&
      this.props.branches.length > 0
        ? this.props.mentors.map((value) => {
            let interests = [];
            value.interest.forEach((interestID) => {
              this.props.interests.forEach((interest) => {
                if (interest.id === interestID) {
                  return interests.push(interest.interest_name);
                }
              });
            });
            let branch_name = this.props.branches.find((element) => {
              return element.id === value.branch;
            });
            return {
              image: value.photo,
              name: value.name,
              branch: value.branch,
              branch_name: branch_name.branch_name,
              year: value.year,
              skills: interests,
              interests: value.interest,
            };
          })
        : [];
    const allinterests = this.props.interests
      ? this.props.interests.map((value) => {
          return {
            id: value.id,
            name: value.interest_name,
            selected: false,
          };
        })
      : [];
    const allbranches = this.props.branches
      ? this.props.branches.map((value) => {
          return {
            id: value.id,
            name: value.branch_name,
            selected: false,
          };
        })
      : [];
    const allyears = [
      { name: "3rd", selected: false },
      { name: "4th", selected: false },
      { name: "5th", selected: false },
    ];
    let filterComponentData = this.state.filterComponentData
      ? this.state.filterComponentData
      : {
          allbranches: allbranches,
          allyears: allyears,
          allinterests: allinterests,
          selectedSkill: [],
          selectedBranch: [],
          selectedYear: [],
        };
    const filteredMentors =
      allmentors.length > 0 ? this.filterMentors(allmentors) : [];
    const availableBranches =
      filteredMentors.length > 0 && this.props.branches.length > 0
        ? this.updateBranches(filteredMentors, this.props.branches)
        : [];
    return (
      <>
        {this.state.filterToggle ? (
          <FilterMentors
            filterData={filterComponentData}
            updateFilter={this.updateFilter}
            handleFilterToggle={this.handleFilterToggle}
          />
        ) : (
          <>
            <div className={styles.container}>
              <SearchHeader
                handleFilterToggle={this.handleFilterToggle}
                clearUl={this.clearUl}
                availableBranches={availableBranches}
              />
              {this.state.mentorToggle && this.state.mentorId ? (
                <MentorProfile
                  id={this.state.mentorId}
                  data={this.props.mentors}
                  branches={this.props.branches}
                  interests={this.props.interests}
                  groups={this.props.groups}
                />
              ) : (
                availableBranches.map((value, index) => {
                  return (
                    <>
                      <div id={`branch${value.id}-div`} key={index}>
                        <div className={styles.department}>
                          {value.branch_name}
                        </div>
                        <ul className="mentors">
                          {filteredMentors.map((mentor, i) => {
                            if (mentor.branch === value.id) {
                              return (
                                <>
                                  <li
                                    className={`mentor-li branch${mentor.branch}-li`}
                                  >
                                    <MentorCard
                                      className={styles.mentorCard}
                                      profile={mentor}
                                      key={i}
                                    />
                                  </li>
                                </>
                              );
                            }
                            return null;
                          })}
                        </ul>
                        <hr />
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default MentorShow;
