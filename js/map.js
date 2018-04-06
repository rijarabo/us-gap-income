// NYC Center
var centerMap =[36.474307,-100.634766];
var zoomMap= 4;
var map = L.map('my-map').setView(centerMap, zoomMap);

// Reset buton //

$('#resetButton').click(function() {
  map.flyTo(centerMap, zoomMap)
});

// map //

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
}).addTo(map);

//                    0         1         2         3          4          5         6         7         8         9         10        11
var ColorArray 		= ['#CC2895 ','#D657AC','#F47ACC','#FF99DD','#18D67D','#30C88A','#49BA97','#4CB29B','#197FB2','#3654AD','#2B26B7','#C0C0C0'];
var catArray      = [ 2.9,      1.4,      1.1,      1,        0.9,       0.8,      0.7,       0.6,       0.5,     0.4,       0.3,       0]

// var ColorArray 		= ['#26AF08 ','#4FC40A','#78DA0C','#A1F00F','#E5E100','#DFC005','#DAA00A','#D4800F','#CF6014','#CF6014','#C4201E','#C0C0C0'];


function getColor(cat) {
  return cat = null ? 0:
         cat >= catArray[0] ? ColorArray[0] :
         cat >= catArray[1] ? ColorArray[1] :
         cat >= catArray[2] ? ColorArray[2] :
         cat >= catArray[3] ? ColorArray[3] :
         cat >= catArray[4] ? ColorArray[4] :
         cat >= catArray[5] ? ColorArray[5] :
         cat >= catArray[6] ? ColorArray[6] :
         cat >= catArray[7] ? ColorArray[7] :
         cat >= catArray[8] ? ColorArray[8] :
         cat >= catArray[9] ? ColorArray[9] :
         cat >= catArray[10] ? ColorArray[10] :
              ColorArray[11] ;
}

function Style(feature) {
  return {
    color: '#fff',
    weight: .3,
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.data_CAT2),
  };
}

function onEachFeature (feature,layer) {
  var popup=layer.bindPopup(`
    <b style='font-size: 120%'>County:</b> ${feature.properties.data_GEOdisplaylabel}<br/>
    <b style='font-size: 120%'>Male median income: </b>$ ${feature.properties.data_Male_Total}<br/>
    <b style='font-size: 120%'>Female median income: </b>$ ${feature.properties.data_Female_Total} <br/>
    <b style='font-size: 120%'>Gap: </b>$ ${feature.properties.data_Diference} <br/>
    <b style='font-size: 120%'>Proportion:</b> women earn ${feature.properties.data_prop_perc} the median income of men <br/>
   `,)
}

var all = L.geoJson(incomegap, {
  style: Style,
  onEachFeature: onEachFeature
}).addTo(map);


L.geoJSON(state, {
  style: {
    dashArray: '2 10',
    color: '#FFF',
    weight: 2,
    opacity: 1,
    fillOpacity: 0,
  },
  interactive: false
}).addTo(map);
