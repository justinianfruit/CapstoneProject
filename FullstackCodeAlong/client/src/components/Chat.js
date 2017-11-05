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
                    <div className="container-large">
                        <div className="col col-10">
                            <div className="chat"></div>
                        </div>
                        <div className="col col-9 messageBox">
                            <input type="text"/>
                        </div>
                        <div className="col col-1 messageBox">
                            <button type="submit">Send</button>
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