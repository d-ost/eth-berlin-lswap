const assert = require('assert');
const crypto = require('crypto');

const AccessFile = require('../../../src/services/Access/AccessFile');
const Key = require('../../../src/services/Key/Key');

function getRandomIntInclusive(_min, _max) {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);

  // The maximum is inclusive and the minimum is inclusive.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('AccessFile::recoverFromShares', async () => {
  it('1 out of 1', async () => {
    const username = 'username';
    const pin = '123456';

    const key = new Key(username, pin);

    const { salt } = key;

    const accessFile = new AccessFile(salt);

    const shareCount = 1;
    const threshold = 1;
    const shares = accessFile.createShares(key, shareCount, threshold);

    assert.strictEqual(
      shares.length,
      1,
    );

    const recovered = AccessFile.recoverFromShares(key, shares);

    assert.strictEqual(
      recovered.salt,
      salt,
    );
  });

  it('1 out of 2', async () => {
    const username = 'username';
    const pin = '123456';

    const key = new Key(username, pin);

    const { salt } = key;

    const accessFile = new AccessFile(salt);

    const shareCount = 2;
    const threshold = 1;
    const shares = accessFile.createShares(key, shareCount, threshold);

    assert.strictEqual(
      shares.length,
      2,
    );

    {
      const recovered = AccessFile.recoverFromShares(key, shares.slice(0, 1));

      assert.strictEqual(
        recovered.salt,
        salt,
      );
    }

    {
      const recovered = AccessFile.recoverFromShares(key, shares.slice(1));

      assert.strictEqual(
        recovered.salt,
        salt,
      );
    }
  });

  it('fuzzy test', async () => {
    for (let i = 0; i < 50; i += 1) {
      const shareCount = getRandomIntInclusive(2, 10);
      const threshold = getRandomIntInclusive(1, shareCount);

      const username = crypto.randomBytes(10).toString();
      const pin = crypto.randomBytes(10).toString();

      const key = new Key(username, pin);
      const { salt } = key;

      const accessFile = new AccessFile(salt);

      const shares = accessFile.createShares(key, shareCount, threshold);

      assert(
        Array.isArray(shares),
      );

      assert.strictEqual(
        shares.length,
        shareCount,
      );

      shares.sort();

      const knownShareAmount = getRandomIntInclusive(threshold, shareCount);

      const recovered = AccessFile.recoverFromShares(key, shares.slice(0, knownShareAmount));

      assert.strictEqual(
        recovered.salt,
        salt,
      );
    }
  });
});
