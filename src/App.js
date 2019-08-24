import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Homescreen from './components/HomeScreen';
import CreateWallet from "./components/CreateWallet";
import RecoverWallet from "./components/RecoverWallet";

import Header from "./components/Landing/header";

const App = () => (
  <HashRouter basename={window.location.pathname}>
    <React.Fragment>
      <div className="container App">
        <Header/>
        <div className="row">
          <div className="col-12">
            <Route exact path="/" component={Landing} />
            <Route path="/lswap" component={Homescreen} />
            <Route path="/create-wallet" component={CreateWallet} />
            <Route path="/recover-wallet" component={RecoverWallet} />
          </div>
        </div>
      </div>
    </React.Fragment>
  </HashRouter>
);

export default App;
