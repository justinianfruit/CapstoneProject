import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Profile from './Profile';
import BuildTool from './BuildTool';
import Chat from './Chat';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    {<Route exact path="/" component={Landing} />}
                    {<Route path="/profile" component={Profile} />}
                    {<Route path="/buildtool" component={BuildTool} />}
                    {<Route path="/chat" component={Chat} />}
                    {<Route path="/surveys/new" component={SurveyNew} />}
                    <footer>
                        <hr/>
                        <p>Quid Proto Co &copy; by Justine Barry, 2017.</p>
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
};

export default connect(null, actions)(App);