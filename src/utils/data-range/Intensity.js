/**
 * Created by Administrator on 2016/11/26.
 */


class Intensity{
        constructor(options){
        options = options || {};
        this.gradient = options.gradient || {
                0.25: "rgba(0, 0, 255, 1)",
                0.55: "rgba(0, 255, 0, 1)",
                0.85: "rgba(255, 255, 0, 1)",
                1.0: "rgba(255, 0, 0, 1)"
            };
        this.maxSize = options.maxSize || 35;
        this.max = options.max || 100;
        this.initPalette();
    }

    initPalette(){
        var gradient = this.gradient;

        if (typeof document === 'undefined') {
            // var Canvas = require('canvas');
            var paletteCanvas = new Canvas(256, 1);
        } else {
            var paletteCanvas = document.createElement('canvas');
        }

        paletteCanvas.width = 256;
        paletteCanvas.height = 1;

        var paletteCtx = this.paletteCtx = paletteCanvas.getContext('2d');

        var lineGradient = paletteCtx.createLinearGradient(0, 0, 256, 1);

        for (var key in gradient) {
            lineGradient.addColorStop(parseFloat(key), gradient[key]);
        }

        paletteCtx.fillStyle = lineGradient;
        paletteCtx.fillRect(0, 0, 256, 1);
    }


    getColor(value){
        var max = this.max;

        if (value > max) {
            value = max;
        }

        var index = Math.floor(value / max * (256 - 1)) * 4;

        var imageData = this.paletteCtx.getImageData(0, 0, 256, 1).data;

        return "rgba(" + imageData[index] + ", " + imageData[index + 1] + ", " + imageData[index + 2] + ", " + imageData[index + 3] / 256 + ")";
    }


    getSize(value){
        var size = 0;
        var max = this.max;
        var maxSize = this.maxSize;

        if (value > max) {
            value = max;
        }

        size = value / max * maxSize;

        return size;
    }
}

export default Intensity
