
class CoreConstants {

  constructor() {
  }

  get originChainKind() {
    return 'origin';
  }

  get auxChainKind() {
    return 'aux';
  }

  get ENVIRONMENT() {
    return process.env.ENVIRONMENT;
  }

  get ORIGIN_WS_PROVIDER() {
    return process.env.ORIGIN_WS_PROVIDER;
  }

  get AUX_WS_PROVIDER() {
    return process.env.AUX_WS_PROVIDER;
  }

  get originChainId() {
    return 100;
  }

  get auxChainId() {
    return 1407;
  }

  get erc20Tokens() {
    return ['OST', 'WETH'];
  }

  get chainConfig() {
    return {
      origin: {
        chainId: CoreConstants.originChainId
      },
      aux: {
        chainId: CoreConstants.auxChainId
      }
    }
  }

  getOriginChainContractAddress(tokenName) {
    switch (tokenName) {
      case 'ost':
        return '0x111';
      default:
        throw `Invalid ${tokenName}`;
    }
  }

  getAuxChainContractAddress(tokenName) {
    switch (tokenName) {
      case 'ost':
        return '0x222';
      default:
        throw `Invalid ${tokenName}`;
    }
  }

}

  get ORIGIN_BURNER_KEY(){
    return 'origin-burner-key'
  }

}

export default coreConstants = new CoreConstants();