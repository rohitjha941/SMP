import React from 'react';
import { NavLink } from 'react-router-dom';

function WrappedComponent(props) {
    return (
        <li key={props.key}>
            <NavLink activeClassName="active-route" to={props.to} onClick={props.onClick}>{props.display}</NavLink>
        </li>
    )
}

const RouteLink = React.memo(WrappedComponent);
export default RouteLink;