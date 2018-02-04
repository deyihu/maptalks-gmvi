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
        zoom   :  11,
        pitch:30,
        maxPitch:60,
        // enableInfoWindow :false,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });

   


    this.map.on('click',function(e){
        console.log(e)
        console.log(map.getZoom())
    })
    setTimeout(function(e){
        canvasTest();
    },500)

}



function  canvasTest() {
    var data = [];
    var timeData = [];
    var poiList=driveData;
    var len=poiList.length;
    var maxLength = 0;
    console.log(len)
    for( var i=0;i<len;i++){
        var poiInfo=poiList[i];
        var lnglat=poiInfo.geo;
        lnglat=mecatorToLngLat(lnglat);
        data.push({
            geometry: {
                type: 'LineString',
                coordinates:lnglat
            },
            // count: Math.random() * 10,
            // time: Math.random() * 100,
            // color:randomColor(),
            // name:poiInfo.name
        });
        for (var j = 0; j < lnglat.length; j ++) {
            // coordinates.push([item[j], item[j + 1]]);
            timeData.push({
                geometry: {
                    type: 'Point',
                    coordinates:lnglat[j]
                },
                count: 1,
                time: 100 / lnglat.length * j
            });
        }

    }
    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        // strokeStyle: 'rgba(250, 250, 0, 0.2)',
        // // globalCompositeOperation: 'lighter',
        // shadowColor: 'rgba(250, 255, 0, 1)',
        // shadowBlur: 15,
        // lineWidth: 2.0,

        lineWidth: 5,
        shadowBlur: 20,
        shadowColor: "rgba(250, 255, 0, 1)",
        strokeStyle: "rgba(250, 250, 0, 0.2)",
        draw: 'simple'
    }
    layer= new maptalks.GMVI.CanvasLayer('jfldjafl',dataSet,options);//.addTo(this.map);
    map.addLayer(layer)

    dataSet=new maptalks.GMVI.DataSet(timeData);
    var options = {
        fillStyle: 'rgba(255, 250, 250, 0.1)',
        globalCompositeOperation: "lighter",
        size: 4.0,
        animation: {
            stepsRange: {
                start: 0,
                end: 100 
            },
            trails: 1,
            duration: 5,
        },
        draw: 'simple'
    }

       var mapvLayer = new maptalks.GMVI.CanvasLayer('jlfsdajflas',dataSet,options);
       map.addLayer(mapvLayer)
}

init();

