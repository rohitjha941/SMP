import React, {Component} from 'react';

import styles from './Home.module.scss';
import people_plant_light from 'assets/images/people_plant_light.svg';
import Title from 'components/Title';

export default class Home extends Component {
    render() {
        const title = "Fostering Senior Junior Relationship"
        return (
            <div>
                <div className={styles.titleContainer}>
                    <Title text={title} />
                </div>
                <div className={styles.illustration}>
                    <img src={people_plant_light} alt="People plant light"></img>
                </div>
            </div>
        )
    }
}