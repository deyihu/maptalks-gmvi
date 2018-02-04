var map;
var layer;
function init() {
   //初始化gaeainfo地图
    this.map =map= new GL.Map('map-container',
        {
            zoomEffect:false, //缩放动画
            // maxZoom:8,
            // zoom:4
            maxBounds:[[-180,-90],[180,90]],
            maxZoom:18,

            minZoom:4

        });

     var baseLayer=GL.LayerLookup.createGeoqTiledLayer('',{style:'midnightblue'});
    map.addBaseLayer(baseLayer)
    this.map.setView([120.60949731583878,31.307282946045294])


    this.map.on('click',function(e){
        console.log(e)
        console.log(map.getZoom())
    })
    setTimeout(function(e){
        // request();
        canvasTest();
    },1000)


  
}

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



function formatdata(roads,data){
    for (var i = 0; i < roads.length; i++) {
        var item = roads[i];
        var lnglats=item.split(';');
        var coord=[];
        for (var j = 0; j < lnglats.length; j ++) {
            var lnglat=lnglats[j];
            coord.push(mecatorToLngLat(lnglat.split(',')))
           
        }   
        data.push({
            geometry: {
                type: 'LineString',
                coordinates:coord
            },
            count: 1,
            // time: 100 / lnglat.length * j
        });
    }
}

function canvasTest(){
    var data = [];
    var roads=ShangHai.data;
    formatdata(roads,data);
    roads=SuZhou.data;
    formatdata(roads,data);
    roads=NanJing.data;
    formatdata(roads,data);
    roads=HangZhou.data;
    formatdata(roads,data);
    // roads=BeiJing.data;
    // formatdata(roads,data);
   
    console.log(data.length)
    var dataSet = new GL.GMVI.DataSet(data);
    var options = {
        size: 1,
        fillStyle: 'rgba(0,152,217, 1)',
        strokeStyle:'rgba(0,152,217, 1)'
    }
    layer =new  GL.GMVI.WebGlLayer(dataSet,options);//.addTo(map);
    map.addLayer(layer)
    $('#loadingdiv').hide();
}


// function request() {
//     $.get('data/heatmap-test', function (data) {
//         //    $('#loadingdiv').hide();
//            $('#loadingdiv').hide();
//            var _data = [];
//            data = data.split('\n');
//            for (var i in data) {
//                var dataLine = data[i].split('\t');
//                var lines = dataLine[0].split(',');
//                var coor = [];
//                for (var j = 0; j < lines.length; j += 2) {
//                    coor.push([lines[j], lines[j + 1]])
//                }
//                _data.push({
//                    geometry: {
//                        type: 'LineString',
//                        coordinates: coor
//                    },
//                    count: dataLine[1]
//                });

//                _data.push({
//                 geometry: {
//                     type: 'LineString',
//                     coordinates: coor
//                 },
//                 count: dataLine[1]
//             });
//             //    if(_data.length>20000) break;
//            }


//            console.log(_data.length);
//             var dataSet = new GL.GMVI.DataSet(_data);
//             var options = {
//                 size: 1,
//                 fillStyle: 'rgba(0,152,217, 1)',
//                 strokeStyle:'rgba(0,152,217, 1)'
//             }
//             layer =new  GL.GMVI.WebGlLayer(dataSet,options);//.addTo(map);
//             map.addLayer(layer)
// })
     

// }
GL.ready(init,'conf.json');

