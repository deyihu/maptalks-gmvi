var map;
var layer;
function init() {
   //初始化gaeainfo地图
    this.map =map= new GL.Map('map-container',
        {
            zoomEffect:false, //缩放动画
            // maxZoom:8,
            // zoom:4

        });

    // var url4="http://58.210.98.62:7080/Layers_20170323_WYL/Layers/_alllayers/";
    // var orginal4="119.75,32.25";
    // var resolutions4 = [9.765664903423653E-4, 4.882832451711827E-4,  2.4414162258559134E-4, 1.2207081129279567E-4, 6.103540564766688E-5,
    //     3.0517702822564394E-5, 1.5258851412551242E-5, 7.629425705006574E-6,3.814712853772333E-6,1.90735154359766E-6];
    // var maxBounds4 = "119.89,30.75;121.406,32.08" ;
    // var crs={
    //     origin:orginal4,
    //     resolutions:resolutions4,
    //     code: "4326"
    // }


    // var layer4 =  GL.LayerLookup.createGaeaTiledLayer(url4, {
    //     origin: orginal4,
    //     resolutions: resolutions4,
    //     maxBounds: maxBounds4,
    //     format:'png',
    //     preview: 'assets/images/basemap-esri.png'
    // },crs);
    // map.addBaseLayer(layer4);
    var baseLayer=GL.LayerLookup.createMapboxTiledLayer('',{style:'dark'});
    
    map.addBaseLayer(baseLayer);

    this.map.setView([120.60949731583878,31.307282946045294])
    // this.map.on('moveend',function(e){
    //     if(map.getMaxZoom()-map.getZoom()<=2){
    //         isLarge=true;
    //           var options = {
    //                 size: 15,
    //                 fillStyle: 'rgba(0,152,217, 1)',
    //             }
    //             heatLayer.setOptions(options)
    //     }else{
    //            if(isLarge){
    //                var options = {
    //                 size: 1,
    //                 fillStyle: 'rgba(0,152,217, 1)',
    //             }
    //             heatLayer.setOptions(options) 
    //            }
    //     }
    // })
    this.map.on('click',function(e){
        console.log(e)
    })
    setTimeout(function(e){
        request();
    },500)
}



function request() {
        $.get('data/szpois.json', function (rs) {
               $('#loadingdiv').hide();
               var data = [];
                var poiList=rs;
                for( var i=0;i<poiList.length;i++){
                    var lnglat=poiList[i];
                
                    data.push({
                        geometry: {
                            type: 'Point',
                            coordinates: lnglat
                        },
                        count: 10,
                        time: Math.random() * 100
                    });

                }

                var dataSet = new GL.GMVI.DataSet(data);
                var options = {
                    size: 1,
                    fillStyle: 'rgba(0,152,217, 1)',
                }
                layer =new  GL.GMVI.WebGlLayer(dataSet,options);//.addTo(map);
                map.addLayer(layer)
    })
         

}
GL.ready(init,'conf.json');

