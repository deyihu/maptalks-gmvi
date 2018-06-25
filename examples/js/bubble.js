var map;
var canvasLayer;
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
    
    canvasTest();
    // this.map.setView([31.307282946045294,120.60949731583878])
}



//热区测试
function  canvasTest() {
    var data = [];
    var poiList=gsAreaPoi.data;
    for( var i=15000;i<25010;i++){
        var poiInfo=poiList[i];
        var lng=poiInfo.lng;
        var lat=poiInfo.lat;
        data.push({
            geometry: {
                type: 'Point',
                coordinates: [lng,lat]
            },
            count: 30 * Math.random(),
            time: Math.random() * 100,
            color:randomColor(),
            fillStyle:randomColor()
        });

    }

    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        fillStyle: 'rgba(244,233,37, 0.6)',
        maxSize: 20,
        max: 30,
        draw: 'bubble',
    }
    canvasLayer=new maptalks.GMVI.CanvasLayer("ajsflja",dataSet,options);
    map.addLayer(canvasLayer)
    
    map.on('click',function(e){
        let d=canvasLayer.identify(e);
        if(d){
           console.log(d)
        }
     })

}
init();

