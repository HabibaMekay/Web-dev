const nock = require('nock');
const { fetchLaunches } = require("../services/Launch_Service")

describe('Launch Service', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  test('should handle API errors', async () => {
    nock('https://ll.thespacedevs.com')
      .get('/2.2.0/launch/upcoming/')
      .reply(500);

    await expect(fetchLaunches()).rejects.toThrow('Failed to fetch launches ');
  });

});