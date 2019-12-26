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

const Events  = Loadable({
    loader: () => import('../../routes/Events'),
    loading: () => <Loader />
})

const Queries  = Loadable({
    loader: () => import('../../routes/Queries'),
    loading: () => <Loader />
})
const Mentors = Loadable({
    loader:() => import('../../routes/Mentors'),
    loading:() => <Loader />
})
export default class RouterView extends Component {
    render() {
        return (
            <div className="router-view">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/events" component={Events} />
                    <Route path="/blogs" component={Blog} />
                    <Route path="/queries" component={Queries} />
                    <Route path="/mentors" component={Mentors} />
                    <Redirect to="/" />
                </Switch>
            </div>
        )
    }
}
