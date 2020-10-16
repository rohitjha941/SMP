import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../../components/Button";
import styles from "./contact.module.scss";
import LoadingOverlay from "../../components/LoadingOverlay";
import { postQuery } from "../../api/methods";

const recaptchaRef = React.createRef();
class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      query: "",
      captcha: false,
      "g-recaptcha-response": "",
      isLoading: false,
    };
  }
  onChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
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
      let data = {
        name: this.state.name,
        email: this.state.email,
        query: this.state.query,
        "g-recaptcha-response": this.state["g-recaptcha-response"],
      };
      postQuery(data)
        .then((response) => {
          this.setState({
            email: "",
            query: "",
            name: "",
            isLoading: false,
          });
          window.flash(
            "Your Query has been raised. We'll get back to you soon."
          );
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
          });
          window.flash(
            "There was a problem sending your query! Please try again later",
            "error"
          );
        });
    } else {
      window.flash("Please Verify the Recaptcha!", "warning");
    }
    //reset captcha
    recaptchaRef.current.reset();
    this.setState({ captcha: false });
  };
  render() {
    let email = this.state.email;
    let name = this.state.name;
    let query = this.state.query;
    return (
      <>
        {this.state.isLoading ? <LoadingOverlay /> : null}
        <div className={styles.contact} id={"contact_us"}>
          <div className={styles.contactTitle}>
            Need More Help? <span className="color-red">Contact Us</span>
          </div>
          <div className={styles.contactForm}>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name</label>
              <br />
              <input
                name="name"
                placeholder="Joe"
                type="text"
                id="inputName"
                value={name}
                onChange={this.onChange}
                autoCapitalize="on"
                autoCorrect="off"
                autoComplete="off"
                spellCheck="off"
                required
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                name="email"
                placeholder="John.Doe@iitr.ac.in"
                type="email"
                id="inputEmail"
                value={email}
                onChange={this.onChange}
                autoCapitalize="on"
                autoCorrect="off"
                autoComplete="off"
                spellCheck="off"
                required
              />
              <br />
              <label htmlFor="helpBox">How can we help?</label>
              <br />
              <textarea
                name="query"
                placeholder="Hello I am John."
                id="inputQuery"
                value={query}
                onChange={this.onChange}
                autoCapitalize="on"
                autoCorrect="off"
                autoComplete="off"
                spellCheck="off"
                required
              />
              <br />
              <ReCAPTCHA
                onChange={this.handleCaptcha}
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                className={styles.captcha}
              />
              <Button type="submit" text="Get In Touch" />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Contact;
