var fs = require('fs');

const pathMiscData = __dirname + "/../documents/data-lain-lain.json";
const pathGeoJSON = __dirname + "/../data/healthcare.geojson";

console.log("Loading and parsing JSON files...");
var miscData = JSON.parse(fs.readFileSync(pathMiscData, 'utf8'));

var geojsonObject = {
  type: "FeatureCollection",
  features: []
};

function getAmenity(type) {
  if (type == 'PUSKESMAS') {
    return 'clinic';
  } else if (type == 'RS') {
    return 'hospital';
  }

  return '';
}

console.log("Generating GeoJSON...");
for (var i = 0; i < miscData.depkes.length; i++) {
  geojsonObject.features.push({
    type: "Feature",
    properties: {
      type: "node",
      tags: {
        name: miscData.depkes[i].nama,
        amenity: getAmenity(miscData.depkes[i].tipe)
      },
      meta: miscData.depkes[i]
    },
    geometry: {
      type: "Point",
      coordinates: [miscData.depkes[i].longitude, miscData.depkes[i].latitude]
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
