
// var popup=new GL.Popup();
var map;

function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  12,
        pitch:30,
        maxPitch:60,
        // enableInfoWindow :false,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    canvasTest();

}

function  canvasTest() {
    var data = [];
    var roads=szRoad.data;
    for(var x in roads){
        var road=roads[x];
        var roadLine=road.ROAD_LINE;
        var lnglatArr=roadLine.split(";");
        var coordinates=[];
        for(var i=0;i<lnglatArr.length;i++)
            coordinates.push(lnglatArr[i].split(","))
        data.push({
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            },
            count: 30 * Math.random(),
            time: 100 * Math.random(),
            // id:GL.H.uuid()
        });

    }
    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        gradient: {
            0: 'blue',
            0.5: 'yellow',
            1: 'red'
        },
        lineWidth:5,
        max: 30,
        draw: 'intensity',
    }
    var layer = new maptalks.GMVI.CanvasLayer('jaslfjljasf',dataSet,options);
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