var map;
var layer;
function init() {
   //初始化gaeainfo地图
    this.map =map= new GL.Map('map-container',
        {
            zoomEffect:false, //缩放动画
            // maxZoom:8,
            zoom:14,
            // maxBounds:[[-180,-90],[180,90]],
            maxZoom:18,
            center:[-74.0568505, 40.6070772 ]

            // minZoom:5

        });

     var baseLayer=GL.LayerLookup.createGoogleTiledLayer('',{style:'normal'});
    
    map.addBaseLayer(baseLayer)
    // this.map.setView([120.60949731583878,31.307282946045294])


    this.map.on('click',function(e){
        console.log(e)
        console.log(map.getZoom())
    })
    setTimeout(function(e){
        request();
    },500)


  
}




function request() {
        var rs=buildings.features
  
        var data=[];
         for(var i=0;i<rs.length;i++){
                 var coord=rs[i].geometry.coordinates[0];
                //  var lnglats=[];
                //  for(var j=0;j<coord.length;j++){
                //      lnglats.push(coord[j])
                     
                //  }
                //  for(var m=0;m<10;m++){
                    data.push({
                            geometry: {
                                type: 'Polygon',
                                coordinates:coord
                            },
                            id:GL.H.uuid()
                            // count: dataLine[1]
                        })
                // }
                 
         }
         console.log(data.length)
            var dataSet = new GL.GMVI.DataSet(data);
            var options = {
                // size: 1,
                fillStyle: 'rgba(250, 50, 50, 0.8)',
                strokeStyle: 'rgba(250, 255, 53, 0.8)',
            }
            layer =new  GL.GMVI.WebGlLayer(dataSet,options);//.addTo(map);
            map.addLayer(layer) 
             $('#loadingdiv').hide();
     

}
GL.ready(init,'conf.json');

