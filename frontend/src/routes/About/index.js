import React, {Component} from 'react';

import Intro from './Intro';
import Stats from './Stats';
import Info from './Info';

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <Intro />
                <Stats />
                <Info />
            </div>
        )
    }
}