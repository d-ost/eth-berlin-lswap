const assert = require('assert');
const crypto = require('crypto');

const Atlas = require('./Atlas');

class AtlasFile {
  constructor(
    ipfsClient,
    key,
    safeAddress,
    recoveryModuleAddress,
    recoveryPrivateKey,
  ) {
    this.ipfsClient = ipfsClient;
    this.key = key;

    this.atlas = new Atlas(
      '',
      0,
      safeAddress,
      recoveryModuleAddress,
      recoveryPrivateKey,
      {},
    );

    this.ipfsPath = '';
  }

  async setupKey() {
    const response = await this.ipfsClient.key.gen(crypto.randomBytes(20).toString(), {
      type: 'rsa',
      size: 2048,
    });

    this.ipfsKeyName = response.name;
    this.ipfsKeyId = response.id;
  }

  async publish() {
    assert(this.ipfsKeyName !== '');
    assert(this.ipfsKeyId !== '');

    if (this.ipfsPath !== '') {
      this.atlas.index += 1;
      this.atlas.parentIpfsPath = this.ipfsPath;
    }

    const encryptedAtlas = this.key.encrypt(Buffer.from(JSON.stringify(this.atlas)));

    const ipfsResult = await this.ipfsClient.add(encryptedAtlas);
    assert(Array.isArray(ipfsResult));
    assert(ipfsResult.length === 1);

    this.ipfsPath = `/ipfs/${ipfsResult[0].hash}`;

    return this.ipfsPath;
  }

  static async createFromFile(
    ipfsClient,
    key,
    ipfsPath,
  ) {
    const ipfsResponse = await ipfsClient.get(ipfsPath);

    assert(Array.isArray(ipfsResponse));
    assert(ipfsResponse.length === 1);

    const encryptedContent = ipfsResponse[0].content;

    assert(Buffer.isBuffer(encryptedContent));
    assert(encryptedContent.length !== 0);

    const content = key.decrypt(encryptedContent);

    assert(Buffer.isBuffer(content));
    assert(content.length !== 0);

    const atlas = JSON.parse(content.toString());

    const atlasFile = new AtlasFile(
      ipfsClient,
      key,
      atlas.safeAddress,
      atlas.recoveryModuleAddress,
      atlas.recoveryPrivateKey,
    );

    atlasFile.atlas.parentIpfsPath = atlas.parentIpfsPath;
    atlasFile.atlas.index = atlas.index;
    atlasFile.atlas.shares = atlas.shares;

    atlasFile.ipfsPath = ipfsPath;

    return atlasFile;
  }

  updateFriendShamirSecret(userAddress, secret) {
    assert(typeof userAddress === 'string');
    assert(userAddress !== '');

    assert(typeof secret === 'string');
    assert(secret !== '');

    this.atlas.shares[userAddress] = secret;
  }
}

module.exports = AtlasFile;
