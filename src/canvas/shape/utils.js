var util={};


util.calculateColor=function(color, opacity){
    if (color.indexOf('#') === 0) {
        var color16 = color.slice(1);
        var r = parseInt(color16.slice(0, 2), 16);
        var g = parseInt(color16.slice(2, 4), 16);
        var b = parseInt(color16.slice(4), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    } else if (/^rgb\(/.test(color)) {
        return color.replace(/rgb/, 'rgba').replace(')', ",") +
            opacity + ')';
    } else {
        return color;
    }
}

util.forEach=function (arr, cb, scope) {
    if (typeof Array.prototype.forEach === 'function') {
        arr.forEach(cb, scope);
    } else {
        for (var i = 0, len = arr.length; i < len; i++) {
            cb.apply(scope, [arr[i], i, arr]);
        }
    }
}
util.map=function (arr, cb, scope) {
    if (typeof Array.prototype.map === 'function') {
        return arr.map(cb, scope);
    } else {
        var mapped = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            mapped[i] = cb.apply(scope, [arr[i], i, arr]);
        }
        return mapped;
    }
}
export default util;