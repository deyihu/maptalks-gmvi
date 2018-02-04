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
   //初始化gaeainfo地图
    this.map =map= new GL.Map('map-container',
        {
            zoomEffect:false, //缩放动画
            // maxZoom:8,
            // zoom:4
            maxBounds:[[-180,-90],[180,90]],
            maxZoom:18,

            minZoom:5

        });

  

     var baseLayer=GL.LayerLookup.createGeoqTiledLayer('',{style:'midnightblue'});
     
    map.addBaseLayer(baseLayer)


    this.map.setView([120,31],6)


    this.map.on('click',function(e){
        console.log(e)
        console.log(map.getZoom())
    })
    setTimeout(function(e){
        canvasTest();
    },500)


    var vectorLayer=new GL.VectorLayer();
    var point=new GL.Point([120.60949731583878,31.307282946045294]);
    vectorLayer.addOverlay(point);
    map.addLayer(vectorLayer)
}



//热区测试
function  canvasTest() {
    var data = [];
    var poiList=polygondata;
    var len=poiList.length;
    console.log(len)
    for( var i=0;i<len;i++){
        var poiInfo=poiList[i];
        var lnglat=poiInfo.geo;
        var count=parseFloat(poiInfo.count);
        data.push({
            geometry: {
                type: 'Polygon',
                coordinates:(lnglat)
            },
            count: count,
            time: Math.random() * 100,
            color:randomColor(),
            // name:poiInfo.name
        });
        // console.log(count)

    }
    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        splitList: [
            {
                start: 0,
                end: 30,
                color: randomColor()
            },{
                start: 30,
                end: 100,
                color: randomColor()
            },{
                start: 100,
                end: 500,
                color: randomColor()
            },{
                start: 500,
                end: 1000,
                color: randomColor()
            },{
                start: 1000,
                end: 2000,
                color: randomColor()
            },{
                start: 2000,
                color: randomColor()
            }
        ],
        draw: 'choropleth'
    }
    layer= new maptalks.GMVI.CanvasLayer(dataSet,options);//.addTo(this.map);
    map.addLayer(layer)
    
    // layer.on('click',function (e) {
    //     console.log(e)
    // })
}

GL.ready(init,'conf.json');

