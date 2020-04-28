import React, { Component } from "react";
import styles from "./BlogFullView.module.scss";
import { calculateReadingTime } from "utils";
import PageNotFound from "../../components/404/Index";
import Loader from "components/Loader";
let timer = 0;
class BlogFullView extends Component {
  constructor() {
    super();
    this.state = {
      found: true,
    };
  }
  componentDidMount() {
    const blogID = this.props.id;
    this.props.fetch(blogID);
  }
  render() {
    const { found } = this.state;
    const blogID = this.props.id;
    const blog = this.props.getBlogById(blogID);
    if (blog.error) {
      timer = setTimeout(() => {
        this.setState({ found: false });
      }, 3000);
    } else {
      clearTimeout(timer);
      timer = 0;
    }
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
