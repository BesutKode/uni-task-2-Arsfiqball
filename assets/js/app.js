/**
 * PopUp Overlay
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/**
 * Vector Layers
 */
var vectors = {};

function prepareIslandLayer(geojsonObject) {
  var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
  });

  var vectorStyles = [
    new ol.style.Style({
      fill: new ol.style.Fill({
        color: '#2ecc71'
      })
    })
  ];

  vectors.island = new ol.layer.Vector({
    source: vectorSource,
    style: vectorStyles
  });
}

function prepareCriticalLandLayer(geojsonObject) {
  var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
  });

  vectors.criticalLand = new ol.layer.Vector({
    source: vectorSource,
    style: function(feature, resolution) {
      var lavel1 = new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#F4D03F'
        })
      });

      var lavel4 = new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#F7CA18'
        })
      });

      var lavel6 = new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#F5D76E'
        })
      });

      var lavel8 = new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#F5AB35'
        })
      });

      if (feature.get('KRITIS') == "Agak Kritis") {
        return [lavel1];
      } else if (feature.get('KRITIS') == "Kritis") {
        return [lavel4];
      } else if (feature.get('KRITIS') == "Potensial Kritis") {
        return [lavel6];
      } else if (feature.get('KRITIS') == "Sangat Kritis") {
        return [lavel8];
      }

      return [lavel1];
    }
  });
}

function prepareHealthcareLayer(geojsonObject) {
  var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
  });

  var vectorStyles = [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: '#4183D7'
        })
      })
    })
  ];

  vectors.healthcare = new ol.layer.Vector({
    source: vectorSource,
    style: vectorStyles
  });
}

function preparePowerLayer(geojsonObject) {
  var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
  });

  var vectorStyles = [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: '#e74c3c'
        })
      })
    })
  ];

  vectors.power = new ol.layer.Vector({
    source: vectorSource,
    style: vectorStyles
  });
}

/**
 * Make Map
 */
function makeMap() {
  var map = new ol.Map({
    layers: [
      vectors.island,
      vectors.criticalLand,
      vectors.healthcare,
      vectors.power
    ],
    view: new ol.View({
      center: [128.65, -3.56],
      zoom: 28,
      maxZoom: 29,
      minZoom: 27
    }),
    overlays: [overlay],
    target: 'map'
  });

  var select = new ol.interaction.Select({
    condition: ol.events.condition.click
  });
  map.addInteraction(select);

  select.on('select', function(e) {
    var properties = e.target.getFeatures().item(0).getProperties();
    content.innerHTML = '<b>'+properties.tags.name+'</b>'
      + '<pre>'+JSON.stringify(properties.tags, null, " ") + '</pre>'
      + '<pre>'+JSON.stringify(properties.meta, null, " ") + '</pre>'
    ;
    overlay.setPosition(e.mapBrowserEvent.coordinate);
  });
} 

/**
 * Requesting to server
 */
$.when(
  $.getJSON("data/injected-saparua-island.geojson", null, prepareIslandLayer),
  $.getJSON("data/modified-critical-land.geojson", null, prepareCriticalLandLayer),
  $.getJSON("data/healthcare.geojson", null, prepareHealthcareLayer),
  $.getJSON("data/power.geojson", null, preparePowerLayer)
).then(makeMap);
