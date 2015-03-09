$(document).ready(function() {
	//set map view
	var fullscreenMap = L.map('map').setView([47.465,-122.2], 10);

	//mapbox function to view map at bounds of elements
	//map.on('ready', function() {
	//	map.fitBounds(biz.getBounds());
	//});

	//get tiles
	var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
	  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
	});

	//add tiles
	fullscreenMap.addLayer(CartoDBTiles);

	$.getJSON( "geojson/biz.geojson", function( data ) {
	    var dataset = data;
	    plotDataset(dataset);
	    //createListForClick(dataset);
	});

	function plotDataset(dataset) {
	  bizGeoJSON = L.geoJson(dataset, {
	    style: bizStyle,
	  }).addTo(map);
	}

	var bizStyle = function(feature, latlng) {
	  
	  var coor = feature.property.X + feature.property.Y;
	  console.log(coor);

	  var style = {
	        weight: 1,
	        opacity: .25,
	        color: 'grey',
	  };

	  return style;
	};

});