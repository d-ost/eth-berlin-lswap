import Web3Provider from '../../src/lib/Web3Provider' ;
import coreConstants from '../../src/config/coreConstants';
import CoreAbis from '../../src/config/CoreAbis';


class GetBalance {

  constructor(params) {
    const oThis = this;
    console.log(params, 'params GetBalance');
    oThis.chainKind = params.chainKind;
    oThis.address = params.address;
    oThis.tokenName = params.tokenName;

    oThis.erc20TokenAbi = CoreAbis.genericErc20;
    oThis.isBaseCurrency = false;

    oThis.web3Instance = null;
    oThis.contractAddress = null;
    oThis.balance = null;
  }

  async perform() {
    const oThis = this;

    await oThis._setParams();

    await oThis._fetchBalance();

    return {success: true, data: {balance: oThis.balance}};
  }

  async _setParams() {
    const oThis = this;
    let web3Class = null;

    if (oThis.chainKind == coreConstants.originChainKind) {
      web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
      oThis.contractAddress = coreConstants.getOriginChainContractAddress(oThis.tokenName);
    } else if (oThis.chainKind == coreConstants.auxChainKind) {
      web3Class = new Web3Provider(coreConstants.AUX_WS_PROVIDER);

      if (oThis.tokenName === coreConstants.ostTokenName) {
        oThis.isBaseCurrency = true;
      } else {
        oThis.contractAddress = coreConstants.getAuxChainContractAddress(oThis.tokenName);
      }
    } else {
      throw `Invalid ${oThis.chainId}`
    }


    oThis.web3Instance = await web3Class.web3WsProvider();
  }

  async _fetchBalance() {
    const oThis = this;

    return new Promise((async (onResolve) => {

      if (oThis.isBaseCurrency) {
        oThis.web3Instance.eth.getBalance(oThis.address).then(function (balance) {
          oThis.balance = balance;
        });
      } else {
        const erc20TokenContractObj = await new oThis.web3Instance.eth.Contract(oThis.erc20TokenAbi, oThis.contractAddress);

        erc20TokenContractObj
          .methods
          .balanceOf(oThis.address)
          .call({}).then(function (balance) {
          oThis.balance = balance.toString(10);
          onResolve();
        });
      }

    }));
  }
}

export default GetBalance;
