import React from 'react';
import CompositeTextView from 'components/CompositeTextView';

import styles from './ImageText.module.scss';

function WrappedComponent(props) {
    const imageSource = props.imgSrc;
    const imageAlternativeText = (props.imgAlt) ? props.imgAlt : props.heading;
    const heading = props.heading;
    const text = props.text;
    return (
        <div className={styles.container} >
            <img src={imageSource} alt={imageAlternativeText} className={styles.image}/>
            <CompositeTextView heading={heading} text={text} />
        </div>
    )
}

const ImageText = React.memo(WrappedComponent);
export default ImageText;