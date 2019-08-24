import Web3Provider from '../../src/lib/Web3Provider' ;
import coreConstants from '../../src/config/coreConstants';
import CoreAbis from '../../src/config/CoreAbis';

class ApproveAddress {

  constructor(params) {
    const oThis = this;
    console.log(params, 'params ApproveAddress');

    oThis.senderAddress = params.address;
    oThis.privateKey = params.privateKey;
    oThis.tokenName = params.tokenName;
    oThis.approveAddress = params.approveAddress;
    oThis.chainKind = params.chainKind;
  }

  async perform() {
    const oThis = this;

    await oThis._setParams();

    await oThis._approve();

    return {success: true};
  }


  async _setParams() {
    const oThis = this;
    let web3Class = null;

    if (oThis.chainKind == coreConstants.originChainKind) {
      web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
      oThis.contractAddress = coreConstants.getOriginChainContractAddress(oThis.tokenName);

      oThis.defaultgasPrice = coreConstants.originDefaultgasPrice;
      oThis.defaultgas = coreConstants.originDefaultgas;

    } else if (oThis.chainKind == coreConstants.auxChainKind) {
      web3Class = new Web3Provider(coreConstants.AUX_WS_PROVIDER);
      oThis.contractAddress = coreConstants.getAuxChainContractAddress(oThis.tokenName);

      oThis.defaultgasPrice = coreConstants.auxDefaultgasPrice;
      oThis.defaultgas = coreConstants.auxDefaultgas;
    } else {
      throw `Invalid ${oThis.chainId}`
    }

    oThis.web3Instance = await web3Class.web3WsProvider();
  }

  async _approve() {
    const oThis = this;


    return new Promise((async (onResolve) => {

      const account = oThis.web3Instance.eth.accounts.privateKeyToAccount(oThis.privateKey);

      oThis.web3Instance.eth.accounts.wallet.add(account);

      const erc20TokenContractObj = oThis.web3Instance.eth.Contract(CoreAbis.genericErc20, oThis.contractAddress);

      erc20TokenContractObj.methods
        .approve(oThis.approveAddress, '1000000000000000000000')
        .send({
          from: oThis.senderAddress,
          gasPrice: oThis.defaultgasPrice,
          gas: oThis.defaultgas
        }).on('error', (error) => {
        console.log('Error on approval ', error);
      }).on('transactionHash', (transactionHash) => {
        console.log('Transaction hash for approval', transactionHash);
      }).on('receipt', (receipt) => {
        console.log('Receipt  for approval', receipt);
        onResolve();
      });
    }));
  }


}

export default ApproveAddress;
