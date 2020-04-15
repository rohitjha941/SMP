import React, { Component } from "react";
import styles from "./Blog.module.scss";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../../components/Loader";
import BlogFullView from "./BlogFullView";
import { calculateReadingTime } from "utils";
import PageNotFound from "../../components/404/Index";

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
      <React.Fragment>
        <div className={styles.mainDiv}>
          {this.state.mobileView ? (
            <Switch>
              <Route
                exact
                path="/blogs"
                render={(props) => (
                  <MobileView {...props} blogData={blogData} />
                )}
              />
              <Route
                exact
                path="/blogs/view/:blogID/"
                render={(props) => (
                  <BlogFullView {...props} blogData={blogData} />
                )}
              />
              <Route to="*" component={PageNotFound} />
            </Switch>
          ) : (
            <Switch>
              <Route
                exact
                path="/blogs"
                render={(props) => (
                  <DesktopView
                    {...props}
                    blogData={blogData}
                    blogCategory={this.props.blogCategory}
                  />
                )}
              />
              <Route
                path="/blogs/view/:blogID/"
                render={(props) => (
                  <BlogFullView {...props} blogData={blogData} />
                )}
              />
              <Route to="*" component={PageNotFound} />
            </Switch>
          )}
        </div>
      </React.Fragment>
    );
  }
}
