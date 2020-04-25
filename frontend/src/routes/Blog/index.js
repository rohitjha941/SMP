import React, { Component } from "react";
import styles from "./Blog.module.scss";
import Loadable from "react-loadable";
import Loader from "../../components/Loader";
import { calculateReadingTime } from "utils";

const MobileView = Loadable({
  loader: () => import("./MobileView"),
  loading: () => <Loader />,
});
const DesktopView = Loadable({
  loader: () => import("./DesktopView"),
  loading: () => <Loader />,
});
export default class Blog extends Component {
  constructor() {
    super();
    this.state = {
      mobileView: window.innerWidth < 1000,
    };
  }
  resize = () => {
    let mobWidth = window.innerWidth < 1000;
    this.setState({ mobileView: mobWidth });
  };
  componentWillMount() {
    this.props.fetch();
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    const blogData = this.props.blogs.map((value) => {
      return {
        blog_id: value.id,
        imgSrc: value.thumbnail,
        imgAlt: value.title,
        heading: value.title,
        text: value.content,
        metadata: {
          d1: value.author,
          d2: value.created_at,
          d3: calculateReadingTime(value.content),
        },
        category: value.category,
        is_featured: value.is_featured,
      };
    });
    return (
      <>
        <div className={styles.mainDiv}>
          {this.state.mobileView ? (
            <MobileView
              blogData={blogData}
              blogCategory={this.props.blogCategory}
            />
          ) : (
            <DesktopView
              blogData={blogData}
              blogCategory={this.props.blogCategory}
            />
          )}
        </div>
      </>
    );
  }
}
