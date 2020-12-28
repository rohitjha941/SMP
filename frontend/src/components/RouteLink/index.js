import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./RouteLink.module.scss";

function WrappedComponent(props) {
  return (
    <li key={props.index}>
      <NavLink
        activeClassName={styles.activeRoute}
        to={props.to}
        onClick={props.onClick}
      >
        {props.display}
      </NavLink>
    </li>
  );
}

const RouteLink = React.memo(WrappedComponent);
export default RouteLink;
