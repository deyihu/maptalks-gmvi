function mecatorToLngLat(mecator_lnglat){
    var lnglat=[];
    if(Array.isArray(mecator_lnglat[0])){
        for(var i=0;i<mecator_lnglat.length;i++){
           var _lnglat=proj4('EPSG:3857','EPSG:4326',mecator_lnglat[i]);
           lnglat.push(_lnglat)
        }
    }else{
        lnglat= proj4('EPSG:3857','EPSG:4326',mecator_lnglat);
    }
    return lnglat;
}

var map;
function init() {
    map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [114.26742553710938,30.409005247458758],
        zoom   :  10,
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
     }, 500);
 
 }
 
 
 
  function request() {
          $.get('data/wuhan-car', function (rs) {
              $('#loadingdiv').hide();
             var data = [];
             var timeData = [];
 
             rs = rs.split("\n");
             var maxLength = 0;
             for (var i = 0; i < rs.length; i++) {
                 var item = rs[i].split(',');
                 var coordinates = [];
                 if (item.length > maxLength) {
                     maxLength = item.length;
                 }
                 for (j = 0; j < item.length; j += 2) {
                     if(!item[j]||!item[j+1])
                       continue;
                     coordinates.push([parseFloat(item[j]), parseFloat(item[j + 1])]);
                     timeData.push({
                         geometry: {
                             type: 'Point',
                             coordinates:mecatorToLngLat( [parseFloat(item[j]), parseFloat(item[j + 1])])
                         },
                         count: 1,
                         time: j
                     });
                 }
                
                if(!coordinates||coordinates.length<2)
                    continue;
                 data.push({
                     geometry: {
                         type: 'LineString',
                         coordinates: mecatorToLngLat(coordinates)
                     }
                 });
                 
             }
             var dataSet = new maptalks.GMVI.DataSet(data);
 
             var options = {
                 strokeStyle: 'rgba(53,57,255,0.5)',
                 shadowColor: 'rgba(53,57,255,0.2)',
                 shadowBlur: 3,
                 lineWidth: 3.0,
                 draw: 'simple'
             }
 
             var mapvLayer = new maptalks.GMVI.CanvasLayer('ajlfjalfjla',dataSet, options);
             map.addLayer(mapvLayer)
 
 
             var dataSet = new maptalks.GMVI.DataSet(timeData);
 
             var options = {
                 fillStyle: 'rgba(255, 250, 250, 0.2)',
                 globalCompositeOperation: "lighter",
                 size: 1.5,
                 animation: {
                     stepsRange: {
                         start: 0,
                         end: 100 
                     },
                     trails: 3,
                     duration: 5,
                 },
                 draw: 'simple'
             }
 
             var mapvLayer = new maptalks.GMVI.CanvasLayer('ajlsdfjlasjfasl',dataSet, options);
             map.addLayer(mapvLayer)
         });
 }
init();