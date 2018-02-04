import BaseCanvas from "./BaseCanvas"




import Marker from "./../shape/Marker"
import Arc from "./../shape/Arc"


const   constoptions={
    pulseRadius: 25,
    pulseBorderWidth: 3,
    arcLabelFont: '15px sans-serif',
    color:'red',
    size:10

};


class GLCanvasArrow extends BaseCanvas{
    constructor(){
        super();
    }

    draw(canvas, dataSet, options) {
        var data = dataSet.get();
        var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        context.save();
        for(var i=0;i<data.length;i++){
           var d=data[i];
           var startXy=d.xy[0];
           var endXy=d.xy[1];
           var color=d.color||options.fillStyle||constoptions.color;
           var size=d.size||options.size||constoptions.size;
           var startX=startXy[0],startY=startXy[1],endX=endXy[0],endY=endXy[1];
            var arc = new Arc({
                startX: startX,
                startY:startY,
                endX: endX,
                endY: endY,
                color:color
            });
            var marker = new Marker({
                x: endX,
                y: endY,
                rotation: arc.endAngle + Math.PI / 2,
                style: 'arrow',
                color: color,
                size: size,
                borderWidth: 0,
                borderColor:color
            });

           marker.draw(context)
        }
    }
}

export default GLCanvasArrow;
