## Setup:

    - npm init
    - npm install nock
    - npm install jest

## Explanation and output:

### There are three different APIS used. The first is a NASA one that outputs this:

NASA:
Title: Young Star Cluster NGC 346
Explanation: The most massive young star cluster in the Small Magellanic Cloud is NGC 346, embeddedS in our small satellite galaxy's largest star forming region
some 210,000 light-years distant. Of course the massive stars of NGC 346 are short lived, but very energetic. Their winds and radiation sculpt the edges of theo 5 million years old and not yet burning hydrogen in their cores, the infant stars are strewn about the embedded star cluster. This spectacular infrared view of NGC 346 is from the James Webb Space Telescope's NIRcam. Emission from atomic hydrogen ionized by the massive stars' energetic radiation as well as molecular
ears at the distance of the Small Magellanic Cloud.
Image URL: https://apod.nasa.gov/apod/image/2505/jwst-ngc346-800.png

### The second API outputs the ISS location every 10 seconds. Here is an example output:

Fri May 02 2025 22:16:41 GMT+0300 (Eastern European Summer Time) latitude: 3.6796, longitude: 24.6482
Fri May 02 2025 22:16:51 GMT+0300 (Eastern European Summer Time) latitude: 4.1864, longitude: 25.0098
Fri May 02 2025 22:17:01 GMT+0300 (Eastern European Summer Time) latitude: 4.6930, longitude: 25.3719
Fri May 02 2025 22:17:14 GMT+0300 (Eastern European Summer Time) latitude: 5.3515, longitude: 25.8436
Fri May 02 2025 22:17:36 GMT+0300 (Eastern European Summer Time) latitude: 6.4645, longitude: 26.6444
Fri May 02 2025 22:17:41 GMT+0300 (Eastern European Summer Time) latitude: 6.6920, longitude: 26.8087
Fri May 02 2025 22:17:46 GMT+0300 (Eastern European Summer Time) latitude: 6.9699, longitude: 27.0097
Fri May 02 2025 22:17:51 GMT+0300 (Eastern European Summer Time) latitude: 7.1972, longitude: 27.1744
Fri May 02 2025 22:18:01 GMT+0300 (Eastern European Summer Time) latitude: 7.7274, longitude: 27.5593
Fri May 02 2025 22:18:14 GMT+0300 (Eastern European Summer Time) latitude: 8.3833, longitude: 28.0375
Fri May 02 2025 22:18:21 GMT+0300 (Eastern European Summer Time) latitude: 8.7361, longitude: 28.2957
Fri May 02 2025 22:18:31 GMT+0300 (Eastern European Summer Time) latitude: 9.2398, longitude: 28.6655

### The third API outputs some upcoming launches details. Here is an example output:

Upcoming Launches:
Mission: Falcon 9 Block 5 | Starlink Group 6-75
Vehicle: Falcon 9
Launch Date: 2025-05-02T01:51:10Z
Mission: Falcon 9 Block 5 | Starlink Group 15-3
Vehicle: Falcon 9
Launch Date: 2025-05-03T18:13:00Z
Mission: Falcon 9 Block 5 | Starlink Group 6-84
Vehicle: Falcon 9
Launch Date: 2025-05-04T08:48:00Z

### Tests

To test run npm test, here is the output:

- npm test

> assignment8@1.0.0 test
> jest

PASS tests/Launch_test.test.js
PASS tests/ISS_test.test.js
PASS tests/NASA_service.test.js

Test Suites: 3 passed, 3 total
Tests: 3 passed, 3 total
Snapshots: 0 total
Time: 1.011 s
Ran all test suites.
