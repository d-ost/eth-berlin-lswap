const assert = require('assert');

const Atlas = require('../../../src/services/Atlas/Atlas');

describe('Atlas::constructor', async () => {
  it('should pass in case of valid parameters.', async () => {
    const parentIpfsPath = '/ipfs/parentIpfsPath';
    const index = 2;
    const burnerPrivateKey = 'burnerPrivateKey';
    const safeAddress = 'safeAddress';
    const recoveryModuleAddress = 'recoveryModuleAddress';
    const recoveryPrivateKey = 'recoveryPrivateKey';
    const shares = {
      friendA: 'friendAShare',
    };
    const contacts = [
      {
        username: 'friendB',
        safeL1Address: 'safeL1AddressB',
        alias: 'aliasB',
      },
    ];

    const atlas = new Atlas(
      parentIpfsPath,
      index,
      burnerPrivateKey,
      safeAddress,
      recoveryModuleAddress,
      recoveryPrivateKey,
      shares,
      contacts,
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
      atlas.burnerPrivateKey,
      burnerPrivateKey,
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

    assert.strictEqual(
      atlas.contacts.length,
      1,
    );

    assert.strictEqual(
      atlas.contacts[0].username,
      contacts[0].username,
    );

    assert.strictEqual(
      atlas.contacts[0].safeL1Address,
      contacts[0].safeL1Address,
    );

    assert.strictEqual(
      atlas.contacts[0].alias,
      contacts[0].alias,
    );
  });
});
