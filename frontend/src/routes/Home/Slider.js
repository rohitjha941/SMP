import React, { Component } from "react";
import "./Slider.scss";
import BlogCard from "../../components/BlogCard";

class Slider extends Component {
  state = {};
  render() {
    let blogData = this.props.blogData;
    // let width = window.innerWidth < 1000 ? ((blogData.length * 18.0625).toString() +'rem') : ((blogData.length * 23.1875).toString() +'rem')
    return (
      <React.Fragment>
        <div className="slider">
          <div className="slides">
            {blogData
              ? blogData.map((data, index) => {
                  if (data.is_featured) {
                    return (
                      <div key={index} id={"slide-" + index}>
                        <BlogCard
                          className="blogCardCommon"
                          key={index}
                          type={window.innerWidth < 1000 ? "sm" : "md"}
                          blogData={data}
                          headingTop={false}
                          text={false}
                        />
                      </div>
                    );
                  }
                  return null;
                })
              : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Slider;
