import React from 'react';

import styles from './CompositeTextView.module.scss';

function WrappedComponent(props) {
    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>
                {props.heading}
            </h3>
            <p className={styles.text}>
                {props.text}
            </p>
        </div>
    )
}

const CompositeTextView = React.memo(WrappedComponent);
export default CompositeTextView;