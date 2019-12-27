import React, {Component} from 'react';

import Intro from './Intro';
import Stats from './Stats';
import Info from './Info';
import Team from './Team';

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <Intro />
                <Stats />
                <Info />
                <Team />
            </div>
        )
    }
}