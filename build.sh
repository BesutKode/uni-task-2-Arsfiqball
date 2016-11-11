#!/bin/sh

echo "run: node ./scripts/get-osm-saparua-island-data.js"
node ./scripts/get-osm-saparua-island-data.js
echo "\n"

echo "run: node ./scripts/inject-saparua-island-data.js"
node ./scripts/inject-saparua-island-data.js
echo "\n"

echo "run: node ./scripts/make-geojson-of-depkes-data.js"
node ./scripts/make-geojson-of-depkes-data.js
echo "\n"

echo "run: node ./scripts/make-geojson-of-den-data.js"
node ./scripts/make-geojson-of-den-data.js
echo "\n"

echo "run: node ./scripts/compose-to-single-data.js"
node ./scripts/compose-to-single-data.js
echo "\n"
