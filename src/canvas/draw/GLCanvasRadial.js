import BaseCanvas from "./BaseCanvas"
const n=40;
const defaultColor='red';
const defaultSize=30;

class GLCanvasRadial extends BaseCanvas{
        constructor(){
            super();
        }

    draw (canvas, dataSet, options) {
        var data = dataSet.get();
        var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        for(var i=0,len=data.length;i<len;i++) {
            var _data=data[i];
            var xy = _data.xy;
            var x=xy[0],y=xy[1];
            var size=_data.length||_data.size||options.size||defaultSize;
            var color=_data.color||_data.fillStyle||_data.strokeStyle||options.strokeStyle||options.fillStyle||defaultColor
            context.strokeStyle=color;
            var num=2*Math.PI/n;
            for(var j=0;j<n;j++){
                var radius=size,sDeg=j*num,eDeg=(j+1)*num
                context.save();
                context.translate(x, y);
                context.beginPath();
                // context.arc(0,0,radius,sDeg, eDeg);
                context.save();
                context.rotate(eDeg);
                context.moveTo(radius,0);
                context.lineTo(0,0);
                context.restore();
                // context.rotate(sDeg);
                // context.lineTo(radius,0);
                context.closePath();
                context.stroke();
                context.restore();
            }
        }
    }
}

export default  GLCanvasRadial
