import Web3Provider from '../../src/lib/Web3Provider' ;
import coreConstants from '../../src/config/coreConstants';
import CoreAbis from '../../src/config/CoreAbis';

class OriginTokenToTokenTransfer {

  constructor(params) {
    const oThis = this;
    console.log(params, 'params OriginTokenToTokenTransfer');

    oThis.senderAddress = params.address;
    oThis.privateKey = params.privateKey;
    oThis.tokenName = params.tokenName;
    oThis.amount = params.amount;
    oThis.swapTokenName = params.swapTokenName;
    oThis.toAddress = params.toAddress;

    oThis.swapErc20ContractAddress = null;
    oThis.uniSwapContractAddress = null;
  }

  async perform() {
    const oThis = this;

    await oThis._setParams();

    await oThis._send();

    return {success: true};
  }

  async _setParams() {
    const oThis = this;
    let web3Class = null;


    web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
    oThis.swapErc20ContractAddress = coreConstants.getOriginChainContractAddress(oThis.swapTokenName);

    oThis.defaultgasPrice = coreConstants.originDefaultgasPrice;
    oThis.defaultgas = coreConstants.originDefaultgas;
    if (oThis.tokenName == coreConstants.ostTokenName) {
      oThis.uniSwapContractAddress = coreConstants.originOstUniSwapContractAddress;
    } else {
      oThis.uniSwapContractAddress = coreConstants.originWethUniSwapContractAddress;
    }

    oThis.web3Instance = await web3Class.web3WsProvider();
  }

  async _send() {
    const oThis = this;

    return new Promise((async (onResolve) => {

      const account = oThis.web3Instance.eth.accounts.privateKeyToAccount(oThis.privateKey);

      oThis.web3Instance.eth.accounts.wallet.add(account);

      const erc20TokenContractObj = oThis.web3Instance.eth.Contract(CoreAbis.genericUniSwap, oThis.uniSwapContractAddress);

      erc20TokenContractObj.methods
        .tokenToTokenTransferInput(
          oThis.amount,
          1,
          1,
          Math.floor(1.1 * Date.now()),
          oThis.toAddress,
          oThis.swapErc20ContractAddress
        )
        .send({
          from: oThis.senderAddress,
          gasPrice: oThis.defaultgasPrice,
          gas: oThis.defaultgas
        }).on('error', (error) => {
        console.log('Error on uniswap ', error);
      }).on('transactionHash', (transactionHash) => {
        console.log('Transaction hash for uniswap', transactionHash);
      }).on('receipt', (receipt) => {
        console.log('Receipt  for uniswap', receipt);
        onResolve();
      });
    }));
  }


}

export default OriginTokenToTokenTransfer;
