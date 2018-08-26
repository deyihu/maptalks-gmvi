/**
 * Created by Administrator on 2017/2/24.
 */


import BaseCanvas from "./BaseCanvas"


class CanvasEffect extends BaseCanvas{
    constructor(){
        super();
    }
    draw(context,dataSet,options,renderer){
        var data = dataSet.get() ;
        if(!data||data.length==0) {
            if(!this.anmimation){
                cancelAnimationFrame(this.anmimation)
                delete this.anmimation;
            }
            return;
        }
        // for(var i=0,len=data.length;i<len;i++){
        //     data[i]._size=1;
        // }
        this.data=data;
        this.options=options;

        var canvas=context.canvas;
        var width=canvas.width,height=canvas.height;
        context.clearRect(0,0,width,height);
        context.save();
        for (var key in options) {
            context[key] = options[key];
        }
        var backDom = document.createElement('canvas');
        backDom.width = width;
        backDom.height =height;
        var backCtx = backDom.getContext('2d');
        backCtx.globalAlpha = 0.85; //关键
        backCtx.globalCompositeOperation = 'copy';
        this.anmimationEnd=true;
        var self=this;
        
        // if(!this.anmimation) {
        //     this.anmimation = setInterval(function () {
        //         var w=canvas.width,h=canvas.height;
        //         var devicePixelRatio=this.devicePixelRatio=maptalks.Browser.retina ? 2 : 1;
        //         backCtx.drawImage(canvas, 0, 0, w/devicePixelRatio,h/devicePixelRatio);
        //         context.clearRect(0, 0, w,h);
        //         if(self.anmimationEnd){
        //             self.drawEffect(context);
        //         }
        //         context.drawImage(backDom, 0, 0,width, height);
        //         if(renderer) renderer.completeRender();
        //     }, 300)
        // }

         
        if(!self.anmimation) {
            function drawFrame(){
                var w=canvas.width,h=canvas.height;
                var devicePixelRatio=self.devicePixelRatio=maptalks.Browser.retina ? 2 : 1;
                backCtx.drawImage(canvas, 0, 0, w/devicePixelRatio,h/devicePixelRatio);
                context.clearRect(0, 0, w,h);
                if(self.anmimationEnd){
                    self.drawEffect(context);
                }
                context.drawImage(backDom, 0, 0,width, height);
                if(renderer) renderer.completeRender();
                self.anmimation = requestAnimationFrame(drawFrame);
            }
            drawFrame();
        
        }


    }

    drawEffect(context){
        this.anmimationEnd=false;
        const options=this.options;
        const offset=options.offset||1;
        for (var i = 0, len = this.data.length; i < len; i++) {
            var item = this.data[i];
            var size=item._size||35;
            var xy=item.xy;
            context.strokeStyle = item.color||item.strokeStyle||options.strokeStyle||'red';
            var devicePixelRatio=this.devicePixelRatio;
           
            context.save();
            context.arc(xy[0], xy[1], size, 0, Math.PI * 2, true);
            context.closePath();
            context.lineWidth = 3;
            context.stroke();
            context.restore();
          
            context.beginPath();
            this.data[i]._size+= offset;
            if ( this.data[i]._size> this.data[i].size) {
                this.data[i]._size=1;
            }
        }
        this.anmimationEnd=true;
    }
}

export default CanvasEffect;
