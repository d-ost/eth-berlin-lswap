'use strict';

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
}

module.exports = new CoreConstants();