

//命名空间
import  "./src/utils/GLGMVI"

import  "./src/data/GLDataSet"
import  "./src/data/GLCsv"
import  "./src/data/GLGeoJson"

import  "./src/utils/GLClusterUtil"
import  "./src/utils/GLCityCenterUtil"
import  "./src/utils/GLForceEdgeBundlingUtil"
import  "./src/utils/GLCurveUtil"
import  "./src/utils/Extend"

import  "./src/layer/GLCanvasLayer"

import v from "./src/version.json";

GL.GMVI.OPTION={
    size: 5, 
    id: 'UUID', // 图层主键(若不设置为GL.H.uuid())
    fillStyle: 'rgba(200, 200, 50, 1)', // 填充颜色，绘制点，多边形，圆等会用到
    strokeStyle: 'rgba(0, 0, 255, 1)', // 描边颜色，绘制线路时用到
    lineWidth: 4, // 描边宽度
    globalAlpha: 1, // 透明度
    globalCompositeOperation: 'lighter', // 颜色叠加方式
    shadowColor: 'rgba(255, 255, 255, 1)', // 投影颜色
    shadowBlur: 35,  // 投影模糊级数
    maxSize: 20, //最大值，绘制气泡等图形时要限制最大值
    max:100,//最大值，count的最大值
    splitList: [
          {
            start: 0,
            end: 2,
            color: 'color'
        },{
            start: 3,
            end: 4,
            color: 'color'
        },{
            start: 5,
            end: 6,
            color: 'color'
        }
   ],//count区间和对应的颜色值
   gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},//比例值和对应的颜色值
   maxClusterLv:3,//最大的聚合层级的值，当绘制聚合图层时需要使用
   showText:true,//是否显示文字
   font:'18px sans-serif',//标注字体样式
   symbol:'rect',//点的标志，默认是绘制圆，指定后可以绘制矩形
   animation: {
        type: 'time', // 按时间展示动画
        stepsRange: { // 动画时间范围,time字段中值
            start: 0,
            end: 100
        },
        trails: 10, // 时间动画的拖尾大小
        duration: 5, // 单个动画的时间，单位秒
   },
   arrowSize:10,//箭头的大小
   draw:'simple||bubble||intensity||category||choropleth||effect|| heatmap||grid||honeycomb||text||icon||cluster||tagcloud||migrate|| waterbubble||radial||star||arrow||scatter||migrateLines'
    //绘制类型 ,只有CanvasLayer支持该配置，其他两个图层(WebGlLayer,WebGlHeatLayer)不支持
}


const name=v.id;
const version = v.version;
const date =v.date;
const descript = `${name}: ${version} Built by Iverson.hu,  [${date}]`;

GL.GMVI.VERSION=descript;
GL.GMVI.toString=function () {
   return GL.GMVI.VERSION;
}
if(!window.maptalks){
    throw new Error("not find maptalks lib")
}
if(window.maptalks){
    window.maptalks.GMVI=GL.GMVI;
}



