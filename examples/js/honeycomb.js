
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
            urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    map.on('click',function(e){
        console.log(e)
    })

    canvasTest();
    
    // this.map.setView([31.307282946045294,120.60949731583878])

}



//鐑尯娴嬭瘯
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
            time: Math.random() * 100
        });

    }

    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        fillStyle: 'white',
        strokeStyle:'black',
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 20,
        max: 10,
        showText:true,
        size: 40,
        globalAlpha: 0.5,
        gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
        draw: 'honeycomb',
    }
    var heatLayer =new maptalks.GMVI.CanvasLayer('jalsjflasjfd',dataSet,options);//.addTo(this.map);
    map.addLayer(heatLayer)
}
init();
// GL.init(init,'conf.json')