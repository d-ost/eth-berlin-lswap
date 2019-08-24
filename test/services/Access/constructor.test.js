const assert = require('assert');

const AccessFile = require('../../../src/services/Access/AccessFile');

describe('AccessFile::constructor', async () => {
  it('should pass in case of valid parameters.', async () => {
    const salt = 'salt';

    const accessFile = new AccessFile(salt);

    assert.strictEqual(
      accessFile.salt,
      salt,
    );
  });
});
