


var mapper = {
    a: "133",
    b: "37",
};

var defaultOptions = {
            fillStyle: 'rgba(255, 255, 255, 1)', // 填充颜色
            size: 1,
            draw:'simple'
}

var pointLayer=null;
var data = null;
var aniIndex = [];



var map;
function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [32.512715307750426,119.80565925153655].reverse(),
        zoom   :  6,
        pitch:30,
        maxPitch:60,
        // enableInfoWindow :false,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: '//a.tiles.mapbox.com/v3/spatialdev.map-c9z2cyef/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    this.map.on('click',function(e){
        console.log(e)
    })
    setTimeout(function() {
        initData();
    }, 1000);
   

}


//初始化数据
function  initData(){
    $.ajax({
        url: "data/liangkeyiwei.html",
        success: function(rs) {
        $('#loadingdiv').hide();
            for (var key in mapper) {
                var reg = new RegExp(key, "g");
                rs = rs.replace(reg, mapper[key]);
            }

            rs = rs.split("\n");
            data = [];
            for (var i = 0; i < rs.length; i++) {
                var item = rs[i].split(";");
                var line = [];
                for (var j = 0; j < item.length; j++) {
                    line.push(item[j].split(","));
                }
                data.push(line);
                aniIndex.push(0);
            }
            canvasTest()
            _animate();
            
        }
    });
}



function _animate() {
    var result=[];

    if (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.length < 2) {
                continue;
            }
            var index = aniIndex[i];
             var mecator_lnglat=item[index];
            if(!mecator_lnglat||mecator_lnglat.length!=2)
                continue;
            var lng=parseFloat(mecator_lnglat[0]);
            var lat=parseFloat(mecator_lnglat[1]);
            if(isNaN(lng) || isNaN(lat))
                        continue;
            mecator_lnglat=[lng*100,lat*100]
             
            result.push({
                   geometry: {
                        type: 'Point',
                        coordinates:mecatorToLngLat(mecator_lnglat)
                    },
                    count: 1,
                    time: Math.random() * 100
            })
            // anictx.fillRect(getX(item[index][0]) - 1, getY(item[index][1]) - 1, 2, 2);
            aniIndex[i]++;
            if (aniIndex[i] >= item.length) {
                aniIndex[i] = 0;
            }
        }
    }
      
    if(result&&result.length>0){
         var dataSet = new maptalks.GMVI.DataSet(result);
        if(!pointLayer){
             pointLayer=new  maptalks.GMVI.CanvasLayer('ajflajfjlas',dataSet,defaultOptions);
             map.addLayer(pointLayer)
        }else{
            pointLayer.resetDatas(dataSet)
        }
    }

    setTimeout(function() {
        requestAnimationFrame(function() {
            _animate();
        });
    }, 400);
}


//热区测试
function  canvasTest() {
        var result=[];
        for(var x in data){
            var line=data[x];
            var lineLnglat=[];
            for(var m in line){
                var mecator_lnglat=line[m];
                if(!mecator_lnglat||mecator_lnglat.length!=2)
                     continue;
                var lng=parseFloat(mecator_lnglat[0]);
                var lat=parseFloat(mecator_lnglat[1]);
                if(isNaN(lng) || isNaN(lat))
                        continue;
                mecator_lnglat=[lng*100,lat*100]
                lineLnglat.push(mecator_lnglat);
            }
            var _lineLnglat= mecatorToLngLat(lineLnglat);
            if(!Array.isArray(_lineLnglat[0])) continue;
            result.push({
                    geometry: {
                        type: 'Polyline',
                        coordinates: _lineLnglat
                    },
                    count: 1,
                    time: Math.random() * 100
                });
        }

        var dataSet = new maptalks.GMVI.DataSet(result);
        var options = {
            fillStyle: 'rgba(255,255,255,1)', // 填充颜色
            strokeStyle: "rgba(230,230,14,1)",
            lineWidth: 0.5,
            draw:'simple'
        }
        var heatLayer =new  maptalks.GMVI.CanvasLayer('ajalsjdflsa;',dataSet,options);
        map.addLayer(heatLayer)

}

init();
