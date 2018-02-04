


var map;

function init() {
     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [104.66674804687501,30.268556249047727],
        zoom   :  7,
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
       map.setView([104.66674804687501,30.268556249047727])
       setTimeout(function() {
           requestRoad();
       
       }, 400);
   
   
   }
   
   
   
    function requestRoad() {
          $.ajax({
               url: 'data/sichuanmainroadloc.txt',
               success: function(data) {
                   $('#loadingdiv').hide();
                   var _data = [];
                   data = data.split('\n');
                   for (var i in data) {
                       var lineData=data[i].split(',');
                       if(lineData.length!=3)
                           continue;
                       var lnglat=lineData.slice(0,2);
                       var count=lineData[2];
                       lnglat=(lnglat);
                       _data.push({
                           geometry: {
                               type: 'Point',
                               coordinates: lnglat
                           },
                           count: count*10
                       });
                   }
                   var dataSet = new maptalks.GMVI.DataSet(_data);
                   var options = {
                         gradient: {
                           0.25: "rgb(0,0,255)",
                           0.55: "rgb(0,255,0)",
                           0.85: "yellow",
                           1.0: "rgb(255,0,0)"
                       },
                       size: 3,
                       max: 1000,
                       draw: 'heatmap'
                   }
   
                  var mapvLayer = new maptalks.GMVI.CanvasLayer('jaljflasfa;s',dataSet,options);
                  map.addLayer(mapvLayer)
                  requestCar();
               }
           })
   
   
   }
   
   
   function requestCar() {
          $.ajax({
               url: 'data/sichuanxcarlocation.txt',
               success: function(data) {
                   $('#loadingdiv').hide();
                   var _data = [];
                   data = data.split('\n');
                   for (var i in data) {
                       var lineData=data[i].split(',');
                       if(lineData.length!=3)
                           continue;
                       var lnglat=lineData.slice(0,2);
                       var count=lineData[2];
                       lnglat=(lnglat);
                       _data.push({
                           geometry: {
                               type: 'Point',
                               coordinates: lnglat
                           },
                           count: count,
                           time: Math.random() * 100
                       });
                   }
   
                   var dataSet = new maptalks.GMVI.DataSet(_data);
   
                   var options = {
                       size: 1,
                       draw: 'simple',
                       fillStyle: 'rgba(55, 50, 250, 0.6)',
                       globalCompositeOperation:"lighter",
                       animation: {
                           type: 'time',
                           stepsRange: {
                               start: 0,
                               end: 100
                           },
                           steps: 100,
                           trails: 10,
                           duration: 5,
                        },
                   }
                  var mapvLayer = new maptalks.GMVI.CanvasLayer('jalfjalfasj',dataSet,options);
                  map.addLayer(mapvLayer)
               }
           })
   }
init();