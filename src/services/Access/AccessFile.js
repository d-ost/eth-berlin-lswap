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

  createShares(key, shareCount, threshold) {
    const secret = key.encrypt(Buffer.from(this.serialize()));

    const shares = sss.split(secret, { shares: shareCount, threshold });

    assert(Array.isArray(shares));
    assert(shares.length === shareCount);

    const recoveredObj = AccessFile.recoverFromShares(key, shares);
    assert(recoveredObj.salt = this.salt);

    return shares;
  }

  static recoverFromShares(key, shares) {
    assert(Array.isArray(shares));
    assert(shares.length > 0);

    const secret = sss.combine(shares);

    const jsonObj = JSON.parse(key.decrypt(secret).toString());

    return new AccessFile(jsonObj.salt);
  }

  serialize() {
    return JSON.stringify({ salt: this.salt });
  }
}

module.exports = AccessFile;
