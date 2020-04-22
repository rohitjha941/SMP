import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../../components/Loader";

// const PageNotFound = Loadable({
//     loader: () => import('../../components/404/Index'),
//     loading: () => <Loader />
// })
const MentorForm = Loadable({
  loader: () => import("./MentorForm"),
  loading: () => <Loader />,
});

class DataCollection extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/datacollection/mentors"
            render={() => (
              <MentorForm
                fetch={this.props.fetch}
                groups={this.props.groups}
                branches={this.props.branches}
                interests={this.props.interests}
              />
            )}
          />
          {/* <Route to="*" component={PageNotFound} />  */}
        </Switch>
      </>
    );
  }
}

export default DataCollection;
