const axios = require('axios');

async function fetchNASA() {
  console.log(process.env.NASA_API_KEY)
  try {
    const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch NASA: ' + error.message);
  }
}

module.exports = { fetchNASA };
