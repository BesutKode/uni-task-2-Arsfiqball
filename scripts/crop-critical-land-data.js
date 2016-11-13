var fs = require('fs');

const pathOriginal = __dirname + '/../documents/lahan-kritis.geojson';
const pathGeoJSON = __dirname + '/../data/critical-land.geojson';
const minLon = 128.54;
const maxLon = 128.75;
const minLat = -3.64;
const maxLat = -3.43;

console.log("Loading data...");
var data = JSON.parse(fs.readFileSync(pathOriginal, 'utf8'));
var newdata = {
  type: "FeatureCollection",
  features: []
};

console.log("Cropping data...");
for (var i = 0; i < data.features.length; i++) {
  var croped = [];
  for (var j = 0; j < data.features[i].geometry.coordinates.length; j++) {
    var k = 0;
    var ignore = false;
    while (k < data.features[i].geometry.coordinates[j].length && !ignore) {
      var coord = data.features[i].geometry.coordinates[j][k];
      if (coord[0] < minLon) { ignore = true; }
      if (coord[0] > maxLon) { ignore = true; }
      if (coord[1] < minLat) { ignore = true; }
      if (coord[1] > maxLat) { ignore = true; }
      k++;
    }
    if (!ignore) {
      croped.push(data.features[i].geometry.coordinates[j]);
    }
  }
  if (croped.length > 0) {
    data.features[i].geometry.coordinates = croped;
    data.features[i].properties.tags = {
      name: data.features[i].properties.name
    }
    data.features[i].properties.meta = {
      kritis: data.features[i].properties.KRITIS
    }
    newdata.features.push(data.features[i]);
  }
}

console.log("Saving data...");
fs.writeFile(pathGeoJSON, JSON.stringify(newdata, null, "  "), function(err) {
  if (err) {
    console.error(err.message);
    return false;
  }

  console.log("Successful Write to " + pathGeoJSON);
  return true;
});

