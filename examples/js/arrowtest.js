

var dataConst = [
    {name: '太仓', value: 427},
    {name: '昆山', value: 333},
    {name: '苏州', value: 341},
    {name: '张家港', value: 142},
    {name: '常熟', value: 243},
    {name: '吴江', value: 143},
    {name:'周庄',value:100},
    {name:'同里镇',value:59},
    {name:'松陵镇',value:60},
    {name:'城南街道',value:190},
    {name:'越溪街道',value:123},
    {name:'横径街道',value:66},
    {name:'郭巷街道',value:99},
    {name:'苏州大学',value: 77},
    {name:'娄葑街道',value:311},
    {name:'唯亭街道',value:122},
    {name:'苏州站',value:67},
    {name:'苏州北站',value:311},
    {name:'苏州市立医院',value:90},
    {name:'吴中汽车站',value:98},
    {name:'苏州戏曲博物馆',value:145},
    {name:'中央公园',value:167},
    {name:'东方之门',value:213},
    {name:'山塘街',value:92},
    {name:'桃花坞',value:85},
    {name:'观前街',value:50},
    {name:'苏州乐园',value:221},
    {name:'玉山路',value:234},
    {name:'长桥',value:123},
    {name:'独墅湖邻里中心',value:145},
    {name:'月亮湾',value:189},
    {name:'斜塘汽车站',value:190},
    {name:'苏州中学园区分校',value:176},
    {name:'星湖街',value:156},
    {name:'时代广场',value:144},
    {name:'中科大苏州研究所',value:122},
    {name:'人民大学',value:143},
    {name:'东南大学',value:167},
    {name:'三香广场',value:187}

];

var geoCoordMap = {
    '太仓':[121.1266017719805,31.460377464304315],
    '昆山':[120.97641019609411,31.386328639184114],
    '苏州':[120.58108655195974,31.301001169106716],
    '张家港':[120.55143846838008,31.877116257091757],
    '常熟':[120.74798194379548,31.655398084704302],
    '吴江':[120.64085861131117,31.141006214059193],
    '周庄':[120.82631379864564,31.117306782883528],
    '同里镇':[120.73189678769552,31.15461673075902],
    '松陵镇':[120.65270832689863,31.156901013281985],
    '城南街道':[120.62529693662282,31.225429488971603],
    '越溪街道':[120.62529693662282,31.225429488971603],
    '横径街道':[120.54230133828763, 31.163753860850935],
    '郭巷街道':[120.69077970228172, 31.251318024232148],
    '苏州大学':[120.63709906299152, 31.303856522260844],
    '娄葑街道':[ 120.67326686960551, 31.289389399615235],
    '唯亭街道':[120.67326686960551, 31.289389399615235],
    '苏州站':[120.60683231956193, 31.329745057521336],
    '苏州北站':[120.6403351298991, 31.42225849970231],
    '苏州市立医院':[120.5956012638245, 31.32460542184424],
    '吴中汽车站':[120.62672461320018, 31.2505565967241],
    '苏州戏曲博物馆':[120.63229255185001, 31.314659275025406],
    '中央公园':[120.65484984176452, 31.31599177316383],
    '东方之门':[120.67469454618288, 31.31908507241371],
    '山塘街':[120.59874215229365, 31.32155971181362],
    '桃花坞':[120.60397696640882, 31.323748815898117],
    '观前街':[120.61525561136604, 31.31994167835984],
    '苏州乐园':[120.54468079924959, 31.296147068745366],
    '玉山路':[120.54525186988032, 31.285201548322735],
    '长桥':[120.61544596824297,31.265689968438892],
    '独墅湖邻里中心':[120.71847662787356, 31.25502998333161],
    '月亮湾':[120.72356867433098, 31.262073187777506],
    '斜塘汽车站':[120.73389553490371, 31.298383762049127],
    '苏州中学园区分校':[120.77025369839451, 31.304332414452748],
    '星湖街':[120.71658495640918, 31.324914751769256],
    '时代广场':[120.70819735652002, 31.324617319149066] ,
    '中科大苏州研究所':[120.72499635090789, 31.279490842015264],
    '人民大学':[120.7289938453231,31.277254148711506],
    '东南大学':[120.74236641592644,31.271591031623245],
    '三香广场':[120.59431635490535,31.299835233235623 ]
};


// var popup=new GL.Popup();

var map,layer;

function init() {
    map = new maptalks.Map("map-container",{
        // center : [175.46873, -37.90258],
        center : [31.30150538026905,120.61955565318601].reverse(),
        zoom   :  12,
        pitch:30,
        maxPitch:60,
        // maxExtent : new maptalks.Extent(119.89,30.75,121.406,32.08),
        attributionControl : {
        'content' : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        baseLayer : new maptalks.TileLayer('tile',{
            urlTemplate: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a','b','c','d']
        })
    });
    map.on('click',function(e){
        console.log(e)
    })
    canvasTest();

}



function  canvasTest() {
    var data = [];
    var fromObj=dataConst[2];
    var fromName=fromObj.name;
    var fromCoor=geoCoordMap[fromName];
    for(var i=0;i<dataConst.length;i++){
        if(i==2||data.length>140) continue;
        var toObj=dataConst[i];
        var toName=toObj.name;
        var toCoor=geoCoordMap[toName];
        data.push({
            geometry: {
                type: 'LineString',
                coordinates: [fromCoor,toCoor],
            },
            count: 100 * Math.random(),
            time: Math.random() * 100,
            // id:GL.H.uuid(),
            color:randomColor(),

        })

    }

    var dataSet = new maptalks.GMVI.DataSet(data);
    var options = {
        draw: 'arrow',
        size:10,//散点圆的大小
        font:'12px sans-serif',//标注字体样式
    }
    layer= new maptalks.GMVI.CanvasLayer('jsalfjlasf',dataSet,options)
    map.addLayer(layer);//.addTo(this.map);
   


}
init();

