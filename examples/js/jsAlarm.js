/**
 * Created by Administrator on 2017/6/22.
 */
var heatLayer;
var map;
var isLarge=false;
function init() {
    //初始化gaeainfo地图
    this.map =map= new GL.Map('map-container',
        {
            // zoomEffect:false, //缩放动画
            zoom:7,
            // minZoom:5,
            maxZoom:15,
            contextmenu:false,
            style:'midnightblue',
        });

    // var url4 = "http://58.210.98.62:7080/JSPGIS/Layers/_alllayers/",
    //     maxBounds = '116.348,30.75, 116.348;121.938999999999,35.133',
    //     orginal4 = '-400, 400',
    //     resolutions4 = [
    //         0.0046875191536433535,
    //         0.0023437595768216767,
    //         0.0011718797884108384,
    //         0.00058593989420541919,
    //         0.00029296994710270959,
    //         0.0001464849735513548
    //     ];
    // var crs={
    //     origin:orginal4,
    //     resolutions:resolutions4,
    //     code: "4326"
    // };
    // var layer4 = GL.LayerLookup.createGaeaTiledLayer( url4, {
    //     origin: orginal4,
    //     resolutions: resolutions4,
    //     maxBounds: maxBounds,
    //     preview: 'assets/images/basemap-esri.png'
    // },crs);
    // this.map.addBaseLayer(layer4);
    var baseLayer=GL.LayerLookup.createMapboxTiledLayer('',{style:'dark'});
    
    map.addBaseLayer(baseLayer);
    
    setTimeout(function(e){
        request();
    },500)


}




function request() {
    $.get('data/alarmData.json', function (rs) {
        $('#loadingdiv').hide();
        var data = [];
        var poiList=rs;
        for( var i=0;i<poiList.length;i++){
            var poiInfo=poiList[i];
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: poiInfo
                },
                count: 1,
                time: Math.random() * 100
            });

        }

        var dataSet = new GL.GMVI.DataSet(data);
        var options = {
            size: 1,
            fillStyle: 'rgba(250, 50, 50, 1)',
        }
        heatLayer =new  GL.GMVI.WebGlLayer(dataSet,options).addTo(map);
    });


}

GL.ready(init,'conf.json');