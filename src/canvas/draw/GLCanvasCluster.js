/**
 * Created by Administrator on 2017/1/16.
 */
// import  ClusterUtil from "../../utils/ClusterUtil"

import BaseCanvas from "./BaseCanvas"

class GLCanvasCluster extends BaseCanvas{
    constructor(){
        super();
    }

    draw(context, dataSet, options) {
        var ctx=context;
        ctx.clearRect(0,0,ctx.width,ctx.height);
        ctx.save();
        if(!dataSet)
            return;
        for (var key in options) {
            ctx[key] = options[key];
        }
        var clusters=dataSet.clusters;
        var unClusters=dataSet.unClusters;
        if(clusters){
            var self=this;
            var size=options.size||20;
            clusters.forEach(element => {
                var xy=element.xy;
                var count=element.count;
                ctx.fillStyle=self.getOutColor(count);
                var innerColor=self.getInnerColor(count);
                if(count>1000) count=(count/1000).toFixed(1)+'k';
                ctx.beginPath();
                ctx.arc(xy[0],xy[1], size, 0, Math.PI * 2);
                ctx.fill();
                ctx.save();
                ctx.fillStyle=innerColor;
                ctx.beginPath();
                ctx.arc(xy[0],xy[1], size-5, 0, Math.PI * 2);
                ctx.fill();
                ctx.save();

                ctx.font =options.font||( 15 +'px Microsoft YaHei UI');
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle =options.fillStyle|| '#151515';
                ctx.fillText(count, xy[0], xy[1]);
            });
        }

        if(unClusters&&unClusters.length>0){
            var len=unClusters.length;
            var size=options.size||10
            for(var i=0;i<len;i++){
                var o=unClusters[i];
                var xy=o.xy;
                var item=o.item;
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

    getOutColor(count){
        var color='rgba(110, 204, 57, 0.6)';
        if(!count)
            return color;
        if(count>1000)
            color='rgba(241, 211, 87, 0.6)'
        if(count>5000)
            color='rgba(235,129,70,0.6)'
        return color;
    }

    getInnerColor(count){
        var color='rgba(110, 204, 57, 1)';
        if(!count)
            return color;
        if(count>1000)
            color='rgba(241, 211, 87, 1)'
        if(count>5000)
            color='rgba(235,129,70,1)'
        return color;
    }

}




export default GLCanvasCluster