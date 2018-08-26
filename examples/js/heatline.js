var map;
var layer;


function mecatorToLngLat(mecator_lnglat){
    var lnglat=[];
    if(Array.isArray(mecator_lnglat[0])){
        for(var i=0;i<mecator_lnglat.length;i++){
           var _lnglat=proj4('EPSG:3857','EPSG:4326',mecator_lnglat[i]);
           lnglat.push(_lnglat)
        }
    }else{
        lnglat= proj4('EPSG:3857','EPSG:4326',mecator_lnglat);
    }
    return lnglat;
}


function init() {
    map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [116.32736206054689,39.84861229610178],
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
    map.on('click',function(e){
        console.log(e)
    })
   
   
    setTimeout(function(e){
        canvasTest();
    },500)

}


function  canvasTest() {
    var data = [];
    var poiList=driveData;
    var len=poiList.length;
    console.log(len)
    for( var i=0;i<len;i++){
        var poiInfo=poiList[i];
        var lnglat=poiInfo.geo;
        data.push({
            geometry: {
                type: 'LineString',
                coordinates:mecatorToLngLat(lnglat)
            },
            count: Math.random() * 6,
            time: Math.random() * 100,
            // color:randomColor(),
            // name:poiInfo.name
        });

    }
    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        shadowBlur: 20,
        shadowColor: 'black',
        max: 10, // 设置显示的权重最大值
        lineWidth: 5, // 半径大小
        strokeStyle: 'rgba(0, 0, 0, 0.2)',
        maxOpacity: 0.8,
        gradient: { // 显示的颜色渐变范围
            '0': 'blue',
            '0.6': 'cyan',
            '0.7': 'lime',
            '0.8': 'yellow',
            '1.0': 'red'
        },
        draw: 'heatmap'
    }
    layer= new maptalks.GMVI.CanvasLayer('jlajflas',dataSet,options);
    map.addLayer(layer)

}
init();

