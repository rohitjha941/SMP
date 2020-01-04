import React, { Component } from 'react';
import styles from './FilterHeader.module.scss';
import {Link} from 'react-router-dom';

export default class FilterHeader extends Component{
    render(){
        return(
            <>
                <div className={styles.container}>
                    <ul>
                        <li><div className={styles.heading}><span className={'color-red'}> Filter</span> Your Search</div></li>
                        <li>
                            <Link to='/mentors/show'><div className={styles.cross}>
                                <span></span>
                                <span></span>
                            </div></Link>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}