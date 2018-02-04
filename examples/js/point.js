
var  map;
function init() {
    map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  12,
        pitch:30,
        maxPitch:60,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    map.on('click',function(e){
        console.log(e)
    })
    
     canvasTest();
 
 }
 
 
 
 //热区测试
 function  canvasTest() {
     var data = [];
     var poiList=gsAreaPoi.data;
     for( var i=15000;i<25000;i++){
         var poiInfo=poiList[i];
         var lng=poiInfo.lng;
         var lat=poiInfo.lat;
         data.push({
             geometry: {
                 type: 'Point',
                 coordinates: [lng,lat]
             },
             count: 1,
             time: Math.random() * 100
         });
 
     }
 
     var dataSet = new maptalks.GMVI.DataSet(data);
     var options = {
         fillStyle: 'rgba(255, 50, 50, 0.6)',
         shadowColor: 'rgba(255, 50, 50, 1)',
         shadowBlur: 10,
         globalCompositeOperation: 'lighter',
        //  animation: {
        //      type: 'time',
        //      stepsRange: {
        //          start: 0,
        //          end: 100
        //      },
        //      steps: 100,
        //      trails: 10,
        //      duration: 5,
        //  },
         size: 5,
         draw: 'simple',
     }
     var canvasLayer=new maptalks.GMVI.CanvasLayer('111',dataSet,options);
     canvasLayer.addTo(map)
     canvasLayer.on('click',function(e){
        console.log(e)
        console.log(e.name)
        var coordinate=e.location.coordinate;
        // popup.setTitle('info')
        // popup.setContent(e.location.coordinate.toString())
        // popup.addTo(map).show(coordinate);

    })

 
     // this.map.removeLayer(heatLayer)
 
 }
 
init();
 