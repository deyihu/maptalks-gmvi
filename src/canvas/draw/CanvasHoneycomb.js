/**
 * Created by Administrator on 2017/1/17.
 */


import Intensity from "../../utils/data-range/Intensity";
import BaseCanvas from "./BaseCanvas"

class CanvasHoneycomb extends BaseCanvas{
    constructor(){
        super();
    }

    draw(context, dataSet, options) {
        context.clearRect(0,0,context.width,context.height);
        context.save();
        var data = dataSet.get();
        for (var key in options) {
            context[key] = options[key];
        }
        var grids = {};
        var offset = options.offset || {
                x: 10,
                y: 10
            }
        var r = options._size || options.size || 40;
        r = r / 2 / Math.sin(Math.PI / 3);
        var dx = r * 2 * Math.sin(Math.PI / 3);
        var dy = r * 1.5;
        var binsById = {};
        for (var i = 0; i < data.length; i++) {
            var xy=data[i].xy;
            // var coordinates = data[i].geometry._coordinates || data[i].geometry.coordinates;
            // var latlng=[coordinates[1],coordinates[0]];
            // var point=Hub.$map.toPixel(latlng)
            var py = (xy[1] - offset.y) / dy,
                pj = Math.round(py),
                px = (xy[0]- offset.x) / dx - (pj & 1 ? .5 : 0),
                pi = Math.round(px),
                py1 = py - pj;
            if (Math.abs(py1) * 3 > 1) {
                var px1 = px - pi,
                    pi2 = pi + (px < pi ? -1 : 1) / 2,
                    pj2 = pj + (py < pj ? -1 : 1),
                    px2 = px - pi2,
                    py2 = py - pj2;
                if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) pi = pi2 + (pj & 1 ? 1 : -1) / 2, pj = pj2;
            }
            var id = pi + "-" + pj,
                bin = binsById[id];
            if (bin) {
                bin.push(data[i])
            } else {
                bin = binsById[id] = [data[i]];
                bin.i = pi;
                bin.j = pj;
                bin.x = (pi + (pj & 1 ? 1 / 2 : 0)) * dx;
                bin.y = pj * dy;
            }
        }
        var intensity = new Intensity({
            max: options.max || 100,
            maxSize: r,
            gradient: options.gradient
        });
        for (var key in binsById) {
            var item = binsById[key];
            context.beginPath();
            var x1,y1,x,y;
            for (var j = 0; j < 6; j++) {
                var radius = r;
                var result = this.hex_corner({
                    x: item.x + offset.x,
                    y: item.y + offset.y
                }, radius, j);
                context.lineTo(result[0], result[1]);
                if(j==3){
                    x1=result[0],y1=result[1]
                }
                if(j==0){
                    x=result[0],y=result[1]
                }
            }
            context.closePath();
            var count = 0;
            for (var i = 0; i < item.length; i++) {
                count += item[i].count || 1;
            }
            context.fillStyle = intensity.getColor(count);
            context.fill();
            context.strokeStyle=options.strokeStyle||'white'
            context.stroke();
            if (options.showText&&count>0) {
                context.textBaseline = 'middle';
                context.textAlign = 'center';
                context.font=options.font||"15px Arial";
                context.fillStyle =options.fillStyle|| 'white';
                var text=count.toFixed(0);
                var width=context.measureText(text).width;
                 x=(x+x1)/2
                 y=(y+y1)/2;
                // context.fillText(count.toFixed(0), (item.x+offset.x/2),(item.y+offset.y/2));
                context.fillText(text, x,y);
            }
        }

        context.restore();
    }

    hex_corner(center, size, i) {
        var angle_deg = 60 * i + 30;
        var angle_rad = Math.PI / 180 * angle_deg;
        return [center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad)];
    }
}

export default CanvasHoneycomb