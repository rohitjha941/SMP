import React from "react";
import styles from "./DesktopView.module.scss";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { scrollToTop } from "./ScrollToTop";

function WrappedComponent(props) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className="color-red">Student </span>
          <span className="color-blue"> Mentorship </span> Programme
        </div>
        <ul className={styles.columns}>
          <li>
            <Logo />
          </li>
          <li>
            <div>
              <ul>
                <li className={styles.categoryHeading}>Follow</li>
                <a href="https://www.facebook.com/MentorshipIITR/">
                  <li>Facebook</li>
                </a>
                <a href="https://www.linkedin.com/company/smpiitr">
                  <li>LinkedIn</li>
                </a>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <ul>
                <li className={styles.categoryHeading}>Help</li>
                <Link to="/queries#contact-us">
                  <li>Contact Us</li>
                </Link>
                <Link to="/queries" onClick={() => scrollToTop(250)}>
                  <li>FAQ's</li>
                </Link>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdTJvrf8RhphVktoT7iRhriEmepfHwod8zFiWUuM9FCcOpIhg/formResponse">
                  <li>Become a Mentor</li>
                </a>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <ul>
                <li className={styles.categoryHeading}>Visit</li>
                <li className={styles.address}>
                  <p>Office of DoSW</p>
                  <p>Indian Institute of Technology Roorkee, </p>
                  <p>Roorkee, Haridwar district, </p>
                  <p>Uttarakhand, India </p>
                  <p>PIN - 247667</p>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

const DesktopView = React.memo(WrappedComponent);
export default DesktopView;
