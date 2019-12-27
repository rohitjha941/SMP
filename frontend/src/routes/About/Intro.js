import React, {Component} from 'react';
import styles from './About.module.scss';

export default class Intro extends Component {
    render() {
        return (
            <div className={styles.intro}>
                <div className={styles.tagline}>
                    <div>
                        <span>We </span>
                        <span className="color-red">Mentor</span>
                    </div>
                    <div>
                        <span>Freshers @ IITR</span>
                    </div>
                </div>
                <div className={styles.description}>
                    <p>SMP is a <span className="bold">student initiative</span> of IIT Roorkee under the aegis of the DOSW which ensures that the transition of freshers into IIT life is smooth</p>
                </div>
            </div>
        )
    }
}