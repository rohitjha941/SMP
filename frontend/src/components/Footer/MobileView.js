import React from 'react';

import Acknowledgement from './Acknowledgement';
import Sitemap from './Sitemap';
import ScrollToTop from './ScrollToTop';
import Branding from './Branding';

import styles from './Footer.module.scss';

function WrappedComponent(props) {
    return (
        <div className={styles.container}>
            <div className={styles.brandingSitemapContainer}>
                <Branding/>
                <Sitemap/>
            </div>
            <ScrollToTop/>
            <Acknowledgement />
        </div>
    )
}

const MobileView = React.memo(WrappedComponent);
export default MobileView;