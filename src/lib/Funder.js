import Web3Provider from '../../src/lib/Web3Provider' ;
import coreConstants from '../../src/config/coreConstants';

class Funder {

  constructor(params) {
    const oThis = this;
    console.log(params, 'params Funder');

    oThis.address = params.address;
    oThis.chainKind = params.chainKind;

    oThis.web3Instance = null;
  }

  async perform() {
    const oThis = this;

    await oThis._setParams();

    await oThis._fund();

    return {success: true, data: {balance: oThis.balance}};
  }

  async _setParams() {
    const oThis = this;
    let web3Class = null;

    if (oThis.chainKind == coreConstants.originChainKind) {
      web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
      oThis.funderAddress = coreConstants.ethFunderAddress;
      oThis.defaultgasPrice = coreConstants.originDefaultgasPrice;
      oThis.defaultgas = coreConstants.originDefaultgas;

    } else if (oThis.chainKind == coreConstants.auxChainKind) {
      web3Class = new Web3Provider(coreConstants.AUX_WS_PROVIDER);
      oThis.funderAddress = coreConstants.ostFunderAddress;
      oThis.defaultgasPrice = coreConstants.auxDefaultgasPrice;
      oThis.defaultgas = coreConstants.auxDefaultgas;
    } else {
      throw `Invalid ${oThis.chainId}`
    }

    oThis.web3Instance = await web3Class.web3WsProvider();
  }

  async _fund() {
    const oThis = this;

    const account = oThis.web3Instance.eth.accounts.privateKeyToAccount(oThis.funderAddress.privateKey);
    console.log('address ', account.address);

    oThis.web3Instance.eth.accounts.wallet.add(account);

    return oThis.web3Instance.eth.sendTransaction(
      {
        from: oThis.funderAddress.address,
        to: oThis.address,
        value: oThis.funderAddress.fundAmount,
        gasPrice: oThis.defaultgasPrice,
        gas: oThis.defaultgas
      }
    ).on('error', (error) => {
      console.log('Error on fund ', error);
    }).on('transactionHash', (transactionHash) => {
      console.log('Transaction hash for fund', transactionHash);
    }).on('receipt', (receipt) => {
      console.log('Receipt for fund', receipt);
    });
  }


}

export default Funder;
