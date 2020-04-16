import React, { Component } from "react";
import styles from "./BlogFullView.module.scss";
import axios from "axios";
import { calculateReadingTime } from "utils";

class BlogFullView extends Component {
  constructor() {
    super();
    this.state = {
      blogData: {},
    };
  }
  componentDidMount() {
    const blogID = this.props.match.params.blogID;
    axios
      .get(process.env.REACT_APP_API_BASE + `blogs/${blogID}/`)
      .then((res) => {
        const blogData = {
          blog_id: res.data.id,
          imgSrc: res.data.thumbnail,
          imgAlt: res.data.title,
          heading: res.data.title,
          text: res.data.content,
          metadata: {
            d1: res.data.author,
            d2: res.data.created_at,
            d3: calculateReadingTime(res.data.content),
          },
        };
        this.setState({
          blogData: blogData,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.mainDiv}>
          <div className={styles.mainImageDiv}>
            <img
              className={styles.mainImage}
              src={this.state.blogData.imgSrc}
              alt={this.state.blogData.imgAlt || this.state.blogData.Title}
            />
          </div>
          <div className={styles.contentDiv}>
            <div className={styles.blogHeading}>
              {this.state.blogData.heading}
            </div>
            <div className={styles.metadata}>
              {this.state.blogData.metadata
                ? this.state.blogData.metadata.d1 +
                  " • " +
                  this.state.blogData.metadata.d2 +
                  " • " +
                  this.state.blogData.metadata.d3
                : null}
            </div>
            <div className={styles.blogText}>
              <div
                dangerouslySetInnerHTML={{ __html: this.state.blogData.text }}
              ></div>
            </div>
            <div className={styles.thanks}>Thanks a lot for your time.</div>
            <hr className={styles.hr} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogFullView;
