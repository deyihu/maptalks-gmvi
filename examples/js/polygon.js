
// var popup=new GL.Popup();
var map;
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

function  canvasTest() {
    var areadata = [];
    var ares=szArea.features;
    var regionData=[];
    for(var x in ares){
        var name=ares[x].properties.name;
        var geometry=ares[x].geometry;
        var coordinates=geometry.coordinates[0];
        areadata.push({
            name:name,
            geometry: {
                type: 'Polygon',
                coordinates:coordinates,
              
              
            },
              time: 100 * Math.random(),
            //   id:GL.H.uuid(),
              strokeStyle: randomColor()
        });
    }

   
    var dataSet = new maptalks.GMVI.DataSet(areadata);
    var options = {
        fillStyle: 'rgba(255,136,0, 0.8)',
        strokeStyle: 'rgba(255,255,255, 1)',
        gradient: {
            0: 'blue',
            0.5: 'yellow',
            1: 'red'
        },
        lineWidth: 0.8,
        max: 30,
        draw: 'simple',
    }
    var canvasLayer =new maptalks.GMVI.CanvasLayer('jlasfj',dataSet,options);
    map.addLayer(canvasLayer)
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

}
init();