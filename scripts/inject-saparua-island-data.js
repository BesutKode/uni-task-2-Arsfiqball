var fs = require('fs');

const pathInjData = __dirname + "/../documents/data-lain-lain.json";
const pathOriginal = __dirname + "/../data/saparua-island.geojson";
const pathInjected = __dirname + "/../data/injected-saparua-island.geojson";

console.log("Loading and parsing JSON files...");
var injData = JSON.parse(fs.readFileSync(pathInjData, 'utf8'));
var data = JSON.parse(fs.readFileSync(pathOriginal, 'utf8'));

console.log("Injecting data...");
data.features[0].properties.tags.postal_code = injData.kodepos;
data.features[0].properties.tags.population = injData.populasi.semua.total;
data.features[0].properties.meta.populasi = injData.populasi.semua.total;
data.features[0].properties.meta.bersekolah = injData.partisipasi_bersekolah.bersekolah;
data.features[0].properties.meta.tak_bersekolah = injData.partisipasi_bersekolah.tak_bersekolah;

console.log("Saving data...");
fs.writeFile(pathInjected, JSON.stringify(data, null, "  "), function(err) {
  if (err) {
    console.error(err.message);
    return false;
  }

  console.log("Successful Write to " + pathInjected);
  return true;
});
