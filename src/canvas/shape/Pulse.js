
import utils from "./utils"

class Pulse{
    constructor(options){
        this.x = options.x;
        this.y = options.y;
        this.maxRadius = options.radius;
        this.color = options.color;
        this.shadowBlur = 5;
        this.lineWidth = options.borderWidth;
        this.r = 0;
        this.factor = 2 / options.radius;
        this.font=options.font;
        this.name=options.name;
    }

    draw(context){
        var strokeColor = this.color;
        strokeColor = utils.calculateColor(strokeColor, 1 - this.r / this.maxRadius);
        if(this.name){
            context.save();
            context.font=this.font;
            context.fillStyle=this.color;
            var width=context.measureText(this.name).width;
            context.fillText(this.name, this.x-width/2, this.y);
         }
         context.restore();
         context.save();
        var vr = (this.maxRadius - this.r) * this.factor;
        var vr = 0.5;
        this.r += vr;
        // this.shadowBlur = Math.floor(this.r);

        context.save();
        context.translate(this.x, this.y);
        var strokeColor = this.color;
        strokeColor = utils.calculateColor(strokeColor, 1 - this.r / this.maxRadius);
        context.strokeStyle = strokeColor;
        context.shadowBlur = this.shadowBlur;
        context.shadowColor = strokeColor;
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.arc(0, 0, this.r, 0, Math.PI * 2, false);
        context.stroke();
        context.restore();

        if (Math.abs(this.maxRadius - this.r) < 0.8) {
            this.r = 0;
        }
    }
}

export default Pulse;