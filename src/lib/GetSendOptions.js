import coreConstants from '../config/coreConstants';

class GetSendOptions {

  constructor(params) {
    
    const oThis = this;
    console.log(params,"GetSendOptions params");

    oThis.sendTokenName = params.sendTokenName;
    oThis.sendTokenAmount = parseInt(params.sendTokenAmount);
    oThis.senderOriginAddress = params.senderOriginAddress;
    oThis.senderAuxAddress = params.senderAuxAddress;

    let sendTokenBalance = params.senderBalance[oThis.sendTokenName] || {};
    let receiveOption = params.receiveOption;


    oThis.allowAux = receiveOption.allowAux || 0;
    oThis.preferredToken = receiveOption.preferredToken;
    oThis.receiverOriginAddress = receiveOption.originAddress;
    oThis.receiverAuxSafeContractAddress = receiveOption.safeContractAddress || null;

    let sendTokenBalanceFormatted = {};
    for(let i=0; i< sendTokenBalance.length; i++){
      let obj = sendTokenBalance[i];
      sendTokenBalanceFormatted[obj.chainKind] = parseInt(obj.balance);
    }

    oThis.senderAuxTokenBalance =  sendTokenBalanceFormatted[coreConstants.auxChainKind] || 0;
    oThis.senderOriginTokenBalance = sendTokenBalanceFormatted[coreConstants.originChainKind] || 0;

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

    if (oThis.sendTokenName != oThis.preferredToken) {
      let config = {
        [coreConstants.tokenUniSwapStep]: {
          msg: `UniSwap ${oThis.sendTokenName} to ${oThis.preferredToken}`,
          mandatory: 0
        }
      };
      oThis.stepsConfig.push(config);
    }


    if (oThis.receiverAuxSafeContractAddress && oThis.allowAux == 1 && (oThis.senderAuxTokenBalance < oThis.sendTokenAmount)) {

      let mintAamount = oThis.sendTokenAmount - oThis.senderAuxTokenBalance;
      let config = {
        [coreConstants.layerSwapStep]: {
          msg: `Move ${mintAamount} ${oThis.sendTokenName} to ${coreConstants.auxChainKind.toUpperCase()} CHAIN`,
          mandatory: 1,
          errMsg: `Not Enough Funds on ${coreConstants.auxChainKind.toUpperCase()} CHAIN`,
          executeParams: {
            amount: mintAamount
          }
        }
      };
      oThis.stepsConfig.push(config);
    }

    return {success: true, data: {stepsConfig: oThis.stepsConfig}}

  }

}

export default GetSendOptions;