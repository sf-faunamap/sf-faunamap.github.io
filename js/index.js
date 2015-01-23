var bbox = [[37.67512527892127, -122.53189086914061],[37.85, -122.33963012695312]];
L.mapbox.accessToken = 'pk.eyJ1IjoiZG5vbWFkYiIsImEiOiJEak5aTXdZIn0.UtQIRl-MzHHZk6TIAHSWww';
var map = L.mapbox.map('map', 'caperrault.k82d7bm8', {
    maxBounds: bbox
}).fitBounds(bbox);

var regStyle = {
  //  stroke: false,
    color: "#FFFFFF",
    fillOpacity: 0.2,
    weight: 0
};

var hoverStyle = {
    fillOpacity: 0.5
};


var hash = L.hash(map);

$.ajax({
    type: "GET",
    url: "https://gist.githubusercontent.com/dnomadb/40e14a3b78ec118bb711/raw/9b477351ff312a1897cbe631baa093ae7afc92fe/data.geojson"
}).done(function(data) {
    L.geoJson($.parseJSON(data), {
        style: regStyle,
        onEachFeature: function(feat, layer) {
            layer.bindPopup(
              '<p class="field"><span style="font-weight:bold">Wildlife: </span>' + feat.properties.Wildlife +
              '</p><p class="field"><span style="font-weight:bold">Hotspot: </span>' + feat.properties.Hotspot +
              '</p><p class="field"><span style="font-weight:bold">Season: </span>' + feat.properties.Season +
              '</p><p class="link"><a href="' + feat.properties.Link + '" target="_blank">More Information </a></p>'
            );
            var pBounds = L.polygon(feat.geometry.coordinates[0])
                .getBounds()
                .getCenter();

            layer.bindLabel(feat.properties.Wildlife).addTo(map);

            //L.marker([pBounds.lng, pBounds.lat]).addTo(map)
            //  .bindPopup('<a href="' + feat.properties.Link + '" target="_blank">' + feat.properties['fauna'] + '</a>');
            layer.on('mouseover', function(e) {
                e.target.setStyle(hoverStyle);
              //  e.target.bindLabel(feat.properties.Wildlife).addTo(map);
            });
            layer.on('mouseout', function(e) {
                e.target.setStyle(regStyle);
            });
        }
    }).addTo(map);
}).error(function(err) {
    console.log(err)
});
