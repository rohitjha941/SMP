import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class HeaderRoutes extends Component {
    headerRoute(to, display, key) {
        return (
            <li key={key}>
                <NavLink activeClassName="active-route" to={to} onClick={this.props.hideMenu}>{display}</NavLink>
            </li>
        )
    }
    render() {
        const routeData = [
            {
                to: "/freshers",
                display: "Freshers Section",
            },
            {
                to: "/mentors",
                display: "Mentors",
            },
            {
                to: "/blogs",
                display: "Blogs",
            },
            {
                to: "/events",
                display: "Events",
            },
            {
                to: "/queries",
                display: "Queries",
            },
            {
                to: "/about",
                display: "About",
            },
        ]
        return (
            <div className={`route-container ${this.props.showMenu ? "active" : ""}`}>
                <ul className="nav-links">
                    {routeData.map((value, index) => {
                        return this.headerRoute(value.to, value.display, index)
                    }
                    )}
                </ul>
            </div>
        )
    }
}