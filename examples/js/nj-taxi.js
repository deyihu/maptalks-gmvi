

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

var maxLineLength=5000;
var map;
function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [118.79585266113283,31.86006344257113],
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
    })
 

    setTimeout(function() {
        initData();
    }, 300);

}


//初始化数据
function  initData(){
    $.ajax({
        url: "data/nj-taxi.html",
        success: function(rs) {
            $('#loadingdiv').hide();
            for (var key in mapper) {
                var reg = new RegExp(key, "g");
                rs = rs.replace(reg, mapper[key]);
            }

            rs = rs.split("\n");//n条线
            data = [];
            for (var i = 0; i < rs.length; i++) {
                var item = rs[i].split(";");
                if(item.length<2)
                    continue;
                var line = [];
                var currentPixel =item[0].split(",");
                var lng=parseFloat(currentPixel[0]);
                var lat=parseFloat(currentPixel[1]);
                // console.log(currentPixel)
                for (var j = 1; j < item.length; j++) {
                    var lnglatArr=item[j].split(",");
                    lng+=parseFloat(lnglatArr[0]);
                    lat+=parseFloat(lnglatArr[1])
                    // var lng=parseFloat(lnglatArr[0])+parseFloat(currentPixel[0]);
                    // var lat=parseFloat(lnglatArr[1])+parseFloat(currentPixel[1]);
                    line.push([lng,lat]);
                }
                data.push(line);
                aniIndex.push(0);
            }
            // console.log(data)
            canvasTest()
            _animate();
            
        }
    });
}



function _animate() {
    var result=[];

    if (data) {
        for (var i = 0; i < data.length; i++) {
            if(i>maxLineLength) break;
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
            mecator_lnglat=[lng,lat]
             
            result.push({
                   geometry: {
                        type: 'Point',
                        coordinates:mecatorToLngLat(mecator_lnglat)
                    },
                    count: 1,
                    time: Math.random() * 100
            })
            aniIndex[i]++;
            if (aniIndex[i] >= item.length) {
                aniIndex[i] = 0;
            }
        }
    }
      
    if(result&&result.length>0){
         var dataSet = new maptalks.GMVI.DataSet(result);
        if(!pointLayer){
             pointLayer=new  maptalks.GMVI.CanvasLayer('jalsdfjdasl',dataSet,defaultOptions);
             map.addLayer(pointLayer)
        }else{
            pointLayer.resetDatas(dataSet)
        }
    }

    setTimeout(function() {
        requestAnimationFrame(function() {
            _animate();
        });
    }, 200);
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
                mecator_lnglat=[lng,lat]
                lineLnglat.push(mecator_lnglat);
            }
            result.push({
                    geometry: {
                        type: 'Polyline',
                        coordinates: mecatorToLngLat(lineLnglat)
                    },
                    count: 1,
                    time: Math.random() * 100
             });
             if(result.length>maxLineLength) break;
            

        }
        console.log(result.length)
        var dataSet = new maptalks.GMVI.DataSet(result);
        var options = {
            fillStyle: 'rgba(255,255,255,1)', // 填充颜色
            strokeStyle: "rgba(0,11,255,0.2)",
            globalCompositeOperation:"lighter",
            // shadowColor: 'rgba(53,57,255,0.2)',
            // shadowBlur: 1,
            lineWidth: 1,
            draw:'simple'
        }
        var heatLayer =new  maptalks.GMVI.CanvasLayer('jalsfdjas',dataSet,options);
        map.addLayer(heatLayer)

}
init();