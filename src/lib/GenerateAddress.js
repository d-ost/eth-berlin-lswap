const rootPrefix = '../../',
  Web3 = require('web3');

class GenerateAddress {

  constructor() {}

  get perform() {
    const web3Object = new Web3();
    let newAddress = web3Object.eth.accounts.create(web3Object.utils.randomHex(32));
    return {success: true, data: {publicKey: newAddress.address, privateKey: newAddress.privateKey}};
  }

}

module.exports = GenerateAddress;