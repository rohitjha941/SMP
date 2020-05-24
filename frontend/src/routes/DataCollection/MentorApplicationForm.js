import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../../components/Button";
import styles from "./MentorApplicationForm.module.scss";
import Select from "react-select";
import LoadingOverlay from "components/LoadingOverlay";
import { Redirect } from "react-router-dom";
import { postMentorApplication } from "api/methods";
import { yearOptions } from "utils/constants";

const recaptchaRef = React.createRef();

class MentorApplicationForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      enrollno: "",
      branch: "",
      year: "",
      motivation: "",
      qualities: "",
      mobile: "",
      resume: null,
      captcha: false,
      "g-recaptcha-response": "",
      isLoading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.props.fetch();
  }

  checkKey = (e) => {
    const downArrow = 40;
    const upArrow = 38;
    if (e.which === upArrow || e.which === downArrow) {
      e.preventDefault();
    }
  };

  handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
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

  handleCaptcha = (key) => {
    this.setState({
      captcha: true,
      "g-recaptcha-response": key,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.captcha) {
      this.setState({ isLoading: true });
      const {
        email,
        name,
        enrollno,
        branch,
        year,
        motivation,
        qualities,
        mobile,
        resume,
      } = this.state;

      const data = {
        email: email,
        name: name,
        enrollno: enrollno,
        branch: branch,
        year: year,
        motivation: motivation,
        qualities: qualities,
        mobile: mobile,
        resume: resume,
        "g-recaptcha-response": this.state["g-recaptcha-response"],
      };
      postMentorApplication(data)
        .then((response) => {
          if (response.status === 201) {
            window.flash("Your response has been succesfully recorded");
            this.setState({
              email: "",
              name: "",
              enrollno: "",
              branch: "",
              year: "",
              motivation: "",
              qualities: "",
              mobile: "",
              resume: null,
              redirect: true,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          const errorMsg =
            "There was an error while submitting your application.\nPlease try again later";
          window.flash(errorMsg, "error");
          this.setState({
            isLoading: false,
          });
        });
    } else {
      window.flash("Please verify the ReCAPTCHA!", "warning");
    }
    recaptchaRef.current.reset();
    this.setState({ captcha: false });
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
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <>
        {this.state.isLoading ? <LoadingOverlay /> : null}
        <div className={styles.MainWrapper}>
          <h2 className={styles.heading}>
            Become a <span className="color-red">Mentor</span>
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
              <label htmlFor="motivation">
                Why do you want to be a mentor?
                <span className="color-red">*</span>
              </label>
              <textarea
                type="text"
                className={styles["form-control"]}
                name="motivation"
                value={this.state.motivation}
                id="motivation"
                onChange={this.handleChange}
                rows="4"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="qualities">
                Which of your qualities may help you to be a good mentor?
                <span className="color-red">*</span>
              </label>
              <textarea
                type="text"
                className={styles["form-control"]}
                name="qualities"
                value={this.state.qualities}
                id="qualities"
                onChange={this.handleChange}
                rows="4"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="mobile">
                Contact Number<span className="color-red">*</span>
              </label>
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

            <ReCAPTCHA
              onChange={this.handleCaptcha}
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              className={styles.captcha}
            />

            <Button type="submit" className={styles["button"]} text="Submit" />
          </form>
        </div>
      </>
    );
  }
}

export default MentorApplicationForm;
