

function init() {
    this.map = new GL.Map('map-container',
        {
            // zoomEffect:false, //缩放动画
            zoom:4,
            // minZoom:8,
            // zoom:11,
            // maxZoom:8
            style:'normal',
            // center:[-73.89816284179689,40.704586878965245]
        });

       var baseLayer=baseLayer=GL.LayerLookup.createGeoqTiledLayer('',{style:'midnightblue'});
        map.addBaseLayer(baseLayer);
        setTimeout(function(e){
            request();
        },1000)

    this.map.on('click',function(e){
        console.log(e)
        console.log(map.getZoom())
    })


}



 function request() {
        //    var data=data2014;
            var result=[];
            for(var i=0;i<data.length;i++){
                var lnglat=data[i];
                // var lnglat=[o.lng,o.lat];
                result.push({
                     geometry: {
                            type: 'Point',
                            coordinates: lnglat
                        },
                })
            }
            console.log(result.length)
            dataSet=new GL.GMVI.DataSet(result);
             var options = {
                size: 1.5,
                context: 'webgl',
                fillStyle: 'rgba(250, 50, 50, 0.8)',
                draw: 'simple'
            }

            var mapvLayer = new GL.GMVI.WebGlLayer(dataSet, options);
            map.addLayer(mapvLayer)
            $('#loadingdiv').hide();



}

