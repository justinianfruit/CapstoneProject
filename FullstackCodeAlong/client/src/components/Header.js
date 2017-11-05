import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <ul className="item"><li className="last"><a href="/auth/google">Login with Google</a></li></ul>;
            default:
                return (
                    <ul className="item">
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/buildtool">Wireframing</a></li>
                        <li><a href="/chat">Chat</a></li>
                        <li className="last"><a href="/api/logout">Logout</a></li>
                    </ul>
                );
        }
    }

    render() {
        return (
            <header id="navbar" className="item">
                <div className="item header-left">
                    <img className="logo" src="../../../images/logoWhite.png" alt=""/>
                    <Link className="title" to={this.props.auth ? '/profile' : '/'}>Quid Proto Co</Link>
                    <p className="signature">by Justine Barry</p>
                </div>
                <div id="hamburger">&#9776;</div>
                <div id="navContainer" className="item">
                    {this.renderContent()}
                </div>
            </header>
        );
    };
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);