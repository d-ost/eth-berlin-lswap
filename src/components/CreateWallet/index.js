
import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import style from './style';

import {Button,  Form} from "react-bootstrap";
import { Link } from 'react-router-dom';
import PinInput from "react-pin-input";

import Web3Provider from '../../../src/lib/Web3Provider' ;

import coreConstants from '../../../src/config/coreConstants';
import { async } from 'q';

import Modal from "react-bootstrap/es/Modal";
import ReceiveToken from "../ReceiveToken";
import { QR } from 'rimble-ui';

import GetBalance from '../../lib/GetBalance';

const localStorageKey =  "id_current_user" ; 

class CreateWallet extends Component {
  
  constructor(props) {
    super(props);

      this.state = {
        username : '', 
        pin: '', 
        confrimPin : '',
        publicAddress: '',

        usernameError: false , 
        pinError: false, 
        confrimPinError : false,
        publicAddressError: false,
        
        qrcodeValue: null,
        showQR: false,
        noUser : true,

        isBalance: true,

        deployBtnText: "CREATE"
    }


    ls.getItem("id_current_user").then(( res )=>{
        this.setState({ noUser : !res})  
    })
  }

  onUserNameChange = (event) => {
    this.setState({username:  event.target.value});
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

  onSubmit = async () => {
    if(!this.isValid()) return;
    
    let web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
    let web3Instance = await web3Class.web3WsProvider();
    let account = web3Instance.eth.accounts.create() ;

    ls.saveItem( localStorageKey , {address : account.address , privateKey : account.privateKey}  );
    ls.saveItem( "current_user_name" , this.state.username  );
    ls.saveItem( "current_user_pin" , this.state.pin  );
  
    this.setState({qrcodeValue: JSON.stringify( {"address": account.address}) ,  showQR: true , noUser: false});

  }

  onConfrim = () => {
    this.setState({
      showQR: false
    });
  }

  onShowQR = () => {
    ls.getItem( localStorageKey).then((res)=> {
      res = res && JSON.parse(res);
      this.setState({qrcodeValue: JSON.stringify( {"address": res.address}) ,  showQR: true});
    });
  }

  onDeploy = ( ) => {
    ls.getItem( localStorageKey).then(async (res)=> {
      res = res && JSON.parse(res);
      let web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
      let web3Instance = await web3Class.web3WsProvider();
      web3Instance.eth.getBalance(res.address).then((balance)=> {
        if( !!balance ){
          this.setState({ isBalance : true });
          this.startDeployment();
        }else{
          this.setState({ isBalance : false });
        }
      });
    });
  }

  startDeployment = () => {
    this.setState({deployBtnText: "CREATEING..."});
    //TODO deploy contract 
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          
          { this.state.noUser && ( 
                <form style={{margin: "0 auto" ,  marginTop: "50px"}}>
              
              <div className="form-group" style={{textAlign: "left"}}>
                <label>Username</label>
                <input type="text" className="form-control" 
                        style={{backgroundColor: "#fff"}}
                        autocomplete="off"
                        autoFocus={true}
                        onChange={this.onUserNameChange}
                        placeholder="Username" />
                <small id="emailHelp" style={{fontSize: "10px"}} className="form-text text-muted">
                  Please enter username for your wallet, min 5 charcters.</small>
                {this.state.usernameError && ( <span style={{fontSize: "10px" , color: "red"}}>
                  Please enter a valid username </span> )}
              </div>

              <div className="form-group" style={{textAlign: "left"}}>
                <label>Set Pin</label>
                <PinInput 
                    length={6} 
                    initialValue=''
                    autoFocus={false}
                    focus={false}
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
                    initialValue=''
                    secret 
                    focus={false}
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
                style={{width: "260px"}}>  CREATE SAFE </button>

            </form>
          ) }

        { !this.state.noUser && (
          <React.Fragment>
            <div className="col-6" style={{marginTop: "30px" , textAlign: "right"}}>
                <button className="btn btn-outline-secondary"
                        onClick={this.onShowQR}
                        style={{width: "260px"}}> SHOW QR </button>
             </div>  

            <div className="col-6"  style={{marginTop: "30px", textAlign: "left"}}>
                <button className="btn btn-outline-secondary"
                        onClick={this.onDeploy}
                        style={{width: "260px"}}> {this.state.deployBtnText} </button>   
            </div>  

            {!this.state.isBalance && (<span> Insufficient balance to setup a recovery wallet </span>)}  
           </React.Fragment>       
        )}

        
         </div> 

         <Modal show={this.state.showQR}
                backdrop={false}
                size="lg"
            title='Minimum Balance'>
               <div style={{padding: "50px" , textAlign: "center"}}>
                  <div  style={{marginBottom: "20px"}}> 
                    Minimum balance required to create recovery wallet is 0.001 ETH 
                  </div>
                  <QR style={{width: '70%', height: 'auto', marginRight: 'auto', marginLeft: 'auto'}}
                  value={this.state.qrcodeValue}/>
                 <button className="btn btn-outline-secondary"
                         onClick={this.onConfrim}
                         style={{width: "260px" , marginTop: "20px"}}>OK</button>
                </div> 
            </Modal>
      </div>
    );
  }
}

export default CreateWallet;
