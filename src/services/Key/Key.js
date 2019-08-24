const assert = require('assert');
const crypto = require('crypto');
const Scrypt = require('scrypt');
const web3utils = require('web3-utils');

class Key {
  constructor(username, pin) {
    assert(typeof username === 'string');
    assert(username !== '');

    this.username = username;

    assert(typeof pin === 'string');
    assert(pin !== '');

    this.pin = pin;

    this.userSecret = Key.calculateUserSecret(this.username, this.pin);
    assert(typeof this.userSecret === 'string');
    assert(this.userSecret !== '');

    this.salt = Key.generateSalt();
    assert(typeof this.salt === 'string');
    assert(this.salt !== '');

    this.encryptionKey = Key.calculateEncryptionKey(this.userSecret, this.salt);
    assert(this.encryptionKey.length !== 0);
  }

  encrypt(data) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, Buffer.alloc(16, 0));
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted;
  }

  decrypt(encryptedData) {
    assert(Buffer.isBuffer(encryptedData));
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptionKey, Buffer.alloc(16, 0));
    let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
  }

  static calculateUserSecret(username, pin) {
    assert(typeof username === 'string');
    assert(username !== '');

    assert(typeof pin === 'string');
    assert(pin !== '');

    return web3utils.sha3(
      JSON.stringify({
        username,
        pin,
      }),
    );
  }

  static generateSalt() {
    return web3utils.randomHex(32);
  }

  static calculateEncryptionKey(userSecret, salt) {
    assert(typeof userSecret === 'string');
    assert(userSecret !== '');

    assert(typeof salt === 'string');
    assert(salt !== '');

    return Scrypt.hashSync(userSecret, { N: 16384, r: 8, p: 1 }, 32, salt);
  }
}

module.exports = Key;
