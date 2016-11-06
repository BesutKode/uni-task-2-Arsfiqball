var tj = require('togeojson');
var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;

var pathKML = __dirname + '/../documents/lahan-kritis.kml';
var pathGeoJSON = __dirname + '/../documents/lahan-kritis.geojson';

console.log('Loading data...');
var data = fs.readFileSync(pathKML, 'utf8');

console.log('Parsing data...');
var kml = new DOMParser().parseFromString(data);

console.log('Converting data...');
var data = JSON.stringify(tj.kml(kml));

console.log('Saving data...');

fs.writeFile(pathGeoJSON, data, function(err) {
  if (err) {
    console.error(err.message);
    return false;
  }

  console.log("Successful Write to " + pathGeoJSON);
  return true;
});
