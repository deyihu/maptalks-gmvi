
var map;
// var popup=new GL.Popup();
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
    var data = [];
    var poiList=szpois;
    var len=poiList.length;
    console.log(len)
    var overlays=[];
    for( var i=0;i<100;i++) {
        var poiInfo = poiList[i];
        data.push({
            geometry: {
                type: 'Point',
                coordinates:poiInfo
            },
            text:'G',
            // rotate:360*Math.random(),
            time: Math.random() * 100,
            // id:GL.H.uuid(),
            color:randomColor()
        });
        // overlays.push(new GL.Point(poiInfo))

    }
    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        draw: 'text',
        font: '18px Arial',
        fillStyle: 'yellow',
        // shadowColor: 'yellow',
        // shadowBlur: 10
    }
   var layer= new maptalks.GMVI.CanvasLayer('aljflajflas',dataSet,options)
   map.addLayer(layer);
   layer.on('click',function(e){
    console.log(e)
        console.log(e.name)
        var coordinate=e.location.coordinate;
    // popup.setTitle('info')
    // popup.setContent(e.location.coordinate.toString())
    // popup.addTo(map).show(coordinate);

    })


}
init();

