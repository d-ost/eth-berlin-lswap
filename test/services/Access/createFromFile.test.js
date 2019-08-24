const assert = require('assert');

const AccessFile = require('../../../src/services/Access/AccessFile');

describe('AccessFile::createFromFile', async () => {
  it('should pass in case of valid file.', async () => {
    const accessFile = AccessFile.createFromFile('./test/services/Access/data/accessFileA.json');

    assert.strictEqual(
      accessFile.atlasIpnsAddress,
      'atlasIpnsAddressA',
    );

    assert.strictEqual(
      accessFile.salt,
      'saltA',
    );
  });
});
