

import utils from "./utils"

import Marker from "./Marker"

class Spark{
    constructor(options){
        var startX = options.startX,
        startY = options.startY,
        endX = options.endX,
        endY = options.endY;

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

        // 保证Spark的弧度不超过Math.PI
        if (startAngle * endAngle < 0) {
            if (startAngle < 0) {
                startAngle += Math.PI * 2;
                endAngle += Math.PI * 2;
            } else {
                endAngle += Math.PI * 2;
            }
        }

        this.tailPointsCount = 10; // 拖尾点数
        this.centerX = centerX;
        this.centerY = centerY;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.radius = radius;
        this.lineWidth = options.width || 1;
        this.strokeStyle = options.color || '#fff';
        this.factor = options.speed/ this.radius;
        this.deltaAngle = (80 / Math.min(this.radius, 400)) / this.tailPointsCount;
        this.trailAngle = this.startAngle;
        this.arcAngle = this.startAngle;
        this.arrowSize=options.arrowSize||3;

        this.animateBlur = true;

        this.marker = new Marker({
            x: 50,
            y: 80,
            rotation: 50 * Math.PI / 180,
            style: 'arrow',
            color: 'rgb(255, 255, 255)',
            size: this.arrowSize,
            borderWidth: 0,
            borderColor: this.strokeStyle,
            arrowSize:options.arrowSize||5
        });
    }

    drawArc(context, strokeColor, lineWidth, startAngle, endAngle) {
        context.save();
        context.lineWidth = lineWidth;
        // context.lineWidth = 5;
        context.strokeStyle = strokeColor;
        context.shadowColor = this.strokeStyle;
        // context.shadowBlur = 5;
        context.lineCap = "round";
        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle, false);
        context.stroke();
        context.restore();
    }

    draw(context){
        var endAngle = this.endAngle;
        // 匀速
        var angle = this.trailAngle + this.factor;
        var strokeColor = this.strokeStyle;
        if (this.animateBlur) {
            this.arcAngle = angle;
        }
        this.trailAngle = angle;
        strokeColor = utils.calculateColor(strokeColor, 0.1);

        this.drawArc(context, strokeColor, this.lineWidth, this.startAngle, this.arcAngle);

        // 拖尾效果
        var count = this.tailPointsCount;
        for (var i = 0; i < count; i++) {
            var arcColor = utils.calculateColor(this.strokeStyle, 0.3 - 0.3 / count * i);
            var tailLineWidth = 4;
            if (this.trailAngle - this.deltaAngle * i > this.startAngle) {
                this.drawArc(context, arcColor,
                    tailLineWidth - tailLineWidth / count * i,
                    this.trailAngle - this.deltaAngle * i,
                    this.trailAngle
                );
            }
        }

        context.save();
        context.translate(this.centerX, this.centerY);
        this.marker.x = Math.cos(this.trailAngle) * this.radius;
        this.marker.y = Math.sin(this.trailAngle) * this.radius;
        this.marker.rotation = this.trailAngle + Math.PI / 2;
        this.marker.draw(context);
        context.restore();

        if ((endAngle - this.trailAngle) * 180 / Math.PI < 0.5) {
            this.trailAngle = this.startAngle;
            this.animateBlur = false;
        }
    }
}

export default Spark;