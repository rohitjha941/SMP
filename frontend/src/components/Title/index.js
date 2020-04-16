import React from "react";

import styles from "./Title.module.scss";

function WrappedComponent(props) {
  return <p className={styles.text + " " + props.className}>{props.text}</p>;
}

const Title = React.memo(WrappedComponent);
export default Title;
