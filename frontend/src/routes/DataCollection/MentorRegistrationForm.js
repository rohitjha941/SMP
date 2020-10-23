import React, { Component } from "react";
import Button from "../../components/Button";
import styles from "./MentorRegistrationForm.module.scss";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { createMentor } from "api/methods";
import LoadingOverlay from "components/LoadingOverlay";
import { Redirect } from "react-router-dom";
import ImageCropper from "components/ImageCropper";
import { yearOptions } from "utils/constants";
const animatedComponents = makeAnimated();
class MentorRegistrationForm extends Component {
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
      placement: {
        company: "",
        job_title: "",
      },
      email: "",
      mobile: "",
      image: null,
      resume: null,
      facebook: "",
      linkedin: "",
      career: "",
      groups: [],
      createdInterest: [],
      isLoading: false,
      redirect: false,
      src: null,
      croppedSrc: null,
      cropperToggle: false,
    };
  }
  componentDidMount() {
    this.props.fetch();
  }
  setCroppedSrc = (croppedImageURL) => {
    this.setState({ croppedSrc: croppedImageURL });
  };
  toggleCropper = () => {
    this.setState({ cropperToggle: !this.state.cropperToggle });
  };
  checkKey = (e) => {
    const downArrow = 40;
    const upArrow = 38;
    if (e.which === upArrow || e.which === downArrow) {
      e.preventDefault();
    }
  };
  handleCropBtn = () => {
    this.toggleCropper();
  };
  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result, cropperToggle: true })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  setImage = (image) => {
    this.setState({ image: image });
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
    const value = option
      ? option.map((interest) => {
          return interest.value;
        })
      : [];
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
  handleChangePlacement = (e, field) => {
    const placement = this.state.placement;
    placement[field] = e.target.value;
    this.setState({ placement: placement });
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
      placement,
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
      placement: placement,
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
            placement: { company: "", job_title: "" },
            redirect: true,
            isLoading: false,
            career: "",
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
  render() {
    const branchOptions =
      this.props.branches && this.props.branches.length > 0
        ? this.props.branches.map((branch) => {
            const option = {
              value: branch.id,
              label: branch.branch_name,
            };
            return option;
          })
        : [];
    const interestOptions =
      this.props.interests && this.props.interests.length > 0
        ? this.props.interests.map((interest) => {
            const option = {
              value: interest.id,
              label: interest.interest_name,
            };
            return option;
          })
        : [];
    const groupsOptions =
      this.props.groups && this.props.groups.length > 0
        ? this.props.groups.map((group) => {
            const option = {
              value: group.id,
              label: group.group_name,
            };
            return option;
          })
        : [];
    if (this.state.redirect) {
      return <Redirect to="/mentors/show" />;
    }
    return (
      <>
        {this.state.isLoading ? <LoadingOverlay /> : null}
        <div className={styles.MainWrapper}>
          <h2 className={styles.heading}>
            Mentors' <span className="color-red">Data</span>
          </h2>
          <form onSubmit={this.handleSubmit}>
            <div className={styles["form-group"]}>
              <label htmlFor="name">
                Name<span className="color-red">*</span>
              </label>
              <input
                type="text"
                className={styles["form-control"]}
                name="name"
                value={this.state.name}
                id="name"
                placeholder="Enter your Name"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="enrollno">
                Enrollment Number<span className="color-red">*</span>
              </label>
              <input
                type="number"
                className={styles["form-control"]}
                name="enrollno"
                value={this.state.enrollno}
                id="enrollno"
                minLength="8"
                maxLength="8"
                placeholder="Enter your Enrollment Number"
                onChange={this.handleChange}
                onKeyDown={this.checkKey}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            <div className={styles["form-group"]}>
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
            <div className={styles["form-group"]}>
              <label htmlFor="branch">
                Branch<span className="color-red">*</span>
              </label>
              <Select
                id="branch"
                onChange={this.handleChangeBranch}
                options={branchOptions}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="groups">
                Campus Groups that you are/were a part of?
                <span className="color-red">*</span>
              </label>
              <Select
                id="groups"
                isMulti
                components={animatedComponents}
                onChange={this.handleChangeGroups}
                options={groupsOptions}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="career">
                Profile in which you are planning your career
                <span className="color-red">*</span>
              </label>
              <input
                type="text"
                className={styles["form-control"]}
                name="career"
                value={this.state.career}
                id="careeer"
                placeholder="Enter your Career Field"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="interests">
                Interests or Hobbies in which you invest significant time?
                <span className="color-red">*</span>
              </label>
              <CreatableSelect
                id="interests"
                options={interestOptions}
                closeMenuOnSelect={false}
                isMulti
                onChange={this.handleChangeInterests}
                components={animatedComponents}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="mobile">Mobile Number</label>
              <div className={styles["input-group"]}>
                <div className={styles["input-group-prepend"]}>
                  <div className={styles["input-group-text"]}>+91</div>
                </div>
                <input
                  type="number"
                  className={styles["form-control"]}
                  name="mobile"
                  value={this.state.mobile}
                  id="mobile"
                  minLength="10"
                  maxLength="10"
                  placeholder="Enter your Mobile Number"
                  onChange={this.handleChange}
                  onKeyDown={this.checkKey}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="email">
                Email address <span className="color-red">*</span>
              </label>
              <input
                type="email"
                className={styles["form-control"]}
                value={this.state.email}
                id="email"
                name="email"
                placeholder="Enter your Email Address"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="photo">
                Photograph<span className="color-red">*</span>
              </label>
              <input
                type="file"
                className={styles["form-control-file"]}
                name="photo"
                id="photo"
                accept="image/*"
                required
                onChange={this.handleImage}
              />
            </div>
            {this.state.cropperToggle ? (
              <ImageCropper
                src={this.state.src}
                setImage={this.setImage}
                toggleCropper={this.toggleCropper}
                setCroppedSrc={this.setCroppedSrc}
              />
            ) : null}
            {this.state.croppedSrc && !this.state.cropperToggle && (
              <div className={styles.croppedImageDiv}>
                <img
                  alt="Crop"
                  src={this.state.croppedSrc}
                  className={styles.croppedImage}
                />
                <Button
                  onClick={this.handleCropBtn}
                  type="button"
                  className={styles.cropAgain}
                  text="Crop Again?"
                />
              </div>
            )}
            <div className={styles["form-group"]}>
              <label htmlFor="resume">
                Resume<span className="color-red">*</span>
              </label>
              <input
                type="file"
                className={styles["form-control-file"]}
                name="resume"
                id="resume"
                required
                onChange={this.handleResume}
                accept="application/pdf"
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="achievements">
                Your Achievements (Awards, Competitions, etc.):
              </label>
              {this.state.achievements.map((achievement, index) => {
                return (
                  <div key={index} id="achievements">
                    <input
                      type="text"
                      className={styles["form-control"]}
                      value={achievement}
                      required
                      onChange={(e) => this.handleChangeAchievement(e, index)}
                    />
                    <button
                      className={`${styles["btn"]} ${styles["btn-sm"]} ${styles["btn-outline-danger"]}`}
                      onClick={(e) => this.handleRemoveAchievement(e, index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <hr />
              <button
                className={`${styles["btn"]} ${styles["btn-sm"]} ${styles["btn-outline-success"]}`}
                onClick={(e) => this.handleAddAchievement(e)}
              >
                Add Achievement
              </button>
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="interns">Internships</label>
              {this.state.internships.map((internship, index) => {
                return (
                  <div key={index} id="interns">
                    <div className={`${styles["form-group"]} ${styles.row}`}>
                      <label
                        htmlFor={"company" + index}
                        className={`${styles["col-sm-2"]} ${styles["col-form-label"]}`}
                      >
                        Name of Company:
                      </label>
                      <div className={styles["col-sm-10"]}>
                        <input
                          type="text"
                          className={styles["form-control"]}
                          value={internship.company}
                          id={"company" + index}
                          required
                          onChange={(e) =>
                            this.handleChangeInternship(e, index, "company")
                          }
                        />
                      </div>
                    </div>
                    <div className={`${styles["form-group"]} ${styles.row}`}>
                      <label
                        htmlFor={"duration" + index}
                        className={`${styles["col-sm-2"]} ${styles["col-form-label"]}`}
                      >
                        Duration of Internship:
                      </label>
                      <div className={styles["col-sm-10"]}>
                        <input
                          type="text"
                          className={styles["form-control"]}
                          value={internship.duration}
                          id={"duration" + index}
                          required
                          onChange={(e) =>
                            this.handleChangeInternship(e, index, "duration")
                          }
                        />
                      </div>
                    </div>
                    <div className={`${styles["form-group"]} ${styles.row}`}>
                      <label
                        htmlFor={"domain" + index}
                        className={`${styles["col-sm-2"]} ${styles["col-form-label"]}`}
                      >
                        Domain of Internship:
                      </label>
                      <div className={styles["col-sm-10"]}>
                        <input
                          type="text"
                          className={styles["form-control"]}
                          value={internship.domain}
                          id={"domain" + index}
                          required
                          onChange={(e) =>
                            this.handleChangeInternship(e, index, "domain")
                          }
                        />
                      </div>
                    </div>
                    <button
                      className={`${styles["btn"]} ${styles["btn-sm"]} ${styles["btn-outline-danger"]}`}
                      onClick={(e) => this.handleRemoveInternship(e, index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <hr />
              <button
                className={`${styles["btn"]} ${styles["btn-sm"]} ${styles["btn-outline-success"]}`}
                onClick={(e) => this.handleAddInternship(e)}
              >
                Add Internship
              </button>
            </div>
            <hr />

            {/* Placement */}

            <div className={styles["form-group"]}>
              <label htmlFor="placement">Placement (for final year only)</label>
              <div className={`${styles["form-group"]} ${styles.row}`}>
                <label
                  htmlFor={"company"}
                  className={`${styles["col-sm-2"]} ${styles["col-form-label"]}`}
                >
                  Name of Company:
                </label>
                <div className={styles["col-sm-10"]}>
                  <input
                    type="text"
                    className={styles["form-control"]}
                    value={this.state.placement.company}
                    id={"company"}
                    onChange={(e) => this.handleChangePlacement(e, "company")}
                  />
                </div>
              </div>
              <div className={`${styles["form-group"]} ${styles.row}`}>
                <label
                  htmlFor={"job_title"}
                  className={`${styles["col-sm-2"]} ${styles["col-form-label"]}`}
                >
                  Job Title:
                </label>
                <div className={styles["col-sm-10"]}>
                  <input
                    type="text"
                    className={styles["form-control"]}
                    value={this.state.placement.domain}
                    id={"job_title"}
                    onChange={(e) => this.handleChangePlacement(e, "job_title")}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className={styles["form-group"]}>
              <label htmlFor="facebook">Facebook URL</label>
              <input
                type="url"
                className={styles["form-control"]}
                value={this.state.facebook}
                id="facebook"
                name="facebook"
                placeholder="Enter your Facebook URL"
                onChange={this.handleChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="linkedin">LinkedIn URL</label>
              <input
                type="url"
                className={styles["form-control"]}
                value={this.state.linkedin}
                id="linkedin"
                name="linkedin"
                placeholder="Enter your LinkedIn URL"
                onChange={this.handleChange}
              />
            </div>
            <Button type="submit" className={styles["button"]} text="Submit" />
          </form>
        </div>
      </>
    );
  }
}

export default MentorRegistrationForm;
