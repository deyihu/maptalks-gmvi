

function  lnglatToMecator(lnglat){
    return proj4('EPSG:4326','EPSG:3857',lnglat)
}


var map;
function init() {
    //初始化gaeainfo地图
    this.map =map= new GL.Map('map-container',
        {
            // zoomEffect:false, //缩放动画
            // zoom:5,
            // minZoom:5,
            maxZoom:15,
            minZoom:4,
            contextmenu:false,
            style:'midnightblue',
            zoomControl:false
            // center:[28.2568,113.0823]
        });
    var url4="http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer";
    var orginal4=[-20037508.342787,20037508.342787]
    var resolutions4 = [
        156543.033928,
        78271.5169639999,
        39135.7584820001,
        19567.8792409999,
        9783.93962049996,
        4891.96981024998,
        2445.98490512499,
        1222.99245256249,
        611.49622628138,
        305.748113140558,
        152.874056570411,
        76.4370282850732,
        38.2185141425366,
        19.1092570712683,
        9.55462853563415,
        4.77731426794937,
        2.38865713397468,
        1.19432856685505,
        0.597164283559817,
        0.298582141647617

    ];
    var maxBounds4 = [[-20036018.7354, -20037507.0672], [20102482.4102, 20037507.0672]];

    var layer4 = GL.LayerLookup.createLayer('esri', url4, {
        origin: orginal4,
        resolutions: resolutions4,
        maxBounds: maxBounds4,
    });
    map.addBaseLayer(layer4);
    this.map.setView([4837470.209102202,12952178.005852591])

    this.map.on('click',function (e) {
        console.log(e)
    })

}


function  request() {
        $.get('data/china.json', function(geojson) {
            var geojsonOptions = {
                gradient: {
                    0: 'rgba(55, 50, 250, 0.4)',
                    1: 'rgba(55, 50, 250, 1)'
                },
                max: 354551,
                draw: 'intensity'
            }

            var geojsonDataSet = GL.GeoJson.getDataSet(geojson);

            var to = '北京';

            var qianxi = new GL.DataSet([
                {
                    from: '河北',
                    count: 354551,
                    to: to,
                },
                {
                    from: '天津',
                    count: 97323,
                    to: to,
                },
                {
                    from: '山东',
                    count: 28664,
                    to: to,
                },
                {
                    from: '山西',
                    count: 16650,
                    to: to,
                },
                {
                    from: '辽宁',
                    count: 14379,
                    to: to,
                },
                {
                    from: '河南',
                    count: 10980,
                    to: to,
                },
                {
                    from: '内蒙古自治区',
                    count: 9603,
                    to: to,
                },
                {
                    from: '江苏',
                    count: 4536,
                    to: to,
                },
                {
                    from: '上海',
                    count: 3556,
                    to: to,
                },
                {
                    from: '广东',
                    count: 2600,
                    to: to,
                },
            ]);

            var qianxiData = qianxi.get();

            var lineData = [];
            var pointData = [];
            var textData = [];
            var timeData = [];

            var citys = {}

            for (var i = 0; i < qianxiData.length; i++) {
                var fromCenter = GL.CityCenterUtil.getCenterByCityName(qianxiData[i].from);
                var toCenter = GL.CityCenterUtil.getCenterByCityName(qianxiData[i].to);
                if (!fromCenter || !toCenter) {
                    continue;
                }
                citys[qianxiData[i].from] = qianxiData[i].count;
                citys[qianxiData[i].to] = 100;
                pointData.push(
                    {
                        geometry: {
                            type: 'Point',
                            coordinates:lnglatToMecator([fromCenter.lng, fromCenter.lat])
                        }
                    }
                );
                pointData.push(
                    {
                        geometry: {
                            type: 'Point',
                            coordinates: lnglatToMecator([toCenter.lng, toCenter.lat])
                        }
                    }
                );
                textData.push(
                    {
                        geometry: {
                            type: 'Point',
                            coordinates: lnglatToMecator([fromCenter.lng, fromCenter.lat])
                        },
                        text: qianxiData[i].from
                    }
                );
                textData.push(
                    {
                        geometry: {
                            type: 'Point',
                            coordinates: lnglatToMecator([toCenter.lng, toCenter.lat])
                        },
                        text: qianxiData[i].to
                    }
                );
                 var fromLnglat=lnglatToMecator([fromCenter.lng,fromCenter.lat]);
                var toLnglat=lnglatToMecator([toCenter.lng,toCenter.lat]);
                fromCenter.lng=fromLnglat[0];
                fromCenter.lat=fromLnglat[1];
                toCenter.lng=toLnglat[0];
                toCenter.lat=toLnglat[1]
                var curve = GL.CurveUtil.getPoints([fromCenter, toCenter]);

                for (j = 0; j < curve.length; j++) {
                    timeData.push({
                        geometry: {
                            type: 'Point',
                            coordinates: curve[j]
                        },
                        count: 1,
                        time: j*2
                    });
                }

                lineData.push({
                    geometry: {
                        type: 'LineString',
                        coordinates: curve
                        //coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
                    },
                    count: 30 * Math.random()
                });

            }

           var data=geojsonDataSet.get();
            var _data=[];
            for(var x in data){
                var item=data[x];
                if (!citys[item.name]) {
                   continue;
                }
                item.count = citys[item.name];
                _data.push(item);
            }
            data=new GL.DataSet(_data).get();
            for(var x in data){
                var type=data[x].geometry.type;
                if(type==GL.Geometry.Polygon||type==GL.Geometry.LineString||type==GL.Geometry.Polyline)
                    data[x].geometry.coordinates=data[x].geometry.coordinates[0];
                var coordinates=data[x].geometry.coordinates;
                if(type==GL.Geometry.Point){
                    coordinates=lnglatToMecator(coordinates);
                }else{
                    var _coordinates=[];
                    for(var i=0;i<coordinates.length;i++){
                        var coor=coordinates[i];
                        coor=lnglatToMecator(coor);
                        _coordinates.push(coor);
                    }
                    coordinates=_coordinates;
                }
                data[x].geometry.coordinates=coordinates;
            }
            geojsonDataSet = new GL.DataSet(data);
            //多边形
            var mapvLayer = new GL.CanvasLayer(geojsonDataSet, geojsonOptions);
            map.addLayer(mapvLayer)


            //文本
            var textDataSet = new GL.DataSet(textData);
            var textOptions = {
                draw: 'text',
                font: '14px Arial',
                fillStyle: 'white',
                shadowColor: 'yellow',
                shadowBlue: 10,
                zIndex: 11,
                shadowBlur: 10
            }
            var textMapvLayer = new GL.CanvasLayer(textDataSet, textOptions)
            map.addLayer(textMapvLayer)

             //线路
            var lineDataSet = new GL.DataSet(lineData);
            var lineOptions = {
                strokeStyle: 'rgba(255, 250, 50, 0.8)',
                shadowColor: 'rgba(255, 250, 50, 1)',
                shadowBlur: 20,
                lineWidth: 2,
                zIndex: 100,
                draw: 'simple'
            }
            var lineLayer = new GL.CanvasLayer( lineDataSet, lineOptions);
            map.addLayer(lineLayer)

            //点
            var pointOptions = {
                fillStyle: 'rgba(254,175,3,0.7)',
                shadowColor: 'rgba(55, 50, 250, 0.5)',
                shadowBlur: 10,
                size: 5,
                zIndex: 10,
                draw: 'simple'
            }
            var pointDataSet = new GL.DataSet(pointData);
            var pointLayer = new GL.CanvasLayer(pointDataSet, pointOptions);
            map.addLayer(pointLayer)

           //动态的点
            var timeDataSet = new GL.DataSet(timeData);
            var timeOptions = {
                fillStyle: 'rgba(255, 250, 250, 0.5)',
                zIndex: 200,
                size: 2.5,
                animation: {
                    type: 'time',
                    stepsRange: {
                        start: 0,
                        end: 100
                    },
                    trails: 10,
                    duration: 2,
                },
                draw: 'simple'
            }

            var timeMapvLayer = new GL.CanvasLayer( timeDataSet, timeOptions);
            map.addLayer(timeMapvLayer)

    });

}

$(function () {
    init();
    setTimeout(function () {
        request()
    },400)
});

