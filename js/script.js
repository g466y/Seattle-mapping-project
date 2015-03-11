//set map view
var fullscreenMap = L.map('map').setView([47.58,-122.2], 10);

//get tiles
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

//add tiles
fullscreenMap.addLayer(CartoDBTiles);


//start with showing the points for one type
//have a layer defined for each type
//copy pointLayer for each of these
//filter dataset to show a given type of category
//filter through dataset and create an if statement to style it, if not selected set radius to 0
//for heat map you will have to filter the dataset to pass the dataset in its entirety to heatmap
//have pre-churned out arrays, and then when someone clicks get heatmap it would get generated
//    based on what people selected
//start with 2 layers and see what i can do
//before heatmap is created would have to clear what's there

$.getJSON( "geojson/biz.geojson", function( data ) {
	var dataset = data;
//density overall
	var resultAll = forEach(dataset);
	gettheHeat(resultAll);
    createBiz(dataset);
//density by category
    forEach2(dataset);
    //gettheHeat2(resultType);
    getControl();
    fullscreenMap.fitBounds(pointLayer.getBounds());
});

//empty variable for layer contorl
var pointLayer;

function createBiz (dataset) {
	pointLayer = L.geoJson(dataset, {
        pointToLayer: bizStyle,
	    onEachFeature: bizClick,
	}).addTo(fullscreenMap);
}

/*var bizPointToLayer = function (feature, latlng){
	var bizMarker = L.circle(latlng, 200, {
		stroke: false,
		fillOpacity: 1
	});
	return bizMarker;	
}*/

var bizStyle = function (feature, latlng) {
    
    var type = feature.properties.Category;

    var style = L.circleMarker(latlng, {
        weight: 2,
        radius: 4,
        opacity: .1,
        color: 'white',
        fillOpacity: 0.75,
        fillColor: getColor(type)
    });
    return style;
}

function getColor(d) {
    return d == "Aircraft leasing" ? '#a6cee3' :
           d == "Education" ? '#1f78b4' :
           d == "Engineering firms" ? '#b2df8a' :
           d == "Industrial products" ? '#33a02c' :
           d == "Logistics support" ? '#fb9a99' :
           d == "Machine Shops" ? '#e31a1c' :
           d == "Maintenance, repair and overhaul" ? '#fdbf6f' :
           d == "Materials distribution" ? '#ff7f00' :
           d == "Materials processing" ? '#cab2d6' :
           d == "Other" ? '#6a3d9a' :
           d == "Parts and equipment distribution" ? '#ffff99' :
           d == "Parts and equipment manufacturers" ? '#b15928' :
           d == "Software and IT" ? '#d9d9d9' :
           d == "Space" ? '#ffed6f' :
           d == "Test and Calibration" ? '#fccde5' :
           '#edf8e9';
}

var bizClick = function (feature, layer) {
    layer.bindPopup("<strong>Company Name: </strong>" + feature.properties.Comp_Name + "<strong> </br>Category: </strong>" + feature.properties.Category);
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

//HEAT MAP

var heatMap;

function gettheHeat(dataset){
    heatMap = L.heatLayer(dataset, {radius: 10}, {maxZoom: 10}).addTo(fullscreenMap);
};

function forEach2(dataset) {
    var categoryArray = []
    for (var i = 0; i < dataset.features.length; i++) {
        categoryArray.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]); 
    }
    //returns Array [ lat, lng, "Category" ]
    console.log(categoryArray[1]);
    return categoryArray;
};

//END FUNCTIONS

function getControl () {
    
    var baseMaps = {
        "Seattle, WA, USA": CartoDBTiles,
    };

    var overlayMaps = {
        "Heat map": heatMap,        
        "Companies": pointLayer,
    };

    L.control.layers(baseMaps, overlayMaps).addTo(fullscreenMap);

}


/*

//HEAT MAP BY COMPANY TYPE

function forEach2(dataset) {
    var categoryArray = []
    for (var i = 0; i < dataset.features.length; i++) {
        categoryArray.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]); 
    }
    //returns Array [ lat, lng, "Category" ]
    console.log(categoryArray[1]);
    return categoryArray;
};

//FUNCTION FOR USER TO SELECT WHICH CATEGORIES THEY WANT TO INCLUDE IN HEAT MAP

function gettheHeat2(dataset){
    var heatMap = L.heatLayer(dataset, {radius: 10}, {maxZoom: 10}).addTo(fullscreenMap);
    heatLayer.addLayer(heatMap);
};

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
    Aircraft leasing = '#a6cee3' :
    Education = '#1f78b4' :
    Engineering firms = '#b2df8a' :
    Industrial products = '#33a02c' :
    Logistics support = '#fb9a99' :
    Machine Shops = '#e31a1c' :
    Maintenance, repair and overhaul = '#fdbf6f' :
    Materials distribution = '#ff7f00' :
    Materials processing = '#cab2d6' :
    Other = '#6a3d9a' :
    Parts and equipment distribution = '#ffff99' :
    Parts and equipment manufacturers = '#b15928' :
    Software and IT = '#d9d9d9' :
    Space = '#ffed6f' :
    Test and Calibration = '#fccde5' ;
}



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

