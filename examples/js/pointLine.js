


var map;
function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [120.74264845819141,31.328891059993765],
        zoom   :  12,
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
    map.on('click',function(e){
        console.log(e)
    })
    canvasTest();
   
   }
   
   
   function  canvasTest() {
       var randomCount = 10;
       var data = [];
       var timedata=[];
       var roads=szRoad.data;
       for(var x in roads){
           var road=roads[x];
           var roadLine=road.ROAD_LINE;
           var lnglatArr=roadLine.split(";");
           var coordinates=[];
           for(var i=0;i<lnglatArr.length;i++) {
               coordinates.push(lnglatArr[i].split(","))
               timedata.push({
                   geometry: {
                       type: 'Point',
                       coordinates:lnglatArr[i].split(",")
                   },
                   count: 1,
                   time: i
               })
   
           }
           data.push({
               geometry: {
                   type: 'LineString',
                   coordinates: coordinates
               },
               time: 100 * Math.random()
           });
       }
   
       var dataSet = new maptalks.GMVI.DataSet(data);
       var options = {
           strokeStyle: 'rgba(53,57,255,0.5)',
           globalCompositeOperation: 'lighter',
           shadowColor: 'rgba(53,57,255,0.2)',
           shadowBlur: 3,
           lineWidth: 3.0,
           draw: 'simple'
       }
      var layer=new maptalks.GMVI.CanvasLayer('ajfljalf',dataSet,options);
      map.addLayer(layer)
   
       dataSet = new maptalks.GMVI.DataSet(timedata);
       options = {
           fillStyle: 'rgba(255, 250, 250, 0.6)',
           globalCompositeOperation: "lighter",
           size: 3,
           animation: {
               steps: 20,
               trails: 5,
               duration: 2,
           },
           draw: 'simple'
       }
       var layer=new maptalks.GMVI.CanvasLayer('ajfljaslfdas',dataSet,options);
       map.addLayer(layer)
   
   }
init();