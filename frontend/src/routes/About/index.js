import React, {Component} from 'react';

import Intro from './Intro';
import Stats from './Stats';

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <Intro />
                <Stats />
            </div>
        )
    }
}