const { assert } = require('chai');

const Key = require('../../../src/services/Key/Key');

describe('Key::constructor', async () => {
  it('checks validity of members after creation', async () => {
    const username = 'username';
    const pin = '123456';

    const key = new Key(username, pin);

    assert.strictEqual(
      key.username,
      username,
    );

    assert.strictEqual(
      key.pin,
      pin,
    );

    assert.isOk(
      key.userSecret,
    );

    assert.isOk(
      key.salt,
    );

    assert.isOk(
      key.encryptionKey,
    );
  });

  it('checks similarity and dis-similarity of members in case of the same inputs', async () => {
    const username = 'username';
    const pin = '123456';

    const key1 = new Key(username, pin);
    const key2 = new Key(username, pin);

    assert.strictEqual(
      key1.userSecret,
      key2.userSecret,
    );

    assert.notStrictEqual(
      key1.salt,
      key2.salt,
    );

    assert.notStrictEqual(
      key1.encryptionKey,
      key2.encryptionKey,
    );
  });
});
