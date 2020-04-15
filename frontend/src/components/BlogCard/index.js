import React from "react";
import Text from "./Text";
import styles from "./BlogCard.module.scss";
import { Link } from "react-router-dom";

function WrappedComponent(props) {
  var blogCardContentCharacterLimit = props.textlimit ? props.textlimit : 100;

  var markup = props.blogData.text;
  var el = document.createElement("div");
  el.innerHTML = markup;
  var textpara = el.getElementsByTagName("p");
  var textedited = "";
  for (var i = 0; i < textpara.length; i++) {
    textedited += textpara[i].innerHTML;
  }
  textedited = textedited.substr(0, blogCardContentCharacterLimit).trim();

  const blog_id = props.blogData.blog_id;
  const imageSource = props.blogData.imgSrc;
  const imageAlternativeText = props.blogData.imgAlt
    ? props.blogData.imgAlt
    : props.blogData.heading;
  const heading =
    props.heading === undefined
      ? props.blogData.heading
      : props.heading
      ? props.blogData.heading
      : null;
  const text =
    props.text === undefined ? textedited : props.text ? textedited : null;
  const truncatedText = text ? text : "";
  const metadata =
    props.metadata === undefined
      ? props.blogData.metadata
      : props.metadata
      ? props.blogData.metadata
      : null;
  const headingTop =
    props.headingTop === false
      ? false
      : window.innerWidth < 1000
      ? true
      : props.headingTop
      ? true
      : false;
  return (
    <React.Fragment>
      <div
        className={
          (props.type === "sm"
            ? styles.containersm
            : null || props.type === "lg"
            ? styles.containerlg
            : null || props.type === "xl"
            ? styles.containerxl
            : null || styles.containermd) +
          " " +
          props.className
        }
        id={props.id}
      >
        {headingTop ? (
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
            {heading ? heading : null}
          </h3>
        ) : null}
        <Link to={"/blogs/view/" + blog_id + "/"}>
          <div id="imagediv" className={styles.imageWrapperDiv}>
            <img
              className={styles.blogImage}
              src={imageSource}
              alt={imageAlternativeText}
            />
          </div>
        </Link>
        <Text
          heading={heading}
          text={truncatedText}
          metadata={metadata}
          blog_id={blog_id}
          headingTop={headingTop}
          type={props.type}
        />
      </div>
    </React.Fragment>
  );
}

const BlogCard = React.memo(WrappedComponent);
export default BlogCard;
