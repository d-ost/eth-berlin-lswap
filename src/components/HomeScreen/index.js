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
import ReceiveToken from '../ReceiveToken'



const chains = ['origin', 'aux'];
class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {balance: [], showReceiveModal: false, showSendModal: false};
  }

    componentDidMount(){
        this.getBalance();

    }

    getBalance(){
        this.checkForBurnerKey().then(res=>{
          console.log("Getting Balance");
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
                console.log("Burner Key Creation Started");

                let generateAddress = new GenerateAddress();
                 let resp = await generateAddress.perform;
                this.originBurnerKey = resp.data;
                ls.saveItem(
                  coreConstants.ORIGIN_BURNER_KEY,
                  this.originBurnerKey,
                );

                let fundParam = {
                  address: this.originBurnerKey.address,
                  chainKind: coreConstants.originChainKind
                };
                let funder = new Funder(fundParam);

                await funder.perform();

                console.log("Burner Key Funding Done");
                resolve(this.originBurnerKey)
              }
        });
      }

        getTokenInfo (tokenName) {
          let tokenInfo = [];
          chains.map(async (chainKind, id)=> {
              
              let getBalance = new GetBalance({address: this.originBurnerKey.address, chainKind, tokenName });

              let balance = await getBalance.perform();
              tokenInfo.push({chainKind, balance: '1234'});
              // this.setState({balance: [...this.state.balance, ...balance]})

          });
            this.setState({
                balance: [...this.state.balance, ...[{tokenName, tokenInfo}]],
            });
      }

  balances() {
    let tokens = coreConstants.erc20Tokens;
    tokens.map((token, index) => {
      this.getTokenInfo(token);
    });
  }

  showChainBalances(tokenInfo){
      return tokenInfo.map((element)=>{
          console.log(element, '================');
          return <div className='row' style={{'borderBottom': '1px solid rgba(0,0,0,.125)', padding: '10px'}}>
              <div className='col-6 ' style={{textAlign: 'left'}}>
                  {element.chainKind}
                  </div>
                  <div className='col-6' style={{textAlign: 'right'}}>
                  {element.balance}
                  </div>
          </div>
      })

  }

  showBalanceList() {
    let balanceList = this.state.balance;
    return balanceList.map((element, i) => {
      let totalBalance = 0;
      for (var i = 0; i < element.tokenInfo.length; i++) {
        totalBalance += parseInt(element.tokenInfo[i].balance);
      }
      return (
        <Collapsible
          trigger={
            <TokenHeader
              tokenName={element.tokenName}
              totalBalance={totalBalance}
            />

          }
          style={{width:'100%'}}>
          <div style={{width: '100%'  }} >
            <div style={{backgroundColor: '#fff', borderBottomLeftRadius: '8px', borderBottomRightRadius:'8px'}} >
                {this.showChainBalances(element.tokenInfo)}
                </div>
          </div>
        </Collapsible>
      );
    });
  }

  headerText() {
    return (<div class="row mt-3" style={{ backgroundColor:'rgb(52, 68, 91)', borderRadius: '6px' }}>
      <div class="col-3">
        <div style={{fontWeight: 'bolder', height: '60px', color: 'white', paddingRight: '20px', paddingTop: '20px'}}>
           Tokens
        </div>
      </div>
      <div class="col-6" style={{textAlign: 'right'}}>
        <div style={{fontWeight: 'bolder', height: '60px', color: 'white', paddingRight: '20px', paddingTop: '20px'}}>
          Action
        </div>
      </div>
      <div class="col-3" style={{textAlign: 'right'}}>
        <div style={{fontWeight: 'bolder', height: '60px', color: 'white', paddingRight: '20px', paddingTop: '20px'}}>
          Balance
        </div>
      </div>

    </div>)
  }

  showReceiveModalHandler =() => {
      this.setState({
        showReceiveModal: true
      });

  }

  closeReceiveModal = () => {
    this.setState({
        showReceiveModal: false
      });
  }

  render() {
    return (
      <div className="container" style={style.homeContainer}>
        <div className="row align-items-center" style={style.header}>
          <div className="col-12" style={style.headerText}>
            L-Swap
          </div>
        </div>
        <div className='m-3'>
        {this.headerText()}
        <div id="accordion">{this.showBalanceList()}</div>
        <button className='btn btn-primary mt-4' style={{backgroundColor: 'rgb(52, 68, 91)',  borderColor: '#4e5d71'}}  onClick={this.showReceiveModalHandler} >Receive</button>
        </div>
        <Modal show={this.state.showReceiveModal}
            onHide={this.closeReceiveModal}
            title='Receive'>
                 <ReceiveToken />
            </Modal>

      </div>
    );
  }
}

export default Homescreen;
