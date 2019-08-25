import React, {Component} from 'react';
import style from './style';
import {Dropdown, ButtonGroup, Button} from 'react-bootstrap';
import { QR } from 'rimble-ui';
import ls from '../../lib/localStorage';
import coreConstants from '../../config/coreConstants';

class ReceiveToken extends Component {
  constructor(props) {
    super(props);
    this.state = {currency: 'OST', chain: 'ORIGIN', qrcodeValue: ''};
    this.AuxBurnerKey = null;
  }

  async componentDidMount(){
    this.AuxBurnerKey =  await ls.getItem(coreConstants.AUX_OWNER_KEY);
  }

  selectCurrency = eventKey => {
    console.log('selectCurrency', eventKey);
    this.setState({
      currency: eventKey,
    });
  };

  selectChain = eventKey => {
    this.setState({
        chain: eventKey,
      });

  }

    generateQRCode = () => {
      console.log('generateQRCode');
      ls.getItem(coreConstants.ORIGIN_BURNER_KEY).then((originBurnerKey)=>{
      let qrcodeValue = {
        originAddress: JSON.parse(originBurnerKey).address,
        preferredToken: this.state.currency,
        allowAux: this.state.chain == 'AUX' ? 1 : 0
    }

    if(this.AuxBurnerKey){
        qrcodeValue.safeContractAddress =   JSON.parse(this.AuxBurnerKey).safeContractAddress;
    }
      this.setState({qrcodeValue: JSON.stringify(qrcodeValue)});
      console.log(originBurnerKey, 'originBurnerKey');
      });

  }

  render() {
    return (
      <div style={style.homeContainer}>
        <div className=" align-items-center px-auto" style={style.header}>
          <div className="ml-3 pt-2" style={style.headerText}>
            Receive
          </div>
        </div>
        { ! this.state.qrcodeValue ? 
        <div>
          <div style={{backgroundColor: '#fff', color: '#4d5d71'}}>
            <div className="row m-3">
              <div className="col-4 pt-2"> Currency </div>
              <div className="col-8">
                <Dropdown
                  as={ButtonGroup}
                  style={{float: 'right'}}                  
                  onSelect={this.selectCurrency}>
                  <Button
                    style={{
                      backgroundColor: '#33445b',
                      borderColor: '#33445b',
                    }}>
                    {this.state.currency}
                  </Button>
                  <Dropdown.Toggle
                    style={{backgroundColor: '#33445b', borderColor: '#33445b'}}
                    split
                    variant="success"
                    id="dropdown-custom-2"
                  />
                  <Dropdown.Menu className="super-colors">
                    <Dropdown.Item eventKey="OST">OST</Dropdown.Item>
                    <Dropdown.Item eventKey="WETH">WETH</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              
            </div>
            {
                this.AuxBurnerKey &&
                <div className="row m-3">
                <div className="col-4 pt-2"> Select chain </div>
                <div className="col-8">
                  <Dropdown
                    as={ButtonGroup}
                    style={{float: 'right'}}
                    value="1"
                    onSelect={this.selectChain}>
                    <Button
                      style={{
                        backgroundColor: '#33445b',
                        borderColor: '#33445b',
                      }}>
                      {this.state.chain}
                    </Button>
                    <Dropdown.Toggle
                      style={{backgroundColor: '#33445b', borderColor: '#33445b'}}
                      split
                      variant="success"
                      id="dropdown-custom-2"
                    />
                    <Dropdown.Menu className="super-colors">
                      <Dropdown.Item eventKey="AUX">AUX</Dropdown.Item>
                      <Dropdown.Item eventKey="ORIGIN">ORIGIN</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>              
              </div>  
            }            
           
            <div class='row'>
            <button className='btn btn-primary my-4 mx-auto' style={{backgroundColor: 'rgb(52, 68, 91)',  borderColor: '#4e5d71'}}  onClick={this.generateQRCode} >Generate QR Code</button>
            </div>


          </div>
        </div> : 
        <div>
        <div className='row justify-content-center my-4'>
            <QR style={{width: '200px', height: '200px'  }} className='align-self-center' value={this.state.qrcodeValue}/>
        </div>
         <div class='row'>
         <button className='btn btn-primary my-4 mx-auto' style={{backgroundColor: 'rgb(52, 68, 91)',  borderColor: '#4e5d71'}}  onClick={this.props.onHide} >Cancel</button>
         </div>
         </div>





    }
      </div>
    );
  }
}

export default ReceiveToken;
