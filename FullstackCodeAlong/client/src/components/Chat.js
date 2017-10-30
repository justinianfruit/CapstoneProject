import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chat extends Component {
    render() {
        return (
            <div>
                <h2>User Chat</h2>
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Chat);