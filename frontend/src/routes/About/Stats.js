import React, {Component} from 'react';
import styles from './About.module.scss';
import data from './statsdata';

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
                count: data.freshers,
                label: "Freshers"
            },
            {
                count: data.Mentors,
                label: "Mentors"
            },
            {
                count: data.Team,
                label: "Team"
            },
            {
                count: data.years,
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