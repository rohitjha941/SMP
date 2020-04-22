import React from "react";
import styles from "./Freshers.module.scss";

function WrappedComponent() {
  return (
    <div className={styles.pdfContainer}>
      <object
        data="http://watchout.iitr.ac.in/Freshman_Guide_To_IITR.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
        aria-label="Freshers' PDF"
      ></object>
    </div>
  );
}

const FreshersSection = React.memo(WrappedComponent);
export default FreshersSection;
