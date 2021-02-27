import React from "react";
import RouteLink from "components/RouteLink";
import styles from "./Footer.module.scss";
import { scrollToTop } from "./ScrollToTop";
import { getCurrentSession } from "utils";

function WrappedComponent(props) {
  const routeData = [
    {
      to:
        "https://docs.google.com/forms/d/e/1FAIpQLSdTJvrf8RhphVktoT7iRhriEmepfHwod8zFiWUuM9FCcOpIhg/formResponse",
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
      to: "/queries#contact-us",
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
          return value.display === "Become a Mentor" ? (
            <a key={index} href={value.to}>
              <li key={index}>{value.display}</li>
            </a>
          ) : (
            <RouteLink
              to={value.to}
              display={value.display}
              index={index}
              key={index}
              onClick={
                value.display === "Contact Us" ? null : () => scrollToTop(250)
              }
            />
          );
        })}
      </ul>
    </div>
  );
}

const Sitemap = React.memo(WrappedComponent);
export default Sitemap;
