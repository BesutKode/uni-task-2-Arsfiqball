var fs = require('fs');

const pathIsland = __dirname + "/../data/injected-saparua-island.geojson";
const pathHealthcare = __dirname + "/../data/healthcare.geojson";
const pathPower = __dirname + "/../data/power.geojson";
const pathGeoJSON = __dirname + "/../data/all.geojson";

console.log("Loading and parsing JSON files...");
var islandData = JSON.parse(fs.readFileSync(pathIsland, 'utf8'));
var healthcareData = JSON.parse(fs.readFileSync(pathHealthcare, 'utf8'));
var powerData = JSON.parse(fs.readFileSync(pathPower, 'utf8'));

console.log("Merging data...");
for (var i = 0; i < healthcareData.features.length; i++) {
  islandData.features.push(healthcareData.features[i]);
}
for (var i = 0; i < powerData.features.length; i++) {
  islandData.features.push(powerData.features[i]);
}

console.log("Saving data...");
fs.writeFile(pathGeoJSON, JSON.stringify(islandData, null, "  "), function(err) {
  if (err) {
    console.error(err.message);
    return false;
  }

  console.log("Successful Write to " + pathGeoJSON);
  return true;
});
