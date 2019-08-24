import coreConstants from '../../config/coreConstants';
import OriginTokenToTokenTransfer from '../../lib/OriginTokenToTokenTransfer';
import Web3Provider from "./Web3Provider";
import GenerateAddress from '../../lib/GenerateAddress';
import CoreAbis from "../config/CoreAbis";
import ls from "./localStorage";


class Send {

  constructor(params) {
    const oThis = this;
    console.log(params, 'params Send');

    oThis.sendTokenName = params.sendTokenName;
    oThis.sendTokenAmount = params.sendTokenAmount;
    oThis.senderOriginAddress = params.senderOriginAddress;
    oThis.senderOriginPrivateKey = params.senderOriginAddressPrivateKey;

    oThis.senderAuxAddress = params.senderAuxAddress;

    oThis.senderAuxOwnerAddress = params.senderAuxOwnerAddress;
    oThis.senderAuxOwnerPrivateKey = params.senderAuxOwnerPrivateKey;

    oThis.steps = params.steps;

    let sendTokenBalance = params.senderBalance[oThis.sendTokenName] || {};
    let receiveOption = params.receiveOption;


    oThis.allowAux = receiveOption.allowAux || 0;
    oThis.preferredToken = receiveOption.preferredToken;
    oThis.receiverOriginAddress = receiveOption.originAddress;
    oThis.receiverAuxAddress = receiveOption.auxAddress || null;

    oThis.senderAuxTokenBalance = sendTokenBalance[coreConstants.auxChainKind] || 0;
    oThis.senderOriginTokenBalance = sendTokenBalance[coreConstants.originChainKind] || 0;

    oThis.stepsConfig = [];
  }

  async perform() {
    const oThis = this;

    if (oThis.sendTokenAmount > (oThis.senderAuxTokenBalance + oThis.senderOriginTokenBalance)) {
      return {success: false, errMsg: 'Insufficient funds for the transaction'}
    }

    if (oThis.allowAux == 0 && (oThis.sendTokenAmount > oThis.senderOriginTokenBalance)) {
      return {success: false, errMsg: 'Insufficient funds for the transaction on Origin Chain'}
    }

    let resp = {};

    if (oThis.steps[coreConstants.layerSwapStep]) {
      resp = oThis.performWithLayerSwap()
    } else {
      resp = oThis.performWithoutLayerSwap()
    }

    return resp;

  }

  async performWithLayerSwap() {
    const oThis = this;

    if (!oThis.senderAuxAddress) {
      let generateAddress = new GenerateAddress();
      let resp = await generateAddress.perform;

      oThis.senderAuxOwnerAddress = resp.data.address;
      oThis.senderAuxOwnerPrivateKey = resp.data.privateKey;

      let deployerResp = {};

      //  deploy smart contract with approve  for weth

      resp.data['smartContractAddress'] = deployerResp.data['smartContractAddress'];
      ls.saveItem(
        coreConstants.AUX_OWNER_KEY,
        resp.data,
      );
    }

    let mintAamount = oThis.sendTokenAmount - oThis.senderAuxTokenBalance;
    //  mint tokens in layer 2. use Facilitator

    if (oThis.steps[coreConstants.tokenUniSwapStep]) {
      if (oThis.sendTokenName == oThis.preferredToken) {
        return {success: false, errMsg: 'Insufficient funds for the transaction'}
      }

      //  call token uniswap function for layer 2
    } else {
      //  call token transfer function for layer 2
    }

  }

  async performWithoutLayerSwap() {
    const oThis = this;

    if (oThis.sendTokenAmount > (oThis.senderOriginTokenBalance)) {
      return {success: false, errMsg: 'Insufficient funds for the transaction'}
    }

    if (oThis.steps[coreConstants.tokenUniSwapStep]) {
      if (oThis.sendTokenName == oThis.preferredToken) {
        return {success: false, errMsg: 'Insufficient funds for the transaction'}
      }

      let swapParam = {
        address: oThis.senderOriginAddress,
        privateKey: oThis.senderOriginPrivateKey,
        tokenName: oThis.sendTokenName,
        amount: oThis.sendTokenAmount,
        swapTokenName: oThis.preferredToken,
        toAddress: oThis.receiverOriginAddress
      };

      let uniswapObj = new OriginTokenToTokenTransfer(swapParam);
      let resp = await uniswapObj.perform();
      return resp;
    } else {
      return oThis._transferFundOnOrigin();
    }
  }

  async _transferFundOnOrigin() {
    const oThis = this;

    return new Promise((async (onResolve) => {

      let web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
      let web3Instance = await web3Class.web3WsProvider();

      const account = web3Instance.eth.accounts.privateKeyToAccount(oThis.senderOriginPrivateKey);
      web3Instance.eth.accounts.wallet.add(account);

      let erc20ContractAddress = coreConstants.getOriginChainContractAddress(oThis.sendTokenName);
      const erc20TokenContractObj = web3Instance.eth.Contract(CoreAbis.genericErc20, erc20ContractAddress);

      erc20TokenContractObj.methods
        .transfer(oThis.receiverOriginAddress, oThis.sendTokenAmount)
        .send({
          from: oThis.senderOriginAddress,
          gasPrice: coreConstants.originDefaultgasPrice,
          gas: coreConstants.originDefaultgas
        }).on('error', (error) => {
        console.log('Error on _transferFundOnOrigin ', error);
      }).on('transactionHash', (transactionHash) => {
        console.log('Transaction hash for _transferFundOnOrigin', transactionHash);
      }).on('receipt', (receipt) => {
        console.log('Receipt  for _transferFundOnOrigin', receipt);
        onResolve();
      });
    }));
  }


}

export default Send;