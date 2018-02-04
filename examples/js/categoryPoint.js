
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
            urlTemplate: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    // map.on('click',function(e){
    //     console.log(e)
    // })
    canvasTest();

}

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
            count: parseInt(10 * Math.random()),
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
        size: 10,
        max: 30,
        draw: 'category',
    }
    var layer =new maptalks.GMVI.CanvasLayer('alsjflajslfkd',dataSet,options);
    map.addLayer(layer)

    layer.on('click',function(e){
        console.log(e)
        console.log(e.name)
        var coordinate=e.location.coordinate;
    },this)

}
// GL.ready(init,'conf.json');
init();
