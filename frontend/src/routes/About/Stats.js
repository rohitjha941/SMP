import React, {Component} from 'react';

export default class Stats extends Component {
    statItem(count, label, key) {
        return (
            <div className="item" key={key}>
                <div className="count">{count}</div>
                <div className="label">{label}</div>
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
            <div className="stats">
                {stats.map((value, index) => {
                    return this.statItem(value.count, value.label, index)
                })}
            </div>
        )
    }
}