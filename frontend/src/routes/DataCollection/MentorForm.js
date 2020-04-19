import React, { Component } from "react";
import Button from "../../components/Button";
import styles from "./MentorForm.module.scss";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import "bootstrap/dist/css/bootstrap.css";
import { createMentor } from "api/methods";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Redirect } from "react-router-dom";
const animatedComponents = makeAnimated();
const yearOptions = [
  {
    label: "3rd Year",
    value: "3rd",
  },
  {
    label: "4th Year",
    value: "4th",
  },
  {
    label: "5th Year",
    value: "5th",
  },
];
class MentorForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      year: "",
      enrollno: "",
      branch: "",
      interests: [],
      achievements: [],
      internships: [],
      email: "",
      mobile: "",
      image: null,
      resume: null,
      facebook: "",
      linkedin: "",
      career: "",
      groups: [],
      createdInterest: [],
      branchOptions: [],
      interestOptions: [],
      groupsOptions: [],
      isLoading: false,
      redirect: false,
    };
  }
  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleImage = (e) => {
    const image = e.target.files[0];
    this.setState({
      image: image,
    });
  };
  handleResume = (e) => {
    const resume = e.target.files[0];
    this.setState({
      resume: resume,
    });
  };
  handleChangeBranch = (option) => {
    const value = option.value;
    this.setState({
      branch: value,
    });
  };
  handleChangeYear = (option) => {
    const value = option.value;
    this.setState({
      year: value,
    });
  };
  handleChangeGroups = (option) => {
    const value = option.map((group) => {
      return group.value;
    });
    this.setState({
      groups: value,
    });
  };
  handleChangeInterests = (option) => {
    const value = option.map((interest) => {
      return interest.value;
    });
    this.setState({
      interest: value,
    });
  };

  handleAddAchievement = (e) => {
    e.preventDefault();
    this.setState({
      achievements: [...this.state.achievements, ""],
    });
  };
  handleChangeAchievement = (e, index) => {
    const achievements = this.state.achievements;
    achievements[index] = e.target.value;
    this.setState({ achievements: this.state.achievements });
  };
  handleRemoveAchievement = (e, index) => {
    e.preventDefault();
    this.state.achievements.splice(index, 1);
    this.setState({ achievements: this.state.achievements });
  };
  handleAddInternship = (e) => {
    e.preventDefault();
    this.setState({
      internships: [
        ...this.state.internships,
        { company: "", duration: "", domain: "" },
      ],
    });
  };
  handleChangeInternship = (e, index, field) => {
    const internships = this.state.internships;
    internships[index][field] = e.target.value;
    this.setState({ internships: this.state.internships });
  };
  handleRemoveInternship = (e, index) => {
    e.preventDefault();
    this.state.internships.splice(index, 1);
    this.setState({ internships: this.state.internships });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const {
      name,
      year,
      enrollno,
      branch,
      interest,
      email,
      mobile,
      image,
      resume,
      facebook,
      linkedin,
      groups,
      achievements,
      internships,
      career,
    } = this.state;

    const data = {
      name: name,
      year: year,
      enrollno: enrollno,
      branch: branch,
      interest: interest,
      email: email,
      mobile: mobile,
      image: image,
      resume: resume,
      facebook: facebook,
      linkedin: linkedin,
      groups: groups,
      achievements: achievements,
      internships: internships,
      career: career,
    };
    createMentor(data)
      .then((response) => {
        if (response.status === 201) {
          window.flash("Your response has been succesfully recorded");
          this.setState({
            name: "",
            year: "",
            enrollno: "",
            branch: "",
            interest: [],
            email: "",
            mobile: "",
            image: null,
            resume: null,
            facebook: "",
            linkedin: "",
            groups: [],
            achievements: [],
            internships: [],
            redirect: true,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        const errorData = error.data;
        let errorMessage = "";
        if (errorData.email) {
          errorMessage += "This Email is already in use.\n";
        }
        if (errorData.enrollno) {
          errorMessage += "This Enrollment No. is already in use.\n";
        }
        if (errorData.mobile) {
          errorMessage += "This Mobile No. is already in use.";
        }
        window.flash(errorMessage, "error");
        this.setState({
          isLoading: false,
        });
      });
  };
  componentDidMount() {
    let branchOptions = [],
      interestOptions = [],
      groupsOptions = [];
    branchOptions =
      this.props.branches && this.props.branches.length > 0
        ? this.props.branches.map((branch) => {
            const option = {
              value: branch.id,
              label: branch.branch_name,
            };
            return option;
          })
        : [];
    interestOptions =
      this.props.interests && this.props.interests.length > 0
        ? this.props.interests.map((interest) => {
            const option = {
              value: interest.id,
              label: interest.interest_name,
            };
            return option;
          })
        : [];
    groupsOptions =
      this.props.groups && this.props.groups.length > 0
        ? this.props.groups.map((group) => {
            const option = {
              value: group.id,
              label: group.group_name,
            };
            return option;
          })
        : [];
    this.setState({
      branchOptions: branchOptions,
      interestOptions: interestOptions,
      groupsOptions: groupsOptions,
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <>
        {this.state.isLoading ? <LoadingOverlay /> : null}
        <div className={styles.MainWrapper}>
          <h2 className={styles.heading}>
            Mentors' <span className="color-red">Data</span>
          </h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Name<span className="color-red">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                id="name"
                placeholder="Enter your Name"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="enrollno">
                Enrollment Number<span className="color-red">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                name="enrollno"
                value={this.state.enrollno}
                id="enrollno"
                minLength="8"
                maxLength="8"
                placeholder="Enter your Enrollment Number"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">
                Year<span className="color-red">*</span>
              </label>
              <Select
                id="year"
                onChange={this.handleChangeYear}
                options={yearOptions}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="branch">
                Branch<span className="color-red">*</span>
              </label>
              <Select
                id="branch"
                onChange={this.handleChangeBranch}
                options={this.state.branchOptions}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="groups">
                Campus Groups that you are/were a part of?
                <span className="color-red">*</span>
              </label>
              <Select
                id="groups"
                isMulti
                components={animatedComponents}
                onChange={this.handleChangeGroups}
                options={this.state.groupsOptions}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="career">
                Profile in which you are planning your career
                <span className="color-red">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="career"
                value={this.state.career}
                id="careeer"
                placeholder="Enter your Career Field"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="interests">
                Interests or Hobbies in which you invest significant time?
                <span className="color-red">*</span>
              </label>
              <CreatableSelect
                id="interests"
                options={this.state.interestOptions}
                closeMenuOnSelect={false}
                isMulti
                onChange={this.handleChangeInterests}
                components={animatedComponents}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">
                Mobile Number<span className="color-red">*</span>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">+91</div>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={this.state.mobile}
                  id="mobile"
                  minLength="10"
                  maxLength="10"
                  placeholder="Enter your Mobile Number"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email address <span className="color-red">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                id="email"
                name="email"
                placeholder="Enter your Email Address"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">
                Photograph<span className="color-red">*</span>
              </label>
              <input
                type="file"
                className="form-control-file"
                name="photo"
                aria-describedby="photo-help"
                id="photo"
                accept="image/*"
                required
                onChange={this.handleImage}
              />
              <small id="photo-help" className="form-text text-muted">
                Photograph should be in 1:1 Aspect Ratio
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="resume">
                Resume<span className="color-red">*</span>
              </label>
              <input
                type="file"
                className="form-control-file"
                name="resume"
                id="resume"
                required
                onChange={this.handleResume}
                accept="application/pdf"
              />
            </div>
            <div className="form-group">
              <label htmlFor="achievements">
                Your Achievements (Awards, Competitions, etc.):
              </label>
              {this.state.achievements.map((achievement, index) => {
                return (
                  <div key={index} id="achievements">
                    <input
                      type="text"
                      className="form-control"
                      value={achievement}
                      onChange={(e) => this.handleChangeAchievement(e, index)}
                    />
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) => this.handleRemoveAchievement(e, index)}
                    >
                      Remove
                    </button>
                    <br />
                  </div>
                );
              })}
              <hr />
              <button
                className="btn btn-sm btn-outline-success"
                onClick={(e) => this.handleAddAchievement(e)}
              >
                Add Achievement
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="interns">Internships</label>
              {this.state.internships.map((internship, index) => {
                return (
                  <div key={index} id="interns">
                    <div className="form-group row">
                      <label
                        htmlFor={"company" + index}
                        className="col-sm-2 col-form-label"
                      >
                        Name of Commpany:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          value={internship.company}
                          id={"company" + index}
                          onChange={(e) =>
                            this.handleChangeInternship(e, index, "company")
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor={"duration" + index}
                        className="col-sm-2 col-form-label"
                      >
                        Duration of Internship:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          value={internship.duration}
                          id={"duration" + index}
                          onChange={(e) =>
                            this.handleChangeInternship(e, index, "duration")
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor={"domain" + index}
                        className="col-sm-2 col-form-label"
                      >
                        Domain of Internship:
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          value={internship.domain}
                          id={"domain" + index}
                          onChange={(e) =>
                            this.handleChangeInternship(e, index, "domain")
                          }
                        />
                      </div>
                    </div>
                    <button
                      className="bbtn btn-sm btn-outline-danger"
                      onClick={(e) => this.handleRemoveInternship(e, index)}
                    >
                      Remove
                    </button>
                    <br />
                  </div>
                );
              })}
              <hr />
              <button
                className="btn btn-sm btn-outline-success"
                onClick={(e) => this.handleAddInternship(e)}
              >
                Add Internship
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="facebook">Facebook URL</label>
              <input
                type="url"
                className="form-control"
                value={this.state.facebook}
                id="facebook"
                name="facebook"
                placeholder="Enter your Facebook URL"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn URL</label>
              <input
                type="url"
                className="form-control"
                value={this.state.linkedin}
                id="linkedin"
                name="linkedin"
                placeholder="Enter your LinkedIn URL"
                onChange={this.handleChange}
              />
            </div>
            <Button
              type="submit"
              className={"btn btn-primary " + styles.button}
              text="Submit"
            />
          </form>
        </div>
      </>
    );
  }
}

export default MentorForm;
