import React, {Component} from 'react';
import styles from './About.module.scss';

export default class Stats extends Component {
    statItem(count, label, key) {
        return (
            <div className={styles.item} key={key}>
                <div className={styles.count}>{count}</div>
                <div className={styles.label}>{label}</div>
            </div>
        )
    }
    render() {
        const stats = [
            {
                count: "1000+",
                label: "Freshers"
            },
            {
                count: "150",
                label: "Mentors"
            },
            {
                count: "35+",
                label: "Team"
            },
            {
                count: "4",
                label: "Years"
            },
        ]
        return (
            <div className={styles.stats}>
                {stats.map((value, index) => {
                    return this.statItem(value.count, value.label, index)
                })}
            </div>
        )
    }
}