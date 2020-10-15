import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../../components/Loader";

const MentorIndex = Loadable({
  loader: () => import("./MentorIndex"),
  loading: () => <Loader />,
});
const ShowMentors = Loadable({
  loader: () => import("./ShowMentors"),
  loading: () => <Loader />,
});

const PageNotFound = Loadable({
  loader: () => import("../../components/404/Index"),
  loading: () => <Loader />,
});
class Mentors extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/mentors"
            render={() => <MentorIndex docs={this.props.docs} />}
          />
          <Route
            exact
            path="/mentors/show"
            render={() => (
              <ShowMentors
                branches={this.props.branches}
                interests={this.props.interests}
                mentors={this.props.mentors}
                getMentorById={this.props.getMentorById}
                groups={this.props.groups}
                mentorInterns={this.props.mentorInterns}
                mentorPlacements={this.props.mentorPlacements}
                mentorAchievements={this.props.mentorAchievements}
                fetch={() => {
                  this.props.fetchers.branches();
                  this.props.fetchers.interests();
                  this.props.fetchers.mentors();
                }}
                fetchers={{
                  groups: this.props.fetchers.groups,
                  mentorInterns: this.props.fetchers.mentorInterns,
                  mentorPlacements: this.props.fetchers.mentorPlacements,
                  mentorAchievements: this.props.fetchers.mentorAchievements,
                }}
              />
            )}
          />
          {/*show all mentors or searched*/}
          <Route to="*" component={PageNotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Mentors;
