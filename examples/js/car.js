
var map;
function init() {
    //初始化gaeainfo地图
    this.map = map=new GL.Map.Geoq('map-container',
        {
            // zoomEffect:false, //缩放动画
            // zoom:4,
            // maxZoom:8
            minZoom:8,
            zoom:12,
            style:'midnightblue',
            center:[29.555241079054625,106.51760101318361]
        });
    this.map.on('click',function (e) {
        console.log(e)
    })

}


function  request() {
    $.get('data/car.csv', function(csvstr) {

        var options = {
            strokeStyle: 'rgba(50, 50, 255, 0.8)',
            lineWidth: 0.05,
            globalCompositeOperation: 'lighter',
            draw: 'simple'
        }

        var dataSet = new GL.Csv().getDataSet(csvstr);


         var layer=new GL.CanvasLayer(dataSet,options);
        map.addLayer(layer)

    });

}
//热区测试
function  canvasTest() {
}

$(function () {
    init();
    setTimeout(function () {
        request()
    },400)
});

