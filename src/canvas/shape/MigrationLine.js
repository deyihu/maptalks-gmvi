
import utils from "./utils"
import Marker from "./Marker"
import Arc from "./Arc"
import Pulse from "./Pulse"
import Spark from "./Spark"

class MigrationLine{

    constructor(options){
        this.renderer=options.renderer;
        this.data = options.data;
        this.store = {
            arcs: [],
            markers: [],
            pulses: [],
            sparks: []
        };
        this.speed=options.speed||5;
        this.playAnimation = true;
        this.started = false;
        this.context = options.context;
        this.style = options.style;
        this.arrowSize=options.arrowSize||3;
        this.lineWidth=options.lineWidth||10;
        this.init();
    }

    init(){
        this.updateData(this.data);
    }

    add(){

    }

    clear(){
        this.store = {
            arcs: [],
            markers: [],
            pulses: [],
            sparks: []
        };
        // 更新状态
        this.playAnimation = true;
        this.started = false;
        // 清除绘画实例，如果没有这个方法，多次调用start，相当于存在多个动画队列同时进行
        window.cancelAnimationFrame(this.requestAnimationId);
    }

    updateData(data){
        if (!data || data.length === 0) {
            return;
        }
        this.clear();
        this.data = data;
        if (this.data && this.data.length > 0) {
            utils.forEach(this.data, function (element) {
                var spark = new Spark({
                                        startX: element.from[0],
                                        startY: element.from[1],
                                        endX: element.to[0],
                                        endY: element.to[1],
                                        width:this.lineWidth,
                                        color: element.color,
                                        size: this.arrowSize,
                                        speed:this.speed,
                                        arrowSize:this.arrowSize
                });
                                    // this.store.arcs.push(arc);
               this.store.sparks.push(spark);
            }, this);
        }
    }

    start(canvas){
        var that = this;
        var speed=that.speed;
        if (!this.started) {
            (function drawFrame() {
                that.requestAnimationId = window.requestAnimationFrame(drawFrame, canvas);
                if (that.playAnimation) {
                    canvas.width += speed;
                    canvas.width -= speed;
                    var timer='time'
                    console.time(timer)
                    for (var p in that.store) {
                        var shapes = that.store[p];
                        for (var i = 0, len = shapes.length; i < len; i++) {
                            shapes[i].draw(that.context);
                        }
                    }
                    if(that.renderer) that.renderer.completeRender();
                }
            })();
            this.started = true;
        }
    }
    play(){
        this.playAnimation = true;
    }

    pause(){
        this.playAnimation = false;
    }
}

export default MigrationLine;