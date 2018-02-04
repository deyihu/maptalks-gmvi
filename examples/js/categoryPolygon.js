

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
            count: parseInt(4 * Math.random()),
            // id:GL.H.uuid()
        });
    }

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
        strokeStyle: 'rgba(255, 255, 255, 1)',
        size: 2,
        max: 30,
        draw: 'category',
    }
    var dataSet = new maptalks.GMVI.DataSet(areadata);
    var layer = new maptalks.GMVI.CanvasLayer('ajlfjalfaj;',dataSet,options);
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
// GL.ready(init,'conf.json');
