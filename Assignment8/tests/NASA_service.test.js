const nock = require('nock');
const { fetchNASA } = require("../services/NASA_service")

describe('NASA Service', () => {
  beforeEach(() => {
    nock.cleanAll();
  });


  test('should handle API errors', async () => {
    nock('https://api.nasa.gov')
      .get('/planetary/apod')
    //   .query({ api_key: process.env.NASA_API_KEY })
      .reply(500);

    await expect(fetchNASA()).rejects.toThrow('Failed to fetch NASA: ');
  });
});