
import Web3 from "web3";


class GenerateAddress {

  constructor() {}

  get perform() {
    const web3Object = new Web3();
    let newAddress = web3Object.eth.accounts.create(web3Object.utils.randomHex(32));
    return {success: true, data: {address: newAddress.address, privateKey: newAddress.privateKey}};
  }

}

export default GenerateAddress;