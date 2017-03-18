/**
 * Created by lsetiawan on 10/3/16.
 */
//var web_url = 'http://35.160.91.70:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=himat:indus_weather_stations&outputFormat=text/javascript&format_options=callback:getJson';
var weather_icon = L.icon({
    iconUrl: 'http://nvs.nanoos.org/lib/images/icons/assets/shore_station-default.png',
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-9, -90] // point from which the popup should open relative to the iconAnchor
});

var river_icon = L.icon({
    iconUrl: 'http://nvs.nanoos.org/lib/images/icons/assets/river_gauge-default.png',
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-9, -90] // point from which the popup should open relative to the iconAnchor
});

var layer_label;
var layer_group;
var counter = 0;


// var indusBasin = 'IndusBasin.geojson';
// var regionOne = 'Region1.geojson';

var basemaps = {};

// Initialize basemap
var mapCenter = [48.00, -121.00];
var initZoom = 8;
var accessToken = 'pk.eyJ1IjoibHNldGlhd2FuIiwiYSI6ImNpbjI3M2UzNzBiZzh2OWtrZGlzZ2FhaG8ifQ.tkoR6uJikfFpOq4jfsk02w';
var mapboxId = 'mapbox.outdoors';

var webMap = new L.map('map').setView(mapCenter, initZoom);
L.control.scale().addTo(webMap);

var osm = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: mapboxId,
    accessToken: accessToken
}).addTo(webMap);

basemaps['OSM'] = osm;

// Create the layercontrol and add it to the map
var controlLayers = L.control.groupedLayers(basemaps).addTo(webMap);

// var basinStyle = {
//     color: "#000000",
//     weight: 1,
//     fillColor: '#ad9c55',
//     fillOpacity: .6
// };


// $.getJSON(indusBasin, function (data) {
//     var dataLayer = L.geoJson(data, {
//         style: function(feature) {
//             return basinStyle;
//         }
//     });
//     // Add the geojson layer to the layercontrol
//     controlLayers.addOverlay(dataLayer, 'Indus Basin', 'Study Regions');
// });
//
// $.getJSON(regionOne, function (data) {
//     var dataLayer = L.geoJson(data);
//     // Add the geojson layer to the layercontrol
//     controlLayers.addOverlay(dataLayer, 'Region1', 'Study Regions');
// });

/* Adding RGI Layer */
var gs_url = 'http://35.163.5.251:8080/geoserver/glacier_peak/wms';
var lidar_layers = {
    group:'lidar',
    layer_data: [{
        layer: 'glacier_peak:glacier_peak_2015_dtm_7_512_4326',
        label: 'glacier_peak_2015_dtm_7'
    },
	{
        layer: 'glacier_peak:glacier_peak_2015_dtm_10_512_4326',
        label: 'glacier_peak_2015_dtm_10'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_11_512_4326',
        label: 'glacier_peak_2015_dtm_11'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_14_512_4326',
        label: 'glacier_peak_2015_dtm_14'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_15_512_4326',
        label: 'glacier_peak_2015_dtm_15'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_24_512_4326',
        label: 'glacier_peak_2015_dtm_24'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_3_512_4326',
        label: 'glacier_peak_2015_dtm_3'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_4_512_4326',
        label: 'glacier_peak_2015_dtm_4'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_8_512_4326',
        label: 'glacier_peak_2015_dtm_8'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_9_512_4326',
        label: 'glacier_peak_2015_dtm_9'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_16_512_4326',
        label: 'glacier_peak_2015_dtm_16'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_17_512_4326',
        label: 'glacier_peak_2015_dtm_17'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_18_512_4326',
        label: 'glacier_peak_2015_dtm_18'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_19_512_4326',
        label: 'glacier_peak_2015_dtm_19'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_20_512_4326',
        label: 'glacier_peak_2015_dtm_20'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_22_512_4326',
        label: 'glacier_peak_2015_dtm_22'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_23_512_4326',
        label: 'glacier_peak_2015_dtm_23'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_25_512_4326',
        label: 'glacier_peak_2015_dtm_25'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_26_512_4326',
        label: 'glacier_peak_2015_dtm_26'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_27_512_4326',
        label: 'glacier_peak_2015_dtm_27'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_32_512_4326',
        label: 'glacier_peak_2015_dtm_32'
    },
{
        layer: 'glacier_peak:glacier_peak_2015_dtm_33_512_4326',
        label: 'glacier_peak_2015_dtm_33'
    },
]};

addGSLayer(gs_url,lidar_layers);

//var himat_url = 'http://35.160.75.232:8280/geoserver/himat/wms';
//var rgi_layers = {
  //  group:'RGI',
   // layer_data: [{
   //     layer: 'himat:13_rgi50_CentralAsia',
    //    label: 'Central Asia'
   // },
   // {
//        layer: 'himat:14_rgi50_SouthAsiaWest',
  //      label: 'South Asia West'
    //},
   // {
      //  layer: 'himat:15_rgi50_SouthAsiaEast',
    //    label: 'South Asia East'
  //  }]};

//addGSLayer(himat_url,rgi_layers);

/* Adding Regions Layer */
//var model_regions = {
  //  group:'Model Regions',
    //layer_data: [{
      //  layer: 'himat:initialRegion',
        //label: 'Initial Region'
//    },
  //  {
    //    layer: 'himat:hma1_all_32644_100m-tile-0_color_hs',
    //    label: 'Stereo DEM mosaic'
   // },
   // {
      //  layer: 'himat:hma1_all_32644_100m_n602_20170113_2250',
    //    label: 'Stereo DEM footprints'
  //  }]};
//
//addGSLayer(himat_url,model_regions);


/* Leaflet DRAW */
var featureGroup = L.featureGroup().addTo(webMap);
// Defining a polygon here instead of a polyline will connect the
// endpoints and fill the path.
// http://leafletjs.com/reference.html#polygon
//var polyline = L.polyline(line_points, polyline_options).addTo(featureGroup);

// var drawControl = new L.Control.Draw({
//   edit: {
//     featureGroup: featureGroup
//   }
// }).addTo(webMap);
//
// webMap.on('draw:created', function(e) {
//     featureGroup.addLayer(e.layer);
// });

// controlLayers.addOverlay(featureGroup, 'Drawn Region', 'Study Regions');

// on click, clear all layers
// document.getElementById('delete').onclick = function(e) {
//     featureGroup.clearLayers();
// };
//
// document.getElementById('export').onclick = function(e) {
//     var json_label = prompt("Please enter file name", "study_region1");
//     // Extract GeoJson from featureGroup
//     var data = featureGroup.toGeoJSON();
//     for(var i = 0; i < data.features.length;i++){
//         data.features[i].properties['name'] = json_label;
//     }
//
//     // Stringify the GeoJson
//     var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
//
//     // Create export
//     document.getElementById('export').setAttribute('href', 'data:' + convertedData);
//     document.getElementById('export').setAttribute('download',json_label + '.geojson');
// };


/* Function to add layers from GeoServer */
function addGSLayer(wp_url, gs_layer){
    for(var i = 0; i < gs_layer.layer_data.length; i++){
        var data = gs_layer.layer_data[i];
        var overlay = L.tileLayer.betterWms(wp_url, {
            layers: data.layer,
            format: 'image/png',
            transparent: true
        });

        if(gs_layer.group == 'RGI' || gs_layer.group == 'Model Regions' || gs_layer.group == 'lidar'){
            overlay.addTo(webMap);
        }

        controlLayers.addOverlay(overlay, data.label, gs_layer.group);
    }
}

function makeURL(gslayer){
    var url = "http://35.160.91.70:8080/geoserver/ows?";

    var params_arr = [];
        params_arr.push("service=WFS");
        params_arr.push("version=1.0.0");
        params_arr.push("request=GetFeature");
        params_arr.push("typeName=" + gslayer.layer);
        params_arr.push("outputFormat=text/javascript");
        params_arr.push("format_options=callback:getJson");

    var params = params_arr.join("&");

    return url+params;
}

// /* Adding Stations Layer */
// var stations_layer = {
//     group:'Stations',
//     layer_data: [{
//         layer: 'himat:weather_stations',
//         label: 'Weather Stations'
//     },
//     {
//         layer: 'himat:river_gauges',
//         label: 'GRDC River Gages'
//     }
//     ]};

for(var i = 0; i < stations_layer.layer_data.length; i++){
    (function(i) {
        console.log(stations_layer.layer_data[i]);
        var web_url = makeURL(stations_layer.layer_data[i]);
        console.log(web_url);
        layer_label = stations_layer.layer_data[i].label;
        layer_group = stations_layer.group;
        console.log(layer_label);
        $.ajax({
            jsonp: false,
            url: web_url,
            dataType: 'jsonp',
            async: false
            });
    })(i);
}

function getPoints(i) {
    console.log(stations_layer.layer_data[i]);
    var web_url = makeURL(stations_layer.layer_data[i]);
    console.log(web_url);
    layer_label = stations_layer.layer_data[i].label;
    layer_group = stations_layer.group;
    console.log(layer_label);
    $.getJSON({
        jsonp: false,
        url: web_url,
        dataType: 'jsonp',
        async: false
        });
}

function getJson(data) {
    console.log(i);
    layer_label = stations_layer.layer_data[counter].label;
    layer_group = stations_layer.group;
    var featGroup = L.featureGroup();
    var marker;
    for (var j = 0; j < data.features.length; j++) {
        console.log(layer_label);
        if(counter == 0) {
            marker = L.marker([data.features[j].geometry.coordinates[1], data.features[j].geometry.coordinates[0]], {icon: weather_icon});
        } else {
            marker = L.marker([data.features[j].geometry.coordinates[1], data.features[j].geometry.coordinates[0]], {icon: river_icon});
        }
        var meta = data.features[j].properties;
        var popupContent = "<table style='max-width:286px;'>" + readData(meta) + "</table>";
        marker.bindPopup(popupContent);
        featGroup.addLayer(marker);
    }
    controlLayers.addOverlay(featGroup, layer_label, layer_group);
    counter++;
}
