
// var map;
// var popup=new GL.Popup();
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
            urlTemplate: '//a.tiles.mapbox.com/v3/spatialdev.map-c9z2cyef/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
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
            name:poiInfo.name,
            geometry: {
                type: 'Point',
                coordinates: [lng,lat]
            },
            count: 1,
            time: Math.random() * 100,
            // id:GL.H.uuid()
        });

    }

    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        fillStyle: 'rgba(55, 50, 250, 0.6)',
        globalCompositeOperation: "lighter",
        size: 8,
        draw: 'simple'
    }
    var canvasLayer = new maptalks.GMVI.CanvasLayer('jasldfjlasf',dataSet,options);//.addTo(this.map);
     map.addLayer(canvasLayer)
     map.on('click',function(e){
        let d=canvasLayer.identify(e);
        if(d){
           console.log(d)
        }
     })
}

init();