import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import style from './style';

import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

class Landing extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12" style={{marginTop: "30px"}}>
            <Button style={{width: "250px"}}
               variant="outline-primary">
                <Link to="/create-wallet"> CREATE WALLET</Link>
            </Button>
          </div>  
          <div className="col-12"  style={{marginTop: "30px"}}>
            <Button style={{width: "250px"}}
                variant="outline-secondary">
                  <Link to="recover-wallet"> RECOVER WALLET </Link>
               </Button>
          </div>  
         </div> 
      </div>
    );
  }
}

export default Landing;
