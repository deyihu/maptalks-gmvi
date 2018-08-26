
// import DataSet from "../../data/DataSet";

class SimplePath {
    constructor(){

    }
    drawDataSet(context,dataSet,options) {
        var data =dataSet.get()
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            this.draw(context, item, options);
        }
    }

    draw(context,data,options) {
        var type = data.geometry.type;
        if(type==GMVI.Geometry.Polyline)
           type=GMVI.Geometry.LineString
        var xy=data.xy;
        var symbol = options.symbol || GMVI.Geometry.Circle;
        switch (type) {
            case GMVI.Geometry.Point:
                var size = data._size || data.size || options._size || options.size || 12;
                if(data.icon) size=Math.min(data.icon.width,data.icon.height)/2;
                context.moveTo(data.x, data.y);
                if (options.symbol === GMVI.Rect) {
                    context.rect(xy[0], xy[1], size, size);
                } else {
                    context.arc(xy[0],xy[1], size, 0, Math.PI * 2);
                }
                break;
            case GMVI.Geometry.Circle:
                // var size=data.length;
                // var xy=data.xy;
                // context.arc(xy[0],xy[1], size, 0, Math.PI * 2);

                this.drawPolygon(context, xy);
                break;
            case GMVI.Geometry.LineString:
                context.lineWidth=options.lineWidth||3;
                for (var j = 0; j < xy.length; j++) {
                    var _xy=xy[j];
                    if (j == 0) {
                        context.moveTo(_xy[0], _xy[1]);
                    } else {
                        context.lineTo(_xy[0],_xy[1]);
                    }
                }
                break;
            case GMVI.Geometry.Polygon:
                this.drawPolygon(context, xy);
                break;
            case GMVI.Geometry.Rectangle:
                var width=data.width,height=data.height,rotate=data.rotate||0;
                context.translate(xy[0],xy[1]);
                context.rotate(rotate* Math.PI / 180);
                context.translate(-xy[0],-xy[1]);
                context.rect(xy[0]-(width/2), xy[1]-(height/2), width, height);
                break;
            default:
                console.error('type' + type + 'is not support now!');
                break;
        }
    }

    drawPolygon(context,xy) {
        var length=xy.length;
        for (var i = 0; i < xy.length; i++) {
             var _xy = xy[i];
            if(i==0) {
                context.moveTo(_xy[0], _xy[1]);
            }else{
                context.lineTo(_xy[0], _xy[1]);
            }
            if(i==length-1){
                context.lineTo(_xy[0], _xy[1]);
            }

        }
    }

    drawArc(context,xy,options){
        // var xy=data.xy;
        var startX = xy[0][0],
        startY = xy[0][1],
        endX = xy[1][0],
        endY = xy[1][1];
        //两点之间的圆有多个，通过两点及半径便可以定出两个圆，根据需要选取其中一个圆
        var L = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));
        var m = (startX + endX) / 2; // 横轴中点
        var n = (startY + endY) / 2; // 纵轴中点
        var factor = 1.5;

        var centerX = (startY - endY) * factor + m;
        var centerY = (endX - startX) * factor + n;

        var radius = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(L * factor, 2));
        var startAngle = Math.atan2(startY - centerY, startX - centerX);
        var endAngle = Math.atan2(endY - centerY, endX - centerX);

        context.save();
        context.lineWidth=options.lineWidth||3;

        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle, false);
        context.stroke();
        context.restore();
    }
}

export  default new SimplePath()
