import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../Loader";

const About = Loadable({
  loader: () => import("../../routes/About"),
  loading: () => <Loader />,
});

const Blog = Loadable({
  loader: () => import("../../routes/Blog"),
  loading: () => <Loader />,
});

const Home = Loadable({
  loader: () => import("../../routes/Home"),
  loading: () => <Loader />,
});

const Events = Loadable({
  loader: () => import("../../routes/Events"),
  loading: () => <Loader />,
});

const Queries = Loadable({
  loader: () => import("../../routes/Queries"),
  loading: () => <Loader />,
});

const BlogFullView = Loadable({
  loader: () => import("../../routes/Blog/BlogFullView"),
  loading: () => <Loader />,
});

const Mentors = Loadable({
  loader: () => import("../../routes/Mentors"),
  loading: () => <Loader />,
});

// const ComingSoon = Loadable({
//   loader: () => import("../../components/ComingSoon"),
//   loading: () => <Loader />,
// });

const DataCollection = Loadable({
  loader: () => import("../../routes/DataCollection"),
  loading: () => <Loader />,
});

const PageNotFound = Loadable({
  loader: () => import("../404/Index"),
  loading: () => <Loader />,
});

const Freshers = Loadable({
  loader: () => import("../../routes/Freshers"),
  loading: () => <Loader />,
});

export default class RouterView extends Component {
  render() {
    return (
      <div className="router-view">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                blogs={this.props.blogs}
                events={this.props.events}
                fetch={() => {
                  this.props.fetchers.blogs();
                  this.props.fetchers.events();
                }}
              />
            )}
          />
          <Route
            path="/freshers"
            render={() => (
              <Freshers
                url={this.props.freshersGuideUrl}
                fetch={this.props.fetchers.freshersGuideUrl}
              />
            )}
          />
          <Route
            path="/about"
            render={() => (
              <About team={this.props.team} fetch={this.props.fetchers.team} />
            )}
          />
          <Route
            path="/events"
            render={() => (
              <Events
                events={this.props.events}
                fetch={this.props.fetchers.events}
              />
            )}
          />
          <Route
            exact
            path="/blogs"
            render={() => (
              <Blog
                blogs={this.props.blogs}
                blogCategory={this.props.blogCategory}
                fetch={() => {
                  this.props.fetchers.blogs();
                  this.props.fetchers.blogCategory();
                }}
              />
            )}
          />
          <Route
            exact
            path="/blogs/view/:blogID/"
            render={(props) => (
              <BlogFullView
                id={props.match.params.blogID}
                getBlogById={this.props.getBlogById}
                fetch={this.props.fetchers.singleBlog}
              />
            )}
          />
          <Route
            path="/queries"
            render={() => (
              <Queries faqs={this.props.faqs} fetch={this.props.fetchers.faq} />
            )}
          />
          <Route
            path="/mentors"
            render={() => (
              <Mentors
                mentors={this.props.mentors}
                branches={this.props.branches}
                interests={this.props.interests}
                docs={this.props.mentorsDocs}
                fetch={() => {
                  this.props.fetchers.mentorDocs();
                }}
                fetchers={{
                  branches: this.props.fetchers.branches,
                  interests: this.props.fetchers.interests,
                  mentors: this.props.fetchers.mentors,
                }}
              />
            )}
          />
          <Route
            path="/datacollection"
            render={() => (
              <DataCollection
                groups={this.props.groups}
                branches={this.props.branches}
                interests={this.props.interests}
                fetchers={{
                  groups: this.props.fetchers.groups,
                  branches: this.props.fetchers.branches,
                  interests: this.props.fetchers.interests,
                }}
              />
            )}
          />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}
