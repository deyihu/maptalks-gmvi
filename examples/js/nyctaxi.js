

function init() {
    this.map = new GL.Map('map-container',
        {
            // zoomEffect:false, //缩放动画
            // zoom:4,
            minZoom:8,
            zoom:11,
            // maxZoom:8
            style:'normal',
            center:[-73.89816284179689,40.704586878965245]
        });

       var baseLayer=baseLayer=GL.LayerLookup.createGoogleTiledLayer('',{style:'normal'})
        map.addBaseLayer(baseLayer);
        setTimeout(function(e){
            request();
        },500)

    this.map.on('click',function(e){
        console.log(e)
        console.log(map.getZoom())
    })


}



 function request() {
      $.get('data/nyc-taxi.csv', function(csvstr) {
             $('#loadingdiv').hide();
            var options = {
                size: 1.5,
                // context: 'webgl',
                fillStyle: 'rgba(250, 50, 50, 0.8)',
                draw: 'simple'
            }

            var dataSet = new GL.GMVI.Csv().getDataSet(csvstr);
            var data=dataSet.get();
            var result=[];
            for(var i=0;i<data.length;i++){
                var o=data[i];
                var lnglat=[o.lng,o.lat];
                result.push({
                     geometry: {
                            type: 'Point',
                            coordinates: lnglat
                        },
                })
            }
            dataSet=new GL.GMVI.DataSet(result);
             var options = {
                size: 1.5,
                context: 'webgl',
                fillStyle: 'rgba(250, 50, 50, 0.8)',
                draw: 'simple'
            }

            var mapvLayer = new GL.GMVI.WebGlLayer(dataSet, options);
            map.addLayer(mapvLayer)

          
        });


}




GL.init(init,'conf.json')
