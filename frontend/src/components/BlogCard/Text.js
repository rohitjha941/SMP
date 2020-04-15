import React from "react";
import { Link } from "react-router-dom";

import styles from "./Text.module.scss";

function WrappedComponent(props) {
  const metadata = props.metadata;
  return (
    <div className={styles.container}>
      {props.headingTop ? null : (
        <Link to={"/blogs/view/" + props.blog_id + "/"}>
          <h3
            className={
              props.type === "xl"
                ? styles.headingxl
                : null || props.type === "lg"
                ? styles.headinglg
                : null || props.type === "sm"
                ? styles.headingsm
                : null || styles.headingmd
            }
          >
            {props.heading ? props.heading : null}
          </h3>
        </Link>
      )}
      {metadata ? (
        <p className={styles.metadata}>
          {(metadata.d1 ? metadata.d1 : null) +
            (metadata.d2 ? " • " + metadata.d2 : null) +
            (metadata.d3 ? " • " + metadata.d3 : null)}
        </p>
      ) : null}
      {props.text ? (
        <div className={styles.text}>
          <span dangerouslySetInnerHTML={{ __html: props.text }}></span>
          <Link to={"/blogs/view/" + props.blog_id + "/"}>
            <span className={styles.readMore}>
              {props.text ? "...Read More" : null}
            </span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

const Text = React.memo(WrappedComponent);
export default Text;
