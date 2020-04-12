import  React, { useEffect, useState} from 'react';

import styles from './Flash.module.scss';

export const Flash = () => {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    return (
        visibility && <div className={styles.alert + ' ' + styles[type]}>
            <span className={styles.close}><strong>X</strong></span>
            <p className={styles.message}>{message}</p>
        </div>
    )
}