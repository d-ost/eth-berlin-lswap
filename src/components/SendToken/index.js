import React, {Component} from 'react';
import style from './style';
import {Dropdown, ButtonGroup, Button} from 'react-bootstrap';
import QrReader from 'react-qr-reader';
import coreConstants from '../../config/coreConstants';
import GetSendOptions from '../../lib/GetSendOptions';
import ls from '../../lib/localStorage';
import Send from '../../lib/Send';

class SendToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcodeValue: '',
      amountToSend: 0,
      sendScreen: false,
      amountError: '',
      successMessage: '',
    };
    this.AuxBurnerKey = null;
    this.checkedSteps = [];
  }

  handleError = () => {};

  handleScan = data => {
    if (data) {
      this.setState({
        qrcodeValue: data,
      });
    }
  };

  changeAmount = event => {
    this.setState({
      amountToSend: event.target.value,
    });
  };

  sendAmount = async () => {
    let senderOriginAddress = JSON.parse(
      await ls.getItem(coreConstants.ORIGIN_BURNER_KEY),
    ).address;
    let senderAuxAddress =
      (await ls.getItem(coreConstants.AUX_BURNER_KEY)) &&
      JSON.parse(await ls.getItem(coreConstants.AUX_BURNER_KEY)).address;

    let senderObj = {
      sendTokenName: this.props.currentSelectedSend.tokenName,
      sendTokenAmount: this.state.amountToSend,
      senderOriginAddress: senderOriginAddress,
      senderAuxAddress: senderAuxAddress,
      receiveOption: JSON.parse(this.state.qrcodeValue),
      senderBalance: {
        [this.props.currentSelectedSend.tokenName]: this.props
          .currentSelectedSend.tokenInfo,
      },
    };

    let getSendOptions = new GetSendOptions(senderObj);
    this.sendConfig = await getSendOptions.perform();

    if (this.sendConfig.success) {
      this.setState({sendScreen: true});
    } else {
      this.setState({
        amountError: this.sendConfig.errMsg,
      });
      console.log(this.sendConfig.errMsg);
    }
  };

  showSendScreen() {
    let data = this.sendConfig.data;
    let mapped = data.stepsConfig.map(config => {
      let val = Object.values(config)[0];
      this.checkedSteps.push(Object.keys(config)[0]);      
      return (
        <div
          className="custom-control custom-checkbox m-3"
          style={{color: '#4d5d71'}}>
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck"
            name={Object.keys(config)[0]}
            defaultChecked={true}
            onChange={this.handleInputChange}
            disabled={val.mandatory}
          />
          <label className="custom-control-label" htmlFor="customCheck">
            {val.msg}
          </label>
        </div>
      );
    });

    return (
      <div>
        {mapped}
        <div className="row">
          <button
            className="btn btn-primary my-4 mx-auto"
            style={{
              backgroundColor: 'rgb(52, 68, 91)',
              borderColor: '#4e5d71',
            }}
            onClick={this.finalSend}>
            Send
          </button>
          {this.state.successMessage && (
            <div class="alert alert-success" role="alert">
              {this.state.successMessage}
            </div>
          )}
        </div>
      </div>
    );
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    var index = this.checkedSteps.indexOf(name);
    if (!value) {
      if (index !== -1) this.checkedSteps.splice(index, 1);
    } else {
      if (index < 0) this.checkedSteps.push(name);
    }
  };

  finalSend = async () => {
    let senderOriginAddress = JSON.parse(
      await ls.getItem(coreConstants.ORIGIN_BURNER_KEY),
    ).address;
    let senderAuxAddress =
      (await ls.getItem(coreConstants.AUX_BURNER_KEY)) &&
      JSON.parse(await ls.getItem(coreConstants.AUX_BURNER_KEY)).address;

    let senderObj = {
      sendTokenName: this.props.currentSelectedSend.tokenName,
      sendTokenAmount: this.state.amountToSend,
      senderOriginAddress: senderOriginAddress,
      senderAuxAddress: senderAuxAddress,
      receiveOption: JSON.parse(this.state.qrcodeValue),
      senderBalance: {
        [this.props.currentSelectedSend.tokenName]: this.props
          .currentSelectedSend.tokenInfo,
      },
      steps: this.checkedSteps,
      senderOriginAddressPrivateKey: JSON.parse(
        await ls.getItem(coreConstants.ORIGIN_BURNER_KEY),
      ).privateKey,
    };

    let send = new Send(senderObj),
      response = await send.perform();
    if (response.success) {
      this.setState({successMessage: 'Transaction Successful!'});
    } else {
      console.log(response, response.error, 'fffffffff')
    }
    console.log(response, 'senderObjsenderObjsenderObjsenderObj');
  };

  showSendScreenHandler = () => {
    return this.state.sendScreen
      ? this.showSendScreen()
      : this.showFirstScreens();
  };

  showFirstScreens = () => {
    return this.state.qrcodeValue ? (
      <div>
        <div style={{backgroundColor: '#fff', color: '#4d5d71'}}>
          <div className="form-group m-3">
            <label htmlFor="formGroupExampleInput">Amount</label>
            <input
              type="number"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter amount here"
              value={this.state.amountToSend}
              onChange={this.changeAmount}
            />
            {this.state.amountError && (
              <div class="alert alert-danger" role="alert">
                {this.state.amountError}
              </div>
            )}
            {/* <div style={{color: 'red'}}></div> */}
          </div>
          <div className="row">
            <button
              className="btn btn-primary my-4 mx-auto"
              style={{
                backgroundColor: 'rgb(52, 68, 91)',
                borderColor: '#4e5d71',
              }}
              onClick={this.sendAmount}>
              Send
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="row justify-content-center my-4">
          {/* <QR style={{width: '500px', height: '500px'  }} className='align-self-center' value={this.state.qrcodeValue}/> */}

          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{width: '300px', height: '300px'}}
          />
        </div>
        <div className="row">
          <button
            className="btn btn-primary my-4 mx-auto"
            style={{
              backgroundColor: 'rgb(52, 68, 91)',
              borderColor: '#4e5d71',
            }}
            onClick={this.props.onHide}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div style={style.homeContainer}>
        <div className=" align-items-center px-auto" style={style.header}>
          <div className="ml-3 pt-2" style={style.headerText}>
            Send
          </div>
        </div>
        {this.showSendScreenHandler()}
      </div>
    );
  }
}

export default SendToken;
