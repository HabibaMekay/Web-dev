
require('dotenv').config();

const { fetchNASA } = require("./services/NASA_service")
const { fetchISSLocation } = require("./services/ISS_Service")
const { fetchLaunches } = require("./services/Launch_Service")

async function main() {

    try {
        const nasa = await fetchNASA();
        console.log('NASA:');
        console.log(`Title: ${nasa.title}`);
        console.log(`Date: ${nasa.date}`);
        console.log(`Explanation: ${nasa.explanation}`);//.slice(0, 100)}...`);
        console.log(`Image URL: ${nasa.url}\n`);
      } catch (error) {
        console.error('Error fetching from NASA API:', error.message);
      }


      const updateISS = async () => {
        try {
          const location = await fetchISSLocation();
          console.log(`${new Date().toString()} latitude: ${location.latitude}, longitude: ${location.longitude}`);
        } catch (error) {
          console.error('Error fetching ISS location:', error.message);
        }
      };
      await updateISS();
      setInterval(updateISS, 10000); // 10 seconds


      try {
        const launches = await fetchLaunches();
        console.log('\nUpcoming Launches:');
        if (launches.length === 0) {
        } 
        
        else {
          launches.forEach(launch => {
            console.log(`Mission: ${launch.name}`);
            console.log(`Vehicle: ${launch.rocket.configuration.name}`);
            console.log(`Launch Date: ${launch.net}`);
          });
        }

      } catch (error) {
        console.error('Error fetching launches:', error.message);
      }


}   

main();
