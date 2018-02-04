class Arc{
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

        // this.L = L;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.centerX = centerX;
        this.centerY = centerY;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.startLabel = options && options.labels && options.labels[0],
            this.endLabel = options && options.labels && options.labels[1],
            this.radius = radius;
        this.lineWidth = options.width || 1;
        this.strokeStyle = options.color || '#000';
        this.label = options.label;
        this.font = options.font;
        this.shadowBlur = options.shadowBlur;
    }

    draw(context){
        context.save();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;
        context.shadowColor = this.strokeStyle;
        context.shadowBlur = this.shadowBlur || 2;

        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle, false);
        context.stroke();
        context.restore();

        context.save();
        context.fillStyle = this.strokeStyle;
        if (this.label) {
            context.font = this.font;
            if (this.startLabel) {
                var x = this.startX - 15
                var y = this.startY + 5
                context.fillText(this.startLabel, x, y);
            }
            if (this.endLabel) {
                var x = this.endX - 15;
                var y = this.endY - 5;
                context.fillText(this.endLabel, x, y);
            }
        }
        context.restore();
    }
}

export default Arc;