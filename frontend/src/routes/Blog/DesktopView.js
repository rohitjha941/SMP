import React, { Component } from "react";
import styles from "./DesktopView.module.scss";
import Blogcard from "../../components/BlogCard";
// import ComingSoon from '../../components/ComingSoon';

class DesktopView extends Component {
  state = {};
  render() {
    const featuredBlogs = [];
    const categoryBlogs = [];
    this.props.blogData.forEach((value) => {
      if (value.is_featured) {
        featuredBlogs.push(value);
      }
      if (value.category) {
        categoryBlogs.push(value);
      }
    });
    return (
      <>
        <div className={styles.mainWrapper}>
          <div className={styles.container1}>
            <div className={styles.headingContainer}>
              <span className="color-red">Read</span> What We Do
            </div>
            <ul className={styles.ul1}>
              {featuredBlogs.length >= 3 ? (
                <>
                  <li className={styles.ul1Li1}>
                    <Blogcard
                      blogData={featuredBlogs[0]}
                      type="xl"
                      className={styles.blogcardXl}
                      textlimit={500}
                    />
                  </li>
                  <li className={styles.ul1Li2}>
                    <ul className={styles.ul2}>
                      <li>
                        <Blogcard
                          blogData={featuredBlogs[1]}
                          type="lg"
                          className={styles.blogcardlg}
                          text={false}
                        />
                      </li>
                      <li>
                        <Blogcard
                          blogData={featuredBlogs[2]}
                          type="lg"
                          className={styles.blogcardlg}
                          text={false}
                        />
                      </li>
                    </ul>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <div className={styles.container2}>
            {this.props.blogCategory && categoryBlogs.length > 0
              ? this.props.blogCategory.map((category, index) => {
                  return (
                    <>
                      <div key={index} className={styles.sectionHeading}>
                        {category.category_name}
                      </div>
                      <ul className={styles.ul3}>
                        {categoryBlogs.map((blog, i) => {
                          if (blog.category === category.id) {
                            return (
                              <li key={i}>
                                <Blogcard
                                  className={styles.blogCardCommon}
                                  blogData={blog}
                                  type={window.innerWidth < 600 ? "sm" : "lg"}
                                  heading={false}
                                />
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    </>
                  );
                })
              : null}
            {featuredBlogs.length > 0 ? (
              <>
                <div className={styles.sectionHeading}>Featured Blogs</div>
                <ul className={styles.ul3}>
                  {featuredBlogs && featuredBlogs.length > 0
                    ? featuredBlogs.map((value, i) => {
                        return (
                          <li>
                            <Blogcard
                              key={i}
                              blogData={value}
                              type="md"
                              heading={false}
                            />
                          </li>
                        );
                      })
                    : null}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default DesktopView;
