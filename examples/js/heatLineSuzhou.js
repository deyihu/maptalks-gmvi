
var map;
function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  12,
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
    //  this.map.setView([120.74414468716853,31.32519153364578],2)
 
     this.map.on('click',function(e){
         console.log(e)
         console.log(map.getZoom())
     })
     setTimeout(function(e){
         canvasTest();
     },500)
 
 }
 
 
 function  canvasTest() {
    var data = [];
    var roads=szRoad.data;
    for(var x in roads){
        var road=roads[x];
        var roadLine=road.ROAD_LINE;
        var lnglatArr=roadLine.split(";");
        var coordinates=[];
        for(var i=0;i<lnglatArr.length;i++)
            coordinates.push(lnglatArr[i].split(","))
        data.push({
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            },
            time: 40 * Math.random(),
            count: Math.random() * 40
        });
    }

    var dataSet = new maptalks.GMVI.DataSet(data);

    var options = {
        gradient: {
            0.25: "rgb(0,0,255)",
            0.55: "rgb(0,255,0)",
            0.85: "yellow",
            1.0: "rgb(255,0,0)"
        },
        max: 50,
        strokeStyle: 'rgba(255, 255, 255, 1)',
        lineWidth: 3,
        shadowColor: 'rgba(255, 255, 255, 1)',
        shadowBlur: 10,
        draw: 'heatmap'
    }
    var heatLayer = new maptalks.GMVI.CanvasLayer('ajdflajsflas',dataSet,options)
    map.addLayer(heatLayer)
     
     // layer.on('click',function (e) {
     //     console.log(e)
     // })
 }
init();
 
 