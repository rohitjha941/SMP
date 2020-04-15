import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";
import Button from "../Button";
import Barbecue from "assets/images/undraw_barbecue_3x93.svg";

export default class StudentIndex extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <>
        <div className={styles.mainWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.imageDiv}>
              <img src={Barbecue} className={styles.image} alt="404" />
            </div>
            <div className={styles.Text}>
              <div className={styles.Error404}>
                Error <span className={"color-red " + styles.redText}>404</span>
              </div>
              <div className={styles.PageNotFound}>Page Not Found!</div>
              <Link to="/">
                <Button
                  type="solid"
                  text="Return to Home Page"
                  className={styles.button}
                />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
