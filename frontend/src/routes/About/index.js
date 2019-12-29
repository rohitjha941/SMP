import React, {Component} from 'react';

import Intro from './Intro';
import Stats from './Stats';
import Info from './Info';
import Team from './Team';
import styles from './About.module.scss';

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <div className={styles.head}>
                    <Intro />
                    <Stats />
                </div>
                <Info />
                <Team />
            </div>
        )
    }
}