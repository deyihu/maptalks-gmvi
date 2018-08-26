/**
 * Created by Administrator on 2016/11/25.
 */


import utilsColorPalette from "../utils/ColorPalette";
import Intensity from "../../utils/data-range/Intensity";
import pathSimple from "../path/SimplePath";
import  Canvas from  "./../Canvas"
import BaseCanvas from "./BaseCanvas"

class CanvasHeat extends BaseCanvas{

    constructor(){
        super();
    }

    createCircle(size) {
        if (typeof document === 'undefined') {
            var circle = new Canvas();
        } else {
            var circle = document.createElement('canvas');
        }
        var context = circle.getContext('2d');

        var shadowBlur = size / 2;
        var r2 = size + shadowBlur;
        var offsetDistance = 10000;

        circle.width = circle.height = r2 * 2;

        context.shadowBlur = shadowBlur;
        context.shadowColor = 'black';
        context.shadowOffsetX = context.shadowOffsetY = offsetDistance;

        context.beginPath();
        context.arc(r2 - offsetDistance, r2 - offsetDistance, size, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        return circle;
    }


    colorize(pixels, gradient, options) {
        var maxOpacity = options.maxOpacity || 0.8;
        for (var i = 3, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i] * 4; // get gradient color from opacity value

            if (pixels[i] / 256 > maxOpacity) {
                pixels[i] = 256 * maxOpacity;
            }

            pixels[i - 3] = gradient[j];
            pixels[i - 2] = gradient[j + 1];
            pixels[i - 1] = gradient[j + 2];
        }
    }


    drawGray(context, dataSet, options) {
        var max = options.max || 100;
        var minOpacity=options.minOpacity
        var size = options._size;
        if (size == undefined) {
            size = options.size;
            if (size == undefined) {
                size = 13;
            }
        }
        for(var key in options){
            context[key]=options[key]
        }
        var color = new Intensity({
            gradient: options.gradient,
            max: max
        })
        var circle = this.createCircle(size);
        var data = dataSet;
        var dataOrderByAlpha = {};

        data.forEach(function (item, index) {
            var count = item.count === undefined ? 1 : item.count;
            var alpha = Math.min(1, count / max).toFixed(2);
            dataOrderByAlpha[alpha] = dataOrderByAlpha[alpha] || [];
            dataOrderByAlpha[alpha].push(item);
        });

        for (var i in dataOrderByAlpha) {
            if (isNaN(i))
                continue;
            var _data = dataOrderByAlpha[i];
            context.beginPath();
            if (!options.withoutAlpha) {
                context.globalAlpha = i;
            }
            _data.forEach(function (item, index) {
                if (!item.geometry) {
                    return;
                }
                var xy=item.xy;
                var type = item.geometry.type;
                if (type ===GMVI.Geometry.Point) {
                    var count = item.count === undefined ? 1 : item.count;
                    context.globalAlpha = count / max;
                    context.drawImage(circle, xy[0]- circle.width / 2, xy[1] - circle.height / 2);
                } else if (type === GMVI.Geometry.LineString||type===GMVI.Geometry.Polyline) {
                    // context.globalAlpha = count / max;
                    context.globalAlpha = Math.max(item.count / max, minOpacity === undefined ? 0.05 : minOpacity);
                    pathSimple.draw(context, item, options);
                } else if (type === GMVI.Geometry.Polygon) {

                }
            });
            context.strokeStyle = color.getColor(i * max);
            context.stroke();
        }
    }


    draw(context, dataSet, options) {
        var strength = options.strength || 0.3;
        // var context=canvas.getContext('2d');
        context.clearRect(0,0,context.width,context.height);
        context.strokeStyle = 'rgba(0,0,0,' + strength + ')';
        options = options || {};
        var data = dataSet.get();
        context.save();

        this.drawGray(context, data, options);

        if (!options.absolute) {
            var colored = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
            this.colorize(colored.data, utilsColorPalette.getImageData({
                defaultGradient: options.gradient || {
                    0.25: "rgba(0, 0, 255, 1)",
                    0.55: "rgba(0, 255, 0, 1)",
                    0.85: "rgba(255, 255, 0, 1)",
                    1.0: "rgba(255, 0, 0, 1)"
                }
            }), options);
            context.putImageData(colored, 0, 0);
            context.restore();
        }
        // return canvas;
    }
}

export default CanvasHeat
