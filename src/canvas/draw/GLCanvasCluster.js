/**
 * Created by Administrator on 2017/1/16.
 */
// import  ClusterUtil from "../../utils/ClusterUtil"

import BaseCanvas from "./BaseCanvas"

class GLCanvasCluster extends BaseCanvas{
    constructor(){
        super();
    }

    draw(canvas, dataSet, options) {
        var ctx=canvas.getContext("2d");
        ctx.clearRect(0,0,ctx.width,ctx.height);
        ctx.save();
        if(!dataSet)
            return;
        for (var key in options) {
            ctx[key] = options[key];
        }
        var cluster=dataSet.cluster;
        var discrete=dataSet.discrete;
        if(cluster){

            var size=options.size||25;
            for(var i in cluster){
                var xy=cluster[i].xy;
                var count=cluster[i].count;

                ctx.fillStyle=this.getColor(count);
                ctx.beginPath();
                ctx.arc(xy[0],xy[1], size, 0, Math.PI * 2);
                ctx.fill();
                // ctx.lineWidth = 1;
                // ctx.strokeStyle = options.strokeStyle||'#fff';
                // ctx.stroke();
                ctx.save();
                ctx.font =options.font||( 15 +'px Microsoft YaHei UI');
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillStyle =options.fillStyle|| '#151515';
                ctx.fillText(count, xy[0], xy[1]);
            }
        }

        if(discrete&&discrete.length>0){
            var len=discrete.length;
            var size=options.size||10
            for(var i=0;i<len;i++){
                var o=discrete[i];
                var xy=o.slice(4,6);
                var item=o[3];
                var icon=item.icon;
                if(icon){
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.drawImage(icon, xy[0]- icon.width / 2,xy[1]- icon.height / 2,icon.width,icon.height);
                }else{
                    ctx.fillStyle=options.fillStyle||this.getColor(1);
                    ctx.beginPath();
                    ctx.arc(xy[0],xy[1], size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = options.strokeStyle||'#fff';
                    ctx.stroke();
                }

            }

        }

    }

    getColor(count){
        var color='rgba(110, 204, 57, 0.9)';
        if(!count)
            return color;
        if(count>1000)
            color='rgba(255,178,72,0.9)'
        if(count>5000)
            color='rgba(235,129,70,0.9)'
        if(count>10000)
            color='rgba(217,88,80,0.9)'
        if(count>20000)
            color='rgba(137,52,72,0.9)'
        return color;
    }

}

export default GLCanvasCluster