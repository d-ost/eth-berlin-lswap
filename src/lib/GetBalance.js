const rootPrefix = '../..',
  CoreAbis = require(rootPrefix + '/src/config/CoreAbis'),
  Web3Provider = require(rootPrefix + '/src/lib/Web3Provider'),
  coreConstants = require(rootPrefix + '/src/config/coreConstants');

class GetBalance {

  constructor(params) {
    const oThis = this;

    oThis.chainKind = params.chainKind;
    oThis.address = params.address;
    oThis.tokenName = params.tokenName;

    oThis.erc20TokenAbi = CoreAbis.genericErc20;
    oThis.isBaseCurrency = false;

    oThis.web3Instance = null;
    oThis.contractAddress = null;
    oThis.erc20TokenAbi = null;
    oThis.balance = null;
  }

  async perform() {
    const oThis = this;

    await oThis._seParams();

    await oThis._fetchBalance();

    return {success: true, data: {balance: oThis.balance}};
  }

  async _seParams() {
    const oThis = this;

    if (oThis.chainKind == coreConstants.originChainKind) {
      oThis.web3Instance = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER).web3WsProvider;
      oThis.contractAddress = coreConstants.getOriginChainContractAddress(oThis.tokenName);
    } else if (oThis.chainKind == coreConstants.auxChainKind) {
      oThis.web3Instance = new Web3Provider(coreConstants.AUX_WS_PROVIDER).web3WsProvider;

      if (oThis.tokenName === coreConstants.ostTokenName) {
        oThis.isBaseCurrency = true;
      } else {
        oThis.contractAddress = coreConstants.getAuxChainContractAddress(oThis.tokenName);
      }
    }
    else {
      throw `Invalid ${oThis.chainId}`
    }
  }

  async _fetchBalance() {
    const oThis = this;

    if (oThis.isBaseCurrency) {
      return oThis.web3Instance.eth.getBalance(oThis.address).then(function (balance) {
        oThis.balance = balance;
      });
    } else {
      const erc20TokenContractObj = oThis.web3Instance.eth.Contract(oThis.erc20TokenAbi, oThis.contractAddress);

      return erc20TokenContractObj.methods
        .balanceOf(oThis.address)
        .call({}).then(function (balance) {
          oThis.balance = balance;
        });
    }
  }
}

export default GetBalance;
