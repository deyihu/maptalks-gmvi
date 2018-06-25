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

var map;

function init() {
    map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [116.32736206054689,39.84861229610178],
        zoom   :  12,
        pitch:30,
        maxPitch:60,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    map.on('click',function(e){
        console.log(e)
    })
    // this.map.setView([116.32736206054689,39.84861229610178],11)
    setTimeout(function() {
        createTag();
    }, 200);

}


function createTag() {
    var data = [];
    for(var i=0;i<building.length;i++){
      var o=building[i];
        var lng=o.x;
        var lat=o.y;
        var name=o.n;
        data.push({
            geometry: {
                type: 'Point',
                coordinates: mecatorToLngLat([lng,lat])
            },
            count: 30 * Math.random(),
            time: Math.random() * 100,
            name:name,
            size:parseInt(Math.random() * 10) + 10,
            color:randomColor()

        })

    }
    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        shadowBlur:10,
        shadowColor:"rgba(250, 250, 55, 0.7)",
        fillStyle: 'rgba(255, 50, 50, 0.6)',
        // maxSize: 20,
        // max: 30,
        size:20,
        draw: 'tagcloud',
    }
    var heatLayer =new maptalks.GMVI.CanvasLayer('jalsjflasf',dataSet,options);
    map.addLayer(heatLayer)
}

init();