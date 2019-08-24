
import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import style from './style';

import {Button,  Form} from "react-bootstrap";
import { Link } from 'react-router-dom';
import PinInput from "react-pin-input";

class CreateWallet extends Component {
  
  constructor(props) {
    super(props);

      this.state = {
        username : null, 
        pin: '', 
        confrimPin : '',
        publicAddress: null,

        usernameError: false , 
        pinError: false, 
        confrimPinError : false,
        publicAddressError: false     
    }
  }

  onUserNameChange = (val) => {
    this.setState({username: val});
}

  onPin = (val) => {
    this.setState({pin: val});
  }

  onConfrimPin = (val) => {
      this.setState({confrimPin: val});
  }

  onPublicAddress = (val) => {
      this.setState({publicAddress: val});
  }

  isValid = () => {
      let usernameError =  false , pinError =  false , publicAddressError = false, 
          confrimPinError = false  
      ; 
      this.setState({ usernameError , pinError , publicAddressError , confrimPinError });
      if(!this.state.username){
          usernameError = true ;
      }

      if(!this.state.pin || String(this.state.pin).length < 6){
          pinError = true ;
      }

      if( !this.state.confrimPin  || this.state.pin != this.state.confrimPin ){
          confrimPinError =  true;
      }

      this.setState({ usernameError , pinError , publicAddressError , confrimPinError });
      return !usernameError && !pinError &&  !publicAddressError && !confrimPinError;
  } 

  onSubmit = () => {
    if(!this.isValid()) return;
    //TODO check for balance 
    //Create private and public key 
    //IF not balance show QR with message 
    //IF balance start deployment 
    //Set user in local storage

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          
          <form style={{margin: "0 auto" ,  marginTop: "50px"}}>
           
            <div className="form-group" style={{textAlign: "left"}}>
              <label>Username</label>
              <input type="text" className="form-control" id="exampleInputEmail1" 
                      onChange={this.onUserNameChange}
                     aria-describedby="emailHelp" placeholder="User name" />
              <small id="emailHelp" style={{fontSize: "10px"}} className="form-text text-muted">
                Please enter username for your wallet, min 5 charcters.</small>
              {this.state.usernameError && ( <span style={{fontSize: "10px" , color: "red"}}>
                Please enter a valid username </span> )}
            </div>

            <div className="form-group" style={{textAlign: "left"}}>
             <label>Set Pin</label>
              <PinInput 
                  length={6} 
                  initialValue=""
                  secret 
                  onChange={(value, index) => { this.onPin( value ) }} 
                  type="numeric" 
                  style={{padding: '10px'}}  
                  inputStyle={{borderColor: 'red'}}
                  inputFocusStyle={{borderColor: 'blue'}}
                  onComplete={(value, index) => {}}
                />
                  {this.state.pinError && ( <span style={{fontSize: "10px" , color: "red"}}>
                Please enter a valid pin </span> )}
            </div>  

            <div className="form-group" style={{textAlign: "left"}}>
             <label>Confrim Pin</label>
              <PinInput 
                  length={6} 
                  initialValue=""
                  secret 
                  onChange={(value, index) => { this.onConfrimPin( value ) }} 
                  type="numeric" 
                  style={{padding: '10px'}}  
                  inputStyle={{borderColor: 'red'}}
                  inputFocusStyle={{borderColor: 'blue'}}
                  onComplete={(value, index) => {}}
                />
                 {this.state.confrimPinError && ( <span style={{fontSize: "10px" , color: "red"}}>
                Please enter a valid pin </span> )}
            </div>  
           
            <button className="btn btn-outline-secondary"
                onClick={this.onSubmit}
             style={{width: "260px"}}>  CREATE WALLET  </button>


          </form>

         </div> 
      </div>
    );
  }
}

export default CreateWallet;
