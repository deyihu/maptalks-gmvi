
var map;
// var popup=new GL.Popup();
var data=[];
function init() {
    map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  12,
        // pitch:30,
        maxPitch:60,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attribution: {
            content: 'One Attribution Control'
          },
        // maxExtent:new maptalks.Extent(-180, -90, 180, 90),
        baseLayer: new maptalks.TileLayer('base', {
            urlTemplate: 'http://www.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i342009817!3m9!2sen-US!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0&token=32965',
            subdomains: ['a','b','c','d'],
            attribution: '&copy; Google Maps'
          })
    });


    clusterTest();
    




}


function  clusterTest() {
    var data = [];
    var poiList=szpois;
    console.log(szpois.length);
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
        size:20,
        // globalCompositeOperation: 'lighter',
        font:12+'px Microsoft YaHei UI',
        fillStyle: 'red',
        // strokeStyle: 'red', // 边框颜色
        draw: 'cluster',
        maxClusterLv:15,
    }
    var layer=new maptalks.GMVI.CanvasLayer('ajkfldjalfjla',dataSet,options);
    map.addLayer(layer)
    map.on('click',function(e){
        let d=layer.identify(e);
        if(d){
           console.log(d)
        }
     })


}

init();

