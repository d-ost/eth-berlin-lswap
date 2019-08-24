
import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import style from './style';

import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

class RecoverWallet extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
            Recover Wallet
         </div> 
      </div>
    );
  }
}

export default RecoverWallet;
