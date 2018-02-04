

var workPlaces = {
    zhongguancun: {
        name: "中关村",
        strokeStyle: "rgba(255,58,53,0.9)",
        lineWidth: .1,
        center: [4836235.272943042,12948640.405550674],
        // bounds: new BMap.Bounds(new BMap.Point(116.312373, 39.982234), new BMap.Point(116.323476, 39.990885)),
        toWork: "早晨6点，当第一缕阳光照进眼眶时，新世纪程序猿、产品狗，设计狮等背上电脑，啃着煎饼，棒子果子陆续从石景山，房山，草房等巢穴来到中关村动物园，开始了一天的梦想之旅。",
        toHome: "夜幕降临，各个山头的大王们在开完一天的会议后返回各自的山头，这样的梦想之路每天都在继续着，它们坚信总有一天动物能改变世界！"
    },
    xierqi: {
        name: "西二旗",
        strokeStyle: "rgba(69,178,255,1)",
        lineWidth: .1,
        center: [4846752.530303933,12947990.690810233],
        // bounds: new BMap.Bounds(new BMap.Point(116.29543, 40.046008), new BMap.Point(116.320942, 40.065558)),
        toWork: "早晨6点，当第一缕阳光照进眼眶时，新世纪程序猿、产品狗，设计狮等背上电脑，啃着煎饼，棒子果子陆续从石景山，房山，草房等巢穴来到西二旗动物园，开始了一天的梦想之旅。",
        toHome: "夜幕降临，各个山头的大王们在开完一天的会议后返回各自的山头，这样的梦想之路每天都在继续着，它们坚信总有一天动物能改变世界！"
    },
    guomao: {
        name: "国贸",
        strokeStyle: "rgba(190,190,14,1)",
        lineWidth: .1,
        center: [4825798.037281066,12965156.771647997],
        // bounds: new BMap.Bounds(new BMap.Point(116.46106, 39.910047), new BMap.Point(116.476655, 39.9194)),
        toWork: "早晨7点，当第二缕阳光照进眼眶时，大都的高富帅、白富美们开着牧羊人，喝着星巴克，揣着艾派德缓缓的从望京，五道口，东直门等爱巢来到造富工厂国贸，开始了一天的时尚之旅。",
        toHome: "夜幕降临，这些富有时代精神的年轻人们陆续来到大都散落在各个角落（酒吧，西餐厅，夜店，快捷酒店）续写着他们的激情，而这样的时尚之路每天都在充实着大都青春与活力！"
    },
    wangjing: {
        name: "望京",
        strokeStyle: "rgba(0,240,243,0.9)",
        lineWidth: .1,
        center: [4838215.471390659,12967224.154397223],
        // bounds: new BMap.Bounds(new BMap.Point(116.474643, 39.994782), new BMap.Point(116.494693, 40.005726)),
        toWork: "早晨6点，当第一缕阳光照进眼眶时，新世纪程序猿、产品狗，设计狮等背上电脑，啃着煎饼，棒子果子陆续从石景山，房山，草房等巢穴来到望京动物园，开始了一天的梦想之旅。",
        toHome: "夜幕降临，各个山头的大王们在开完一天的会议后返回各自的山头，这样的梦想之路每天都在继续着，它们坚信总有一天动物能改变世界！"
    }
};


var lineOption = {
            // fillStyle: 'rgba(255,255,255,1)', // 填充颜色
            strokeStyle: "rgba(190,190,14,1)",
            // globalCompositeOperation:"lighter",
            lineWidth: 0.5,
            draw:'simple',

}


var pointOption = {
               fillStyle: 'rgba(255, 250, 250, 1)',
                globalCompositeOperation: "lighter",
                size: 0.9,
                animation: {
                    stepsRange: {
                        start: 0,
                        end: 100 
                    },
                    steps: 100,
                    trails: 1,
                    duration: 7,
                },
                draw: 'simple'
}


var effectOption={
        globalCompositeOperation: 'lighter',
        // fillStyle: 'rgba(211, 250, 250, 0.1)',
        splitList: [
            {
                start: 0,
                end: 2,
                color: randomColor()
            },{
                start: 3,
                end: 4,
                color:'#f7d9b9'
            },{
                start: 5,
                end: 6,
                color: randomColor()
            },{
                start: 7,
                end: 8,
                color: randomColor()
            },{
                start: 9,
                end:10,
                color: randomColor()
            },
            {
                start: 11,
                end:12,
                color: randomColor()
            }
        ],

        size: 35,
        draw: 'effect'
}

// console.log(effectOption)


var lineData = null;
var aniIndex = [];
var pointData=[];
var effectData=[];
var lineLayer;
var pointLayer=null;
var effectLayer=null;

var map;
function init() {

     map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center :[116.32736206054689,39.84861229610178],
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

}


//初始化数据
function  initData(selectname){
   
    $.getJSON("data/"+selectname+".js",function(rs) {
            $('#loadingdiv').hide();
            lineData = [];
            pointData=[];
            effectData=[];
            var maxLength = 0;
            var center=workPlaces[selectname].center;
            effectData.push({
                       geometry: {
                            type: 'Point',
                            coordinates: center
                        },
                        count:3
           })
           center=mecatorToLngLat([center[1],center[0]])
           map.setView(center)

            for (var i = 0; i < rs.length; i++) {
                 var item = rs[i][1];
                 if(item.length>maxLength)
                      maxLength = item.length;
                  lineData.push({
                    geometry: {
                        type: 'Polyline',
                        coordinates: mecatorToLngLat(item)
                    },
                    count: 1,
                    time: Math.random() * 100,
                    strokeStyle:workPlaces[selectname].strokeStyle

                 });
                 for(var j=0;j<item.length;j++){
                     pointData.push({
                        geometry: {
                            type: 'Point',
                            coordinates: mecatorToLngLat(item[j])
                        },
                        count: 1,
                        time: 100 / item.length * j
                    });
                    if(parseInt(i%100)==0){
                        if(j==parseInt(item.length/2)){
                            effectData.push({
                                geometry: {
                                        type: 'Point',
                                        coordinates: mecatorToLngLat(item[j])
                                    },
                                    count:3
                            })
                        }
                    }
                 }
            }
            // lineOption.strokeStyle=workPlaces[selectname].strokeStyle;
              var dataSet = new maptalks.GMVI.DataSet(lineData);
            lineLayer.resetDatas(dataSet)

            dataSet = new maptalks.GMVI.DataSet(pointData);
            pointLayer.resetDatas(dataSet)

            dataSet=new maptalks.GMVI.DataSet(effectData)        
            effectLayer.resetDatas(dataSet)
        }
    );
}


function load(){
    init();
    var dataSet=new maptalks.GMVI.DataSet([]);
    lineLayer=new maptalks.GMVI.CanvasLayer('ajfkjakfdja',dataSet,lineOption).addTo(map);
    pointLayer=new maptalks.GMVI.CanvasLayer('jlasjdflasfj;af',dataSet,pointOption).addTo(map);
    effectLayer=new maptalks.GMVI.CanvasLayer('ajfkdjalfjkalf',dataSet,effectOption).addTo(map); 
    setTimeout(function(e){
         initData('zhongguancun');
    },500)

    $('#aside_list a').on('click',function(e){
        var selectName=this.id;
        initData(selectName)
        $("#aside_list a").removeClass("current");
        $(this).addClass('current')
    })
}

load();