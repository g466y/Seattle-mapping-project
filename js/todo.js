/*

var leasing;
var education;
var engineering;
var industrial;
var logistics;
var machine;
var maintenace;
var materialsD;
var materialsP;
var other;
var partsD;
var partsM;
var software;
var space;
var test;

function forEach2(dataset) {
    leasing = []
    education = []
    engineering = []
    industrial = []
    logistics = []
    machine = []
    maintenace = []
    materialsD = []
    materialsP = []
    other = []
    partsD = []
    partsM = []
    software = []
    space = []
    test = []
    
    for (var i = 0; i < dataset.features.length; i++) {
        leasing.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]); 
    }
    //returns Array [ lat, lng, "Category" ]
    console.log(leasing[1]);
    return leasing;
};





       if (i == "Aircraft leasing") {
        leasing.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);

       } else if (i == "Education") {
        education.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return;
       } else if (i == "Engineering firms") {
        engineering.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Industrial products") {
        industrial.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Logistics support") {
        logistics.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Machine shops") {
        machine.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Maintenance, repair and overhaul") {
        maintenace.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Materials distribution") {
        materialsD.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Materials processing") {
        materialsP.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Other") {
        other.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Parts and equipment distribution") {
        partsD.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Parts and equipment manufacturers"){
        partsM.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Software and IT") {
        software.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else if (i == "Space") {
        space.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       } else {
        test.push([dataset.features[i].properties.Y, dataset.features[i].properties.X, dataset.features[i].properties.Category]);
        return
       }

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
