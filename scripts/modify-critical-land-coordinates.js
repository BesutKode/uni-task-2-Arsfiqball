var fs = require('fs');

const pathOriginal = __dirname + '/../data/critical-land.geojson';
const pathGeoJSON = __dirname + '/../data/modified-critical-land.geojson';
const offsetLon = 0.0095;
const offsetLat = -0.002;

console.log("Loading data...");
var data = JSON.parse(fs.readFileSync(pathOriginal, 'utf8'));

console.log("Modifying data...");
for (var i = 0; i < data.features.length; i++) {
  for (var j = 0; j < data.features[i].geometry.coordinates.length; j++) {
    for (var k = 0; k < data.features[i].geometry.coordinates[j].length; k++) {
      data.features[i].geometry.coordinates[j][k][0] += offsetLon;
      data.features[i].geometry.coordinates[j][k][1] += offsetLat;
    }
  }
}

console.log("Saving data...");
fs.writeFile(pathGeoJSON, JSON.stringify(data, null, "  "), function(err) {
  if (err) {
    console.error(err.message);
    return false;
  }

  console.log("Successful Write to " + pathGeoJSON);
  return true;
});

