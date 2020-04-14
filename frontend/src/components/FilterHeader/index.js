import React, { Component } from 'react';
import styles from './FilterHeader.module.scss';

export default class FilterHeader extends Component{
    handleClick = () => {
        this.props.handleClose();
    }
    render(){
        return(
            <>
                <div className={styles.container}>
                    <ul>
                        <li><div className={styles.heading}><span className={'color-red'}> Filter</span> Your Search</div></li>
                        <li>
                            <div onClick={this.handleClick} className={styles.cross}>
                                <span></span>
                                <span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}