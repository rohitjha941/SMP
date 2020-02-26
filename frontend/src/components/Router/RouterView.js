import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Loadable from 'react-loadable';
import Loader from '../Loader';

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
const ComingSoon = Loadable({
    loader: () => import('../../components/ComingSoon'),
    loading: () => <Loader />
})
export default class RouterView extends Component {
    render() {
        return (
            <div className="router-view">
                <Switch>
                    <Route exact path="/" render={() => <Home blogs={this.props.blogs} events={this.props.events}/>} />
                    <Route path ="/freshers" component={ComingSoon} />
                    <Route path="/about" render={() => <About team={this.props.team}/>} />
                    <Route path="/events" render={() => <Events events={this.props.events}/>} />
                    <Route path="/blogs" render={() => <Blog blogs={this.props.blogs}/>} />
                    <Route path="/queries" component={Queries} />
                    <Route path="/mentors" render={() => <Mentors mentors={this.props.mentors}/>} />
                    <Redirect to="/" />
                </Switch>
            </div>
        )
    }
}

