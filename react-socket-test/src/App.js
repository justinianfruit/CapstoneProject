import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Landing from './Landing';
import BuildTool from './BuildTool';
import Chat from './Chat';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    {<Route exact path="/" component={Landing} />}
                    {<Route path="/buildtool" component={BuildTool} />}
                    {<Route path="/chat" component={Chat} />}
                    <Chat />
                </div>
            </BrowserRouter>
        );
    }
};

export default connect(null, actions)(App);
