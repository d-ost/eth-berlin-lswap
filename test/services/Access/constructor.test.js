const assert = require('assert');

const AccessFile = require('../../../src/services/Access/AccessFile');

describe('AccessFile::constructor', async () => {
  it('should pass in case of valid parameters.', async () => {
    const atlasIpnsAddress = 'atlasIpnsAddress';
    const salt = 'salt';

    const accessFile = new AccessFile(atlasIpnsAddress, salt);

    assert.strictEqual(
      accessFile.atlasIpnsAddress,
      atlasIpnsAddress,
    );

    assert.strictEqual(
      accessFile.salt,
      salt,
    );
  });
});
