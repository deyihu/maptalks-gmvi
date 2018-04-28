import BaseCanvas from "./BaseCanvas"

class GLCanvasStar extends BaseCanvas{
    constructor(){
        super();
    }

    draw(context, dataSet, options){
        var data = dataSet.get();
        // var context=canvas.getContext("2d");
        context.clearRect(0,0,context.width,context.height);
        var starArr=[];
        for(var i=0,len=data.length;i<len;i++){
             var _data=data[i];
             var xy=_data.xy;
             var x=xy[0],y=xy[1];
             var color=_data.color||_data.fillStyle||_data.strokeStyle||options.fillStyle||options.strokeStyle||'red';
             var size=_data.length||_data.size||options.size||30;
             starArr.push(this.createStar(size,x,y,color));
        }
        for(var i=0;i<starArr.length;i++) {
            starArr[i].angle+=starArr[i].changeAgele;
            context.save();
            context.beginPath();

            context.translate(starArr[i].x,starArr[i].y);
            // context.rotate(starArr[i].angle*Math.PI/180);
            // context.scale(Math.sin(starArr[i].angle*Math.PI/180),Math.sin(starArr[i].angle*Math.PI/180));
            context.globalAlpha=Math.abs(Math.sin(starArr[i].angle*Math.PI/180));
            //绘制多边形
            this.drawStar(0,0,starArr[i].radius1,starArr[i].radius2,starArr[i].num,"fill",starArr[i].color,context)
            context.restore();
        }

    }

    createStar(size,x,y,color){
        var starObj={
            // radius1:20+10*Math.random(),
            radius2:size/2.5,
            radius1:size,
            // radius2:size,
            x:x,
            y:y,
            num:6,
            color:color,
            angle:360*Math.random(),
            changeAgele:-5+10*Math.random()
        }

       return starObj;

    }


    drawStar(x,y,radius1,radius2,num,drawType,color,cobj){
        var angle=360/(num*2);
        var arr=[];
        for(var i=0;i<num*2;i++)
        {
            var starObj={};
            if(i%2==0)
            {
                starObj.x=x+radius1*Math.cos(i*angle*Math.PI/180);
                starObj.y=y+radius1*Math.sin(i*angle*Math.PI/180);
            }
            else
            {
                starObj.x=x+radius2*Math.cos(i*angle*Math.PI/180);
                starObj.y=y+radius2*Math.sin(i*angle*Math.PI/180);
            }

            arr.push(starObj);
        }

        cobj.beginPath();
        cobj.fillStyle=color;
        cobj.moveTo(arr[0].x,arr[0].y);
        for(var i=1;i<arr.length;i++)
        {
            cobj.lineTo(arr[i].x,arr[i].y);
        }
        cobj.closePath();
        if(drawType=="fill")
        {
            cobj.fill();
        }
        else
        {
            cobj.stroke();
        }
    }


}

export default GLCanvasStar