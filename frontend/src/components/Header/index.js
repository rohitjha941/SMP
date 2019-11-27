import React, {Component} from 'react';
import HeaderBranding from './HeaderBranding';
import HeaderRoutes from './HeaderRoutes';

export default class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <HeaderBranding />
                    <HeaderRoutes />
                </header>
            </div>
        )
    }
}