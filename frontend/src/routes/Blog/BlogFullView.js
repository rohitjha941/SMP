import React, { Component } from "react";
import styles from "./BlogFullView.module.scss";
import { calculateReadingTime } from "utils";

class BlogFullView extends Component {
  componentDidMount() {
    const blogID = parseInt(this.props.match.params.blogID);
    this.props.fetch(blogID);
  }
  render() {
    const blog = this.props.blogData;
    const blogData = blog.content
      ? {
          blog_id: blog.id,
          imgSrc: blog.thumbnail,
          imgAlt: blog.title,
          heading: blog.title,
          text: blog.content,
          metadata: {
            d1: blog.author,
            d2: blog.created_at,
            d3: calculateReadingTime(blog.content),
          },
        }
      : null;
    return (
      <React.Fragment>
        {blogData ? (
          <div className={styles.mainDiv}>
            <div className={styles.mainImageDiv}>
              <img
                className={styles.mainImage}
                src={blogData.imgSrc}
                alt={blogData.imgAlt || blogData.Title}
              />
            </div>
            <div className={styles.contentDiv}>
              <div className={styles.blogHeading}>{blogData.heading}</div>
              <div className={styles.metadata}>
                {blogData.metadata
                  ? blogData.metadata.d1 +
                    " • " +
                    blogData.metadata.d2 +
                    " • " +
                    blogData.metadata.d3
                  : null}
              </div>
              <div className={styles.blogText}>
                <div dangerouslySetInnerHTML={{ __html: blogData.text }}></div>
              </div>
              <div className={styles.thanks}>Thanks a lot for your time.</div>
              <hr className={styles.hr} />
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default BlogFullView;
