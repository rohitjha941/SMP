import React, {Component} from 'react';

export default class Hamburger extends Component {
    render() {
        return (
            <div className={`hamburger ${this.props.showMenu ? "cross" : ""}`} onClick={this.props.toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}