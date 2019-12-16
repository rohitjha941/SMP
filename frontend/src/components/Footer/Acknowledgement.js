import React from 'react';

import styles from './Footer.module.scss';

function WrappedComponent(props) {
    return (
        <div className={styles.acknowledgementContainer}>
            Crafted with ❤ by Design Studio
        </div>
    )
}

const Acknowledgement = React.memo(WrappedComponent);
export default Acknowledgement;