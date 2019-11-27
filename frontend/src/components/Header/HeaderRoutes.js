import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class HeaderRoutes extends Component {
    render() {
        return (
            <div className="route-container">
                <ul className="nav-links">
                    <li>
                        <NavLink activeClassName="active-route" to="/freshers">Freshers Section</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-route" to="/mentors">Mentors'19</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-route" to="/blogs">Blogs</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-route" to="/events">Events</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-route" to="/queries">Queries</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-route" to="/about">About</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}