
import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import style from './style';

import {Button,  Form} from "react-bootstrap";
import { Link } from 'react-router-dom';
import PinInput from "react-pin-input";

class CreateWallet extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          
          <form style={{margin: "0 auto" ,  marginTop: "50px"}}>
           
            <div className="form-group" style={{textAlign: "left"}}>
              <label>Username</label>
              <input type="email" className="form-control" id="exampleInputEmail1" 

                     aria-describedby="emailHelp" placeholder="User name" />
              <small id="emailHelp" style={{fontSize: "10px"}} className="form-text text-muted">
                Please enter username for your wallet, min 5 charcters.</small>
            </div>

            <div className="form-group" style={{textAlign: "left"}}>
             <label>Set Pin</label>
              <PinInput 
                  length={6} 
                  initialValue=""
                  secret 
                  onChange={(value, index) => {}} 
                  type="numeric" 
                  style={{padding: '10px'}}  
                  inputStyle={{borderColor: 'red'}}
                  inputFocusStyle={{borderColor: 'blue'}}
                  onComplete={(value, index) => {}}
                />
            </div>  

            <div className="form-group" style={{textAlign: "left"}}>
             <label>Confrim Pin</label>
              <PinInput 
                  length={6} 
                  initialValue=""
                  secret 
                  onChange={(value, index) => {}} 
                  type="numeric" 
                  style={{padding: '10px'}}  
                  inputStyle={{borderColor: 'red'}}
                  inputFocusStyle={{borderColor: 'blue'}}
                  onComplete={(value, index) => {}}
                />
            </div>  
           
            <button className="btn btn-outline-secondary" style={{width: "260px"}}>  RECOVER WALLET  </button>


          </form>

         </div> 
      </div>
    );
  }
}

export default CreateWallet;
