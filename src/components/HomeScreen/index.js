import React, {Component} from 'react';
import ls from '../../lib/localStorage';
import coreConstants from '../../config/coreConstants';
import GenerateAddress from '../../lib/GenerateAddress';
import GetBalance from  '../../lib/GetBalance';


const chains = ['origin', 'aux'];
 class Homescreen extends Component{
    constructor(props){
        super(props);
        this.state = {balance: []};
    }

    componentDidMount(){
        console.log(' i m here')
        this.getBalance();

    }


    getBalance(){
        this.checkForBurnerKey().then(res=>{
            this.balances();
        });

    }


    checkForBurnerKey() {        
        return new Promise(async (resolve, reject)=>{
            this.originBurnerKey = await ls.getItem(
                coreConstants.ORIGIN_BURNER_KEY,
              );
              if (this.originBurnerKey) {
                resolve(this.originBurnerKey)
              } else {
              //   call to create one
                let generateAddress = new GenerateAddress()
                this.originBurnerKey = await generateAddress.perform;
                ls.saveItem(
                  coreConstants.ORIGIN_BURNER_KEY,
                  this.originBurnerKey.data,
                );
                resolve(this.originBurnerKey)

              }


        });

      }

        getTokenInfo (tokenName) {
            console.log(tokenName, 'tokenname');
          chains.map(async (chainKind, id)=> {
            console.log(tokenName, 'tokenname 1212');
              console.log(this.originBurnerKey);
              let getBalance = new GetBalance({address: JSON.parse(this.originBurnerKey).address, chainKind, tokenName })
              console.log(this.originBurnerKey, 'getBalancegetBalancegetBalance');

              let balance = await getBalance.perform();
              console.log(balance, 'i mjnvjenvjernvjenvjen');
            //   this.setState({balance: [...this.state.balance, ...balance]})

          });
      }

        balances(){
          let tokens = coreConstants.erc20Tokens;
          console.log(coreConstants.erc20Tokens, 'coreConstants');
        tokens.map((token, index) => {
                this.getTokenInfo(token);
          });
      }

       render(){
          return <div>
              LSWAP
                <div>
                    {this.state.balance}
                </div>

          </div>
      }

}

export default Homescreen;

