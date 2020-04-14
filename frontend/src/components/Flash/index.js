import React, { useEffect, useState } from 'react';
import styles from './Flash.module.scss';
import Bus from 'utils/Bus';
import {CrossButton} from './CrossButton';

export const Flash = () => {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        Bus.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
            setVisibility(false);
            }, 4000);
        });
                

    }, []);

    useEffect(() => {
        if(document.querySelector('.close') !== null) {
            document.querySelector('.close').addEventListener('click', () => setVisibility(false));
        }
    })

    return (
        visibility &&
            <div className={styles.alert +' ' +styles[type]}>
                    <CrossButton className={'close'}/>
                    <p className={styles.message}>{message}</p>
            </div>  
    )
}