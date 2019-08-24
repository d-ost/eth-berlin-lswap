const assert = require('assert');

class Atlas {
  constructor(
    parentIpfsPath,
    index,
    safeAddress,
    recoveryModuleAddress,
    recoveryPrivateKey,
    shares,
  ) {
    assert(typeof parentIpfsPath === 'string');

    assert(typeof index === 'number');
    assert(index >= 0);

    assert(
      (parentIpfsPath === '' && index === 0)
        || (parentIpfsPath !== '' && index !== 0),
    );

    assert(typeof safeAddress === 'string');
    assert(safeAddress !== '');

    assert(typeof recoveryModuleAddress === 'string');
    assert(recoveryModuleAddress !== '');

    assert(typeof recoveryPrivateKey === 'string');
    assert(recoveryPrivateKey !== '');

    assert(typeof shares === 'object');

    this.parentIpfsPath = parentIpfsPath;
    this.index = index;
    this.safeAddress = safeAddress;
    this.recoveryModuleAddress = recoveryModuleAddress;
    this.recoveryPrivateKey = recoveryPrivateKey;
    this.shares = shares;
  }
}

module.exports = Atlas;
