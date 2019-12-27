import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const MentorIndex = Loadable({
    loader: () => import('./MentorIndex'),
    loading: () => <Loader />
})

const ComingSoon = Loadable({
    loader: () => import('../../components/ComingSoon'),
    loading: () => <Loader />
})

class Mentors extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Switch>
                    <Route exact path="/mentors" render={props => (<MentorIndex {...props} />)} />
                    <Route exact path="/mentors/search" render={props => (<ComingSoon {...props} />)} />
                    <Route exact path="/mentors/filter" render={props => (<ComingSoon {...porps} />)} />
                    <Redirect to="/mentors" /> 
                </Switch>
            </React.Fragment>
         );
    }
}
 
export default Mentors;