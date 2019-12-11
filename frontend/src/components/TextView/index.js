import React from 'react';

import styles from './TextView.module.scss';

function WrappedComponent(props) {
    return (
        <p className={styles.text}>
            {props.text}
        </p>
    )
}

const TextView = React.memo(WrappedComponent);
export default TextView;