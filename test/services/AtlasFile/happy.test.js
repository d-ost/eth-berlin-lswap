const { assert } = require('chai');

const IpfsClient = require('ipfs-http-client');
const AtlasFile = require('../../../src/services/Atlas/AtlasFile');
const Key = require('../../../src/services/Key/Key');

describe('AtlasFile::HappyPath', async () => {
  it('', async () => {
    const ipfsClient = new IpfsClient('/ip4/127.0.0.1/tcp/5001');

    const userAddress = 'userAddress';
    const pin = '123456';

    const key = new Key(userAddress, pin);

    const safeAddress = 'safeAddress';
    const recoveryModuleAddress = 'recoveryModuleAddress';
    const recoveryPrivateKey = 'recoveryPrivateKey';

    const atlasFile1 = new AtlasFile(
      ipfsClient,
      key,
      safeAddress,
      recoveryModuleAddress,
      recoveryPrivateKey,
    );

    assert.strictEqual(
      atlasFile1.ipfsClient,
      ipfsClient,
    );

    assert.strictEqual(
      atlasFile1.key,
      key,
    );

    assert.strictEqual(
      atlasFile1.ipfsPath,
      '',
    );

    assert.strictEqual(
      atlasFile1.atlas.parentIpfsPath,
      '',
    );

    assert.strictEqual(
      atlasFile1.atlas.index,
      0,
    );

    assert.strictEqual(
      atlasFile1.atlas.safeAddress,
      safeAddress,
    );

    assert.strictEqual(
      atlasFile1.atlas.recoveryModuleAddress,
      recoveryModuleAddress,
    );

    assert.strictEqual(
      atlasFile1.atlas.recoveryPrivateKey,
      recoveryPrivateKey,
    );

    assert.deepEqual(
      atlasFile1.atlas.shares,
      {},
    );

    await atlasFile1.setupKey();

    await atlasFile1.publish();

    let atlasFile2 = await AtlasFile.createFromFile(
      ipfsClient,
      key,
      atlasFile1.ipfsPath,
    );

    assert.strictEqual(
      atlasFile2.atlas.parentIpfsPath,
      atlasFile1.atlas.parentIpfsPath,
    );

    assert.strictEqual(
      atlasFile2.atlas.safeAddress,
      atlasFile1.atlas.safeAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.safeAddress,
      atlasFile1.atlas.safeAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.recoveryModuleAddress,
      atlasFile1.atlas.recoveryModuleAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.recoveryPrivateKey,
      atlasFile1.atlas.recoveryPrivateKey,
    );

    assert.deepEqual(
      atlasFile2.atlas.shares,
      atlasFile1.atlas.shares,
    );

    await atlasFile1.publish();

    assert.notEqual(
      atlasFile1.atlas.parentIpfsPath,
      '',
    );

    assert.strictEqual(
      atlasFile1.atlas.index,
      1,
    );

    atlasFile2 = await AtlasFile.createFromFile(
      ipfsClient,
      key,
      atlasFile1.ipfsPath,
    );

    assert.strictEqual(
      atlasFile2.atlas.parentIpfsPath,
      atlasFile1.atlas.parentIpfsPath,
    );

    assert.strictEqual(
      atlasFile2.atlas.safeAddress,
      atlasFile1.atlas.safeAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.safeAddress,
      atlasFile1.atlas.safeAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.recoveryModuleAddress,
      atlasFile1.atlas.recoveryModuleAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.recoveryPrivateKey,
      atlasFile1.atlas.recoveryPrivateKey,
    );

    assert.deepEqual(
      atlasFile2.atlas.shares,
      atlasFile1.atlas.shares,
    );

    atlasFile1.updateFriendShamirSecret(
      'Alice', 'AliceSecret',
    );

    await atlasFile1.publish();

    assert.notEqual(
      atlasFile1.atlas.parentIpfsPath,
      '',
    );

    assert.strictEqual(
      atlasFile1.atlas.index,
      2,
    );

    assert.strictEqual(
      atlasFile1.atlas.shares.Alice,
      'AliceSecret',
    );

    atlasFile2 = await AtlasFile.createFromFile(
      ipfsClient,
      key,
      atlasFile1.ipfsPath,
    );

    assert.strictEqual(
      atlasFile2.atlas.parentIpfsPath,
      atlasFile1.atlas.parentIpfsPath,
    );

    assert.strictEqual(
      atlasFile2.atlas.safeAddress,
      atlasFile1.atlas.safeAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.safeAddress,
      atlasFile1.atlas.safeAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.recoveryModuleAddress,
      atlasFile1.atlas.recoveryModuleAddress,
    );

    assert.strictEqual(
      atlasFile2.atlas.recoveryPrivateKey,
      atlasFile1.atlas.recoveryPrivateKey,
    );

    assert.deepEqual(
      atlasFile2.atlas.shares,
      atlasFile1.atlas.shares,
    );
  });
});
