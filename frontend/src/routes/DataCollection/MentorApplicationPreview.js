import React, { useEffect, useState } from "react";
import styles from "./MentorApplicationForm.module.scss";
import { Redirect } from "react-router-dom";
import { getMentorApplicationData, getUserDetails } from "api/methods";
import AuthService from "handlers/AuthService";
import Loader from "components/Loader";
import { BASE_URL } from "api/constants";

const MentorApplicationPreview = (props) => {
  const Auth = new AuthService();
  const [userData, setUserData] = useState({
    name: "",
    enroll_no: "",
    branch: 0,
    branchName: "",
    year: "",
    mobile: "",
    motivation: "",
    qualities: "",
    resume: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [isAuthenticated] = useState(Auth.hasAccessToken());
  const [applicationDetails, setApplicationDetails] = useState({
    hasApplied: true,
    isSelected: false,
  });

  useEffect(() => {
    props.fetch();
  });
  useEffect(() => {
    const fetchUserData = async () => {
      let userId = null;
      await getUserDetails()
        .then(async (res) => {
          userId = res.user_id;
          setApplicationDetails({
            hasApplied: res.has_applied,
            isSelected: res.is_mentor,
          });
        })
        .catch((err) => {
          window.flash("Unable to connect to server", "error");
          setRedirect(true);
          setIsLoading(false);
        });
      if (!isNaN(userId))
        getMentorApplicationData(userId)
          .then((res) => {
            setIsLoading(false);
            setUserData((userData) => {
              return {
                ...userData,
                ...res.data,
                id: userId,
                resume: BASE_URL + res.data.resume,
              };
            });
          })
          .catch((err) => {
            window.flash("Unable to connect to server", "error");
            setRedirect(true);
            setIsLoading(false);
          });
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    if (
      props.branches &&
      props.branches.length > 0 &&
      typeof userData.branch === "number"
    ) {
      const branchObjects = props.branches.filter((branch) => {
        return branch.id === userData.branch;
      });
      if (branchObjects.length > 0) {
        setUserData((userData) => {
          return { ...userData, branchName: branchObjects[0].branch_name };
        });
      }
    }
  }, [props.branches, userData.branch]);
  if (!isAuthenticated) {
    return <Redirect to="/g-signin" />;
  }
  if (
    redirect ||
    !(applicationDetails.hasApplied && !applicationDetails.isSelected)
  ) {
    return <Redirect to="/user-dashboard" />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.MainWrapper}>
        <h2 className={styles.heading}>
          Application <span className="color-red">Preview</span>
        </h2>
        <form>
          <div className={styles["form-group"]}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={styles["form-control"]}
              value={userData.name || ""}
              id="name"
              placeholder="Your Name"
              readOnly
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="enroll_no">Enrollment Number</label>
            <input
              type="text"
              className={styles["form-control"]}
              value={userData.enroll_no || ""}
              id="enroll_no"
              placeholder="Your Enrollment Number"
              readOnly
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className={styles["form-control"]}
              value={userData.email || ""}
              id="email"
              placeholder="Your Email Address"
              readOnly
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              className={styles["form-control"]}
              value={userData.branchName || ""}
              id="branch"
              readOnly
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="year">Year</label>
            <input
              type="text"
              className={styles["form-control"]}
              value={userData.year || ""}
              id="year"
              readOnly
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="motivation">Why do you want to be a mentor?</label>
            <textarea
              type="text"
              className={styles["form-control"]}
              value={userData.motivation || ""}
              id="motivation"
              rows="4"
              readOnly
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="qualities">
              Which of your qualities may help you to be a good mentor?
            </label>
            <textarea
              type="text"
              className={styles["form-control"]}
              value={userData.qualities || ""}
              id="qualities"
              rows="4"
              readOnly
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="mobile">Contact Number</label>
            <div className={styles["input-group"]}>
              <div className={styles["input-group-prepend"]}>
                <div className={styles["input-group-text"]}>+91</div>
              </div>
              <input
                type="text"
                className={styles["form-control"]}
                value={userData.mobile || ""}
                id="mobile"
                placeholder="Your Mobile Number"
                readOnly
              />
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="resume">Resume</label>
            <br />
            <a href={userData.resume || "#"}>
              {userData.resume || "Not Found!"}{" "}
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default MentorApplicationPreview;
