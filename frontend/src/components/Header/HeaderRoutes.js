import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class HeaderRoutes extends Component {
    render() {
        return (
            <div className="route-container">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                </ul>
            </div>
        )
    }
}