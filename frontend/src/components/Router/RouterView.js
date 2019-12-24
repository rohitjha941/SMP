import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import About from '../../routes/About';
import Blog from '../../routes/Blog';
import Home from '../../routes/Home'
import Queries from '../../routes/Queries'


export default class RouterView extends Component {
    render() {
        return (
            <div className="router-view">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/queries" component={Queries} />
                    <Redirect to="/" />
                </Switch>
            </div>
        )
    }
}