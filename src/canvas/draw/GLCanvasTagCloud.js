/**
 * Created by Administrator on 2017/6/13.
 */

import BaseCanvas from "./BaseCanvas"

class GLCanvasTagCloud extends BaseCanvas{
    constructor(){
      super();
    }


    draw (context, dataSet, options) {
        var data = dataSet.get()
        var ctx=context;
        ctx.clearRect(0,0,ctx.width,ctx.height);
        // ctx.shadowBlur = 10;
        // ctx.shadowColor = "rgba(250, 250, 55, 0.7)";
        ctx.beginPath();
        ctx.textBaseline = "top";
        for(var key in options){
            ctx[key]=options[key]
        }
        var rects = [];
        var canvasWidth = ctx.canvas.width;
        var canvasHeight = ctx.canvas.height;
        var margin = 200; // canvas扩大范围绘制，使边缘展示一致
        for (var i = 0, len = data.length; i < len; i++) {
            if(! data[i].geometry) continue;
            var xy=data[i].xy;
            var x = xy[0]
            var y = xy[1]
            var size=data[i].size||options.size||(parseInt(Math.random() * 20) + 10);
            var name=data[i].name||''
            var color=data[i].color||data[i].fillStyle||data[i].strokeStyle||options.fillStyle||options.strokeStyle||"red";
            if (x < -margin || y < -margin || x > canvasWidth + margin || y > canvasHeight + margin||!name) {
                continue;
            }
            ctx.font = "bold " + size + "px Arial";
            var textWidth = ctx.measureText(name).width;

            // 根据文本宽度和高度调整x，y位置，使得绘制文本时候坐标点在文本中心点，这个计算出的是左上角坐标
            var px = x - textWidth / 2;
            var py = y - size / 2;
            var rect = {
                sw: {
                    x: px,
                    y: py + size
                },
                ne: {
                    x: px + textWidth,
                    y: py
                }
            }
            if (!this.hasOverlay(rects, rect)) {
                rects.push(rect);
                ctx.fillStyle = color;
                ctx.fillText(name, px, py);
            }
        }
    }


    hasOverlay(rects, overlay) {
        for (var i = 0; i < rects.length; i++) {
            if (this.isRectOverlay(rects[i], overlay)) {
                return true;
            }
        }
        return false;
    }



    isRectOverlay(rect1, rect2) {
        //minx、miny 2个矩形右下角最小的x和y
        //maxx、maxy 2个矩形左上角最大的x和y
        var minx = Math.min(rect1.ne.x, rect2.ne.x);
        var miny = Math.min(rect1.sw.y, rect2.sw.y);
        var maxx = Math.max(rect1.sw.x, rect2.sw.x);
        var maxy = Math.max(rect1.ne.y, rect2.ne.y);
        if (minx > maxx && miny > maxy) {
            return true;
        }
        return false;
    }


}

export default GLCanvasTagCloud