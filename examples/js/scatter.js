
var layer;
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
            urlTemplate: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
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
    var poiList=gsAreaPoi.data;
    var len=poiList.length;
    console.log(len)
    for( var i=0;i<100;i++){
        var poiInfo=poiList[i];
        var lng=poiInfo.lng;
        var lat=poiInfo.lat;
        data.push({
            geometry: {
                type: 'Point',
                coordinates: [lng,lat]
            },
            count: Math.random() * 10,
            time: Math.random() * 100,
            color:randomColor(),
            name:poiInfo.name
        });

    }
    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        size: 35,
        lineWidth:3,
        speed:10,
        font:'15px sans-serif',
        draw: 'scatter'
    }
    layer= new maptalks.GMVI.CanvasLayer('jalfjalf',dataSet,options);//.addTo(this.map);
    map.addLayer(layer)
    
    layer.on('click',function (e) {
        console.log(e)
    })
}
init();
// GL.ready(init,'conf.json');
