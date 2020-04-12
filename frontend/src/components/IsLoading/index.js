import React, { Component } from 'react';
import styles from './IsLoading.module.scss';
import Loader from 'assets/images/double-ring.svg'
class IsLoading extends Component {
    render() { 
        return ( 
            <>
            <div className={styles.mainDiv}>
                    <img className={styles.image} src={Loader} alt="Loading..."/>
            </div>
            </>
         );
    }
}
 
export default IsLoading;