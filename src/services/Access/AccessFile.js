const assert = require('assert');
const fs = require('fs');
const sss = require('shamirs-secret-sharing');

class AccessFile {
  constructor(salt) {
    assert(typeof salt === 'string');
    assert(salt !== '');

    this.salt = salt;
  }

  static createFromFile(filePath) {
    assert(typeof filePath === 'string');
    assert(filePath !== '');

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return new AccessFile(content.salt);
  }

  static recoverFromShares(shares) {
    assert(Array.isArray(shares));
    assert(shares.length > 0);

    const secret = sss.combine(shares).toString();
    assert(secret !== '');

    const jsonObj = JSON.parse(secret);

    return new AccessFile(jsonObj.salt);
  }

  createShares(shareCount, threshold) {
    const secret = Buffer.from(this.serialize());

    const shares = sss.split(secret, { shares: shareCount, threshold });

    assert(Array.isArray(shares));
    assert(shares.length === shareCount);

    const recoveredObj = AccessFile.recoverFromShares(shares);
    assert(recoveredObj.salt = this.salt);

    return shares;
  }

  serialize() {
    return JSON.stringify({ salt: this.salt });
  }
}

module.exports = AccessFile;
