import React, {Component} from 'react';
import logo from '../../assets/images/logo.svg'
import {Link} from 'react-router-dom';

export default class HeaderBranding extends Component {
    render() {
        return (
            <div onClick={this.props.hideMenu}>
                <Link to="/">
                    <div className="logo-container">
                        <img className="smp-logo" src={logo} alt='smp-logo'></img>
                        <div className="logo-name-container">
                            <span className="color-red">SMP</span>
                            <span className="color-grey">-</span>
                            <span className="color-blue">IITR</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}