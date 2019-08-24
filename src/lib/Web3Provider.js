const Web3 = require('web3');

const web3Clients = {};

class Web3Provider {

  constructor(wsProvider) {
    const oThis = this;
    console.log(wsProvider, 'params wsProvider');

    oThis.wsProvider = wsProvider;
  }

  async web3WsProvider() {
    const oThis = this;

    var web3 = web3Clients[oThis.wsProvider];
    if (web3) {
      return web3;
    }

    var web3 = new Web3(oThis.wsProvider);
    web3.transactionConfirmationBlocks = 2;
    web3Clients[oThis.wsProvider] = web3;

    return web3;
  }

}

export default Web3Provider;