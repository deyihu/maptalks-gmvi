
var map;
function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  4,
        pitch:30,
        maxPitch:60,
        // enableInfoWindow :false,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: '//a.tiles.mapbox.com/v3/spatialdev.map-c9z2cyef/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
     setTimeout(function() {
         request();
     }, 1000);
  
     this.map.on('click',function(e){
         console.log(e)
         console.log(map.getZoom())
     })
 
 }
 
 
 
  function request() {
         $.get('data/weibo.json', function (rs) {
             $('#loadingdiv').hide();
             var data1 = [];
             var data2 = [];
             var data3 = [];
             var data4 = [];
             for (var i = 0; i < rs[0].length; i++) {
                 var geoCoord = rs[0][i].geoCoord;
                 data1.push({
                     geometry: {
                         type: 'Point',
                         coordinates: geoCoord
                     }
                 });
             }
 
             for (var i = 0; i < rs[1].length; i++) {
                 var geoCoord = rs[1][i].geoCoord;
                 data2.push({
                     geometry: {
                         type: 'Point',
                         coordinates: geoCoord
                     },
                     time: Math.random() * 100
                 });
             }
 
             for (var i = 0; i < rs[2].length; i++) {
                 var geoCoord = rs[2][i].geoCoord;
                 data3.push({
                     geometry: {
                         type: 'Point',
                         coordinates: geoCoord
                     },
                 });
             }
 
             var dataSet = new maptalks.GMVI.DataSet(data1);
             var options = {
                 fillStyle: 'rgba(200, 200, 0, 0.8)',
                 size: 0.7,
                 draw: 'simple',
             }
             var layer1 = new maptalks.GMVI.CanvasLayer('ajfldajfl', dataSet, options);
             map.addLayer(layer1)
 
             var dataSet = new maptalks.GMVI.DataSet(data2);
             var options = {
                 fillStyle: 'rgba(255, 250, 0, 0.8)',
                 size: 0.7,
                 draw: 'simple',
             }
             var layer2 = new maptalks.GMVI.CanvasLayer('jjlasdjflasjfd',dataSet, options);
             map.addLayer(layer2)
 
             var dataSet = new maptalks.GMVI.DataSet(data3);
             var options = {
                 fillStyle: 'rgba(255, 250, 250, 0.6)',
                 size: 0.7,
                 draw: 'simple',
             }
             var layer3 = new maptalks.GMVI.CanvasLayer('ajfsdljdflas',dataSet, options);
             map.addLayer(layer3)
 
             var dataSet = new maptalks.GMVI.DataSet(data2);
             var options = {
                 fillStyle: 'rgba(255, 250, 250, 0.9)',
                 size: 1.1,
                 draw: 'simple',
                 animation: {
                         type: 'time',
                         stepsRange: {
                             start: 0,
                             end: 100
                         },
                         steps: 100,
                         trails: 10,
                         duration: 5,
                  },
             }
             var layer4 = new maptalks.GMVI.CanvasLayer('ajldsfjasl',dataSet, options);
             map.addLayer(layer4)
         });
 
 }
 
init();