import React from "react";

import styles from "./Footer.module.scss";

function WrappedComponent(props) {
  return (
    <div className={styles.acknowledgementContainer}>
      Crafted with <span className={styles.heart}>❤</span> by Design Studio
    </div>
  );
}

const Acknowledgement = React.memo(WrappedComponent);
export default Acknowledgement;
