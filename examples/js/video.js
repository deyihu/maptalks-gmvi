
var map;
var popup=new GL.Popup();

var layer;
function init() {
    //初始化gaeainfo地图
    map = map=new GL.Map('map-container',
        {
            zoomEffect:false, //缩放动画
            zoom:14,
            maxZoom:19
        });

    var url4="http://58.210.98.62:7080/suzhou_image_2000_global/Layers/_alllayers/";
    var orginal4="-180,90";
    var resolutions4 = [1.4078260157100577,0.70391300785502775,0.35156249999999994, 0.17578124999999997, 0.08789062500000014, 0.04394531250000007, 0.021972656250000007, 0.01098632812500002,
        0.00549316406250001, 0.0027465820312500017, 0.0013732910156250009, 0.000686645507812499, 0.0003433227539062495, 0.00017166137695312503,
        0.00008583068847656251, 0.000042915344238281406, 0.000021457672119140645, 0.000010728836059570307, 0.000005364418029785169,0.0000026822090148925845]
    var maxBounds4 = "119.89,30.75;121.406,32.08" ;
    var crs={
        origin:orginal4,
        resolutions:resolutions4,
        code: "4326"
    }


    var layer4 =  GL.LayerLookup.createGaeaTiledLayer(url4, {
        origin: orginal4,
        resolutions: resolutions4,
        maxBounds: maxBounds4,
        format:'png',
        // preview: 'assets/images/basemap-esri.png'
    },crs);
    map.addBaseLayer(layer4);
    map.on('click',function (e) {
        console.log(e.lnglat)
    })
    // map.setCenter([120.5794101275186,31.307052573814577])
    map.setView( [120.31089398670265,31.373914646148547],18)
    canvasTest();
}



//热区测试
function  canvasTest() {
    var data = [];
    // var poiList=szpois;
    // var len=poiList.length;
    var video=document.createElement('video');
    video.src='./assets/video/a1.mp4';
    video.width=200;
    video.height=100;
    video.loop=true;

    var video1=document.createElement('video');
    video1.src='./assets/video/a3.mp4'
    video1.width=200;
    video1.height=100;
    video1.loop=true;
    // for( var i=0;i<1;i++) {
        // var poiInfo = poiList[i];
        data.push({
            geometry: {
                type: 'Rectangle',
                coordinates: [120.31089398670265,31.373914646148547],
                width:300,
                height:200
            },
            video:video,
            rotate:78,
            time: Math.random() * 100,
            id:GL.H.uuid()
        });



    data.push({
        geometry: {
            type: 'Rectangle',
            coordinates: [120.311858670265,31.371004646148547],
            width:300,
            height:220
        },
        video:video1,
        rotate:78,
        time: Math.random() * 100,
        id:GL.H.uuid()
    });

    // }
    var dataSet = new GL.GMVI.DataSet(data);//31.305068923130616
    var options = {
        draw: 'video',
    }

    //确保视频资源加载完成
    video.onloadeddata=function () {
        layer= new GL.GMVI.CanvasLayer(dataSet,options);
        map.addLayer(layer);//.addTo(this.map);
        layer.on('click',function (e) {
            console.log(e)
        })
    }


}

GL.ready(init,'conf.json');

