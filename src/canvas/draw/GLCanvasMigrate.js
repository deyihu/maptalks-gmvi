import BaseCanvas from "./BaseCanvas"
import Migration from "./../shape/Migration"

const   constoptions={
    map: {},
    data: {},
    pulseRadius: 25,
    pulseBorderWidth: 3,
    arcWidth: 1,
    arcLabel: true,
    arcLabelFont: '15px sans-serif',
    Marker: {},
    Spark: {}

};

class GLCanvasMigrate extends BaseCanvas{
    constructor(){
        super();
        this.options=constoptions;
        this._style = {
                pulse: {
                    radius: this.options.pulseRadius,
                    borderWidth: this.options.pulseBorderWidth
                },
                arc: {
                    width: this.options.arcWidth,
                    label: this.options.arcLabel,
                    font: this.options.arcLabelFont
                }
            } || {};
    }

    draw(canvas, dataSet, options,renderer) {
        var data = dataSet.get();
        var context=canvas.getContext("2d");
        this._style.pulse.radius=options.size||options.radius|| this._style.pulse.radius
        this._style.pulse.borderWidth=options.lineWidth||options.borderWidth||this._style.pulse.borderWidth
        this._style.arc.font=options.font||this._style.arc.font;
        this._style.arc.width=options.lineWidth||options.borderWidth||this._style.arc.width
        var _data=[];
        for(var i=0;i<data.length;i++){
            var obj=data[i];
            var xy=obj.xy;
            _data.push({
                from:xy[0],
                to:xy[xy.length-1],
                labels:obj.labels,
                color:obj.color||obj.strokeStyle||obj.fillStyle||options.strokeStyle||options.fillStyle||'#F9000C'
            })
        }

        if(!this.migration){
            this.migration=new Migration({
                data: _data,
                context: context,
                style: this._style,
                speed:options.speed,
                renderer:renderer,
                arrowSize:options.arrowSize
            });
        }else{
            this.migration.updateData(_data);
        }
        if(!this.migration.started)
           this.migration.start(canvas);
    }
}

export default GLCanvasMigrate;
