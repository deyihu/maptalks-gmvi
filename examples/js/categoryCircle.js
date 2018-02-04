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
            urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
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
    for( var i=0;i<100;i++){
        var poiInfo=poiList[i];
        var lng=poiInfo.lng;
        var lat=poiInfo.lat;
        data.push({
            name:poiInfo.name,
            geometry: {
                type: 'Circle',
                coordinates: [lng,lat],
                radius:500
            },
            count: parseInt(4 * Math.random()),
            time: Math.random() * 100,
            // id:GL.H.uuid()
        });

    }

    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
          splitList: {
            other: randomColor(),
            1: randomColor(),
            2: randomColor(),
            3: randomColor(),
            4: randomColor(),
            5: randomColor(),
            6: randomColor()
        },
        // fillStyle: 'rgba(255, 250, 50, 0.6)',
        draw: 'category',
    }
    var layer = new maptalks.GMVI.CanvasLayer('owrjfalsjf',dataSet,options);
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
// GL.init(init,'conf.json')