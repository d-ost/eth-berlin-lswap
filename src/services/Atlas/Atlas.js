const assert = require('assert');

class Atlas {
  constructor(
    parentIpfsPath,
    index,
    burnerPrivateKey,
    safeAddress,
    recoveryModuleAddress,
    recoveryPrivateKey,
    shares,
    contacts,
  ) {
    assert(typeof parentIpfsPath === 'string');

    assert(typeof index === 'number');
    assert(index >= 0);

    assert(typeof burnerPrivateKey === 'string');
    assert(burnerPrivateKey !== '');

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

    assert(Array.isArray(contacts));

    this.parentIpfsPath = parentIpfsPath;
    this.index = index;
    this.burnerPrivateKey = burnerPrivateKey;
    this.safeAddress = safeAddress;
    this.recoveryModuleAddress = recoveryModuleAddress;
    this.recoveryPrivateKey = recoveryPrivateKey;
    this.shares = shares;
    this.contacts = contacts;
  }
}

module.exports = Atlas;
