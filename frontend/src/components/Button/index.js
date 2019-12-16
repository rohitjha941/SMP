import React from 'react';

import styles from './Button.module.scss';

function WrappedComponent(props) {
    return (
        <button className={styles.button}>
            {props.text}
        </button>
    )
}

const Button = React.memo(WrappedComponent);
export default Button;