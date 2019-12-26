import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

export default class HeaderBranding extends Component {
    render() {
        return (
            <div onClick={this.props.hideMenu}>
                <Link to="/">
                    <div className={styles.logoContainer}>
                        <img src={logo} alt='smp-logo'></img>
                        <div>
                            <span className={styles.colorRed}>SMP</span>
                            <span className={styles.colorGrey}>-</span>
                            <span className={styles.colorBlue}>IITR</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}