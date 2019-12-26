import React from 'react';

import styles from './Footer.module.scss';
import logo from 'assets/images/logo.svg';

function WrappedComponent(props) {
    return (
        <div className={styles.branding}>
            <div className={styles.brandingName}>
                <div>
                    <span className={styles.colorRed}>Student </span>
                    <span className={styles.colorBlue}>Mentorship </span>
                    <span className={styles.colorBlack}>Program</span>
                </div>
                <div className={styles.colorBlack}>
                    IIT Roorkee
                </div>
            </div>
            <div className={styles.brandingLogo}>
                <img src={logo} alt="smp-logo"/>
            </div>
        </div>
    )
}

const Branding = React.memo(WrappedComponent);
export default Branding;