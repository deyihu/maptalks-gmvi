



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
            urlTemplate: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
 
         request();
         this.map.on('click',function(e){
             console.log(e)
             console.log(map.getZoom())
        })
 
 }
 
 
 
  function request() {
        $.get('data/china-point.json', function (rs) {
              $('#loadingdiv').hide();
            var data=[];
             for (var i = 0; i < rs[0].length; i++) {
                 var geoCoord = rs[0][i].geoCoord;
                 data.push({
                     geometry: {
                         type: 'Point',
                         coordinates: geoCoord
                     },
                     time: Math.random() * 100,
                 });
             }
 
             var dataSet = new maptalks.GMVI.DataSet(data);
             var options = {
                 fillStyle: 'rgba(255, 250, 50, 0.6)',
                 size: 4,
                 draw: 'simple',
                 animation: {
                         type: 'time',
                         stepsRange: {
                             start: 0,
                             end: 100
                         },
                         trails: 10,
                         duration: 5,
                     },
             }
 
             var layer =new maptalks.GMVI.CanvasLayer('ajdflajfla',dataSet,options);
             map.addLayer(layer)
         });
 }
 
 
init();
 