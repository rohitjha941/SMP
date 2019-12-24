import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import About from '../../routes/About';
import Blog from '../../routes/Blog';
import Home from '../../routes/Home';
import Events from '../../routes/Events';


export default class RouterView extends Component {
    render() {
        return (
            <div className="router-view">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/events" component={Events} />
                    <Redirect to="/" />
                </Switch>
            </div>
        )
    }
}