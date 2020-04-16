import React from "react";

import styles from "./Footer.module.scss";

export function scrollToTop(delay = 0) {
  window.setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, delay);
}

function WrappedComponent(props) {
  return (
    <button onClick={scrollToTop} className={styles.scrollToTop}>
      {">|"}
    </button>
  );
}

const ScrollToTop = React.memo(WrappedComponent);
export default ScrollToTop;
