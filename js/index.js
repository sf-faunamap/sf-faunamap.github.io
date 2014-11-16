var bbox = [[37.67512527892127, -122.53189086914061],[37.82822612280363, -122.33963012695312]];
L.mapbox.accessToken = 'pk.eyJ1IjoiZG5vbWFkYiIsImEiOiJEak5aTXdZIn0.UtQIRl-MzHHZk6TIAHSWww';
var map = L.mapbox.map('map', 'dnomadb.i306ioka', {
    maxBounds: bbox
}).fitBounds(bbox);

var regStyle = {
    color: 'orange',
    opacity: 0.5
}

var hoverStyle = {
    color: 'orange',
    opacity: 0.9
}

var iconURL = 'img/mapbox-maki-b95bce2/renders/';   
var hash = L.hash(map);
$.ajax({
    type: "GET",
    url: "https://gist.githubusercontent.com/anonymous/bb20080cac5a342c7729/raw/118cc90d241e28296f49fd6618f8a2d99231724e/map.geojson"
}).done(function(data) {
    L.geoJson($.parseJSON(data), {
        style: regStyle,
        onEachFeature: function(feat, layer) {
            // layer.bindPopup('<a href="' + feat.properties.link + '" >' + feat.properties['fauna name'] + '</a>');
            var pBounds = L.polygon(feat.geometry.coordinates[0])
                .getBounds()
                .getCenter();

            L.marker([pBounds.lng, pBounds.lat]).addTo(map)
                .bindPopup('<a href="' + feat.properties.link + '" >' + feat.properties['fauna name'] + '</a>');
            layer.on('mouseover', function(e) {
                e.target.setStyle(hoverStyle);
            });
            layer.on('mouseout', function(e) {
                e.target.setStyle(regStyle);
            });
        }
    }).addTo(map);
}).error(function(err) {
    console.log(err)
});