import React, {Component} from 'react';

import styles from './Home.module.scss';
import Title from '../../components/Title';

export default class Home extends Component {
    render() {
        const title = "Fostering Senior Junior Relationship"
        return (
            <div>
                <div className={styles.titleContainer}>
                    <Title text={title} />
                </div>
            </div>
        )
    }
}