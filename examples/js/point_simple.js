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
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  12,
        pitch:30,
        maxPitch:60,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
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

var data = []; // 取城市的点来做示例展示的点数据

data = data.concat(getCityCenter(cityData.municipalities));
data = data.concat(getCityCenter(cityData.provinces));
data = data.concat(getCityCenter(cityData.other));

for (var i = 0; i < cityData.provinces.length; i++) {
    var citys = cityData.provinces[i].cities;
    data = data.concat(getCityCenter(citys));
}

function getCityCenter(citys) {
    var data = [];
    for (var i = 0; i < citys.length; i++) {
        var city = citys[i];
        var center = city.g.split('|')[0];
        center = center.split(',');
        data.push({
            lng: parseFloat(center[0]),
            lat: parseFloat(center[1]),
            count: Math.random() * 10
        });
    }
    return data;
};

//热区测试
function  canvasTest() {

    var len=data.length;

    var _data=[];
   
    for( var i=0;i<len;i++){
        var d=data[i];
        var lnglat=[d.lng,d.lat];
        _data.push({
            geometry: {
                type: 'Point',
                coordinates:(lnglat)
            },
            // count: count,
            time: Math.random() * 100,
            color:randomColor(),
            // name:poiInfo.name
        });
        // console.log(count)

    }
    var dataSet = new maptalks.GMVI.DataSet(_data);
    var options = {
        fillStyle: 'rgba(200, 200, 50, 1)', // 填充颜色
        //strokeStyle: 'rgba(0, 0, 255, 1)', // 描边颜色
        //lineWidth: 4, // 描边宽度
        shadowColor: 'rgba(255, 255, 255, 1)', // 投影颜色
        shadowBlur: 35,  // 投影模糊级数
        globalCompositeOperation: 'lighter', // 颜色叠加方式
        size: 4, // 半径
        draw: 'simple'
    }
    layer= new maptalks.GMVI.CanvasLayer("iiiii",dataSet,options);//.addTo(this.map);
    map.addLayer(layer)
    
    // layer.on('click',function (e) {
    //     console.log(e)
    // })
}

init();

