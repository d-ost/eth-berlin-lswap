const rootPrefix = '../../',
  Web3 = require('web3'),
  coreConstants = require(rootPrefix + 'src/config/coreConstants');

const web3Clients = {};

class Web3Provider {

  constructor(wsProvider) {
    const oThis = this;


    oThis.wsProvider = wsProvider;
  }

  get web3WsProvider() {
    const oThis = this;

    var web3 = web3Clients[oThis.wsProvider];
    if (web3) {
      return web3;
    }

    var web3 = new Web3(oThis.wsProvider);
    web3Clients[oThis.wsProvider] = web3;

    return web3;
  }

}

module.exports = Web3Provider;