
// var popup=new GL.Popup();
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
    setTimeout(function() {
        request();
    }, 500);
}


function request() {
       $.get('data/china-point.json', function (rs) {
             $('#loadingdiv').hide();
             var data=[];
             for (var i = 0; i < rs[0].length; i+=2) {
                var geoCoord = rs[0][i].geoCoord;
                data.push({
                        geometry: {
                            type: 'Point',
                            coordinates:geoCoord
                        },
                        count: Math.random() * 5,
                        time: Math.random() * 100,
                        // id:GL.H.uuid()
                });
            }

            var dataSet = new maptalks.GMVI.DataSet(data);
            var options = {
                globalCompositeOperation: 'lighter',
                splitList: [
                    {
                        start: 0,
                        end: 2,
                        color: randomColor()
                    },{
                        start: 3,
                        end: 4,
                        color: randomColor()
                    },{
                        start: 5,
                        end: 6,
                        color: randomColor()
                    },{
                        start: 7,
                        end: 8,
                        color: randomColor()
                    },{
                        start: 9,
                        end:10,
                        color: randomColor()
                    },
                    {
                        start: 11,
                        end:12,
                        color: randomColor()
                    }
                ],

                size: 15,
                draw: 'effect',
            }
             var heatLayer = new maptalks.GMVI.CanvasLayer('jalsdfjlasdf',dataSet,options);
             map.addLayer(heatLayer)
        });
}
init();