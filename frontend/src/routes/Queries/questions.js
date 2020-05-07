import React, { Component } from "react";
import QuestionsBox from "components/QuestionBox";
import Button from "components/Button";
import styles from "./questions.module.scss";

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      mentorQueryLimit: 8,
      menteeQueryLimit: 8,
      viewTextMentor: "View More",
      viewTextMentee: "View More",
    };
  }
  handlequerychange = () => {
    this.props.activeTab === "mentor" && this.state.mentorQueryLimit === 8
      ? this.setState({
          mentorQueryLimit: -1,
          viewTextMentor: "View Less",
        })
      : this.setState({ mentorQueryLimit: 8, viewTextMentor: "View More" });
    this.props.activeTab === "mentee" && this.state.menteeQueryLimit === 8
      ? this.setState({
          menteeQueryLimit: -1,
          viewTextMentee: "View Less",
        })
      : this.setState({ menteeQueryLimit: 8, viewTextMentee: "View More" });
  };
  render() {
    const MentorQuestions = [];
    const MenteeQuestions = [];
    if (this.props.faqs) {
      this.props.faqs.forEach((value) => {
        var dat = {
          question: value.question,
          answer: value.answer,
        };
        value._for === "mentor"
          ? MentorQuestions.push(dat)
          : MenteeQuestions.push(dat);
      });
    }
    return (
      <div className={styles.questions}>
        <ul>
          {this.props.activeTab === "mentor"
            ? MentorQuestions.slice(0, this.state.mentorQueryLimit).map(
                (data, i) => {
                  return (
                    <li>
                      <QuestionsBox key={i} query={data} />
                    </li>
                  );
                }
              )
            : MenteeQuestions.slice(0, this.state.menteeQueryLimit).map(
                (data, i) => {
                  return (
                    <li>
                      <QuestionsBox key={i} query={data} />
                    </li>
                  );
                }
              )}
        </ul>
        <Button
          onClick={this.handlequerychange}
          className={styles.viewMore}
          text={
            this.props.activeTab === "mentor"
              ? this.state.viewTextMentor
              : this.state.viewTextMentee
          }
          type="outline"
        />
      </div>
    );
  }
}

export default Questions;
