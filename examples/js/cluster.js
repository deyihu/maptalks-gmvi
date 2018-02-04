
var map;
// var popup=new GL.Popup();
var data=[];
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

    clusterTest();



}


function  clusterTest() {
    var data = [];
    var poiList=szpois;
    var img = new Image();
    img.src = 'assets/icons/poi.png';
    for( var i=0;i<poiList.length;i++){
        var poiInfo=poiList[i];
        data.push({
            geometry: {
                type: 'Point',
                coordinates: poiInfo
            },
            count: 1,
            time: Math.random() * 100,
            // id:GL.H.uuid(),
            icon:img
        });

    }

    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        size:15,
        // globalCompositeOperation: 'lighter',
        font:12+'px Microsoft YaHei UI',
        fillStyle: 'red',
        // strokeStyle: 'red', // 边框颜色
        draw: 'cluster',
        maxClusterLv:15,
    }
    var layer=new maptalks.GMVI.CanvasLayer('ajkfldjalfjla',dataSet,options);
    map.addLayer(layer)
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

