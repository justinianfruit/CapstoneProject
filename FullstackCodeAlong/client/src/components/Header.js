import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                    <a class="left brand-logo">Emaily</a>
                    <ul className="right">
                        <li><a>Login with Google</a></li>
                    </ul>
                </div>
            </nav>
        );
    };
}

export default Header;