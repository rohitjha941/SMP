import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import About from '../../routes/About';
import Blog from '../../routes/Blog';
import Home from '../../routes/Home'


export default class RouterView extends Component {
    render() {
        return (
            <div>
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