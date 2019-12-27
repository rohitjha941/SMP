import React, { Component } from 'react';
import styles from './Loader.module.scss'
import LoaderImg from './Loader.svg'

class Loader extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <div className={styles.mainDiv}>
                    <img className={styles.loader} src={LoaderImg} alt='Loading..'/>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Loader;