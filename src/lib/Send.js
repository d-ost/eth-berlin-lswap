import coreConstants from '../../config/coreConstants';
import OriginTokenToTokenTransfer from '../../lib/OriginTokenToTokenTransfer';
import Web3Provider from "./Web3Provider";
import GenerateAddress from '../../lib/GenerateAddress';
import CoreAbis from "../config/CoreAbis";
import DeployProxy from "../../gnosis/deploy/DeployProxy";
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
    oThis.senderAuxSafeContractAddress = params.senderAuxSafeContractAddress;

    oThis.steps = params.steps;

    let sendTokenBalance = params.senderBalance[oThis.sendTokenName] || {};
    let receiveOption = params.receiveOption;


    oThis.allowAux = receiveOption.allowAux || 0;
    oThis.preferredToken = receiveOption.preferredToken;
    oThis.receiverOriginAddress = receiveOption.originAddress;
    oThis.receiverAuxAddress = receiveOption.auxAddress || null;
    oThis.receiverAuxSafeContractAddress = receiveOption.receiverAuxSafeContractAddress;

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
      resp = await oThis.performWithLayerSwap()
    } else {
      resp = await oThis.performWithoutLayerSwap()
    }

    return resp;

  }

  async performWithLayerSwap() {
    const oThis = this;
    return new Promise((async (onResolve) => {

      if (!oThis.senderAuxAddress) {
        let generateAddress = new GenerateAddress();
        let resp = await generateAddress.perform;

        oThis.senderAuxOwnerAddress = resp.data.address;
        oThis.senderAuxOwnerPrivateKey = resp.data.privateKey;

        let deployerResp = new DeployProxy({
          web3Endpoint: 'https://mosaicdao.org/aux/1405',
          masterCopyAddress: '0x5bc7e67Bc0F6400c8bFfd193A9Dff217a2F79294',
          proxyFactoryAddress: '0xC34B9569193CD401eA0C4C930E64D305BAE3faa3',
          relayerPrivateKey: coreConstants.ostFunderAddress.privateKey,
          ownerPrivateKey: oThis.senderAuxOwnerPrivateKey,
          ownerAddress: oThis.senderAuxOwnerAddress,
          erc20ToExchangeAddressMap: {
            [coreConstants.getAuxChainContractAddress(coreConstants.wethTokenName)]: [coreConstants.auxWethUniSwapContractAddress]
          }
        }).perform().then(console.log);

        resp.data['smartContractAddress'] = deployerResp.data['safeAddress'];
        ls.saveItem(
          coreConstants.AUX_OWNER_KEY,
          resp.data,
        );
      }

      let mintAamount = oThis.sendTokenAmount - oThis.senderAuxTokenBalance;

      //  todo: mint tokens in layer 2. use Facilitator

      if (oThis.steps[coreConstants.tokenUniSwapStep]) {
        if (oThis.sendTokenName == oThis.preferredToken) {
          return onResolve({success: false, errMsg: 'Insufficient funds for the transaction'});
        }

        //  todo: call token uniswap function for layer 2
      } else {

        const transferParams = {
          web3Endpoint: 'https://mosaicdao.org/aux/1405',
          safeAddress: oThis.senderAuxSafeContractAddress,
          relayerPrivateKey: coreConstants.ostFunderAddress.privateKey,
          ownerPrivateKey: oThis.senderAuxOwnerPrivateKey,
          reciepientAddress: oThis.receiverAuxSafeContractAddress,
          transferAmount: oThis.sendTokenAmount
        };

        if (oThis.sendTokenName == coreConstants.ostTokenName) {
          transferParams['erc20Address'] = coreConstants.getAuxChainContractAddress(oThis.sendTokenName);
        }

        await new Transfer(transferParams).perform().then(console.log);
      }

      onResolve({success: true, data: {}});
    }));
  }

  async performWithoutLayerSwap() {
    const oThis = this;

    return new Promise((async (onResolve) => {
      if (oThis.sendTokenAmount > (oThis.senderOriginTokenBalance)) {
        return onResolve({success: false, errMsg: 'Insufficient funds for the transaction'});
      }

      if (oThis.steps[coreConstants.tokenUniSwapStep]) {
        if (oThis.sendTokenName == oThis.preferredToken) {
          return onResolve({success: false, errMsg: 'Insufficient funds for the transaction'});
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
        return onResolve(resp);
      } else {
        let transferResp = await oThis._transferFundOnOrigin();
        onResolve(transferResp);
      }
    }));
  }

  async _transferFundOnOrigin() {
    const oThis = this;

    return new Promise((async (onResolve) => {

      let web3Class = new Web3Provider(coreConstants.ORIGIN_WS_PROVIDER);
      let web3Instance = await web3Class.web3WsProvider();

      const account = web3Instance.eth.accounts.privateKeyToAccount(oThis.senderOriginPrivateKey);
      web3Instance.eth.accounts.wallet.add(account);

      let erc20ContractAddress = coreConstants.getOriginChainContractAddress(oThis.sendTokenName);
      const erc20TokenContractObj = new web3Instance.eth.Contract(CoreAbis.genericErc20, erc20ContractAddress);

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