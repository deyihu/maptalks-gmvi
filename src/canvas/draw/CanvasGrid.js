/**
 * Created by Administrator on 2016/11/26.
 */

import Intensity from "../../utils/data-range/Intensity";
import BaseCanvas from "./BaseCanvas"

class CanvasGrid extends BaseCanvas{
    constructor(){
        super();
    }

    draw(context, dataSet, options) {
        context.clearRect(0,0,context.width,context.height);
        context.save();
        var data = dataSet.get();
        var grids = {};
        var size = options._size || options.size || 50;
        var offset = options.offset || {
                x: 0,
                y: 0
            }
        for (var i = 0; i < data.length; i++) {
            var xy=data[i].xy;
            var gridKey = Math.floor((xy[0]- offset.x) / size) + "," + Math.floor((xy[1]- offset.y) / size);
            if (!grids[gridKey]) {
                grids[gridKey] = 0;
            }
            grids[gridKey] += ~~(data[i].count || 1);
        }
        for (var gridKey in grids) {
            gridKey = gridKey.split(",");
            var intensity = new Intensity({
                max: options.max || 100,
                gradient: options.gradient
            });
            context.beginPath();
            var x=gridKey[0] * size + .5 + offset.x;
            var y=gridKey[1] * size + .5 + offset.y;
            context.rect(x, y, size - 1, size - 1);
            context.fillStyle = intensity.getColor(grids[gridKey]);
            context.fill();
            if (options.showText) {
                context.fillStyle = options.fillStyle||'white';
                context.font = options.font||( 15 +'px Microsoft YaHei UI');
                var wh=context.measureText(grids[gridKey]);
                var width=wh.width;
                x=(x+x+size)/2;
                y=(y+y+size)/2;
                // context.fillText(grids[gridKey], gridKey[0] * size + .5 + offset.x + size / 2 -1, gridKey[1] * size + .5 + offset.y + size / 2 -1);
                context.fillText(grids[gridKey], x-width/2,y);
            }
            if (options.strokeStyle || options.lineWidth) {
                context.stroke();
            }
        }
        context.restore();
    }
}

export  default CanvasGrid
