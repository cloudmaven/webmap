L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({

  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
        showResults = L.Util.bind(this.showGetFeatureInfo, this);
    var map = this._map;
    $.ajax({
        jsonp: false,
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'getJson',
        success: function getJson(data, status, xhr) {
            var err = typeof data === 'string' ? null : data;
            //showResults(err, evt.latlng, data);
            if(data.features[0].properties != undefined){
                var meta = data.features[0].properties;
            } else {
                return;
            }
            var data_coords = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
            var popup = L.popup({ maxWidth: 800});

              popup
                .setLatLng(data_coords)
                .setContent("<table>" + readData(meta) + "</table>")
                .openOn(map);

            map.setView(data_coords,10);
        },
        error: function (xhr, status, error) {
            showResults(error);
        }
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),

        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          info_format: 'text/javascript',
          format_options: 'callback:getJson'
        };

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) { return; } // do nothing if there's an error
    alert(content);
    // Otherwise show the content in a popup, or something.
    L.popup({ maxWidth: 800})
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this._map);
  }
});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);
};

function readData(data){
    var keyMap = Object.keys(data);
    var string = '';
    for(var i = 0; i < keyMap.length; i++){
        string = string.concat("<tr>" +
            "<td>" + keyMap[i] +"</td>" +
            "<td>" + data[keyMap[i]] + "</td>" +
            "</tr>")
    }
    return string;
}