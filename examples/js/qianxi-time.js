
var map;

function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  5,
        pitch:30,
        maxPitch:60,
        // enableInfoWindow :false,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    this.map.on('click',function (e) {
        console.log(e)
    })
    setTimeout(function() {
        request();
    }, 500);

}


var randomCount = 1000;

var data = [];
var timeData = [];

function curive(fromPoint, endPoint, n) {
    var delLng = (endPoint.lng - fromPoint.lng) / n;
    var delLat = (endPoint.lat - fromPoint.lat) / n;

    for (var i = 0; i < n; i++) {
        var pointNLng = fromPoint.lng + delLng * i;
        var pointNLat = fromPoint.lat + delLat * i;
        timeData.push({
            geometry: {
                type: 'Point',
                coordinates: ([pointNLng, pointNLat])
            },
            count: 1,
            time: i*2
        });
    }
}


function  request() {
    $.ajax({
        url: 'data/qianxi-time',
        success: function (rs) {
            $('#loadingdiv').hide()
            var items = rs.split('|');
            var count = 20;
            for (var i = 0; i < items.length; i++) {
                var itemArr = items[i].split(/\n/);
                for (var k = 0; k < itemArr.length; k++) {
                    if (!!itemArr[k]) {
                        var item = itemArr[k].split(/\t/);
                        var cityBegin;
                        if (item[0] === '起点城市' || item[0] === '迁出城市') {
                            cityBegin = item[1];
                        }
                        if (item[0] !== '起点城市' || item[0] !== '迁出城市' && item.length > 1) {
                            // var cityName1=item[0]
                            // var cityName2=cityBegin
                            // console.log(cityName1,cityName2)

                            var cityCenter1 = maptalks.GMVI.CityCenterUtil.getCenterByCityName(item[0].replace(/市|省/, ""));
                            var cityCenter2 = maptalks.GMVI.CityCenterUtil.getCenterByCityName(cityBegin.replace(/市|省/, ""));
                            if (cityCenter1) {
                                // if(!cityCenter2) continue;
                                if(Math.random() > 0.7) {
                                    curive(cityCenter2, cityCenter1, 50);
                                }
                                data.push({
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: [([cityCenter1.lng, cityCenter1.lat]), ([cityCenter2.lng, cityCenter2.lat])]
                                    },
                                    count: 100 * Math.random()
                                });
                            }
                        }
                    }
                }
            }

            var dataSet = new maptalks.GMVI.DataSet(data);
            var options = {
                strokeStyle: 'rgba(55, 50, 250, 0.3)',
                globalCompositeOperation: 'lighter',
                shadowColor: 'rgba(55, 50, 250, 0.5)',
                gradient: {0:'rgba(55, 50, 250, 0)',1:'rgba(55, 50, 250, 1)'},
                lineWidth: .2,
                draw: 'intensity'
            }

            var mapvLineLayer = new maptalks.GMVI.CanvasLayer('ajfljaldfasf',dataSet, options);
            map.addLayer(mapvLineLayer)

            var dataSet = new maptalks.GMVI.DataSet(timeData);
            var options = {
                fillStyle: 'rgba(255, 250, 250, 0.9)',
                size: .5,
                animation: {
                    type: 'time',
                    stepsRange: {
                        start: 0,
                        end: 100
                    },
                    trails: 1,
                    duration: 5,
                },
                draw: 'simple'
            }

            var mapvTimeLayer = new maptalks.GMVI.CanvasLayer( 'ajflakjdfkasjlf',dataSet, options);
            map.addLayer(mapvTimeLayer)
        }
    });

}
init();
