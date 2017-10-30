import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import SurveyList from './surveys/SurveyList';

class Profile extends Component {
    render() {
        return (
            <div className="row">
                <div className="container-large">
                    <div className="col col-10 center">
                        <h1>Profile</h1>
                    </div>
                    <div className="col col-10">
                        <div>
                            <h3>Projects</h3>
                            <table className="striped">
                                <tr>
                                    <th>Title</th>
                                    <th>Last Update</th>
                                    <th>Group</th>
                                </tr>
                                <tr>
                                    <td>Mobile App Outline</td>
                                    <td>10/4/17, 4:13 PM</td>
                                    <td>True</td>
                                </tr>
                                <tr>
                                    <td>Website Frame</td>
                                    <td>10/8/17, 7:42 PM</td>
                                    <td>False</td>
                                </tr>
                                <tr>
                                    <td>Profile Website Frame</td>
                                    <td>9/29/17, 3:57 AM</td>
                                    <td>False</td>
                                </tr>
                            </table>
                        </div>
                        <br/>
                        <div>
                            <h3>Uploaded Files</h3>
                            <table className="striped">
                                <tr>
                                    <th>File Name</th>
                                    <th>Date Uploaded</th>
                                    <th>Type</th>
                                    <th>Size</th>
                                </tr>
                                <tr>
                                    <td>beans.png</td>
                                    <td>8/21/17, 12:56 PM</td>
                                    <td>PNG</td>
                                    <td>272 KB</td>
                                </tr>
                                <tr>
                                    <td>frop7.jpg</td>
                                    <td>8/13/17, 8:40 AM</td>
                                    <td>JPG</td>
                                    <td>191 KB</td>
                                </tr>
                                <tr>
                                    <td>summer2017.png</td>
                                    <td>9/7/17, 3:51 PM</td>
                                    <td>PNG</td>
                                    <td>34 KB</td>
                                </tr>
                            </table>
                        </div>
                        {/* <SurveyList /> */}
                        <div>
                            <Link to="/buildtool" className="btn-floating btn-large red"></Link>
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

export default connect(mapStateToProps)(Profile);