
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
            urlTemplate: '//a.tiles.mapbox.com/v3/spatialdev.map-c9z2cyef/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    canvasTest();

}



//热区测试
function  canvasTest() {
    var data = [];
    var roads=szRoad.data;
    for(var x in roads){
        var road=roads[x];
        var roadLine=road.ROAD_LINE;
        var lnglatArr=roadLine.split(";");
        var coordinates=[];
        for(var i=0;i<lnglatArr.length;i++)
            coordinates.push(lnglatArr[i].split(","));
            // if(coordinates.length===2)
                data.push({
                    geometry: {
                        type: 'LineString',
                        coordinates: coordinates
                    },
                    time: 100 * Math.random(),
                    // id:GL.H.uuid()
                });
    }
    var dataSet = new maptalks.GMVI.DataSet(data);

    var options = {
        strokeStyle: "rgba(255, 50, 50, 0.3)",
        lineWidth: 6,
        max: 30,
        globalCompositeOperation:"lighter",
        draw: 'simple',
    }
   var canvasLayer=new maptalks.GMVI.CanvasLayer('sjdalfj',dataSet,options);
   map.addLayer(canvasLayer);
   map.on('click',function(e){
       let d=canvasLayer.identify(e);
       if(d){
          console.log(d)
       }
    })


}
init();

