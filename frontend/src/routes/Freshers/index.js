import React, { useEffect } from "react";
import styles from "./Freshers.module.scss";

function WrappedComponent(props) {
  useEffect(() => {
    props.fetch();
  });
  return (
    <div className={styles.pdfContainer}>
      <object
        data={props.url}
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
