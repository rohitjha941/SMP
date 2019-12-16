import React from 'react';

import Acknowledgement from './Acknowledgement';

import styles from './Footer.module.scss';

function WrappedComponent(props) {
    return (
        <div className={styles.container}>
            <Acknowledgement />
        </div>
    )
}

const Footer = React.memo(WrappedComponent);
export default Footer;