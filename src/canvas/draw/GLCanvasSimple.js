/**
 * @author kyle / http://nikai.us/
 */

import pathSimple from "../path/GLSimplePath";
import  BaseCanvas from "./BaseCanvas"
// import DataSet from "../../data/DataSet";

class GLCanvasSimple extends BaseCanvas{
    constructor(){
      super();
    }

    draw(canvas,dataSet,options){
        var data = dataSet.get() ;
        var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        context.save();

        for (var key in options) {
            context[key] = options[key];
        }
       
         {
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                context.save();
                if (item.fillStyle) {
                    context.fillStyle = item.fillStyle;
                }
                if (item.strokeStyle) {
                    context.strokeStyle = item.strokeStyle;
                }
                var type = item.geometry.type;
                context.beginPath();
                pathSimple.draw(context, item, options);
                if (type == GL.GMVI.Geometry.Point || type == GL.GMVI.Geometry.Polygon || type == GL.GMVI.Geometry.MultiPolygon||type==GL.GMVI.Geometry.Circle) {
                    context.fill();
                    if (item.strokeStyle || options.strokeStyle) {
                            if(!options.stroke||options.stroke==true)
                                context.stroke();
                    }
                } else if (type == GL.GMVI.Geometry.LineString||type==GL.GMVI.Geometry.Polyline) {
                    context.stroke();
                }
                context.restore();
            };
        }

        context.restore();
    }
}

export  default  GLCanvasSimple;
