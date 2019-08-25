import React, {Component} from 'react';
import PinInput from "react-pin-input";

class RecoverWallet extends Component {
  
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
        publicAddressError: false,
        
        qrcodeValue: null,
        showQR: false,
        noUser : true,

        isBalance: true,

        deployBtnText: "CREATE"
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

  onSubmit = async () => {
    if(!this.isValid()) return;
    

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          
          { this.state.noUser && ( 
              <form style={{margin: "0 auto" ,  marginTop: "50px"}}>
              
              <div className="form-group" style={{textAlign: "left"}}>
                <label>Username</label>
                <input type="text" className="form-control" id="exampleInputEmail1" 
                      autoFocus={true}
                        onChange={this.onUserNameChange}
                        aria-describedby="emailHelp" placeholder="User name" />
                <small id="emailHelp" style={{fontSize: "10px"}} className="form-text text-muted">
                  Please enter username for your wallet, min 5 charcters.</small>
                {this.state.usernameError && ( <span style={{fontSize: "10px" , color: "red"}}>
                  Please enter a valid username </span> )}
              </div>

              <div className="form-group" style={{textAlign: "left"}}>
                <label>Enter Pin</label>
                <PinInput 
                    length={6} 
                    initialValue=''
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
                style={{width: "260px"}}>  RECOVER SAFE </button>

            </form>
          ) }
      
         </div> 
      </div>
    );
  }
}

export default RecoverWallet;
