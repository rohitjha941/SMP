import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

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
        const routeViewStyle = `${styles.routeContainer} ${this.props.showMenu ? styles.active : ""}`;
        return (
            <div className={routeViewStyle}>
                <ul className={styles.navLinks}>
                    {routeData.map((value, index) => {
                        return this.headerRoute(value.to, value.display, index)
                    }
                    )}
                </ul>
            </div>
        )
    }
}