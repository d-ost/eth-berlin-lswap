const rootPrefix = '../..',
  CoreAbis = require(rootPrefix + '/src/config/CoreAbis'),
  Web3Provider = require(rootPrefix + '/src/lib/Web3Provider'),
  coreConstants = require(rootPrefix + '/src/config/coreConstants');

class GetBalance {

  constructor(params) {
    const oThis = this;

    oThis.chainId = params.chainId;
    oThis.address = params.address;
    oThis.tokenName = params.tokenName;

    oThis.erc20TokenAbi = CoreAbis.genericErc20;

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

    if (oThis.chainId == coreConstants.originChainId) {
      oThis.web3Instance = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER).web3WsProvider;
      oThis.contractAddress = coreConstants.getOriginChainContractAddress(oThis.tokenName);
    } else if (oThis.chainId == coreConstants.auxChainId) {
      oThis.web3Instance = new Web3Provider(coreConstants.AUX_WS_PROVIDER).web3WsProvider;
      oThis.contractAddress = coreConstants.getAuxChainContractAddress(oThis.tokenName);
    }
    else {
      throw `Invalid ${oThis.chainId}`
    }
  }

  async _fetchBalance() {
    const oThis = this;

    const erc20TokenContractObj = new oThis.web3Instance.eth.Contract(oThis.erc20TokenAbi, oThis.contractAddress);

    return erc20TokenContractObj.methods
      .balanceOf(oThis.address)
      .call({}).then(function (balance) {
        oThis.balance = balance;
      })
  }
}

export default GetBalance;
