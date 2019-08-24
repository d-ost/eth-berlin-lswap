const assert = require('assert');

const Atlas = require('../../../src/services/Atlas/Atlas');

describe('Atlas::constructor', async () => {
  it('should pass in case of valid parameters.', async () => {
    const parentIpfsPath = '/ipfs/parentIpfsPath';
    const index = 2;
    const safeAddress = 'safeAddress';
    const recoveryModuleAddress = 'recoveryModuleAddress';
    const recoveryPrivateKey = 'recoveryPrivateKey';
    const shares = {
      friendA: 'friendAShare',
    };

    const atlas = new Atlas(
      parentIpfsPath,
      index,
      safeAddress,
      recoveryModuleAddress,
      recoveryPrivateKey,
      shares,
    );

    assert.strictEqual(
      atlas.parentIpfsPath,
      parentIpfsPath,
    );

    assert.strictEqual(
      atlas.index,
      index,
    );

    assert.strictEqual(
      atlas.safeAddress,
      safeAddress,
    );

    assert.strictEqual(
      atlas.recoveryModuleAddress,
      recoveryModuleAddress,
    );

    assert.strictEqual(
      atlas.recoveryPrivateKey,
      recoveryPrivateKey,
    );

    assert.strictEqual(
      atlas.parentIpfsPath,
      parentIpfsPath,
    );

    assert.strictEqual(
      atlas.shares.friendA,
      shares.friendA,
    );
  });
});
