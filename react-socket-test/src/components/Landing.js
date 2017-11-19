import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Profile from './Profile';

class Landing extends Component {
    renderContent() {
        return (
            <div>
                <div className="row">
                    <div className="container-large">
                        <div className="col col-10 center">
                            <h1>Quid Proto Co</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container-large">
                        <div className="col col-10 center">
                            <img src="../../../images/logoBlack.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container-large">
                        <div className="col col-10 center">
                            <h4>Wireframe your product! Work independently or collaboratively!</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);