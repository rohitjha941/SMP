import React, { Component } from 'react';
import RouterLink from 'components/RouteLink';

import styles from './Header.module.scss';

export default class HeaderRoutes extends Component {
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
                        return <RouterLink to={value.to} display={value.display} key={index} onClick={this.props.hideMenu}/>
                    }
                    )}
                </ul>
            </div>
        )
    }
}