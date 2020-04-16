import React from "react";
import RouteLink from "components/RouteLink";
import styles from "./Footer.module.scss";
import { scrollToTop } from "./ScrollToTop";

/**
 * Get current academic session
 *
 * @return {number} Last two digits of active academic session
 */
function getCurrentSession() {
  const date = new Date();
  const year = date.getFullYear();
  const session = year % 100;
  return session;
}

function WrappedComponent(props) {
  const routeData = [
    {
      to: "/become-a-mentor",
      display: "Become a Mentor",
    },
    {
      to: "/about",
      display: "About",
    },
    {
      to: "/events",
      display: "Events",
    },
    {
      to: "/mentors",
      display: `Mentors'${getCurrentSession()}`,
    },
    {
      to: "/blogs",
      display: "Blogs",
    },
    {
      to: "/freshers",
      display: "Fresher Section",
    },
    {
      to: "/contact",
      display: "Contact Us",
    },
    {
      to: "/",
      display: "Home",
    },
    {
      to: "/queries",
      display: "FAQs",
    },
  ];
  return (
    <div className={styles.sitemapContainer}>
      <ul>
        {routeData.map((value, index) => {
          return (
            <RouteLink
              to={value.to}
              display={value.display}
              index={index}
              key={index}
              onClick={() => scrollToTop(250)}
            />
          );
        })}
      </ul>
    </div>
  );
}

const Sitemap = React.memo(WrappedComponent);
export default Sitemap;
