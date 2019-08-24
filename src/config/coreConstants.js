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
    return "development";
  }

  get ORIGIN_WS_PROVIDER() {
    return "ws://34.244.36.178:50005";
  }

  get AUX_WS_PROVIDER() {
    return 'ws://34.247.83.108:51405';
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

  get relayerAddress() {
    return '0xd426b22f3960d01189a3D548B45A7202489Ff4De'
  }

  get erc20Tokens() {
    return [this.ostTokenName, this.wethTokenName];
  }

  get chainConfig() {
    return {
      origin: {
        chainId: this.originChainId
      },
      aux: {
        chainId: this.auxChainId
      }
    }
  }

  getOriginChainContractAddress(tokenName) {
    console.log(this.ostTokenName, 'this.ostTokenName');  
    switch (tokenName) {
      case this.ostTokenName:
        return '0xd426b22f3960d01189a3D548B45A7202489Ff4De';
      case this.wethTokenName:
        return '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
      default:
        throw `Invalid ${tokenName} for origin`;
    }
  }

  getAuxChainContractAddress(tokenName) {
    switch (tokenName) {
      case this.wethTokenName:
        return '0xBB5676d85d28DA039F982C07E4217fB0FDB2c2ef';
      default:
        throw `Invalid ${tokenName} for aux`;
    }
  }

  get ORIGIN_BURNER_KEY() {
    return 'origin-burner-key'
  }

  get tokenUniSwapStep(){
    return 'tokenUniSwapStep';
  }

  get layerSwapStep(){
    return 'layerSwapStep';
  }

}

export default new CoreConstants();