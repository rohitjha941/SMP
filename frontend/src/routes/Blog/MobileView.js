import React, { Component } from "react";
import BlogCard from "../../components/BlogCard";
import Button from "../../components/Button";
import styles from "./MobileView.module.scss";

export default class MobileView extends Component {
  constructor() {
    super();
    this.state = {
      featuredBlogs: [],
      categoryBlogs: [],
      blogCategory: [],
    };
  }
  componentDidMount() {
    let featuredBlogs = [];
    let categoryBlogs = [];
    this.props.blogData.map((value) => {
      if (value.is_featured) {
        return featuredBlogs.push(value);
      }
      return categoryBlogs.push(value);
    });
    this.setState({
      featuredBlogs: featuredBlogs,
      categoryBlogs: categoryBlogs,
      blogCategory: this.props.blogCategory,
    });
  }
  render() {
    let { featuredBlogs, categoryBlogs } = this.state;
    return (
      <React.Fragment>
        <div className={styles.heading}>
          <span className="color-red">Read</span> what we do
        </div>
        <>
          <div className={styles.mainWrapper}>
            {featuredBlogs.length > 0 ? (
              <div>
                <div className={styles.categoryHeading}>Featured</div>
                {featuredBlogs.map((value) => {
                  return (
                    <div key={value.blog_id}>
                      <BlogCard
                        className={styles.blogCardCommon}
                        blogData={value}
                        type={window.innerWidth < 600 ? "sm" : "lg"}
                      />
                      <hr className={styles.hr} />
                    </div>
                  );
                })}
              </div>
            ) : null}
            {this.state.blogCategory
              ? this.state.blogCategory.map((category, index) => {
                  return (
                    <>
                      <div key={index} className={styles.categoryHeading}>
                        {category.category_name}
                      </div>
                      {categoryBlogs.map((blog, i) => {
                        if (blog.category === category.id) {
                          return (
                            <div key={i}>
                              <BlogCard
                                className={styles.blogCardCommon}
                                blogData={blog}
                                type={window.innerWidth < 600 ? "sm" : "lg"}
                              />
                              <hr className={styles.hr} />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </>
                  );
                })
              : null}
            <div></div>
            <Button
              className={styles.viewMore}
              type="outline"
              text="View More"
            />
          </div>
        </>
      </React.Fragment>
    );
  }
}
