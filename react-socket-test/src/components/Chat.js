import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chat extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="container-large">
                        <div className="col col-10 center">
                            <h1>User Chat</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container-large" id="chatBody">
                        <div className="col col-10">
                            <div id="error-container"></div>
                            <input id="name" type="text" name="name" value="" placeholder="Enter your name!"/>
                            <button type="button" name="button" onclick="setUsername()">Let Me Chat!</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Chat);