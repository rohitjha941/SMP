import React, { Component } from "react";
import styles from "./FilterMentors.module.scss";
import Button from "../../components/Button";
import FilterHeader from "../../components/FilterHeader";

class FilterMentors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allinterests: [],
      allbranches: [],
      allyears: [],
      selectedBranch: [],
      selectedYear: [],
      selectedSkill: [],
      prevSelected: {},
    };
  }

  componentDidMount() {
    const syear = this.props.filterData.selectedYear;
    const sbranch = this.props.filterData.selectedBranch;
    const sskill = this.props.filterData.selectedSkill;
    const ayears = this.props.filterData.allyears;
    const ainterests = this.props.filterData.allinterests;
    const abranches = this.props.filterData.allbranches;
    const prevSelected = {
      syear: syear,
      sbranch: sbranch,
      sskill: sskill,
      ayears: ayears,
      ainterests: ainterests,
      abranches: abranches,
    };
    this.setState({
      allinterests: ainterests,
      allbranches: abranches,
      allyears: ayears,
      selectedBranch: sbranch,
      selectedYear: syear,
      selectedSkill: sskill,
      prevSelected: prevSelected,
    });
  }

  handleYear = (value) => {
    const selectedYear = this.state.selectedYear;
    const allyears = this.state.allyears;
    const flag = selectedYear.find((el) => el === value);
    const index = allyears.findIndex((el) => el.name === value);
    var { selected, ...obj } = allyears[index];
    if (flag) {
      obj.selected = false;
      this.setState({
        selectedYear: this.state.selectedYear.filter((item) => item !== value),
        allyears: this.state.allyears.map((item) =>
          item.name === value ? obj : item
        ),
      });
    } else {
      obj.selected = true;
      this.setState({
        selectedYear: [...this.state.selectedYear, value],
        allyears: this.state.allyears.map((item) =>
          item.name === value ? obj : item
        ),
      });
    }
  };

  handleBranch = (value) => {
    const selectedBranch = this.state.selectedBranch;
    const allbranches = this.state.allbranches;
    const flag = selectedBranch.find((el) => el === value);
    const index = allbranches.findIndex((el) => el.id === value);
    var { selected, ...obj } = allbranches[index];
    if (flag) {
      obj.selected = false;
      this.setState({
        selectedBranch: this.state.selectedBranch.filter(
          (item) => item !== value
        ),
        allbranches: this.state.allbranches.map((item) =>
          item.id === value ? obj : item
        ),
      });
    } else {
      obj.selected = true;
      this.setState({
        selectedBranch: [...this.state.selectedBranch, value],
        allbranches: this.state.allbranches.map((item) =>
          item.id === value ? obj : item
        ),
      });
    }
  };

  handleSkill = (value) => {
    const selectedSkill = this.state.selectedSkill;
    const allinterests = this.state.allinterests;
    const flag = selectedSkill.find((el) => el === value);
    const index = allinterests.findIndex((el) => el.id === value);
    var { selected, ...obj } = allinterests[index];
    if (flag) {
      obj.selected = false;
      this.setState({
        selectedSkill: this.state.selectedSkill.filter(
          (item) => item !== value
        ),
        allinterests: this.state.allinterests.map((item) =>
          item.id === value ? obj : item
        ),
      });
    } else {
      obj.selected = true;
      this.setState({
        selectedSkill: [...this.state.selectedSkill, value],
        allinterests: this.state.allinterests.map((item) =>
          item.id === value ? obj : item
        ),
      });
    }
  };

  onClear = () => {
    const allyears = this.state.allyears.map((value) => {
      value.selected = false;
      return value;
    });
    const allbranches = this.state.allbranches.map((value) => {
      value.selected = false;
      return value;
    });
    const allinterests = this.state.allinterests.map((value) => {
      value.selected = false;
      return value;
    });
    this.setState({
      selectedBranch: [],
      selectedYear: [],
      selectedSkill: [],
      allbranches: allbranches,
      allinterests: allinterests,
      allyears: allyears,
    });
    var filterData = {
      branch: [],
      year: [],
      skill: [],
      allbranches: allbranches,
      allyears: allyears,
      allinterests: allinterests,
    };
    this.props.updateFilter(filterData);
  };

  onApply = (e) => {
    e.preventDefault();
    const branch = this.state.selectedBranch;
    const year = this.state.selectedYear;
    const skill = this.state.selectedSkill;
    var filterData = {
      branch: branch,
      year: year,
      skill: skill,
      allbranches: this.state.allbranches,
      allyears: this.state.allyears,
      allinterests: this.state.allinterests,
    };

    this.props.updateFilter(filterData);
    this.props.handleFilterToggle();
  };
  handleClose = () => {
    var selectedBranch,
      selectedYear,
      selectedSkill,
      allbranches,
      allyears,
      allinterests;
    const { prevSelected } = this.state;
    selectedBranch = prevSelected.sbranch;
    selectedYear = prevSelected.syear;
    selectedSkill = prevSelected.sskill;
    allinterests = prevSelected.ainterests;
    allyears = prevSelected.ayears;
    allbranches = prevSelected.abranches;
    this.setState(
      {
        selectedBranch: selectedBranch,
        selectedSkill: selectedSkill,
        selectedYear: selectedYear,
        allinterests: allinterests,
        allbranches: allbranches,
        allyears: allyears,
      },
      () => {
        this.props.handleFilterToggle();
      }
    );
  };
  render() {
    return (
      <>
        <div className={styles.container}>
          <FilterHeader handleClose={this.handleClose} />
          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              Select Branch
              <span className={styles.counter}>
                {this.state.selectedBranch.length
                  ? " (" + this.state.selectedBranch.length + ")"
                  : null}
              </span>
            </div>
            {this.state.allbranches.map((value, i) => {
              return (
                <Button
                  key={i}
                  onClick={() => this.handleBranch(value.id)}
                  text={value.name}
                  type={value.selected ? "outline" : "disabled"}
                  className={styles.button}
                />
              );
            })}
          </div>
          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              Year of Study
              <span className={styles.counter}>
                {this.state.selectedYear.length
                  ? " (" + this.state.selectedYear.length + ")"
                  : null}
              </span>
            </div>
            {this.state.allyears.map((value, i) => {
              return (
                <Button
                  key={i}
                  className={styles.button}
                  text={value.name + " Year"}
                  type={value.selected ? "outline" : "disabled"}
                  onClick={() => this.handleYear(value.name)}
                />
              );
            })}
          </div>
          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              Areas of Interest
              <span className={styles.counter}>
                {this.state.selectedSkill.length
                  ? " (" + this.state.selectedSkill.length + ")"
                  : null}
              </span>
            </div>
            {this.state.allinterests.map((value, i) => {
              return (
                <Button
                  key={i}
                  className={styles.button}
                  text={value.name}
                  type={value.selected ? "outline" : "disabled"}
                  onClick={() => this.handleSkill(value.id)}
                />
              );
            })}
          </div>
          <hr />
          <ul className={styles.apply}>
            <li className={styles.applyButton}>
              <Button text="Apply Filters" size="lg" onClick={this.onApply} />
            </li>
            <li className={styles.clearButton}>
              <Button text="Clear All" type="outline" onClick={this.onClear} />
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default FilterMentors;
