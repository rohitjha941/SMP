import React from 'react';
import emblem from 'assets/images/emblem.svg';
import logo from 'assets/images/logo2.svg';
import styles from './DesktopView.module.scss';

function WrappedComponent(props){
    return(
        <div className={styles.logoContainer}>
            <div className={styles.logoParent}>
                <img src={emblem} alt='emblem' className={styles.emblem}/>
                <img src={logo} alt='logo' className={styles.logo}/>
            </div>
            <div className={styles.instiLinkHead}>
                For institute related details:- 
            </div>
            <div className={styles.instiLink}>
                <a href='https://www.iitr.ac.in' target='_new' >www.iitr.ac.in</a>
            </div>
        </div>
    )
}

const Logo = React.memo(WrappedComponent);
export default Logo;