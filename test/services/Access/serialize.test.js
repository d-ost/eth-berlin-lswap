const assert = require('assert');

const AccessFile = require('../../../src/services/Access/AccessFile');

describe('AccessFile::serialize', async () => {
  it('should pass in case of valid class', async () => {
    const atlasIpnsAddress = 'atlasIpnsAddressA';
    const salt = 'saltA';

    const accessFile = new AccessFile(atlasIpnsAddress, salt);

    assert.strictEqual(
      accessFile.serialize(),
      `{"salt":"${salt}","atlasIpnsAddress":"${atlasIpnsAddress}"}`,
    );
  });
});
