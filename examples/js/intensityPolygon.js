

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
    var areadata = [];
    var ares=szArea.features;
    for(var x in ares){
        var geometry=ares[x].geometry;
        var coordinates=geometry.coordinates[0];
        areadata.push({
            geometry: {
                type: 'Polygon',
                coordinates:coordinates,
            },
            count: Math.random() * 10,
            time: 100 * Math.random(),
            // id:GL.H.uuid()
        });
    }
    var dataSet = new maptalks.GMVI.DataSet(areadata);
    var options = {
        gradient: {
            '0': 'blue',
            '0.6': 'cyan',
            '0.7': 'lime',
            '0.8': 'yellow',
            '1.0': 'red'
        },
        lineWidth: 0.5,
        max: 10,
        draw: 'intensity'
    }
    var layer = new maptalks.GMVI.CanvasLayer('ajlfjalfjalsf',dataSet,options);
    map.addLayer(layer)
    map.on('click',function(e){
        let d=layer.identify(e);
        if(d){
           console.log(d)
        }
     })



}
init();
