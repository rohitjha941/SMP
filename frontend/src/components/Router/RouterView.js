import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Loadable from 'react-loadable';
import Loader from '../Loader'

const About = Loadable({
    loader: () => import('../../routes/About'),
    loading: () => <Loader />
})

const Blog = Loadable({
    loader: () => import('../../routes/Blog'),
    loading: () => <Loader />
})

const Home  = Loadable({
    loader: () => import('../../routes/Home'),
    loading: () => <Loader />
})

export default class RouterView extends Component {
    render() {
        return (
            <div className="router-view">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/blog" component={Blog} />
                    <Redirect to="/" />
                </Switch>
            </div>
        )
    }
}