
const assert = require('assert');
const fs = require('fs');
const sss = require('shamirs-secret-sharing');

class AccessFile {
  static createFromFile(filePath) {
    assert(typeof filePath === 'string');
    assert(filePath !== '');

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return new AccessFile(content.atlasIpnsAddress, content.salt);
  }

  static recoverFromShares(shares) {
    assert(Array.isArray(shares));
    assert(shares.length > 0);

    const secret = sss.combine(shares).toString();

    assert(secret !== '');

    const jsonObj = JSON.parse(secret);

    return new AccessFile(jsonObj.atlasIpnsAddress, jsonObj.salt);
  }

  constructor(atlasIpnsAddress, salt) {
    this.salt = salt;
    this.atlasIpnsAddress = atlasIpnsAddress;

    assert(typeof this.salt === 'string');
    assert(typeof this.atlasIpnsAddress === 'string');

    assert(this.salt !== '');
    assert(this.atlasIpnsAddress !== '');
  }

  createShares(shareCount, threshold) {
    const secret = Buffer.from(this.serialize());

    const shares = sss.split(secret, { shares: shareCount, threshold });

    assert(Array.isArray(shares));
    assert(shares.length === shareCount);

    const recoveredObj = AccessFile.recoverFromShares(shares);
    assert(recoveredObj.salt = this.salt);
    assert(recoveredObj.atlasIpnsAddress = this.atlasIpnsAddress);

    return shares;
  }

  serialize() {
    return JSON.stringify({ salt: this.salt, atlasIpnsAddress: this.atlasIpnsAddress });
  }
}

module.exports = AccessFile;
