

var  map;

function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  3,
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

    this.map.on('click',function (e) {
        console.log(e)
    })
    setTimeout(function() {
        request();
    }, 500);
  
}


function  request() {
    var randomCount = 500;

    var node_data = {
        "0": {"x": 108.154518, "y": 36.643346},
        "1": {"x": 121.485124, "y": 31.235317},
    };

    var edge_data = [
        {"source": "1", "target": "0"}
    ]

    var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];

// 构造数据
    for (var i = 1; i < randomCount; i++) {
        var cityCenter = maptalks.GMVI.CityCenterUtil.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
        node_data[i] = {
            x: cityCenter.lng - 5 + Math.random() * 10,
            y: cityCenter.lat - 5 + Math.random() * 10,
        }
        edge_data.push(
            {"source": ~~(i * Math.random()), "target": '0'}
        );
    }

    var fbundling = maptalks.GMVI.ForceEdgeBundlingUtil()
        .nodes(node_data)
        .edges(edge_data);

    var results = fbundling();

    var data = [];
    var timeData = [];

    for (var i = 0; i < results.length; i++) {
        var line = results[i];
        var coordinates = [];
        for (var j = 0; j < line.length; j++) {
            coordinates.push(([line[j].x, line[j].y]));
            timeData.push({
                geometry: {
                    type: 'Point',
                    coordinates: ([line[j].x, line[j].y])
                },
                count: 1,
                time: j
            });
        }
        data.push({
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            }
        });
    }

    var dataSet = new maptalks.GMVI.DataSet(data);

    var options = {
        strokeStyle: 'rgba(55, 50, 250, 0.3)',
        globalCompositeOperation: 'lighter',
        shadowColor: 'rgba(55, 50, 250, 0.5)',
        shadowBlur: 3,
        lineWidth: 1.0,
        draw: 'simple'
    }

    var mapvLayer = new maptalks.GMVI.CanvasLayer('ajfljalkfas;',dataSet, options);
    map.addLayer(mapvLayer)

    var dataSet = new maptalks.GMVI.DataSet(timeData);

    var options = {
        fillStyle: 'rgba(255, 250, 250, 0.9)',
        globalCompositeOperation: 'lighter',
        size: 1.5,
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

    var mapvLayer = new maptalks.GMVI.CanvasLayer('jalfdjlaskfjkals',dataSet, options);
    map.addLayer(mapvLayer)
}
init();