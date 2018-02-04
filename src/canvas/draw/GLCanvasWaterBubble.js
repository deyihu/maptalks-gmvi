/**
 * Created by Administrator on 2017/7/7.
 */

import BaseCanvas from "./BaseCanvas"

let defConfig={
    radius: 50,
    lineWidth: 2,
    data: 0.5,
    waterColor: 'rgba(25, 139, 201, 1)',
    textColor: 'rgba(06, 85, 128, 0.8)',
    font: '',
    wave: true,
    txt: undefined,
    animation: true,
    textColor:'white',
    percentNum:0.8
}


function Waterbubble (canvas, config,context,xy) {
    this.xy=xy;
    this.refresh(canvas, config,context);
}


Waterbubble.prototype = {
    refresh: function (canvas, config,context) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        this._init(canvas, config,context)
    },

    _init: function (canvas, config,context){
        var radius = config.radius;
        var lineWidth = config.lineWidth;

        canvas.width = radius*2 + lineWidth;
        canvas.height = radius*2 + lineWidth;

        this._buildShape(canvas, config,context);
    },

    _buildShape: function (canvas, config,context) {
        var ctx = canvas.getContext('2d');
        var gap = config.lineWidth*2;
        var r = config.radius - gap;
        var data = config.data;
        var lineWidth = config.lineWidth

        var waterColor = config.waterColor;
        var textColor = config.textColor;
        var font = config.font;

        var wave = config.wave

        // //the center of circle
        var x = config.radius + lineWidth/2;
        var y = config.radius + lineWidth/2;

        ctx.beginPath();

        ctx.arc(x, y, config.radius, 0, Math.PI*2);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = waterColor;
        ctx.stroke();
        //if config animation true
        if (config.animation) {
            this._animate(ctx, r, data, lineWidth, waterColor, x, y, wave,context)
        } else {
            this._fillWater(ctx, r, data, lineWidth, waterColor, x, y, wave,context);
        }

        if (typeof config.txt == 'string'){
            this._drawText(ctx, textColor, font, config.radius, data, x, y, config.txt,context);
        }

        return;
    },

    _fillWater: function (ctx, r, data, lineWidth, waterColor, x, y, wave,context) {
        ctx.beginPath();

        ctx.globalCompositeOperation = 'destination-over';

        //start co-ordinates
        var sy = r*2*(1 - data) + (y - r);
        var sx = x - Math.sqrt((r)*(r) - (y - sy)*(y - sy));
        //middle co-ordinates
        var mx = x;
        var my = sy;
        //end co-ordinates
        var ex = 2*mx - sx;
        var ey = sy;

        var extent; //extent

        if (data > 0.9 || data < 0.1 || !wave) {
            extent = sy
        } else{
            extent = sy - (mx -sx)/4
        }
        // console.log(ctx.canvas.id)
        ctx.beginPath();

        ctx.moveTo(sx, sy)
        ctx.quadraticCurveTo((sx + mx)/2, extent, mx, my);
        ctx.quadraticCurveTo((mx + ex)/2, 2*sy - extent, ex, ey);

        var startAngle = -Math.asin((x - sy)/r)
        var endAngle = Math.PI - startAngle;

        ctx.arc(x, y, r, startAngle, endAngle, false)

        ctx.fillStyle = waterColor;
        ctx.fill()

            var xy = this.xy;
            var x = xy[0], y = xy[1];
            var _canvas = ctx.canvas;
            context.drawImage(_canvas, x - _canvas.width / 2, y - _canvas.height / 2, _canvas.width, _canvas.height);

    },

    _drawText: function (ctx, textColor, font, radius, data, x, y, txt,context) {
        ctx.globalCompositeOperation = 'source-over';

        var size = font ? font.replace( /\D+/g, '') : 0.4*radius;
        ctx.font = font ? font : 'bold ' + size + 'px Microsoft Yahei';

        txt = txt.length ? txt : data*100 + '%'

        var sy = y + size/2;
        var sx = x - ctx.measureText(txt).width/2

        ctx.fillStyle = textColor;
        ctx.fillText(txt, sx, sy)
        var xy=this.xy;
        var x=xy[0],y=xy[1];
        var _canvas=ctx.canvas;
        context.drawImage(_canvas,x-_canvas.width/2,y-_canvas.height/2,_canvas.width,_canvas.height);
    },

    _animate: function (ctx, r, data, lineWidth, waterColor, x, y, wave,context) {
        var datanow = {
            value: 0
        };
        var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (func) {
                setTimeout(func, 16);
            };
        var self = this;
        var update = function () {
            if (datanow.value < data - 0.01) {
                datanow.value += (data - datanow.value)/2
                self._runing = true;
            } else {
                self._runing = false;
            }
        }
        var step = function () {
            self._fillWater(ctx, r, datanow.value, lineWidth, waterColor, x, y, wave,context);
            update();
            if (self._runing) {
                requestAnimationFrame(step);
            }
        }
        step(ctx, r, datanow, lineWidth, waterColor, x, y, wave,context)
    }
}


class GLCanvasWaterBubble extends BaseCanvas{
    constructor(){
      super();
    }

    draw (canvas, dataSet, options) {
        var data = dataSet.get();
        var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        var maxCount=this.getMaxCount(data)/defConfig.percentNum;
        for(var i=0,len=data.length;i<len;i++){
            var _data=data[i];
           defConfig.radius=_data.length||options.size||defConfig.radius;
           defConfig.lineWidth=options.lineWidth||defConfig.lineWidth
           defConfig.waterColor=_data.color||_data.fillStyle||_data.strokeStyle||options.fillStyle||defConfig.waterColor;
           defConfig.textColor=options.fillStyle||options.strokeStyle||options.textStyle||defConfig.textColor||defConfig.textColor
           defConfig.data=_data.count/maxCount;
           defConfig.txt=_data.count;
           var xy=_data.xy;
           var _canvas=document.createElement('canvas');
           var waterbubble = new Waterbubble(_canvas, defConfig,context,xy);
        }
    }
}

export default GLCanvasWaterBubble;