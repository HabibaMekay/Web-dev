const axios = require('axios');

async function fetchLaunches() {
  try{
  const response = await axios.get("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=3");
  return response.data.results;
  }
  catch (error) {
    throw new Error('Failed to fetch launches ' + error.message);
  }

}
module.exports = { fetchLaunches };