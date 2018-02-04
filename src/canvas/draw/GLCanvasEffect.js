/**
 * Created by Administrator on 2017/2/24.
 */


import BaseCanvas from "./BaseCanvas"


class GLCanvasEffect extends BaseCanvas{
    constructor(){
        super();
    }
    draw(canvas,dataSet,options,renderer){
        var data = dataSet.get() ;
        if(!data||data.length==0) {
            if(!this.anmimation){
                clearInterval(this.anmimation)
                this.anmimation=null;
            }
            return;
        }
        for(var i=0,len=data.length;i<len;i++){
            data[i]._size=1;
        }
        this.data=data;
        this.options=options;
        var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        context.save();
        for (var key in options) {
            context[key] = options[key];
        }
        this.context=context;

        var backDom = document.createElement('canvas');
        backDom.width = context.canvas.width;
        backDom.height = context.canvas.height;
        var backCtx = backDom.getContext('2d');
        backCtx.globalAlpha = 0.85; //关键
        backCtx.globalCompositeOperation = 'copy';

        this.anmimationEnd=true;
        var self=this;
        if(!this.anmimation) {
            this.anmimation = setInterval(function () {
                backCtx.drawImage(context.canvas, 0, 0, context.canvas.width, context.canvas.height);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                // console.log('animation')
                if(self.anmimationEnd)
                   self.drawEffect();
                context.drawImage(backDom, 0, 0, backDom.width, backDom.height);
                if(renderer) renderer.completeRender();
            }, 200)
        }
    }

    drawEffect(){
        this.anmimationEnd=false;
        var context=this.context;
        for (var i = 0, len = this.data.length; i < len; i++) {
            var item = this.data[i];
            var size=item._size||35;
            var xy=item.xy;
            context.strokeStyle = item.color||item.strokeStyle||options.strokeStyle||'red'
            context.beginPath();
            context.save();
            context.arc(xy[0], xy[1], size, 0, Math.PI * 2, true);
            context.closePath();
            context.lineWidth = 3;
            context.stroke();
            context.restore();
            this.data[i]._size+=  1.8;
            if ( this.data[i]._size> this.data[i].size) {
                this.data[i]._size=1;
            }
        }
        this.anmimationEnd=true;
    }
}

export default GLCanvasEffect;
