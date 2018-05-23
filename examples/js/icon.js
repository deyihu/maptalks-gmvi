

var map;
// var popup=new GL.Popup();

var layer;

var data1=[];
var data2=[];
var dataSet1,dataSet2;
var data3=[];

function init() {
    map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  9,
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
        var img = new Image();
        img.src = 'assets/icons/0001.png';
        img.addEventListener( "load" , function(){
            img.width=img.height=20;
            canvasTest(img);
        } , false);
      
}



function  canvasTest(img) {
    var poiList=szpois;
    var len=poiList.length;
    var overlays=[];
    for( var i=0;i<1000;i++) {
        var poiInfo = poiList[i];
        if(data1.length<1000) {
            data1.push({
                geometry: {
                    type: 'Point',
                    coordinates: poiInfo
                },
                rotate:Math.random()*360,
                count: 100 * Math.random(),
                time: Math.random() * 100,
                icon: img,
                id:i
                // id: GL.H.uuid()
            });
            if(data3.length<5){
                data3.push({
                    geometry: {
                        type: 'Point',
                        coordinates: poiInfo
                    },
                    rotate:Math.random()*360,
                    count: 100 * Math.random(),
                    time: Math.random() * 100,
                    icon: img,
                    id:i
                    // id: GL.H.uuid()
                }); 
            }
        }else{
            data2.push({
                geometry: {
                    type: 'Point',
                    coordinates: poiInfo
                },
                count: 100 * Math.random(),
                time: Math.random() * 100,
                icon: img,
                id:i
                // id: GL.H.uuid()
            });
        }

    }
    dataSet1 = new maptalks.GMVI.DataSet(data1);
    var options = {
        draw: 'icon',
        fillStyle:'red',
        size:10
    }
    layer= new maptalks.GMVI.CanvasLayer('ajfljalfas',dataSet1,options);
    map.addLayer(layer);
    layer.on('click',function (e) {
        console.log(e)
        console.log(e.name)
        var coordinate=e.location.coordinate;
    })

    layer.on('renderstart',function (e) {
        console.log(e)
        // console.log(e.name)
        // var coordinate=e.location.coordinate;
    })
    dataSet2= new maptalks.GMVI.DataSet(data2);
}

function offEvent() {
    layer.off('click');
}
function removeEvent() {
    map.removeLayer(layer)
    return true;
}

function resetDatas() {
    layer.resetDatas(new maptalks.GMVI.DataSet(data2))
}

function addDatas() {
    layer.addDatas(new maptalks.GMVI.DataSet(data2))
}


function removeData() {
    layer.removeData(data1[0])
}

function removeDatas() {
    layer.removeDatas(data1)
}

// function setZindex() {
//     layer.setZindex(2000)
// }

init();
