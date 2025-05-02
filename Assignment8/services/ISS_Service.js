const axios = require('axios');

async function fetchISSLocation() {
  try {
    const response = await axios.get('http://api.open-notify.org/iss-now.json');
    if (response.data.iss_position) {
      return response.data.iss_position;
    }
    throw new Error('Has no ISS position');
  } catch (error) {
    throw new Error('Failed to fetch ISS location: ' + error.message);
  }
}
module.exports = { fetchISSLocation };