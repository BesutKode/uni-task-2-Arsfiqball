var fs = require('fs');

const pathMiscData = __dirname + "/../documents/data-lain-lain.json";
const pathGeoJSON = __dirname + "/../data/power.geojson";

console.log("Loading and parsing JSON file...");
var miscData = JSON.parse(fs.readFileSync(pathMiscData, 'utf8'));

var geojsonObject = {
  type: "FeatureCollection",
  features: []
};

console.log("Generating GeoJSON...");
for (i = 0; i < miscData.den.length; i++) {
  geojsonObject.features.push({
    type: "Feature",
    properties: {
      type: "node",
      tags: {
        name: miscData.den[i].nama,
        power: 'plant'
      },
      meta: miscData.den[i]
    },
    geometry: {
      type: "Point",
      coordinates: [miscData.den[i].longitude, miscData.den[i].latitude]
    }
  });
}

console.log("Saving data...");
fs.writeFile(pathGeoJSON, JSON.stringify(geojsonObject, null, "  "), function(err) {
  if (err) {
    console.error(err.message);
    return false;
  }

  console.log("Successful Write to " + pathGeoJSON);
  return true;
});
