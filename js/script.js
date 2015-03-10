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
    
    //density overall
	var result = forEach(dataset);
	gettheHeat(result);
    createBiz(dataset);
    
    //density by category
    //specificforEach(dataset);
});

function createBiz (dataset) {
	L.geoJson(dataset, {
	    pointToLayer: bizPointToLayer,
	    onEachFeature: bizClick,
	    style: bizStyle
	}).addTo(fullscreenMap);

}

var bizPointToLayer = function (feature, latlng){
	var bizMarker = L.circle(latlng, 200, {
		stroke: false,
		fillOpacity: 1
	});
	return bizMarker;	
}

//could move to pointtolayer
var bizStyle = function (feature){
    var type = feature.properties.Category;

    var fill = null;
    
    if(type === "Aircraft leasing"){
    fillColor = "#a6cee3";
    }
    if(type === "Education"){
        fillColor = "#1f78b4";
    }
    if(type === "Engineering firms"){
        fillColor = "#b2df8a";
    }
    if(type === "Industrial products"){
        fillColor = "#33a02c";
    }
    if(type === "Logistics support"){
        fillColor = "#fb9a99";
    }
    if(type === "Machine Shops"){
        fillColor = "#e31a1c";
    }
    if(type === "Maintenance, repair and overhaul"){
        fillColor = "#fdbf6f";
    }
    if(type === "Materials distribution"){
        fillColor = "#ff7f00";
    }
    if(type === "Materials processing"){
        fillColor = "#cab2d6";
    }
    if(type === "Other"){
        fillColor = "#6a3d9a";
    }
    if(type === "Parts and equipment distribution"){
        fillColor = "#ffff99";
    }
    if(type === "Parts and equipment manufacturers"){
        fillColor = "#b15928";
    }
    if(type === "Software and IT"){
        fillColor = "#d9d9d9";
    }
    if(type === "Space"){
        fillColor = "#ffed6f";
    }
    if(type === "Test and Calibration"){
        fillColor = "#fccde5";
    }

    var style = {
        weight: 2,
        opacity: .1,
        color: 'white',
        fillOpacity: 0.75,
        fillColor: fillColor
    }

    return style;
}


var bizClick = function (feature, layer) {
    layer.bindPopup("<strong>Company Name: </strong>" + feature.properties.Comp_Name);
}

//basic for each point: latitude, longitude, count (set all equal to 1)
//except both the dataset coming in and a category to filter on, could filter with jquery, d3... (js .filter)
//write a function that creates an array that filters out non-desirable fields

function forEach(dataset) {
	var array = []
	for (var i = 0; i < dataset.features.length; i++) {
		array.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, 100]); 
	}
    //returns Array [ lat, lng, 100 ]
	return array;
};

function gettheHeat(dataset){
    L.heatLayer(dataset, {radius: 10}, {maxZoom: 10}).addTo(fullscreenMap);
};

/*

var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    categories = [Aircraft leasing, Education, Engineering firms, Industrial products, Logistics support, Machine Shops, Maintenance repair and overhaul,
    Materials distribution, Materials processing, Other, Parts and equipment distribution, Parts and equipment manufacturers, Software and IT, Space,Test and Calibration];

    for (var i = 0; i < dataset.features.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);

function getColor(d) {
    d = Aircraft leasing ? '#a6cee3' :
    d = Education ? '#1f78b4' :
    d = Engineering firms ? '#b2df8a' :
    d = Industrial products ? '#33a02c' :
    d = Logistics support ? '#fb9a99' :
    d = Machine Shops ? '#e31a1c' :
    d = Maintenance, repair and overhaul ? '#fdbf6f' :
    d = Materials distribution ? '#ff7f00' :
    d = Materials processing ? '#cab2d6' :
    d = Other ? '#6a3d9a' :
    d = Parts and equipment distribution ? '#ffff99' :
    d = Parts and equipment manufacturers ? '#b15928' :
    d = Software and IT ? '#d9d9d9' :
    d = Space ? '#ffed6f' :
    d = Test and Calibration ? '#fccde5' ;
}

var baseMaps = {
    "baseMap": CartoDBTiles,
};

var overlayMaps = {
    "heat map": gettheHeat,
};

L.control.layers(baseMaps, overlayMaps, {position:'topright'}).addTo(map);

----

function specificforEach(dataset) {
    var categoryArray = []
    for (var i = 0; i < dataset.features.length; i++) {
        categoryArray.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]); 
    }
    //returns Array [ lat, lng, "Category" ]
    console.log(categoryArray[1]);
    return categoryArray;
};
*/

