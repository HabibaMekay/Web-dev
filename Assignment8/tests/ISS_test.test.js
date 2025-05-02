const nock = require('nock');
const { fetchISSLocation } = require("../services/ISS_Service")

describe('ISS Service', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  test('should handle invalid data', async () => {
    nock('http://api.open-notify.org')
      .get('/iss-now.json')
      .reply(200, {});

    await expect(fetchISSLocation()).rejects.toThrow('Has no ISS position');
  });
});