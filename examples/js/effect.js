
var layer;
var map;
function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  12,
        pitch:30,
        maxPitch:60,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: '//a.tiles.mapbox.com/v3/spatialdev.map-c9z2cyef/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    map.on('click',function(e){
        // console.log(e)
    })

    
    canvasTest();

}

function  canvasTest() {
    var data = [];
    var poiList=gsAreaPoi.data;
    var len=poiList.length;
    console.log('pois.length',len)
    for( var i=0;i<100;i++){
        var poiInfo=poiList[i];
        var lng=poiInfo.lng;
        var lat=poiInfo.lat;
        data.push({
            geometry: {
                type: 'Point',
                coordinates: [lng,lat]
            },
            count: Math.random() * 10,
            time: Math.random() * 100,
            // color:'red'
        });

    }
    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        globalCompositeOperation: 'lighter',
        // strokeStyle:randomColor(),
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

        size: 25,
        draw: 'effect',
        offset:2
    }
    layer= new maptalks.GMVI.CanvasLayer('lasjflasjf',dataSet,options);//.addTo(this.map);
    map.addLayer(layer)
    map.on('click',function(e){
        let d=layer.identify(e);
        if(d){
           console.log(d)
        }
     })
    
}
init();
