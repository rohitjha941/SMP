import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchHeader.module.scss";
import back from "assets/images/back-arrow.svg";

class SearchHeader extends Component {
  handleFilter(e) {
    var input, filter, li, p, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toLowerCase();
    li = document.getElementsByClassName("mentor-li");

    for (i = 0; i < li.length; i++) {
      p = li[i].getElementsByTagName("p")[0];
      txtValue = p.textContent || p.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
    this.props.clearUl(this.props.availableBranches);
  }
  handleClick = () => {
    this.props.handleFilterToggle();
  };

  render() {
    return (
      <>
        <div className={styles.container}>
          <ul>
            <li>
              <Link to="/mentors">
                <img src={back} alt="Back" className={styles.backArrow} />
              </Link>
            </li>
            <li>
              <input
                type="text"
                id="search-input"
                className={styles.searchBox}
                onChange={(e) => this.handleFilter(e)}
                placeholder="Search by Name"
              />
            </li>
            <li>
              <div onClick={this.handleClick} className={styles.filterIcon}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default SearchHeader;
