/**
 * Created by Administrator on 2016/11/26.
 */

// import pathSimple from "../path/GLSimplePath";
// import DataSet from "../../data/DataSet";
import BaseCanvas from "./BaseCanvas"
class GLCanvasIcon extends  BaseCanvas{
    constructor(){
       super();
    }

    draw (canvas, dataSet, options) {
        var data = dataSet.get()
        var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        // context.fillStyle = 'white';
        // context.textAlign = 'center';
        // context.textBaseline = 'middle';
        for (var i = 0, len = data.length; i < len; i++) {
            if (data[i].geometry) {
                context.save();
                var icon = data[i].icon
                var xy=data[i].xy;
                var x=xy[0]
                var y=xy[1]
                // var rotate=data[i].rotate||0;
                // context.translate(x,y);
                // context.rotate(rotate* Math.PI / 180);
                // context.translate(-x,-y);
                context.drawImage(icon, x-icon.width/2,y-icon.height/2,icon.width,icon.height);
                context.restore();
            }
        };
    }
}

export default GLCanvasIcon
