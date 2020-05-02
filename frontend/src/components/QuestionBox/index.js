import React, { Component } from "react";
import downArrow from "assets/images/down-arrow.svg";
import downArrow2 from "assets/images/down-arrow-2.svg";
import styles from "./QuestionsBox.module.scss";
import Answer from "./Answer";

class QuestionsBox extends Component {
  constructor() {
    super();
    this.state = {
      visibility: false,
      mobileView: window.innerWidth < 600,
    };
  }
  toggleAnswer = () => {
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility,
      };
    });
  };
  resize = () => {
    let mobWidth = window.innerWidth < 600;
    this.setState({ mobileView: mobWidth });
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    const image = this.state.mobileView ? downArrow2 : downArrow;
    return (
      <div className={styles.questionBox}>
        <div className={styles.parentContentDiv}>
          <div className={styles.textArea}>
            <div onClick={this.toggleAnswer}>
              {this.props.query.question.length > 77 && !this.state.visibility
                ? this.props.query.question.slice(0, 73) + "..."
                : this.props.query.question}
            </div>
            <Answer
              answer={this.props.query.answer}
              visibility={this.state.visibility}
            />
          </div>
          <div onClick={this.toggleAnswer} className={styles.downArrow}>
            <img
              className={
                styles.arrow + " " + (this.state.visibility ? styles.up : null)
              }
              src={image}
              alt="drop-down"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionsBox;
