import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../../components/Loader";
import MentorApplicationPreview from "./MentorApplicationPreview";

const PageNotFound = Loadable({
  loader: () => import("../../components/404/Index"),
  loading: () => <Loader />,
});
const MentorRegistrationForm = Loadable({
  loader: () => import("./MentorRegistrationForm"),
  loading: () => <Loader />,
});
const MentorApplicationForm = Loadable({
  loader: () => import("./MentorApplicationForm"),
  loading: () => <Loader />,
});

class DataCollection extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/datacollection/mentors/register"
            render={() => (
              <MentorRegistrationForm
                fetch={() => {
                  this.props.fetchers.groups();
                  this.props.fetchers.branches();
                  this.props.fetchers.interests();
                }}
                groups={this.props.groups}
                branches={this.props.branches}
                interests={this.props.interests}
              />
            )}
          />
          <Route
            exact
            path="/datacollection/mentors/apply"
            render={() => (
              <MentorApplicationForm
                fetch={() => {
                  this.props.fetchers.branches();
                }}
                branches={this.props.branches}
              />
            )}
          />
          <Route
            exact
            path="/datacollection/mentors/application-preview"
            render={() => (
              <MentorApplicationPreview
                fetch={() => {
                  this.props.fetchers.branches();
                }}
                branches={this.props.branches}
              />
            )}
          />
          <Route to="*" component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

export default DataCollection;
