
var map;

var layer;
function init() {
    //初始化gaeainfo地图
        
    var map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.305855269468058,120.72237894385022].reverse(),
        zoom   :  15,
        maxPitch:60,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    

    var dataSet = new maptalks.GMVI.DataSet([]);
    var options={
        alphaRange: 0.4
    }
    layer=new maptalks.GMVI.WebGlHeatLayer(dataSet,options)
    map.addLayer(layer)

    var nameArr=['HZYH2015-1.json','HZYH2015-2.json',
    'HZYH2015-3.json','HZYH2015-4.json','HZYH2016-1.json','HZYH2016-2.json','HZYH2016-3.json','HZYH2016-4.json'
    ,'HZYH2017-1.json','HZYH2017-2.json','HZYH2017-3.json','HZYH2017-4.json'];
    setTimeout(function(e){
       for(var x in nameArr){
           request1(nameArr[x])
       }
    },500)



}
var data = [];

function request1(name) {
    $.get('data/'+name, function (rs) {
        $('#loadingdiv').hide();
        var poiList=rs.data;
        for( var i=0;i<poiList.length;i++){
            var poiInfo=poiList[i];
            var coord=[poiInfo.X,poiInfo.Y];
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates:coord
                },
                count:15*Math.random(),
                time: Math.random() * 100
            });
           
        }
        console.log(data.length)
        var dataSet = new maptalks.GMVI.DataSet(data);
         layer.resetDatas(dataSet)
    });


}
init();


// // console.log(window)
// GL.ready(init,'conf.json');

// $(function () {
//     init();
//     // canvasTest();
//     setTimeout(function(e){
//         // request();
//         request1();
//     },500)
// });
