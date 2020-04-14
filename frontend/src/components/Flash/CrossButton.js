import React from 'react';

import styles from './CrossButton.module.scss'

export const CrossButton = (props) => {
    return (
        <div className={styles.cross+ ' '+ props.className}>
            <div></div>
            <div></div>
        </div>
    )
}