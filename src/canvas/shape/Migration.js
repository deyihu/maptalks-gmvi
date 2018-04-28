
import utils from "./utils"
import Marker from "./Marker"
import Arc from "./Arc"
import Pulse from "./Pulse"
import Spark from "./Spark"

class Migration{

    constructor(options){
        this.data = options.data;
        this.store = {
            arcs: [],
            markers: [],
            pulses: [],
            sparks: []
        };
        this.renderer=options.renderer;
        this.speed=options.speed||5;
        this.playAnimation = true;
        this.started = false;
        this.context = options.context;
        this.style = options.style;
        this.arrowSize=options.arrowSize||3;
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
                var arc = new Arc({
                    startX: element.from[0],
                    startY: element.from[1],
                    endX: element.to[0],
                    endY: element.to[1],
                    labels: element.labels,
                    label: this.style.arc.label,
                    font: this.style.arc.font,
                    width: this.style.arc.width,
                    color: element.color
                });
                var marker = new Marker({
                    x: element.to[0],
                    y: element.to[1],
                    rotation: arc.endAngle + Math.PI / 2,
                    style: 'arrow',
                    color: element.color,
                    size: this.arrowSize,
                    borderWidth: 0,
                    borderColor: element.color
                });
                var pulse = new Pulse({
                    x: element.to[0],
                    y: element.to[1],
                    radius: this.style.pulse.radius,
                    color: element.color,
                    borderWidth: this.style.pulse.borderWidth
                });
                var spark = new Spark({
                    startX: element.from[0],
                    startY: element.from[1],
                    endX: element.to[0],
                    endY: element.to[1],
                    width: 15,
                    color: element.color,
                    speed:this.speed,
                    arrowSize:this.arrowSize
                });

                this.store.arcs.push(arc);
                this.store.markers.push(marker);
                this.store.pulses.push(pulse);
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
                    var devicePixelRatio=maptalks.Browser.retina ? 2 : 1;
                    // console.log(canvas);
                    canvas.width += speed;
                    canvas.width -= speed;
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

export default Migration;