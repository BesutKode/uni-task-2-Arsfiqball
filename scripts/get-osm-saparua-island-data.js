var fs = require('fs');
var request = require('request');
var osmtogeojson = require('osmtogeojson');

const url = 'http://www.overpass-api.de/api/interpreter?data=[out:json];way(26770808);(._;%3E;);out%20body;';
// const url = 'http://www.overpass-api.de/api/interpreter?data=[out:json];area[name=%22Saparua%22];(node[place=village](area);way(26770808););(._;%3E;);out%20body;';
const pathGeoJSON = __dirname + '/../data/saparua-island.geojson';

console.log('Requesting data to server (overpass-api)...');
request(url, function (err, res, body) {
  if (err) {
    console.log(err);
  }

  console.log('Generating GeoJSON...');
  var data = JSON.stringify(osmtogeojson(JSON.parse(body)), null, "  ");

  console.log('Saving data...')
  fs.writeFile(pathGeoJSON, data, function(err) {
    if (err) {
      console.error(err.message);
      return false;
    }

    console.log("Successful Write to " + pathGeoJSON);
    return true;
  });
});
