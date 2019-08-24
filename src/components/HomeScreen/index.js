import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import style from './style';
import coreConstants from '../../config/coreConstants';
import GenerateAddress from '../../lib/GenerateAddress';
import Funder from '../../lib/Funder';
import GetBalance from '../../lib/GetBalance';
import Collapsible from 'react-collapsible';
import TokenHeader from './tokenHeader';
import Modal from "react-bootstrap/es/Modal";
import ReceiveToken from '../ReceiveToken';
import ApproveAddress from '../../lib/ApproveAddress';
import SendToken from '../SendToken';

const chains = ['origin', 'aux'];
class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: [],
      showReceiveModal: false,
      showSendModal: false,
      currentSelectedSend: null   ,
      r: Date.now()
    };
    this.getBalance();
  }


  getBalance() {
    this.checkForBurnerKey().then(res => {
      this.balances();
    });
  }

    checkForBurnerKey() {
        return new Promise(async (resolve, reject)=>{
            this.originBurnerKey = await ls.getItem(
                coreConstants.ORIGIN_BURNER_KEY,
              );
              if (this.originBurnerKey) {
                this.originBurnerKey = JSON.parse(this.originBurnerKey);
                resolve(this.originBurnerKey)
              } else {

                // this.originBurnerKey = JSON.parse(this.originBurnerKey);
                console.log("Burner Key Creation Started");

                let generateAddress = new GenerateAddress();
                 let resp = await generateAddress.perform;
                this.originBurnerKey = resp.data;
                ls.saveItem(
                  coreConstants.ORIGIN_BURNER_KEY,
                  this.originBurnerKey,
                );

                console.log("Burner Key DATA", this.originBurnerKey);

                let fundParam = {
                  address: this.originBurnerKey.address,
                  chainKind: coreConstants.originChainKind
                };

                let funder = new Funder(fundParam);

                await funder.perform().then(console.log);

                console.log("Burner Key Funding Done");

                console.log("Approve Uniswap for OST Start");

                let approveParam = {
                  address: this.originBurnerKey.address,
                  privateKey: this.originBurnerKey.privateKey,
                  tokenName: coreConstants.ostTokenName,
                  chainKind: coreConstants.originChainKind,
                  approveAddress: coreConstants.originOstUniSwapContractAddress
                };

                let approverObj1 = new ApproveAddress(approveParam);
                await approverObj1.perform().then(console.log);

                console.log("Approve Uniswap for OST Done");

                console.log("Approve Uniswap for WETH Start");

                approveParam = {
                  address: this.originBurnerKey.address,
                  privateKey: this.originBurnerKey.privateKey,
                  tokenName: coreConstants.wethTokenName,
                  chainKind: coreConstants.originChainKind,
                  approveAddress: coreConstants.originWethUniSwapContractAddress
                };

                let approverObj2 = new ApproveAddress(approveParam);
                await approverObj2.perform().then(console.log);

                console.log("Approve Uniswap for WETH Done");

                resolve(this.originBurnerKey)
              }
        });
      }

  getTokenInfo(tokenName) {
    let tokenInfoPromises = [];
    for( let cnt = 0 ; cnt< chains.length ; cnt++){
        let chainKind =  chains[cnt],
            getBalance = new GetBalance({
            address: this.originBurnerKey.address,
            chainKind,
            tokenName
          });
        tokenInfoPromises.push(getBalance.perform());
    }
    return tokenInfoPromises;
  }

  balances() {
    let tokens = coreConstants.erc20Tokens;

    for( let cnt = 0 ; cnt< tokens.length ; cnt++){
        let newBalancesPromises = this.getTokenInfo( tokens[cnt]);
        Promise.all( newBalancesPromises ).then( (res)=> {
            let balance = [];
            let tokenKey =  tokens[cnt];
            let data = {tokenInfo : [], tokenName:tokenKey };
            for(let cnt = 0 ;  cnt < res.length ; cnt++ ){
                 data.tokenInfo.push({...res[cnt]['data'], ...{tokenKind: chains[cnt]}  });
                 balance.push( data );
            }
            this.setState({ balance:  [...this.state.balance, ...balance]});
        } );

        console.log(this.state.balance, 'this.state.balance');
    }
  }

  showChainBalances(tokenInfo) {
    return tokenInfo.map((element,i) => {
      return (
        <div
          key={i}
          className="row"
          style={{borderBottom: '1px solid rgba(0,0,0,.125)', padding: '10px'}}>
          <div className="col-6 " style={{textAlign: 'left'}}>
            {element.chainKind}
          </div>
          <div className="col-6" style={{textAlign: 'right'}}>
            {element.balance}
          </div>
        </div>
      );
    });
  }

  showBalanceList() {
    let balanceList = this.state.balance;
    if(!balanceList || balanceList.length < 1) return;
    return balanceList.map((element, i) => {
      let totalBalance = 0;
      for (var i = 0; i < element.tokenInfo.length; i++) {
        totalBalance += parseInt(element.tokenInfo[i].balance);
      }
    //  console.log(totalBalance, 'totalBalance');
      return (
        <Collapsible
          key = {i}
          trigger={
            <TokenHeader
              tokenName={element.tokenName}
              totalBalance={totalBalance}
              tokenInfo={element.tokenInfo}
              showSend={this.showSendModalHandler}
            />
          }
          style={{width: '100%'}}>
          <div style={{width: '100%'}}>
            <div
              style={{
                backgroundColor: '#fff',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
              }}>
              {this.showChainBalances(element.tokenInfo)}
            </div>
          </div>
        </Collapsible>
      );
    });
  }

  headerText() {

    return (
      <div
        class="row mt-3"
        style={{backgroundColor: 'rgb(52, 68, 91)', borderRadius: '6px'}}>
        <div class="col-3">
          <div
            style={{
              fontWeight: 'bolder',
              height: '60px',
              color: 'white',
              paddingRight: '20px',
              paddingTop: '20px',
            }}>
            Tokens
          </div>
        </div>
        <div class="col-6" style={{textAlign: 'right'}}>
          <div
            style={{
              fontWeight: 'bolder',
              height: '60px',
              color: 'white',
              paddingRight: '20px',
              paddingTop: '20px',
            }}>
            Action
          </div>
        </div>
        <div class="col-3" style={{textAlign: 'right'}}>
          <div
            style={{
              fontWeight: 'bolder',
              height: '60px',
              color: 'white',
              paddingRight: '20px',
              paddingTop: '20px',
            }}>
            Balance
          </div>
        </div>
      </div>
    );
  }

  showReceiveModalHandler = () => {
    this.setState({
      showReceiveModal: true,
    });
  };

  closeReceiveModal = () => {
    this.setState({
      showReceiveModal: false,
    });
  };

  showSendModalHandler = (tokenName, balance, tokenInfo) => {
    this.setState({
      currentSelectedSend: {tokenName, balance, tokenInfo},
      showSendModal: true
    });

  };

  closeSendToken = () => {
    this.setState({
      showSendModal: false,
      currentSelectedSend: null,
    });
  };

  render() {
    console.log(this.state.balance, 'this.state.balance');
    return (
      <div className="container" style={style.homeContainer}>
        <div className="row align-items-center" style={style.header}>
          <div className="col-12" style={style.headerText}>
            L-Swap
          </div>
        </div>
        <div className="m-3">
          {this.headerText()}
          <div id="accordion">{this.showBalanceList()}</div>
          <button
            className="btn btn-primary mt-4"
            style={{backgroundColor: 'rgb(52, 68, 91)', borderColor: '#4e5d71'}}
            onClick={this.showReceiveModalHandler}>
            Receive
          </button>
        </div>
        <Modal
          show={this.state.showReceiveModal}
          onHide={this.closeReceiveModal}
          title="Receive">
          <ReceiveToken onHide={this.closeReceiveModal} />
        </Modal>
        <Modal
          show={this.state.showSendModal}
          onHide={this.closeSendToken}
          title="Receive">
          <SendToken onHide={this.closeSendToken}  currentSelectedSend={this.state.currentSelectedSend}  />
        </Modal>
      </div>
    );
  }
}

export default Homescreen;
