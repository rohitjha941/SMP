import React from 'react';
import Text from './Text';
import styles from './BlogCard.module.scss';

function WrappedComponent(props) {
    const blog_id = props.blogData.blog_id;
    const imageSource = props.blogData.imgSrc;
    const imageAlternativeText = (props.blogData.imgAlt) ? props.blogData.imgAlt : props.blogData.heading;
    const heading = props.blogData.heading;
    const text = props.blogData.text;
    const metadata = props.blogData.metadata;
    return (
        <React.Fragment>
            <div className={styles.container+' '+props.className} >
                <img className={styles.blogImage} src={imageSource} alt={imageAlternativeText} />
                <Text heading={heading} text={text} metadata={metadata} blog_id={blog_id} />
            </div>
        </React.Fragment>
    )
}

const ImageText = React.memo(WrappedComponent);
export default ImageText;