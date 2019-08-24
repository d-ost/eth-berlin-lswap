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
    return 5;
  }

  get auxChainId() {
    return 1405;
  }

  get ostTokenName() {
    return 'OST'
  }

  get wethTokenName() {
    return 'WETH'
  }

  get erc20Tokens() {
    return [CoreConstants.ostTokenName, CoreConstants.wethTokenName];
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
      case CoreConstants.ostTokenName:
        return '0xd426b22f3960d01189a3D548B45A7202489Ff4De';
      case CoreConstants.wethTokenName:
        return '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
      default:
        throw `Invalid ${tokenName}`;
    }
  }

  getAuxChainContractAddress(tokenName) {
    switch (tokenName) {
      case CoreConstants.wethTokenName:
        return '0xBB5676d85d28DA039F982C07E4217fB0FDB2c2ef';
      default:
        throw `Invalid ${tokenName}`;
    }
  }

  get ORIGIN_BURNER_KEY() {
    return 'origin-burner-key'
  }

}

export default new CoreConstants();