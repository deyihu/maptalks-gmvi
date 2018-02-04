/**
 * Created by Administrator on 2016/11/26.
 */

// import pathSimple from "../path/GLSimplePath";
import  BaseCanvas from "./BaseCanvas"

class GLCanvasText extends BaseCanvas{
    constructor(){
        super();
    }

    draw(canvas, dataSet, options) {
        var data = dataSet.get();
        var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        // context.fillStyle = 'white';
     
        for (var key in options) {
            context[key] = options[key];
        }
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        var offset = options.offset || {
                x: 0,
                y: 0
            };
        // var timer='draw:'
        // console.time(timer)
        for (var i = 0, len = data.length; i < len; i++) {
            context.save();
            var d=data[i];
            context.fillStyle=d.color||d.fillStyle||d.strokeStyle||options.fillStyle||options.strokeStyle||'white';
            var xy=d.xy;
            var x=xy[0],y=xy[1]
            var rotate=d.rotate||0;
            var text=d.text;
            // var width=context.measureText(text).width;
            // context.translate(x,y);
            // context.rotate(rotate* Math.PI / 180);
            // context.translate(-x,-y);

            context.fillText(text,x,y)
            context.restore();
        };
        // console.timeEnd(timer)
    }
}


export default  GLCanvasText
