//set map view
var fullscreenMap = L.map('map').setView([47.58,-122.2], 10);

//get tiles
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

//add tiles
fullscreenMap.addLayer(CartoDBTiles);

//gets Data
$.getJSON( "geojson/biz.geojson", function( data ) {
	var dataset = data;
//density overall
	var resultAll = forEach(dataset);
	gettheHeat(resultAll);
    createBiz(dataset);
//density by category
    //forEach2(dataset);
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

var bizStyle = function (feature, latlng) {
    
    var type = feature.properties.Category;

    var style = L.circleMarker(latlng, {
        weight: 2,
        radius: 5,
        opacity: .1,
        color: 'white',
        fillOpacity: 0.75,
        fillColor: getColor(type)
    });
    return style;
}

//creates a pop-up for each company
var bizClick = function (feature, layer) {
    layer.bindPopup("<strong>Company Name: </strong>" + feature.properties.Comp_Name + "<strong> </br>Category: </strong>" + feature.properties.Category);
}

//creates an array to be used in the heatmap function
function forEach(dataset) {
	var array = []
	for (var i = 0; i < dataset.features.length; i++) {
		array.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, 100]); 
	}
    //returns Array [ lat, lng, # ]
	return array;
};

//empty variable to create a heatmap layer
var heatMap;

//draws the heatmap
function gettheHeat(dataset){
    heatMap = L.heatLayer(dataset, {radius: 10}, {maxZoom: 10}).addTo(fullscreenMap);
};


//END FUNCTIONS

//assigns color to company type
function getColor(d) {
    return d == "Aircraft leasing" ? '#CC3399' :
           d == "Education" ? '#FFCC00' :
           d == "Engineering firms" ? '#00CC99' :
           d == "Industrial products" ? '#0099FF' :
           d == "Logistics support" ? '#FF3333' :
           d == "Machine shops" ? '#FF99FF' :
           d == "Maintenance, repair and overhaul" ? '#3333FF' :
           d == "Materials distribution" ? '#FFB894' :
           d == "Materials processing" ? '#9999FF' :
           d == "Other" ? '#666666' :
           d == "Parts and equipment distribution" ? '#CC6600' :
           d == "Parts and equipment manufacturers" ? '#00A37A' :
           d == "Software and IT" ? '#CCCC00' :
           d == "Space" ? '#33CCFF' :
           d == "Test and calibration" ? '#6a3d9a' :
           '#edf8e9';
}

//add legend to map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
        labels = ['<strong>Aerospace Industry by Company Type:</strong>'],
        categories = ["Aircraft leasing", "Education", "Engineering firms", "Industrial products", "Logistics support", "Machine shops", "Maintenance, repair and overhaul", "Materials distribution", "Materials processing", "Other", "Parts and equipment distribution", "Parts and equipment manufacturers", "Software and IT", "Space", "Test and calibration"];

        for (var i = 0; i < categories.length; i++) {
                div.innerHTML += 
                labels.push(
                    '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
                (categories[i] ? categories[i] : '+'));
            
            div.innerHTML = labels.join('<br>');
            div.innerHTML +=
                '<p></p>' +
                '<b>Credits:</b>' +
                '<br><span>Data provided by <a href=\"http://www.locus.org\">Locus Analytics</a><br />' + 
                'Thanks to <a href=\"http://nijel.org/\">JD Godchaux</a></span><br />';
};
    return div;
    };

legend.addTo(fullscreenMap);

//layer control
function getControl () {
    
    var baseMaps = {
        "Seattle, WA, USA": CartoDBTiles,
    };

    var overlayMaps = {
        "Overall Density": heatMap,        
        "Companies": pointLayer,
    };

    L.control.layers(baseMaps, overlayMaps).addTo(fullscreenMap);

}


/*

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


//
function forEach2(dataset) {
    var categoryArray = []
    for (var i = 0; i < dataset.features.length; i++) {
        categoryArray.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]); 
    }
    //returns Array [ lat, lng, "Category" ]
    console.log(categoryArray[1]);
    return categoryArray;
};

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

