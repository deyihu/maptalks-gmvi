

import pathSimple from "../path/SimplePath";
import  BaseCanvas from "./BaseCanvas"
// import DataSet from "../../data/DataSet";

class CanvasSimple extends BaseCanvas{
    constructor(){
      super();
    }

    draw(context,dataSet,options){
        var data = dataSet.get() ;
        // var context=canvas.getContext("2d");
        var canvas=context.canvas;
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
                if (type == GMVI.Geometry.Point || type == GMVI.Geometry.Polygon || type == GMVI.Geometry.MultiPolygon||type==GMVI.Geometry.Circle) {
                    context.fill();
                    if (item.strokeStyle || options.strokeStyle) {
                            if(!options.stroke||options.stroke==true)
                                context.stroke();
                    }
                } else if (type == GMVI.Geometry.LineString||type==GMVI.Geometry.Polyline) {
                    context.stroke();
                }
                context.restore();
            };
        }

        context.restore();
    }
}

export  default  CanvasSimple;
