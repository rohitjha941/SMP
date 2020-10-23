import React, { Component } from "react";
import styles from "./BlogFullView.module.scss";
import { calculateReadingTime } from "utils";
import PageNotFound from "../../components/404/Index";
import Loader from "components/Loader";
import ProgressBar from "components/ProgressBar";

class BlogFullView extends Component {
  constructor() {
    super();
    this.state = {
      found: true,
      isPending: true,
    };
  }
  componentDidMount() {
    this.props
      .fetch(this.props.id)
      .then(
        function () {
          this.setState({ isPending: false });
        }.bind(this)
      )
      .catch(
        function () {
          this.setState({ found: false, isPending: false });
        }.bind(this)
      );
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  render() {
    const { found, isPending } = this.state;
    const blogID = this.props.id;
    const blog = this.props.getBlogById(blogID);
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
        {found ? (
          <>
            {blogData && !isPending ? (
              <div>
                <ProgressBar className={styles.progressBar} />

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
                      <div
                        dangerouslySetInnerHTML={{ __html: blogData.text }}
                      ></div>
                    </div>
                    <div className={styles.thanks}>
                      Thanks a lot for your time.
                    </div>
                    <hr className={styles.hr} />
                  </div>
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </>
        ) : (
          <PageNotFound />
        )}
      </React.Fragment>
    );
  }
}

export default BlogFullView;
