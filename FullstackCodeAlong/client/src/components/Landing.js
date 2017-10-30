import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Profile from './Profile';

class Landing extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <div className="center">
                        <h1>Framing</h1>
                        <img src="../../../images/logoBase.png" alt=""/>
                        <br/>
                        Wireframe your product! Work independently or collaboratively!
                    </div>
                );
            default:
                return <Route path="/profile" component={Profile} />;
        }
    }

    render() {
        return (
            <div className="row">
                <div className="container-large">
                    <div className="col col-10 center">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);