import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Homescreen from './components/HomeScreen';
import CreateWallet from "./components/CreateWallet";
import RecoverWallet from "./components/RecoverWallet";

import Header from "./components/Landing/header";
import Friends from './components/Friends';

const App = () => (
  <HashRouter basename={window.location.pathname}>
    <React.Fragment>
      <div className="container App">
        <Header/>
        <div className="row">
          <div className="col-12">
            <Route exact path="/" component={Homescreen} />
            <Route path="/create-wallet" component={CreateWallet} />
            <Route path="/recover-wallet" component={RecoverWallet} />
            <Route path="/friends" component={Friends} />
          </div>
        </div>
      </div>
    </React.Fragment>
  </HashRouter>
);

export default App;
