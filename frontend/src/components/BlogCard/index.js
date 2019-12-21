import React from 'react';
import Text from './Text';

import styles from './BlogCard.module.scss';

function WrappedComponent(props) {
    const imageSource = props.imgSrc;
    const imageAlternativeText = (props.imgAlt) ? props.imgAlt : props.heading;
    const heading = props.heading;
    const text = props.text;
    const metadata = props.metadata;
    return (
        <React.Fragment>
            <div className={styles.container+' '+props.className} >
                <img className={styles.blogImage} src={imageSource} alt={imageAlternativeText} />
                <Text heading={heading} text={text} metadata={metadata} />
            </div>
        </React.Fragment>
    )
}

const ImageText = React.memo(WrappedComponent);
export default ImageText;