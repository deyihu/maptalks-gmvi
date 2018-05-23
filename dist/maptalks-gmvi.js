(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2017/7/11.
 */

var BaseCanvas = function () {
    function BaseCanvas() {
        _classCallCheck(this, BaseCanvas);
    }

    _createClass(BaseCanvas, [{
        key: "draw",
        value: function draw(canvas, dataSet, options) {}
    }, {
        key: "getMaxCount",
        value: function getMaxCount(data) {
            var maxCount = 0;
            for (var x in data) {
                var _data = data[x];
                var count = _data.count;
                if (!count) continue;
                if (count > maxCount) maxCount = count;
            }
            return parseFloat(maxCount);
        }
    }]);

    return BaseCanvas;
}();

exports.default = BaseCanvas;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2016/11/26.
 */

var GLIntensity = function () {
        function GLIntensity(options) {
                _classCallCheck(this, GLIntensity);

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

        _createClass(GLIntensity, [{
                key: "initPalette",
                value: function initPalette() {
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
        }, {
                key: "getColor",
                value: function getColor(value) {
                        var max = this.max;

                        if (value > max) {
                                value = max;
                        }

                        var index = Math.floor(value / max * (256 - 1)) * 4;

                        var imageData = this.paletteCtx.getImageData(0, 0, 256, 1).data;

                        return "rgba(" + imageData[index] + ", " + imageData[index + 1] + ", " + imageData[index + 2] + ", " + imageData[index + 3] / 256 + ")";
                }
        }, {
                key: "getSize",
                value: function getSize(value) {
                        var size = 0;
                        var max = this.max;
                        var maxSize = this.maxSize;

                        if (value > max) {
                                value = max;
                        }

                        size = value / max * maxSize;

                        return size;
                }
        }]);

        return GLIntensity;
}();

exports.default = GLIntensity;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Marker = function () {
    function Marker(options) {
        _classCallCheck(this, Marker);

        this.x = options.x;
        this.y = options.y;
        this.rotation = options.rotation;
        this.style = options.style;
        this.color = options.color;
        this.size = options.size;
        this.borderWidth = options.borderWidth;
        this.borderColor = options.borderColor;
        this.arrowSize = options.arrowSize;
    }

    _createClass(Marker, [{
        key: 'draw',
        value: function draw(context) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.rotation);

            context.lineWidth = this.borderWidth || 0;
            context.strokeStyle = this.borderColor || '#000';
            context.fillStyle = this.color || '#000';
            // 目前先只支持圆
            context.beginPath();
            if (this.style === 'circle') {
                context.arc(0, 0, this.arrowSize, 0, Math.PI * 2, false);
            } else if (this.style === 'arrow') {
                context.moveTo(-this.size, -this.size);
                context.lineTo(this.size, 0);
                context.lineTo(-this.size, this.size);
                context.lineTo(-this.size / 4, 0);
                context.lineTo(-this.size, -this.size);
            }
            context.closePath();
            context.stroke();
            context.fill();
            context.restore();
        }
    }]);

    return Marker;
}();

exports.default = Marker;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var util = {};

util.calculateColor = function (color, opacity) {
    if (color.indexOf('#') === 0) {
        var color16 = color.slice(1);
        var r = parseInt(color16.slice(0, 2), 16);
        var g = parseInt(color16.slice(2, 4), 16);
        var b = parseInt(color16.slice(4), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    } else if (/^rgb\(/.test(color)) {
        return color.replace(/rgb/, 'rgba').replace(')', ",") + opacity + ')';
    } else {
        return color;
    }
};

util.forEach = function (arr, cb, scope) {
    if (typeof Array.prototype.forEach === 'function') {
        arr.forEach(cb, scope);
    } else {
        for (var i = 0, len = arr.length; i < len; i++) {
            cb.apply(scope, [arr[i], i, arr]);
        }
    }
};
util.map = function (arr, cb, scope) {
    if (typeof Array.prototype.map === 'function') {
        return arr.map(cb, scope);
    } else {
        var mapped = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            mapped[i] = cb.apply(scope, [arr[i], i, arr]);
        }
        return mapped;
    }
};
exports.default = util;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author kyle / http://nikai.us/
 */

// import Event from "../utils/Event";


var GLDataSet = function () {
    function GLDataSet(data, options) {
        _classCallCheck(this, GLDataSet);

        this._options = options || {};
        this._data = []; // map with data indexed by id

        // add initial data when provided
        this._data = data;
    }

    _createClass(GLDataSet, [{
        key: 'add',
        value: function add(data, senderId) {
            if (Array.isArray(data)) {
                // Array
                for (var i = 0, len = data.length; i < len; i++) {
                    this._data.push(data[i]);
                }
            } else if (data instanceof Object) {
                // Single item
                this._data.push(data);
            } else {
                throw new Error('Unknown dataType');
            }
            // this.lnglatTransFormMercator();
        }
    }, {
        key: 'get',
        value: function get(args) {
            return this._data;
            // args = args || {};

            // //console.time('copy data time')
            // var start = new Date();
            // // TODO: 不修改原始数据，在数据上挂载新的名称，每次修改数据直接修改新名称下的数据，可以省去deepCopy
            // // var data = deepCopy(this._data);
            // var data = this._data;

            // //console.timeEnd('copy data time')

            // //console.time('transferCoordinate time')

            // var start = new Date();

            // if (args.filter) {
            //     var newData = [];
            //     for (var i = 0; i < data.length; i++) {
            //         if (args.filter(data[i])) {
            //             newData.push(data[i]);
            //         }
            //     }
            //     data = newData;
            // }

            // if (args.transferCoordinate) {
            //     data = this.transferCoordinate(data, args.transferCoordinate);
            // }

            // //console.timeEnd('transferCoordinate time')

            // return data;
        }
    }, {
        key: 'set',
        value: function set(data) {
            this.clear();
            this.add(data);
            this._trigger('change');
        }
    }, {
        key: 'clear',
        value: function clear(args) {
            this._data = []; // map with data indexed by id
        }
    }, {
        key: 'remove',
        value: function remove(args) {}
    }, {
        key: 'update',
        value: function update(args) {}
    }, {
        key: 'transferCoordinate',
        value: function transferCoordinate(data, transferFn) {
            for (var i = 0; i < data.length; i++) {

                var item = data[i];

                if (data[i].geometry) {

                    if (data[i].geometry.type === GL.GMVI.Geometry.Point) {
                        var coordinates = data[i].geometry.coordinates;
                        data[i].geometry._coordinates = transferFn(coordinates);
                    }

                    if (data[i].geometry.type === GL.GMVI.Geometry.Polygon || data[i].geometry.type === GL.GMVI.Geometry.MultiPolygon) {

                        var coordinates = data[i].geometry.coordinates;

                        if (data[i].geometry.type === GL.GMVI.Geometry.Polygon) {

                            var newCoordinates = getPolygon(coordinates);
                            data[i].geometry._coordinates = newCoordinates;
                        } else if (data[i].geometry.type === GL.Geomtry.MultiPolygon) {
                            var newCoordinates = [];
                            for (var c = 0; c < coordinates.length; c++) {
                                var polygon = coordinates[c];
                                var polygon = getPolygon(polygon);
                                newCoordinates.push(polygon);
                            }

                            data[i].geometry._coordinates = newCoordinates;
                        }
                    }

                    if (data[i].geometry.type === GL.Geomtry.LineString) {
                        var coordinates = data[i].geometry.coordinates;
                        var newCoordinates = [];
                        for (var j = 0; j < coordinates.length; j++) {
                            newCoordinates.push(transferFn(coordinates[j]));
                        }
                        data[i].geometry._coordinates = newCoordinates;
                    }
                }
            }

            function getPolygon(coordinates) {
                var newCoordinates = [];
                for (var c = 0; c < coordinates.length; c++) {
                    var coordinate = coordinates[c];
                    var newcoordinate = [];
                    for (var j = 0; j < coordinate.length; j++) {
                        newcoordinate.push(transferFn(coordinate[j]));
                    }
                    newCoordinates.push(newcoordinate);
                }
                return newCoordinates;
            }

            return data;
        }
    }, {
        key: 'initGeometry',
        value: function initGeometry(transferFn) {
            if (transferFn) {
                this._data.forEach(function (item) {
                    item.geometry = transferFn(item);
                });
            } else {
                this._data.forEach(function (item) {
                    if (!item.geometry && item.lng && item.lat) {
                        item.geometry = {
                            type: 'Point',
                            coordinates: [item.lng, item.lat]
                        };
                    }
                });
            }
        }
    }, {
        key: 'lnglatTransFormMercator',
        value: function lnglatTransFormMercator() {
            for (var i = 0; i < this._data.length; i++) {
                var coordinate = this._data[i].geometry.coordinates;
                var type = this._data[i].geometry.type;

                if (type == GL.GMVI.Geometry.Point) {
                    this._data[i].geometry.mercator_coordinates = proj4('EPSG:4326', 'EPSG:3857', coordinate);
                } else {
                    var mercator_coordinates = [];
                    for (var j = 0; j < coordinate.length; j++) {
                        var coord = coordinate[j];
                        mercator_coordinates.push(proj4('EPSG:4326', 'EPSG:3857', coord));
                    }
                    this._data[i].geometry.mercator_coordinates = mercator_coordinates;
                }
            }
        }
    }]);

    return GLDataSet;
}();

exports.default = GL.GMVI.DataSet = GLDataSet;
//
// function deepCopy(obj) {
//     var newObj;
//     if (typeof obj == 'object') {
//         newObj = obj instanceof Array ? [] : {};
//         for (var i in obj) {
//             newObj[i] = obj[i] instanceof HTMLElement ? obj[i] : deepCopy(obj[i]);
//         }
//     } else {
//         newObj = obj
//     }
//     return newObj;
// }

// export default DataSet;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import DataSet from "../../data/DataSet";

var SimplePath = function () {
    function SimplePath() {
        _classCallCheck(this, SimplePath);
    }

    _createClass(SimplePath, [{
        key: 'drawDataSet',
        value: function drawDataSet(context, dataSet, options) {
            var data = dataSet.get();
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                this.draw(context, item, options);
            }
        }
    }, {
        key: 'draw',
        value: function draw(context, data, options) {
            var type = data.geometry.type;
            if (type == GL.GMVI.Geometry.Polyline) type = GL.GMVI.Geometry.LineString;
            var xy = data.xy;
            var symbol = options.symbol || GL.GMVI.Geometry.Circle;
            switch (type) {
                case GL.GMVI.Geometry.Point:
                    var size = data._size || data.size || options._size || options.size || 12;
                    if (data.icon) size = Math.min(data.icon.width, data.icon.height) / 2;
                    context.moveTo(data.x, data.y);
                    if (options.symbol === GL.GMVI.Rect) {
                        context.rect(xy[0], xy[1], size, size);
                    } else {
                        context.arc(xy[0], xy[1], size, 0, Math.PI * 2);
                    }
                    break;
                case GL.GMVI.Geometry.Circle:
                    // var size=data.length;
                    // var xy=data.xy;
                    // context.arc(xy[0],xy[1], size, 0, Math.PI * 2);

                    this.drawPolygon(context, xy);
                    break;
                case GL.GMVI.Geometry.LineString:
                    context.lineWidth = options.lineWidth || 3;
                    for (var j = 0; j < xy.length; j++) {
                        var _xy = xy[j];
                        if (j == 0) {
                            context.moveTo(_xy[0], _xy[1]);
                        } else {
                            context.lineTo(_xy[0], _xy[1]);
                        }
                    }
                    break;
                case GL.GMVI.Geometry.Polygon:
                    this.drawPolygon(context, xy);
                    break;
                case GL.GMVI.Geometry.Rectangle:
                    var width = data.width,
                        height = data.height,
                        rotate = data.rotate || 0;
                    context.translate(xy[0], xy[1]);
                    context.rotate(rotate * Math.PI / 180);
                    context.translate(-xy[0], -xy[1]);
                    context.rect(xy[0] - width / 2, xy[1] - height / 2, width, height);
                    break;
                default:
                    console.error('type' + type + 'is not support now!');
                    break;
            }
        }
    }, {
        key: 'drawPolygon',
        value: function drawPolygon(context, xy) {
            var length = xy.length;
            for (var i = 0; i < xy.length; i++) {
                var _xy = xy[i];
                if (i == 0) {
                    context.moveTo(_xy[0], _xy[1]);
                } else {
                    context.lineTo(_xy[0], _xy[1]);
                }
                if (i == length - 1) {
                    context.lineTo(_xy[0], _xy[1]);
                }
            }
        }
    }, {
        key: 'drawArc',
        value: function drawArc(context, xy, options) {
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
            context.lineWidth = options.lineWidth || 3;

            context.beginPath();
            context.arc(centerX, centerY, radius, startAngle, endAngle, false);
            context.stroke();
            context.restore();
        }
    }]);

    return SimplePath;
}();

exports.default = new SimplePath();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Arc = function () {
    function Arc(options) {
        _classCallCheck(this, Arc);

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
        this.startLabel = options && options.labels && options.labels[0], this.endLabel = options && options.labels && options.labels[1], this.radius = radius;
        this.lineWidth = options.width || 1;
        this.strokeStyle = options.color || '#000';
        this.label = options.label;
        this.font = options.font;
        this.shadowBlur = options.shadowBlur;
    }

    _createClass(Arc, [{
        key: 'draw',
        value: function draw(context) {
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
                    var x = this.startX - 15;
                    var y = this.startY + 5;
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
    }]);

    return Arc;
}();

exports.default = Arc;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pulse = function () {
    function Pulse(options) {
        _classCallCheck(this, Pulse);

        this.x = options.x;
        this.y = options.y;
        this.maxRadius = options.radius;
        this.color = options.color;
        this.shadowBlur = 5;
        this.lineWidth = options.borderWidth;
        this.r = 0;
        this.factor = 2 / options.radius;
        this.font = options.font;
        this.name = options.name;
    }

    _createClass(Pulse, [{
        key: "draw",
        value: function draw(context) {
            var strokeColor = this.color;
            strokeColor = _utils2.default.calculateColor(strokeColor, 1 - this.r / this.maxRadius);
            if (this.name) {
                context.save();
                context.font = this.font;
                context.fillStyle = this.color;
                var width = context.measureText(this.name).width;
                context.fillText(this.name, this.x - width / 2, this.y);
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
            strokeColor = _utils2.default.calculateColor(strokeColor, 1 - this.r / this.maxRadius);
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
    }]);

    return Pulse;
}();

exports.default = Pulse;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var SphericalMercator = (function(){

// Closures including constants and other precalculated values.
var cache = {},
    EPSLN = 1.0e-10,
    D2R = Math.PI / 180,
    R2D = 180 / Math.PI,
    // 900913 properties.
    A = 6378137.0,
    MAXEXTENT = 20037508.342789244;

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

// SphericalMercator constructor: precaches calculations
// for fast tile lookups.
function SphericalMercator(options) {
    options = options || {};
    this.size = options.size || 256;
    if (!cache[this.size]) {
        var size = this.size;
        var c = cache[this.size] = {};
        c.Bc = [];
        c.Cc = [];
        c.zc = [];
        c.Ac = [];
        for (var d = 0; d < 30; d++) {
            c.Bc.push(size / 360);
            c.Cc.push(size / (2 * Math.PI));
            c.zc.push(size / 2);
            c.Ac.push(size);
            size *= 2;
        }
    }
    this.Bc = cache[this.size].Bc;
    this.Cc = cache[this.size].Cc;
    this.zc = cache[this.size].zc;
    this.Ac = cache[this.size].Ac;
};

// Convert lon lat to screen pixel value
//
// - `ll` {Array} `[lon, lat]` array of geographic coordinates.
// - `zoom` {Number} zoom level.
SphericalMercator.prototype.px = function(ll, zoom) {
  if (isFloat(zoom)) {
    var size = this.size * Math.pow(2, zoom);
    var d = size / 2;
    var bc = (size / 360);
    var cc = (size / (2 * Math.PI));
    var ac = size;
    var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
    var x = d + ll[0] * bc;
    var y = d + 0.5 * Math.log((1 + f) / (1 - f)) * -cc;
    (x > ac) && (x = ac);
    (y > ac) && (y = ac);
    //(x < 0) && (x = 0);
    //(y < 0) && (y = 0);
    return [x, y];
  } else {
    var d = this.zc[zoom];
    var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
    var x = Math.round(d + ll[0] * this.Bc[zoom]);
    var y = Math.round(d + 0.5 * Math.log((1 + f) / (1 - f)) * (-this.Cc[zoom]));
    (x > this.Ac[zoom]) && (x = this.Ac[zoom]);
    (y > this.Ac[zoom]) && (y = this.Ac[zoom]);
    //(x < 0) && (x = 0);
    //(y < 0) && (y = 0);
    return [x, y];
  }
};

// Convert screen pixel value to lon lat
//
// - `px` {Array} `[x, y]` array of geographic coordinates.
// - `zoom` {Number} zoom level.
SphericalMercator.prototype.ll = function(px, zoom) {
  if (isFloat(zoom)) {
    var size = this.size * Math.pow(2, zoom);
    var bc = (size / 360);
    var cc = (size / (2 * Math.PI));
    var zc = size / 2;
    var g = (px[1] - zc) / -cc;
    var lon = (px[0] - zc) / bc;
    var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
    return [lon, lat];
  } else {
    var g = (px[1] - this.zc[zoom]) / (-this.Cc[zoom]);
    var lon = (px[0] - this.zc[zoom]) / this.Bc[zoom];
    var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
    return [lon, lat];
  }
};

// Convert tile xyz value to bbox of the form `[w, s, e, n]`
//
// - `x` {Number} x (longitude) number.
// - `y` {Number} y (latitude) number.
// - `zoom` {Number} zoom.
// - `tms_style` {Boolean} whether to compute using tms-style.
// - `srs` {String} projection for resulting bbox (WGS84|900913).
// - `return` {Array} bbox array of values in form `[w, s, e, n]`.
SphericalMercator.prototype.bbox = function(x, y, zoom, tms_style, srs) {
    // Convert xyz into bbox with srs WGS84
    if (tms_style) {
        y = (Math.pow(2, zoom) - 1) - y;
    }
    // Use +y to make sure it's a number to avoid inadvertent concatenation.
    var ll = [x * this.size, (+y + 1) * this.size]; // lower left
    // Use +x to make sure it's a number to avoid inadvertent concatenation.
    var ur = [(+x + 1) * this.size, y * this.size]; // upper right
    var bbox = this.ll(ll, zoom).concat(this.ll(ur, zoom));

    // If web mercator requested reproject to 900913.
    if (srs === '900913') {
        return this.convert(bbox, '900913');
    } else {
        return bbox;
    }
};

// Convert bbox to xyx bounds
//
// - `bbox` {Number} bbox in the form `[w, s, e, n]`.
// - `zoom` {Number} zoom.
// - `tms_style` {Boolean} whether to compute using tms-style.
// - `srs` {String} projection of input bbox (WGS84|900913).
// - `@return` {Object} XYZ bounds containing minX, maxX, minY, maxY properties.
SphericalMercator.prototype.xyz = function(bbox, zoom, tms_style, srs) {
    // If web mercator provided reproject to WGS84.
    if (srs === '900913') {
        bbox = this.convert(bbox, 'WGS84');
    }

    var ll = [bbox[0], bbox[1]]; // lower left
    var ur = [bbox[2], bbox[3]]; // upper right
    var px_ll = this.px(ll, zoom);
    var px_ur = this.px(ur, zoom);
    // Y = 0 for XYZ is the top hence minY uses px_ur[1].
    var x = [ Math.floor(px_ll[0] / this.size), Math.floor((px_ur[0] - 1) / this.size) ];
    var y = [ Math.floor(px_ur[1] / this.size), Math.floor((px_ll[1] - 1) / this.size) ];
    var bounds = {
        minX: Math.min.apply(Math, x) < 0 ? 0 : Math.min.apply(Math, x),
        minY: Math.min.apply(Math, y) < 0 ? 0 : Math.min.apply(Math, y),
        maxX: Math.max.apply(Math, x),
        maxY: Math.max.apply(Math, y)
    };
    if (tms_style) {
        var tms = {
            minY: (Math.pow(2, zoom) - 1) - bounds.maxY,
            maxY: (Math.pow(2, zoom) - 1) - bounds.minY
        };
        bounds.minY = tms.minY;
        bounds.maxY = tms.maxY;
    }
    return bounds;
};

// Convert projection of given bbox.
//
// - `bbox` {Number} bbox in the form `[w, s, e, n]`.
// - `to` {String} projection of output bbox (WGS84|900913). Input bbox
//   assumed to be the "other" projection.
// - `@return` {Object} bbox with reprojected coordinates.
SphericalMercator.prototype.convert = function(bbox, to) {
    if (to === '900913') {
        return this.forward(bbox.slice(0, 2)).concat(this.forward(bbox.slice(2,4)));
    } else {
        return this.inverse(bbox.slice(0, 2)).concat(this.inverse(bbox.slice(2,4)));
    }
};

// Convert lon/lat values to 900913 x/y.
SphericalMercator.prototype.forward = function(ll) {
    var xy = [
        A * ll[0] * D2R,
        A * Math.log(Math.tan((Math.PI*0.25) + (0.5 * ll[1] * D2R)))
    ];
    // if xy value is beyond maxextent (e.g. poles), return maxextent.
    (xy[0] > MAXEXTENT) && (xy[0] = MAXEXTENT);
    (xy[0] < -MAXEXTENT) && (xy[0] = -MAXEXTENT);
    (xy[1] > MAXEXTENT) && (xy[1] = MAXEXTENT);
    (xy[1] < -MAXEXTENT) && (xy[1] = -MAXEXTENT);
    return xy;
};

// Convert 900913 x/y values to lon/lat.
SphericalMercator.prototype.inverse = function(xy) {
    return [
        (xy[0] * R2D / A),
        ((Math.PI*0.5) - 2.0 * Math.atan(Math.exp(-xy[1] / A))) * R2D
    ];
};

return SphericalMercator;

})();

if (true) {
    module.exports = exports = SphericalMercator;
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2016/11/28.
 */

var GLCanvas = function GLCanvas(el, options) {
    _classCallCheck(this, GLCanvas);

    var el = document.getElementById(el);
};

exports.default = GLCanvas;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _Marker = __webpack_require__(2);

var _Marker2 = _interopRequireDefault(_Marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spark = function () {
    function Spark(options) {
        _classCallCheck(this, Spark);

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
        this.factor = options.speed / this.radius;
        this.deltaAngle = 80 / Math.min(this.radius, 400) / this.tailPointsCount;
        this.trailAngle = this.startAngle;
        this.arcAngle = this.startAngle;
        this.arrowSize = options.arrowSize || 3;

        this.animateBlur = true;

        this.marker = new _Marker2.default({
            x: 50,
            y: 80,
            rotation: 50 * Math.PI / 180,
            style: 'arrow',
            color: 'rgb(255, 255, 255)',
            size: this.arrowSize,
            borderWidth: 0,
            borderColor: this.strokeStyle,
            arrowSize: options.arrowSize || 5
        });
    }

    _createClass(Spark, [{
        key: "drawArc",
        value: function drawArc(context, strokeColor, lineWidth, startAngle, endAngle) {
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
    }, {
        key: "draw",
        value: function draw(context) {
            var endAngle = this.endAngle;
            // 匀速
            var angle = this.trailAngle + this.factor;
            var strokeColor = this.strokeStyle;
            if (this.animateBlur) {
                this.arcAngle = angle;
            }
            this.trailAngle = angle;
            strokeColor = _utils2.default.calculateColor(strokeColor, 0.1);

            this.drawArc(context, strokeColor, this.lineWidth, this.startAngle, this.arcAngle);

            // 拖尾效果
            var count = this.tailPointsCount;
            for (var i = 0; i < count; i++) {
                var arcColor = _utils2.default.calculateColor(this.strokeStyle, 0.3 - 0.3 / count * i);
                var tailLineWidth = 4;
                if (this.trailAngle - this.deltaAngle * i > this.startAngle) {
                    this.drawArc(context, arcColor, tailLineWidth - tailLineWidth / count * i, this.trailAngle - this.deltaAngle * i, this.trailAngle);
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
    }]);

    return Spark;
}();

exports.default = Spark;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);

__webpack_require__(4);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(17);

__webpack_require__(18);

__webpack_require__(19);

__webpack_require__(20);

__webpack_require__(22);

var _version = __webpack_require__(46);

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//命名空间
GL.GMVI.OPTION = {
    size: 5,
    id: 'UUID', // 图层主键(若不设置为GL.H.uuid())
    fillStyle: 'rgba(200, 200, 50, 1)', // 填充颜色，绘制点，多边形，圆等会用到
    strokeStyle: 'rgba(0, 0, 255, 1)', // 描边颜色，绘制线路时用到
    lineWidth: 4, // 描边宽度
    globalAlpha: 1, // 透明度
    globalCompositeOperation: 'lighter', // 颜色叠加方式
    shadowColor: 'rgba(255, 255, 255, 1)', // 投影颜色
    shadowBlur: 35, // 投影模糊级数
    maxSize: 20, //最大值，绘制气泡等图形时要限制最大值
    max: 100, //最大值，count的最大值
    splitList: [{
        start: 0,
        end: 2,
        color: 'color'
    }, {
        start: 3,
        end: 4,
        color: 'color'
    }, {
        start: 5,
        end: 6,
        color: 'color'
    }], //count区间和对应的颜色值
    gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" }, //比例值和对应的颜色值
    maxClusterLv: 3, //最大的聚合层级的值，当绘制聚合图层时需要使用
    showText: true, //是否显示文字
    font: '18px sans-serif', //标注字体样式
    symbol: 'rect', //点的标志，默认是绘制圆，指定后可以绘制矩形
    animation: {
        type: 'time', // 按时间展示动画
        stepsRange: { // 动画时间范围,time字段中值
            start: 0,
            end: 100
        },
        trails: 10, // 时间动画的拖尾大小
        duration: 5 // 单个动画的时间，单位秒
    },
    arrowSize: 10, //箭头的大小
    draw: 'simple||bubble||intensity||category||choropleth||effect|| heatmap||grid||honeycomb||text||icon||cluster||tagcloud||migrate|| waterbubble||radial||star||arrow||scatter||migrateLines'
    //绘制类型 ,只有CanvasLayer支持该配置，其他两个图层(WebGlLayer,WebGlHeatLayer)不支持
};

var name = _version2.default.id;
var version = _version2.default.version;
var date = _version2.default.date;
var descript = name + ": " + version + " Built by Iverson.hu,  [" + date + "]";

GL.GMVI.VERSION = descript;
GL.GMVI.toString = function () {
    return GL.GMVI.VERSION;
};
if (!window.maptalks) {
    throw new Error("not find maptalks lib");
}
if (window.maptalks) {
    window.maptalks.GMVI = GL.GMVI;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
全局常量
 */

var GL = window.GL || {};
window.GL = GL;
GL.GMVI = window.GL.GMVI || {};
GL.GMVI.Geometry = GL.GMVI.Geometry || {};
GL.GMVI.Geometry.LineString = 'LineString';
GL.GMVI.Geometry.Point = 'Point';
GL.GMVI.Geometry.Polyline = 'Polyline';
GL.GMVI.Geometry.Polygon = 'Polygon';
GL.GMVI.Geometry.Rectangle = 'Rectangle';
GL.GMVI.Geometry.Circle = 'Circle';
GL.GMVI.Geometry.MultiPolygon = 'MultiPolygon';

GL.GMVI.Circle = 'circle';
GL.GMVI.Rect = 'rect';
GL.GMVI.Bubble = 'bubble';
GL.GMVI.Intensity = 'intensity';
GL.GMVI.Category = 'category';
GL.GMVI.Choropleth = 'choropleth';
GL.GMVI.Simple = 'simple';
GL.GMVI.Effect = 'effect';
GL.GMVI.Heatmap = 'heatmap';
GL.GMVI.Grid = 'grid';
GL.GMVI.Honeycomb = 'honeycomb';
GL.GMVI.Text = 'text';
GL.GMVI.Icon = 'icon';
GL.GMVI.Cluster = 'cluster';
GL.GMVI.TagCloud = "tagcloud";
GL.GMVI.Webgl = 'webgl';
GL.GMVI.Migrate = 'migrate';
GL.GMVI.Bar = 'bar';
GL.GMVI.WaterBubble = 'waterbubble';
GL.GMVI.Radiation = 'radiation';
GL.GMVI.Radial = 'radial';
GL.GMVI.Star = 'star';
GL.GMVI.Percent = 'percent';
GL.GMVI.Video = 'video';
GL.GMVI.Scatter = 'scatter';
GL.GMVI.MigrateLines = 'migrateLines';
GL.GMVI.Arrow = 'arrow';

var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
GL.GMVI.uuid = function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ID';

    var uuid = new Array(36),
        rnd = 0,
        r = void 0;
    for (var i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid[i] = '-';
        } else if (i === 14) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = CHARS[i === 19 ? r & 0x3 | 0x8 : r];
        }
    }
    return prefix + '-' + uuid.join('');
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Administrator on 2016/11/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _GLDataSet = __webpack_require__(4);

var _GLDataSet2 = _interopRequireDefault(_GLDataSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLCsv = function () {
    function GLCsv() {
        _classCallCheck(this, GLCsv);
    }

    _createClass(GLCsv, [{
        key: "CSVToArray",
        value: function CSVToArray(strData, strDelimiter) {
            strDelimiter = strDelimiter || ",";
            var objPattern = new RegExp("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + strDelimiter + "\\r\\n]*))", "gi");
            var arrData = [[]];
            var arrMatches = null;
            while (arrMatches = objPattern.exec(strData)) {
                var strMatchedDelimiter = arrMatches[1];
                if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
                    arrData.push([]);
                }

                var strMatchedValue;
                if (arrMatches[2]) {
                    strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
                } else {
                    strMatchedValue = arrMatches[3];
                }
                arrData[arrData.length - 1].push(strMatchedValue);
            }
            return arrData;
        }
    }, {
        key: "getDataSet",
        value: function getDataSet(csvStr) {
            var arr = this.CSVToArray(csvStr, ',');
            var data = [];
            var header = arr[0];
            for (var i = 1; i < arr.length - 1; i++) {
                var line = arr[i];
                var item = {};
                for (var j = 0; j < line.length; j++) {
                    var value = line[j];
                    if (header[j] == 'geometry') {
                        value = JSON.parse(value);
                    }
                    item[header[j]] = value;
                }
                data.push(item);
            }
            return new _GLDataSet2.default(data);
        }
    }]);

    return GLCsv;
}();

exports.default = GL.GMVI.Csv = GLCsv;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Administrator on 2016/11/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _GLDataSet = __webpack_require__(4);

var _GLDataSet2 = _interopRequireDefault(_GLDataSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLGeoJson = function () {
    function GLGeoJson() {
        _classCallCheck(this, GLGeoJson);
    }

    _createClass(GLGeoJson, [{
        key: "getDataSet",
        value: function getDataSet(geoJson) {

            var data = [];
            var features = geoJson.features;
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                var geometry = feature.geometry;
                var properties = feature.properties;
                var item = {};
                for (var key in properties) {
                    item[key] = properties[key];
                }
                item.geometry = geometry;
                data.push(item);
            }
            return new _GLDataSet2.default(data);
        }
    }]);

    return GLGeoJson;
}();

exports.default = GL.GMVI.GeoJson = new GLGeoJson();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Blue on 2017/2/21.
 */
GL.GMVI.ClusterUtil = {
    cluster: function cluster(data, zoom, maxClusterLv, minx, miny, maxx, maxy, width, height) {
        // console.log('cluster...');

        var gridClusters = new GL.GMVI.ClusterUtil.Grid.GridCell([minx, miny, maxx, maxy], [width, height]);
        var ungridClusters = [];
        this.filter(data, minx, maxx, miny, maxy, gridClusters, ungridClusters, zoom < maxClusterLv);
        var cluster = this.merge(ungridClusters, gridClusters);
        gridClusters = null;
        var object = { discrete: ungridClusters, cluster: cluster };
        return object;
    },

    filter: function filter(data, minx, maxx, miny, maxy, gridClusters, ungridClusters, iscluster) {
        // var gridmsg = 'grid cluster cost';
        // console.time(gridmsg);

        var i = 0,
            len = data.length;
        for (; i < len; i++) {
            var lng = data[i][0];
            var lat = data[i][1];
            var num = data[i][2];
            var obj = data[i][3];
            if (lng < minx || lng > maxx || lat < miny || lat > maxy) continue;

            if (!iscluster) {
                ungridClusters.push([lng, lat, num, obj]);
                continue;
            }
            gridClusters.add(lng, lat, num, obj);
        }
        // console.timeEnd(gridmsg);
    },

    merge: function merge(ungridClusters, gridClusters) {
        // var gridmsg = 'merge cluster cost';
        // console.time(gridmsg);

        var grid = gridClusters.grid;
        var resultIds = [];
        for (var id in grid) {
            if (grid[id]._calculated === 1) continue;
            grid[id]._calculated = 1;

            var rc = id.split('-');
            var row = rc[0];
            var col = rc[1];
            var center = grid[id].center;

            var vminx = center[0] - gridClusters.perLng / 2,
                vmaxx = center[0] + gridClusters.perLng / 2;
            var vminy = center[1] - gridClusters.perLat / 2,
                vmaxy = center[1] + gridClusters.perLat / 2;

            var mergedId = [id];
            var nearGridIds = this.getNearGrid(row, col);
            for (var idx = 0, length = nearGridIds.length; idx < length; idx++) {
                var gridId = nearGridIds[idx];
                if (grid[gridId] === undefined) continue;
                if (grid[gridId]._calculated) continue;

                var center2 = grid[gridId].center;
                if (center2[0] > vminx && center2[0] < vmaxx && center2[1] > vminy && center2[1] < vmaxy) {
                    grid[gridId]._calculated = 1;
                    mergedId.push(gridId);
                }
            }
            resultIds.push(mergedId);
        }

        var resultGirdClusters = {};
        for (var i = 0, len = resultIds.length; i < len; i++) {
            var mids = resultIds[i];
            var rid = mids.join('-');
            resultGirdClusters[rid] = { count: 0, item: [], center: null };

            for (var j = 0, len2 = mids.length; j < len2; j++) {
                var mid = mids[j];
                resultGirdClusters[rid].count += grid[mid].count;
                resultGirdClusters[rid].item = resultGirdClusters[rid].item.concat(grid[mid].item);
                if (resultGirdClusters[rid].center == null) {
                    resultGirdClusters[rid].center = grid[mid].center;
                    continue;
                }
                var lng = (resultGirdClusters[rid].center[0] + grid[mid].center[0]) / 2;
                var lat = (resultGirdClusters[rid].center[1] + grid[mid].center[1]) / 2;
                resultGirdClusters[rid].center = [lng, lat];
            }
        }

        for (var fid in resultGirdClusters) {
            if (resultGirdClusters[fid].count < 3) {
                ungridClusters = ungridClusters.concat(resultGirdClusters[fid].item);
                delete resultGirdClusters[fid];
            }
        }

        // console.timeEnd(gridmsg);
        return resultGirdClusters;
    },

    getNearGrid: function getNearGrid(row, col) {
        var topGridId1 = row + 1 + '-' + (col - 1);
        var topGridId2 = row + 1 + '-' + col;
        var topGridId3 = row + 1 + '-' + (col + 1);
        var bottomGridId1 = row - 1 + '-' + (col - 1);
        var bottomGridId2 = row - 1 + '-' + col;
        var bottomGridId3 = row - 1 + '-' + (col + 1);
        var leftGridId = row + '-' + (col - 1);
        var rightGridId = row + '-' + (col + 1);
        return [topGridId1, topGridId2, topGridId3, bottomGridId1, bottomGridId2, bottomGridId3, leftGridId, rightGridId];
    }
};

/**
 * Created by Blue on 2017/2/21.
 */

GL.GMVI.ClusterUtil.Grid = {
    GridCell: function GridCell(env, wh, cr) {
        cr = cr || 100;
        var rowNum = Math.ceil((wh[1] / cr).toFixed(2));
        var colNum = Math.ceil((wh[0] / cr).toFixed(2));

        this.size = cr;
        this.minLng = env[0];
        this.perLng = (env[2] - env[0]) / colNum;
        this.minLat = env[1];
        this.perLat = (env[3] - env[1]) / rowNum;

        this.grid = {};

        this.add = function (lng, lat, num) {
            var row = Math.ceil(((lat - this.minLat) / this.perLat).toFixed(2));
            var col = Math.ceil(((lng - this.minLng) / this.perLng).toFixed(2));

            var id = row + '-' + col;
            this.grid[id] = this.grid[id] || { item: [], count: 0, center: [lng, lat] };

            var count = this.grid[id].count + 1 * num;
            var center = [(this.grid[id].center[0] + lng) / 2, (this.grid[id].center[1] + lat) / 2];

            this.grid[id].count = count;
            this.grid[id].center = center;
            this.grid[id].item.push([lng, lat, num]);
        };
    }

};

/**
 * Created by Blue on 2017/2/21.
 */
GL.GMVI.ClusterUtil.Util = {
    generate: function generate(len) {
        var num = len;
        var list = [];
        var center = [31.30115627, 120.58105869];
        var msg = 'prepare ' + len + 'w test data cost';

        console.time(msg);
        for (var i = 0; i < num; i++) {
            var lng = center[1] + Math.random() * 0.5;
            var lat = center[0] + Math.random() * 0.5;
            list.push([lng, lat, parseInt(1 + Math.random() * 100)]);
        }
        console.timeEnd(msg);
        return list;
    },
    getScale: function getScale(minLng, maxLng, minLat, maxLat, width, height) {
        var scaleX = (maxLng - minLng) * 3600 / width;
        var scaleY = (maxLat - minLat) * 3600 / height;
        return [scaleX, scaleY];
    },
    toPixel: function toPixel(scale, lng, lat, minlng, maxlat) {
        var x = (lng - minlng) * 3600.0 / scale[0];
        var y = (maxlat - lat) * 3600.0 / scale[1];
        return [x, y];
    },
    toLnglat: function toLnglat(scale, x, y, minlng, maxlat) {
        var lng = x * scale[0] / 3600.0 + minlng;
        var lat = maxlat - y * scale[1] / 3600.0;
        return [lng, lat];
    }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import { randomBytes } from 'crypto';

var GridSize = 100;

var MINLNG = -179;
var MAXLNG = 179;
var MINLAT = -89;
var MAXLAT = 89;

var MECATORMINLNG = -19926188.851995967;
var MECATORMAXLNG = 19926188.851995967;
var MECATORMINLAT = -20037508.342789244;
var MECATORMAXLAT = 20037508.342789244;

var EPSG3857 = "EPSG:3857";

var SphericalMercator = __webpack_require__(8);
var merc = new SphericalMercator({
    size: 256
});

GL.GMVI.SuperCluster = function (data, zoom, maxClusterLv, minx, miny, maxx, maxy, width, heigh, crsCode) {
    if (EPSG3857 === crsCode) return mecatorCluster(data, zoom, maxClusterLv, minx, miny, maxx, maxy, width, heigh);
    return cluster(data, zoom, maxClusterLv, minx, miny, maxx, maxy, width, heigh);
};

function cluster(data, zoom, maxClusterLv, minx, miny, maxx, maxy, width, heigh) {
    var xAverage = width / (maxx - minx); //单位经度对应的像素个数
    var yAverage = heigh / (maxy - miny); //单位纬度对应的像素个数
    var lngAverage = (maxx - minx) / width;
    var latAverage = (maxy - miny) / heigh;
    var result = {};
    var rangleData = [];
    for (var i = 0; i < data.length; i++) {
        var element = data[i];
        var geometry = element.geometry;
        if (geometry.type == GL.GMVI.Geometry.Point) {
            var coordinates = geometry.coordinates;
            var lng = parseFloat(coordinates[0]),
                lat = parseFloat(coordinates[1]);
            if (minx <= lng && lng <= maxx && miny <= lat && lat <= maxy) rangleData.push(element);
        }
    }

    if (zoom > maxClusterLv) {
        var clusterGrid = [];
        var unClusterGrid = [];
        rangleData.forEach(function (element) {
            var geometry = element.geometry;
            if (geometry.type == GL.GMVI.Geometry.Point) {
                var coordinates = geometry.coordinates;
                var lng = parseFloat(coordinates[0]),
                    lat = parseFloat(coordinates[1]);
                var grid = { count: 1, center: [lng, lat], item: element };
                var x = (lng - minx) * xAverage;
                var y = heigh - (lat - miny) * yAverage;
                grid.xy = [x, y];
                unClusterGrid.push(grid);
            }
        });

        result["clusters"] = clusterGrid;
        result["unClusters"] = unClusterGrid;
        return result;
    }
    var rowsList = [],
        colList = [],
        gridList = [],
        grids = {};
    var c = 0;
    var r = 0;
    while (true) {
        if ((r + 1) * GridSize * latAverage + MINLAT >= miny) {
            rowsList.push(r);
        }
        if ((r + 1) * GridSize * latAverage + MINLAT >= maxy) {
            break;
        }
        r++;
    }
    while (true) {
        if ((c + 1) * GridSize * lngAverage + MINLNG >= minx) {
            colList.push(c);
        }
        if ((c + 1) * GridSize * lngAverage + MINLNG >= maxx) {
            break;
        }
        c++;
    }
    var rowColList = [];
    for (var i = 0; i < rowsList.length; i++) {
        var row = rowsList[i];
        var rowCol = [];
        for (var j = 0; j < colList.length; j++) {
            var col = colList[j];
            var grid = { gridIndex: row + '-' + col };
            if (!grids[row]) {
                grids[row] = {};
            }
            grids[row][col] = grid;
            rowCol.push([row, col]);
        }
        rowColList.push(rowCol);
    }
    for (var i = 0; i < rangleData.length; i++) {
        var element = rangleData[i];
        var geometry = element.geometry;
        if (geometry.type !== GL.GMVI.Geometry.Point) continue;
        var coordinates = geometry.coordinates;
        var lng = parseFloat(coordinates[0]),
            lat = parseFloat(coordinates[1]);
        var row = parseInt((lat - MINLAT) / (latAverage * GridSize));
        var col = parseInt((lng - MINLNG) / (lngAverage * GridSize));
        if (!grids[row]) console.error(row, 'is error');
        if (!grids[row][col]) console.error(col, 'is error');
        var grid = grids[row][col];
        if (!grid.center) {
            grid.center = [lng, lat]; //(new double[]{lng,lat});
            grid.count = 1;
            var x = (lng - minx) * xAverage;
            var y = heigh - (lat - miny) * yAverage;
            grid.xy = [x, y];
            grid.item = element;
            grids[row][col] = grid;
        } else {
            grids[row][col].count = grids[row][col].count + 1;
        }
    }
    rowColList.forEach(function (rowCol) {
        rowCol.forEach(function (rc) {
            var row = rc[0],
                col = rc[1];
            gridList.push(grids[row][col]);
        });
    });
    var IdMap = {},
        NearGridList = [];
    while (true) {
        getNearGridList(gridList, IdMap, NearGridList, minx, miny, xAverage, yAverage, heigh, false);
        if (NearGridList.length == 0) break;
        gridList = gridList.concat(NearGridList);
        NearGridList = [];
    }
    var clusterGrid = [],
        unClusterGrid = [];
    for (var i = 0; i < gridList.length; i++) {
        var grid = gridList[i];
        var id = grid.gridIndex;
        if (IdMap[id]) continue;
        var count = grid.count;
        if (count == 1) {
            unClusterGrid.push(grid);
        }
        if (count > 1) {
            clusterGrid.push(grid);
        }
    }
    result["clusters"] = clusterGrid;
    result["unClusters"] = unClusterGrid;
    return result;
}

function getNearGridList(gridList, IdMap, NearGridList, minx, miny, xAverage, yAverage, heigh, isMecator) {
    for (var row = 0; row < gridList.length; row++) {
        var rowGrid = gridList[row];
        var id = rowGrid['gridIndex'];
        if (IdMap[id] != undefined) continue;
        // if(rowGrid.count<2) continue;
        var lnglat = rowGrid.center;
        if (lnglat == null) continue;
        var lng = lnglat[0],
            lat = lnglat[1];
        var xy = rowGrid.xy;
        var x = xy[0],
            y = xy[1];
        for (var col = 0; col < gridList.length; col++) {
            var colGrid = gridList[col];
            // if(colGrid.count<2) continue;
            var id1 = colGrid.gridIndex;
            if (IdMap[id1] != undefined || id === id1 || IdMap[id] != undefined) continue;
            var lnglat1 = colGrid.center;
            if (lnglat1 == null) continue;
            var lng1 = lnglat1[0],
                lat1 = lnglat1[1];
            var xy1 = colGrid.xy;
            var x1 = xy1[0],
                y1 = xy1[1];
            if (Math.sqrt(Math.pow(y1 - y, 2) + Math.pow(x1 - x, 2)) <= 50) {
                // console.log(id,id1,rowGrid.count,colGrid.count);
                var grid = {};
                grid.center = [(lng + lng1) / 2, (lat + lat1) / 2];
                grid.count = rowGrid.count + colGrid.count;
                // console.log(grid.count);
                grid.gridIndex = GL.GMVI.uuid();
                var ax, ay;
                if (isMecator) {
                    var mlnglat = merc.forward([lng, lat]);
                    var mlnglat1 = merc.forward([lng1, lat1]);
                    ax = ((mlnglat[0] + mlnglat1[0]) / 2 - minx) * xAverage;
                    ay = heigh - ((mlnglat[1] + mlnglat1[1]) / 2 - miny) * yAverage;
                } else {
                    ax = ((lng + lng1) / 2 - minx) * xAverage;
                    ay = heigh - ((lat + lat1) / 2 - miny) * yAverage;
                }
                grid.xy = [ax, ay];
                NearGridList.push(grid);
                IdMap[id] = id;
                IdMap[id1] = id1;
            }
        }
    }
}

function mecatorCluster(data, zoom, maxClusterLv, minx, miny, maxx, maxy, width, heigh) {
    // console.log(minx,miny,maxx,maxy);
    var minxy = merc.forward([minx, miny]);
    var maxxy = merc.forward([maxx, maxy]);
    minx = minxy[0];miny = minxy[1];maxx = maxxy[0];maxy = maxxy[1];
    // width=(maxx-minx)/width*(MECATORMAXLNG-MECATORMINLNG);
    // heigh=(maxy-miny)/heigh*(MECATORMAXLAT-MECATORMINLAT);
    // minx=-180,maxx=180,miny=-90,maxy=90;
    // minxy=  merc.forward([minx,miny]);
    // maxxy= merc.forward([maxx,maxy]);
    // minx=minxy[0];miny=minxy[1];maxx=maxxy[0];maxy=maxxy[1];
    var xAverage = width / (maxx - minx);
    var yAverage = heigh / (maxy - miny);
    var lngAverage = (maxx - minx) / width;
    var latAverage = (maxy - miny) / heigh;

    var result = {};
    var rangleData = [];

    data.forEach(function (element) {
        var geometry = element.geometry;
        if (geometry.type == GL.GMVI.Geometry.Point) {
            var mercatormeters = geometry.mercatormeters;
            var lng = parseFloat(mercatormeters[0]),
                lat = parseFloat(mercatormeters[1]);
            if (minx <= lng && lng <= maxx && miny <= lat && lat <= maxy) rangleData.push(element);
        }
    });
    if (zoom > maxClusterLv) {
        var clusterGrid = [];
        var unClusterGrid = [];
        rangleData.forEach(function (element) {
            var geometry = element.geometry;
            if (geometry.type == GL.GMVI.Geometry.Point) {
                var coordinates = geometry.coordinates;
                var mercatormeters = geometry.mercatormeters;
                var lng = parseFloat(coordinates[0]),
                    lat = parseFloat(coordinates[1]);
                var mlng = mercatormeters[0],
                    mlat = mercatormeters[1];
                var grid = { count: 1, center: [lng, lat], item: element };
                var x = (mlng - minx) * xAverage;
                var y = heigh - (mlat - miny) * yAverage;
                grid.xy = [x, y];
                unClusterGrid.push(grid);
            }
        });
        result["clusters"] = clusterGrid;
        result["unClusters"] = unClusterGrid;
        return result;
    }

    var rowsList = [],
        colList = [],
        gridList = [],
        grids = {};
    var c = 0;
    var r = 0;
    while (true) {
        if ((r + 1) * GridSize * latAverage + MECATORMINLAT >= miny) {
            rowsList.push(r);
        }
        if ((r + 1) * GridSize * latAverage + MECATORMINLAT >= maxy) {
            break;
        }
        r++;
    }
    while (true) {
        if ((c + 1) * GridSize * lngAverage + MECATORMINLNG >= minx) {
            colList.push(c);
        }
        if ((c + 1) * GridSize * lngAverage + MECATORMINLNG >= maxx) {
            break;
        }
        c++;
    }
    var rowColList = [];
    for (var i = 0; i < rowsList.length; i++) {
        var row = rowsList[i];
        var rowCol = [];
        for (var j = 0; j < colList.length; j++) {
            var col = colList[j];
            var grid = { gridIndex: row + '-' + col };
            if (!grids[row]) {
                grids[row] = {};
            }
            grids[row][col] = grid;
            rowCol.push([row, col]);
        }
        rowColList.push(rowCol);
    }
    for (var i = 0; i < rangleData.length; i++) {
        var element = rangleData[i];
        var geometry = element.geometry;
        if (geometry.type !== GL.GMVI.Geometry.Point) continue;
        var mercatormeters = geometry.mercatormeters;
        var coordinates = geometry.coordinates;
        var lng = parseFloat(coordinates[0]),
            lat = parseFloat(coordinates[1]);
        var mlng = mercatormeters[0],
            mlat = mercatormeters[1];
        var row = parseInt((mlat - MECATORMINLAT) / (latAverage * GridSize));
        var col = parseInt((mlng - MECATORMINLNG) / (lngAverage * GridSize));
        if (!grids[row]) console.error(row, 'is error');
        if (!grids[row][col]) console.error(col, 'is error');
        var grid = grids[row][col];
        if (!grid.center) {
            grid.center = [lng, lat]; //(new double[]{lng,lat});
            grid.count = 1;
            var x = (mlng - minx) * xAverage;
            var y = heigh - (mlat - miny) * yAverage;
            grid.xy = [x, y];
            grid.item = element;
            grids[row][col] = grid;
        } else {
            grids[row][col].count = grids[row][col].count + 1;
        }
    }

    rowColList.forEach(function (rowCol) {
        rowCol.forEach(function (rc) {
            var row = rc[0],
                col = rc[1];
            var grid = grids[row][col];
            if (grid.center != undefined) gridList.push(grids[row][col]);
        });
    });

    var IdMap = {},
        NearGridList = [];
    while (true) {
        getNearGridList(gridList, IdMap, NearGridList, minx, miny, xAverage, yAverage, heigh, true);
        if (NearGridList.length == 0) break;
        gridList = gridList.concat(NearGridList);
        NearGridList = [];
    }
    // var total=0;
    // gridList.forEach(element=>{
    //     var c=element.count||0;
    //     total+=c;

    // })
    // console.log(total);
    var clusterGrid = [],
        unClusterGrid = [];
    for (var i = 0; i < gridList.length; i++) {
        var grid = gridList[i];
        var id = grid.gridIndex;
        if (IdMap[id]) continue;
        var count = grid.count;
        if (count == 1) {
            unClusterGrid.push(grid);
        }
        if (count > 1) {
            clusterGrid.push(grid);
        }
    }
    result["clusters"] = clusterGrid;
    result["unClusters"] = unClusterGrid;
    return result;
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cityCenter = { municipalities: [{ n: "北京", g: "116.395645,39.929986|12" }, { n: "上海", g: "121.487899,31.249162|12" }, { n: "天津", g: "117.210813,39.14393|12" }, { n: "重庆", g: "106.530635,29.544606|12" }], provinces: [{ n: "安徽", g: "117.216005,31.859252|8", cities: [{ n: "合肥", g: "117.282699,31.866942|12" }, { n: "安庆", g: "117.058739,30.537898|13" }, { n: "蚌埠", g: "117.35708,32.929499|13" }, { n: "亳州", g: "115.787928,33.871211|13" }, { n: "巢湖", g: "117.88049,31.608733|13" }, { n: "池州", g: "117.494477,30.660019|14" }, { n: "滁州", g: "118.32457,32.317351|13" }, { n: "阜阳", g: "115.820932,32.901211|13" }, { n: "淮北", g: "116.791447,33.960023|13" }, { n: "淮南", g: "117.018639,32.642812|13" }, { n: "黄山", g: "118.29357,29.734435|13" }, { n: "六安", g: "116.505253,31.755558|13" }, { n: "马鞍山", g: "118.515882,31.688528|13" }, { n: "宿州", g: "116.988692,33.636772|13" }, { n: "铜陵", g: "117.819429,30.94093|14" }, { n: "芜湖", g: "118.384108,31.36602|12" }, { n: "宣城", g: "118.752096,30.951642|13" }] }, { n: "福建", g: "117.984943,26.050118|8", cities: [{ n: "福州", g: "119.330221,26.047125|12" }, { n: "龙岩", g: "117.017997,25.078685|13" }, { n: "南平", g: "118.181883,26.643626|13" }, { n: "宁德", g: "119.542082,26.656527|14" }, { n: "莆田", g: "119.077731,25.44845|13" }, { n: "泉州", g: "118.600362,24.901652|12" }, { n: "三明", g: "117.642194,26.270835|14" }, { n: "厦门", g: "118.103886,24.489231|12" }, { n: "漳州", g: "117.676205,24.517065|12" }] }, { n: "甘肃", g: "102.457625,38.103267|6", cities: [{ n: "兰州", g: "103.823305,36.064226|12" }, { n: "白银", g: "104.171241,36.546682|13" }, { n: "定西", g: "104.626638,35.586056|13" }, { n: "甘南州", g: "102.917442,34.992211|14" }, { n: "嘉峪关", g: "98.281635,39.802397|13" }, { n: "金昌", g: "102.208126,38.516072|13" }, { n: "酒泉", g: "98.508415,39.741474|13" }, { n: "临夏州", g: "103.215249,35.598514|13" }, { n: "陇南", g: "104.934573,33.39448|14" }, { n: "平凉", g: "106.688911,35.55011|13" }, { n: "庆阳", g: "107.644227,35.726801|13" }, { n: "天水", g: "105.736932,34.584319|13" }, { n: "武威", g: "102.640147,37.933172|13" }, { n: "张掖", g: "100.459892,38.93932|13" }] }, { n: "广东", g: "113.394818,23.408004|8", cities: [{ n: "广州", g: "113.30765,23.120049|12" }, { n: "潮州", g: "116.630076,23.661812|13" }, { n: "东莞", g: "113.763434,23.043024|12" }, { n: "佛山", g: "113.134026,23.035095|13" }, { n: "河源", g: "114.713721,23.757251|12" }, { n: "惠州", g: "114.410658,23.11354|12" }, { n: "江门", g: "113.078125,22.575117|13" }, { n: "揭阳", g: "116.379501,23.547999|13" }, { n: "茂名", g: "110.931245,21.668226|13" }, { n: "梅州", g: "116.126403,24.304571|13" }, { n: "清远", g: "113.040773,23.698469|13" }, { n: "汕头", g: "116.72865,23.383908|13" }, { n: "汕尾", g: "115.372924,22.778731|14" }, { n: "韶关", g: "113.594461,24.80296|13" }, { n: "深圳", g: "114.025974,22.546054|12" }, { n: "阳江", g: "111.97701,21.871517|14" }, { n: "云浮", g: "112.050946,22.937976|13" }, { n: "湛江", g: "110.365067,21.257463|13" }, { n: "肇庆", g: "112.479653,23.078663|13" }, { n: "中山", g: "113.42206,22.545178|12" }, { n: "珠海", g: "113.562447,22.256915|13" }] }, { n: "广西", g: "108.924274,23.552255|7", cities: [{ n: "南宁", g: "108.297234,22.806493|12" }, { n: "百色", g: "106.631821,23.901512|13" }, { n: "北海", g: "109.122628,21.472718|13" }, { n: "崇左", g: "107.357322,22.415455|14" }, { n: "防城港", g: "108.351791,21.617398|15" }, { n: "桂林", g: "110.26092,25.262901|12" }, { n: "贵港", g: "109.613708,23.103373|13" }, { n: "河池", g: "108.069948,24.699521|14" }, { n: "贺州", g: "111.552594,24.411054|14" }, { n: "来宾", g: "109.231817,23.741166|14" }, { n: "柳州", g: "109.422402,24.329053|12" }, { n: "钦州", g: "108.638798,21.97335|13" }, { n: "梧州", g: "111.305472,23.485395|13" }, { n: "玉林", g: "110.151676,22.643974|14" }] }, { n: "贵州", g: "106.734996,26.902826|8", cities: [{ n: "贵阳", g: "106.709177,26.629907|12" }, { n: "安顺", g: "105.92827,26.228595|13" }, { n: "毕节地区", g: "105.300492,27.302612|14" }, { n: "六盘水", g: "104.852087,26.591866|13" }, { n: "铜仁地区", g: "109.196161,27.726271|14" }, { n: "遵义", g: "106.93126,27.699961|13" }, { n: "黔西南州", g: "104.900558,25.095148|11" }, { n: "黔东南州", g: "107.985353,26.583992|11" }, { n: "黔南州", g: "107.523205,26.264536|11" }] }, { n: "海南", g: "109.733755,19.180501|9", cities: [{ n: "海口", g: "110.330802,20.022071|13" }, { n: "白沙", g: "109.358586,19.216056|12" }, { n: "保亭", g: "109.656113,18.597592|12" }, { n: "昌江", g: "109.0113,19.222483|12" }, { n: "儋州", g: "109.413973,19.571153|13" }, { n: "澄迈", g: "109.996736,19.693135|13" }, { n: "东方", g: "108.85101,18.998161|13" }, { n: "定安", g: "110.32009,19.490991|13" }, { n: "琼海", g: "110.414359,19.21483|13" }, { n: "琼中", g: "109.861849,19.039771|12" }, { n: "乐东", g: "109.062698,18.658614|12" }, { n: "临高", g: "109.724101,19.805922|13" }, { n: "陵水", g: "109.948661,18.575985|12" }, { n: "三亚", g: "109.522771,18.257776|12" }, { n: "屯昌", g: "110.063364,19.347749|13" }, { n: "万宁", g: "110.292505,18.839886|13" }, { n: "文昌", g: "110.780909,19.750947|13" }, { n: "五指山", g: "109.51775,18.831306|13" }] }, { n: "河北", g: "115.661434,38.61384|7", cities: [{ n: "石家庄", g: "114.522082,38.048958|12" }, { n: "保定", g: "115.49481,38.886565|13" }, { n: "沧州", g: "116.863806,38.297615|13" }, { n: "承德", g: "117.933822,40.992521|14" }, { n: "邯郸", g: "114.482694,36.609308|13" }, { n: "衡水", g: "115.686229,37.746929|13" }, { n: "廊坊", g: "116.703602,39.518611|13" }, { n: "秦皇岛", g: "119.604368,39.945462|12" }, { n: "唐山", g: "118.183451,39.650531|13" }, { n: "邢台", g: "114.520487,37.069531|13" }, { n: "张家口", g: "114.893782,40.811188|13" }] }, { n: "河南", g: "113.486804,34.157184|7", cities: [{ n: "郑州", g: "113.649644,34.75661|12" }, { n: "安阳", g: "114.351807,36.110267|12" }, { n: "鹤壁", g: "114.29777,35.755426|13" }, { n: "焦作", g: "113.211836,35.234608|13" }, { n: "开封", g: "114.351642,34.801854|13" }, { n: "洛阳", g: "112.447525,34.657368|12" }, { n: "漯河", g: "114.046061,33.576279|13" }, { n: "南阳", g: "112.542842,33.01142|13" }, { n: "平顶山", g: "113.300849,33.745301|13" }, { n: "濮阳", g: "115.026627,35.753298|12" }, { n: "三门峡", g: "111.181262,34.78332|13" }, { n: "商丘", g: "115.641886,34.438589|13" }, { n: "新乡", g: "113.91269,35.307258|13" }, { n: "信阳", g: "114.085491,32.128582|13" }, { n: "许昌", g: "113.835312,34.02674|13" }, { n: "周口", g: "114.654102,33.623741|13" }, { n: "驻马店", g: "114.049154,32.983158|13" }] }, { n: "黑龙江", g: "128.047414,47.356592|6", cities: [{ n: "哈尔滨", g: "126.657717,45.773225|12" }, { n: "大庆", g: "125.02184,46.596709|12" }, { n: "大兴安岭地区", g: "124.196104,51.991789|10" }, { n: "鹤岗", g: "130.292472,47.338666|13" }, { n: "黑河", g: "127.50083,50.25069|14" }, { n: "鸡西", g: "130.941767,45.32154|13" }, { n: "佳木斯", g: "130.284735,46.81378|12" }, { n: "牡丹江", g: "129.608035,44.588521|13" }, { n: "七台河", g: "131.019048,45.775005|14" }, { n: "齐齐哈尔", g: "123.987289,47.3477|13" }, { n: "双鸭山", g: "131.171402,46.655102|13" }, { n: "绥化", g: "126.989095,46.646064|13" }, { n: "伊春", g: "128.910766,47.734685|14" }] }, { n: "湖北", g: "112.410562,31.209316|8", cities: [{ n: "武汉", g: "114.3162,30.581084|12" }, { n: "鄂州", g: "114.895594,30.384439|14" }, { n: "恩施", g: "109.517433,30.308978|14" }, { n: "黄冈", g: "114.906618,30.446109|14" }, { n: "黄石", g: "115.050683,30.216127|13" }, { n: "荆门", g: "112.21733,31.042611|13" }, { n: "荆州", g: "112.241866,30.332591|12" }, { n: "潜江", g: "112.768768,30.343116|13" }, { n: "神农架林区", g: "110.487231,31.595768|13" }, { n: "十堰", g: "110.801229,32.636994|13" }, { n: "随州", g: "113.379358,31.717858|13" }, { n: "天门", g: "113.12623,30.649047|13" }, { n: "仙桃", g: "113.387448,30.293966|13" }, { n: "咸宁", g: "114.300061,29.880657|13" }, { n: "襄阳", g: "112.176326,32.094934|12" }, { n: "孝感", g: "113.935734,30.927955|13" }, { n: "宜昌", g: "111.310981,30.732758|13" }] }, { n: "湖南", g: "111.720664,27.695864|7", cities: [{ n: "长沙", g: "112.979353,28.213478|12" }, { n: "常德", g: "111.653718,29.012149|12" }, { n: "郴州", g: "113.037704,25.782264|13" }, { n: "衡阳", g: "112.583819,26.898164|13" }, { n: "怀化", g: "109.986959,27.557483|13" }, { n: "娄底", g: "111.996396,27.741073|13" }, { n: "邵阳", g: "111.461525,27.236811|13" }, { n: "湘潭", g: "112.935556,27.835095|13" }, { n: "湘西州", g: "109.745746,28.317951|14" }, { n: "益阳", g: "112.366547,28.588088|13" }, { n: "永州", g: "111.614648,26.435972|13" }, { n: "岳阳", g: "113.146196,29.378007|13" }, { n: "张家界", g: "110.48162,29.124889|13" }, { n: "株洲", g: "113.131695,27.827433|13" }] }, { n: "江苏", g: "119.368489,33.013797|8", cities: [{ n: "南京", g: "118.778074,32.057236|12" }, { n: "常州", g: "119.981861,31.771397|12" }, { n: "淮安", g: "119.030186,33.606513|12" }, { n: "连云港", g: "119.173872,34.601549|12" }, { n: "南通", g: "120.873801,32.014665|12" }, { n: "苏州", g: "120.619907,31.317987|12" }, { n: "宿迁", g: "118.296893,33.95205|13" }, { n: "泰州", g: "119.919606,32.476053|13" }, { n: "无锡", g: "120.305456,31.570037|12" }, { n: "徐州", g: "117.188107,34.271553|12" }, { n: "盐城", g: "120.148872,33.379862|12" }, { n: "扬州", g: "119.427778,32.408505|13" }, { n: "镇江", g: "119.455835,32.204409|13" }] }, { n: "江西", g: "115.676082,27.757258|7", cities: [{ n: "南昌", g: "115.893528,28.689578|12" }, { n: "抚州", g: "116.360919,27.954545|13" }, { n: "赣州", g: "114.935909,25.845296|13" }, { n: "吉安", g: "114.992039,27.113848|13" }, { n: "景德镇", g: "117.186523,29.303563|12" }, { n: "九江", g: "115.999848,29.71964|13" }, { n: "萍乡", g: "113.859917,27.639544|13" }, { n: "上饶", g: "117.955464,28.457623|13" }, { n: "新余", g: "114.947117,27.822322|13" }, { n: "宜春", g: "114.400039,27.81113|13" }, { n: "鹰潭", g: "117.03545,28.24131|13" }] }, { n: "吉林", g: "126.262876,43.678846|7", cities: [{ n: "长春", g: "125.313642,43.898338|12" }, { n: "白城", g: "122.840777,45.621086|13" }, { n: "白山", g: "126.435798,41.945859|13" }, { n: "吉林市", g: "126.564544,43.871988|12" }, { n: "辽源", g: "125.133686,42.923303|13" }, { n: "四平", g: "124.391382,43.175525|12" }, { n: "松原", g: "124.832995,45.136049|13" }, { n: "通化", g: "125.94265,41.736397|13" }, { n: "延边", g: "129.485902,42.896414|13" }] }, { n: "辽宁", g: "122.753592,41.6216|8", cities: [{ n: "沈阳", g: "123.432791,41.808645|12" }, { n: "鞍山", g: "123.007763,41.118744|13" }, { n: "本溪", g: "123.778062,41.325838|12" }, { n: "朝阳", g: "120.446163,41.571828|13" }, { n: "大连", g: "121.593478,38.94871|12" }, { n: "丹东", g: "124.338543,40.129023|12" }, { n: "抚顺", g: "123.92982,41.877304|12" }, { n: "阜新", g: "121.660822,42.01925|14" }, { n: "葫芦岛", g: "120.860758,40.74303|13" }, { n: "锦州", g: "121.147749,41.130879|13" }, { n: "辽阳", g: "123.172451,41.273339|14" }, { n: "盘锦", g: "122.073228,41.141248|13" }, { n: "铁岭", g: "123.85485,42.299757|13" }, { n: "营口", g: "122.233391,40.668651|13" }] }, { n: "内蒙古", g: "114.415868,43.468238|5", cities: [{ n: "呼和浩特", g: "111.660351,40.828319|12" }, { n: "阿拉善盟", g: "105.695683,38.843075|14" }, { n: "包头", g: "109.846239,40.647119|12" }, { n: "巴彦淖尔", g: "107.423807,40.76918|12" }, { n: "赤峰", g: "118.930761,42.297112|12" }, { n: "鄂尔多斯", g: "109.993706,39.81649|12" }, { n: "呼伦贝尔", g: "119.760822,49.201636|12" }, { n: "通辽", g: "122.260363,43.633756|12" }, { n: "乌海", g: "106.831999,39.683177|13" }, { n: "乌兰察布", g: "113.112846,41.022363|12" }, { n: "锡林郭勒盟", g: "116.02734,43.939705|11" }, { n: "兴安盟", g: "122.048167,46.083757|11" }] }, { n: "宁夏", g: "106.155481,37.321323|8", cities: [{ n: "银川", g: "106.206479,38.502621|12" }, { n: "固原", g: "106.285268,36.021523|13" }, { n: "石嘴山", g: "106.379337,39.020223|13" }, { n: "吴忠", g: "106.208254,37.993561|14" }, { n: "中卫", g: "105.196754,37.521124|14" }] }, { n: "青海", g: "96.202544,35.499761|7", cities: [{ n: "西宁", g: "101.767921,36.640739|12" }, { n: "果洛州", g: "100.223723,34.480485|11" }, { n: "海东地区", g: "102.085207,36.51761|11" }, { n: "海北州", g: "100.879802,36.960654|11" }, { n: "海南州", g: "100.624066,36.284364|11" }, { n: "海西州", g: "97.342625,37.373799|11" }, { n: "黄南州", g: "102.0076,35.522852|11" }, { n: "玉树州", g: "97.013316,33.00624|14" }] }, { n: "山东", g: "118.527663,36.09929|8", cities: [{ n: "济南", g: "117.024967,36.682785|12" }, { n: "滨州", g: "117.968292,37.405314|12" }, { n: "东营", g: "118.583926,37.487121|12" }, { n: "德州", g: "116.328161,37.460826|12" }, { n: "菏泽", g: "115.46336,35.26244|13" }, { n: "济宁", g: "116.600798,35.402122|13" }, { n: "莱芜", g: "117.684667,36.233654|13" }, { n: "聊城", g: "115.986869,36.455829|12" }, { n: "临沂", g: "118.340768,35.072409|12" }, { n: "青岛", g: "120.384428,36.105215|12" }, { n: "日照", g: "119.50718,35.420225|12" }, { n: "泰安", g: "117.089415,36.188078|13" }, { n: "威海", g: "122.093958,37.528787|13" }, { n: "潍坊", g: "119.142634,36.716115|12" }, { n: "烟台", g: "121.309555,37.536562|12" }, { n: "枣庄", g: "117.279305,34.807883|13" }, { n: "淄博", g: "118.059134,36.804685|12" }] }, { n: "山西", g: "112.515496,37.866566|7", cities: [{ n: "太原", g: "112.550864,37.890277|12" }, { n: "长治", g: "113.120292,36.201664|12" }, { n: "大同", g: "113.290509,40.113744|12" }, { n: "晋城", g: "112.867333,35.499834|13" }, { n: "晋中", g: "112.738514,37.693362|13" }, { n: "临汾", g: "111.538788,36.099745|13" }, { n: "吕梁", g: "111.143157,37.527316|14" }, { n: "朔州", g: "112.479928,39.337672|13" }, { n: "忻州", g: "112.727939,38.461031|12" }, { n: "阳泉", g: "113.569238,37.869529|13" }, { n: "运城", g: "111.006854,35.038859|13" }] }, { n: "陕西", g: "109.503789,35.860026|7", cities: [{ n: "西安", g: "108.953098,34.2778|12" }, { n: "安康", g: "109.038045,32.70437|13" }, { n: "宝鸡", g: "107.170645,34.364081|12" }, { n: "汉中", g: "107.045478,33.081569|13" }, { n: "商洛", g: "109.934208,33.873907|13" }, { n: "铜川", g: "108.968067,34.908368|13" }, { n: "渭南", g: "109.483933,34.502358|13" }, { n: "咸阳", g: "108.707509,34.345373|13" }, { n: "延安", g: "109.50051,36.60332|13" }, { n: "榆林", g: "109.745926,38.279439|12" }] }, { n: "四川", g: "102.89916,30.367481|7", cities: [{ n: "成都", g: "104.067923,30.679943|12" }, { n: "阿坝州", g: "102.228565,31.905763|15" }, { n: "巴中", g: "106.757916,31.869189|14" }, { n: "达州", g: "107.494973,31.214199|14" }, { n: "德阳", g: "104.402398,31.13114|13" }, { n: "甘孜州", g: "101.969232,30.055144|15" }, { n: "广安", g: "106.63572,30.463984|13" }, { n: "广元", g: "105.819687,32.44104|13" }, { n: "乐山", g: "103.760824,29.600958|13" }, { n: "凉山州", g: "102.259591,27.892393|14" }, { n: "泸州", g: "105.44397,28.89593|14" }, { n: "南充", g: "106.105554,30.800965|13" }, { n: "眉山", g: "103.84143,30.061115|13" }, { n: "绵阳", g: "104.705519,31.504701|12" }, { n: "内江", g: "105.073056,29.599462|13" }, { n: "攀枝花", g: "101.722423,26.587571|14" }, { n: "遂宁", g: "105.564888,30.557491|12" }, { n: "雅安", g: "103.009356,29.999716|13" }, { n: "宜宾", g: "104.633019,28.769675|13" }, { n: "资阳", g: "104.63593,30.132191|13" }, { n: "自贡", g: "104.776071,29.359157|13" }] }, { n: "西藏", g: "89.137982,31.367315|6", cities: [{ n: "拉萨", g: "91.111891,29.662557|13" }, { n: "阿里地区", g: "81.107669,30.404557|11" }, { n: "昌都地区", g: "97.185582,31.140576|15" }, { n: "林芝地区", g: "94.349985,29.666941|11" }, { n: "那曲地区", g: "92.067018,31.48068|14" }, { n: "日喀则地区", g: "88.891486,29.269023|14" }, { n: "山南地区", g: "91.750644,29.229027|11" }] }, { n: "新疆", g: "85.614899,42.127001|6", cities: [{ n: "乌鲁木齐", g: "87.564988,43.84038|12" }, { n: "阿拉尔", g: "81.291737,40.61568|13" }, { n: "阿克苏地区", g: "80.269846,41.171731|12" }, { n: "阿勒泰地区", g: "88.137915,47.839744|13" }, { n: "巴音郭楞", g: "86.121688,41.771362|12" }, { n: "博尔塔拉州", g: "82.052436,44.913651|11" }, { n: "昌吉州", g: "87.296038,44.007058|13" }, { n: "哈密地区", g: "93.528355,42.858596|13" }, { n: "和田地区", g: "79.930239,37.116774|13" }, { n: "喀什地区", g: "75.992973,39.470627|12" }, { n: "克拉玛依", g: "84.88118,45.594331|13" }, { n: "克孜勒苏州", g: "76.137564,39.750346|11" }, { n: "石河子", g: "86.041865,44.308259|13" }, { n: "塔城地区", g: "82.974881,46.758684|12" }, { n: "图木舒克", g: "79.198155,39.889223|13" }, { n: "吐鲁番地区", g: "89.181595,42.96047|13" }, { n: "五家渠", g: "87.565449,44.368899|13" }, { n: "伊犁州", g: "81.297854,43.922248|11" }] }, { n: "云南", g: "101.592952,24.864213|7", cities: [{ n: "昆明", g: "102.714601,25.049153|12" }, { n: "保山", g: "99.177996,25.120489|13" }, { n: "楚雄州", g: "101.529382,25.066356|13" }, { n: "大理州", g: "100.223675,25.5969|14" }, { n: "德宏州", g: "98.589434,24.44124|14" }, { n: "迪庆州", g: "99.713682,27.831029|14" }, { n: "红河州", g: "103.384065,23.367718|11" }, { n: "丽江", g: "100.229628,26.875351|13" }, { n: "临沧", g: "100.092613,23.887806|14" }, { n: "怒江州", g: "98.859932,25.860677|14" }, { n: "普洱", g: "100.980058,22.788778|14" }, { n: "曲靖", g: "103.782539,25.520758|12" }, { n: "昭通", g: "103.725021,27.340633|13" }, { n: "文山", g: "104.089112,23.401781|14" }, { n: "西双版纳", g: "100.803038,22.009433|13" }, { n: "玉溪", g: "102.545068,24.370447|13" }] }, { n: "浙江", g: "119.957202,29.159494|8", cities: [{ n: "杭州", g: "120.219375,30.259244|12" }, { n: "湖州", g: "120.137243,30.877925|12" }, { n: "嘉兴", g: "120.760428,30.773992|13" }, { n: "金华", g: "119.652576,29.102899|12" }, { n: "丽水", g: "119.929576,28.4563|13" }, { n: "宁波", g: "121.579006,29.885259|12" }, { n: "衢州", g: "118.875842,28.95691|12" }, { n: "绍兴", g: "120.592467,30.002365|13" }, { n: "台州", g: "121.440613,28.668283|13" }, { n: "温州", g: "120.690635,28.002838|12" }, { n: "舟山", g: "122.169872,30.03601|13" }] }], other: [{ n: "香港", g: "114.186124,22.293586|11" }, { n: "澳门", g: "113.557519,22.204118|13" }, { n: "台湾", g: "120.961454,23.80406|8" }] };

var GLCityCenterUtil = function () {
    function GLCityCenterUtil() {
        _classCallCheck(this, GLCityCenterUtil);

        this.cityCenter = cityCenter;
    }

    _createClass(GLCityCenterUtil, [{
        key: "getCenter",
        value: function getCenter(g) {
            var item = g.split("|");
            item[0] = item[0].split(",");
            return {
                lng: parseFloat(item[0][0]),
                lat: parseFloat(item[0][1])
            };
        }
    }, {
        key: "getCenterByCityName",
        value: function getCenterByCityName(name) {
            var citycenter = this.cityCenter;
            if (name) name = name.toString().trim();
            for (var i = 0; i < citycenter.municipalities.length; i++) {
                var cityName = citycenter.municipalities[i].n;
                if (cityName == name) {
                    return this.getCenter(citycenter.municipalities[i].g);
                }
            }

            var provinces = citycenter.provinces;
            for (var i = 0; i < provinces.length; i++) {
                if (provinces[i].n === name) {
                    return this.getCenter(provinces[i].g);
                }
                var cities = provinces[i].cities;
                for (var j = 0; j < cities.length; j++) {
                    var _cityName = cities[j].n;

                    if (_cityName === name) {
                        return this.getCenter(cities[j].g);
                    }
                }
            }
            return null;
        }
    }]);

    return GLCityCenterUtil;
}();

exports.default = GL.GMVI.CityCenterUtil = new GLCityCenterUtil();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 FDEB algorithm implementation [www.win.tue.nl/~dholten/papers/forcebundles_eurovis.pdf].

 Author:  (github.com/upphiminn)
 2013

 */

var ForceEdgeBundling = function ForceEdgeBundling() {
    var data_nodes = {},
        // {'nodeid':{'x':,'y':},..}
    data_edges = [],
        // [{'source':'nodeid1', 'target':'nodeid2'},..]
    compatibility_list_for_edge = [],
        subdivision_points_for_edge = [],
        K = 0.1,
        // global bundling constant controling edge stiffness
    S_initial = 0.1,
        // init. distance to move points
    P_initial = 1,
        // init. subdivision number
    P_rate = 2,
        // subdivision rate increase
    C = 6,
        // number of cycles to perform
    I_initial = 70,
        // init. number of iterations for cycle
    I_rate = 0.6666667,
        // rate at which iteration number decreases i.e. 2/3
    compatibility_threshold = 0.6,
        invers_quadratic_mode = false,
        eps = 1e-8;

    /*** Geometry Helper Methods ***/
    function vector_dot_product(p, q) {
        return p.x * q.x + p.y * q.y;
    }

    function edge_as_vector(P) {
        return { 'x': data_nodes[P.target].x - data_nodes[P.source].x,
            'y': data_nodes[P.target].y - data_nodes[P.source].y };
    }

    function edge_length(e) {
        return Math.sqrt(Math.pow(data_nodes[e.source].x - data_nodes[e.target].x, 2) + Math.pow(data_nodes[e.source].y - data_nodes[e.target].y, 2));
    }

    function custom_edge_length(e) {
        return Math.sqrt(Math.pow(e.source.x - e.target.x, 2) + Math.pow(e.source.y - e.target.y, 2));
    }

    function edge_midpoint(e) {
        var middle_x = (data_nodes[e.source].x + data_nodes[e.target].x) / 2.0;
        var middle_y = (data_nodes[e.source].y + data_nodes[e.target].y) / 2.0;
        return { 'x': middle_x, 'y': middle_y };
    }

    function compute_divided_edge_length(e_idx) {
        var length = 0;
        for (var i = 1; i < subdivision_points_for_edge[e_idx].length; i++) {
            var segment_length = euclidean_distance(subdivision_points_for_edge[e_idx][i], subdivision_points_for_edge[e_idx][i - 1]);
            length += segment_length;
        }
        return length;
    }

    function euclidean_distance(p, q) {
        return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
    }

    function project_point_on_line(p, Q) {
        var L = Math.sqrt((Q.target.x - Q.source.x) * (Q.target.x - Q.source.x) + (Q.target.y - Q.source.y) * (Q.target.y - Q.source.y));
        var r = ((Q.source.y - p.y) * (Q.source.y - Q.target.y) - (Q.source.x - p.x) * (Q.target.x - Q.source.x)) / (L * L);

        return { 'x': Q.source.x + r * (Q.target.x - Q.source.x), 'y': Q.source.y + r * (Q.target.y - Q.source.y) };
    }

    /*** ********************** ***/

    /*** Initialization Methods ***/
    function initialize_edge_subdivisions() {
        for (var i = 0; i < data_edges.length; i++) {
            if (P_initial == 1) subdivision_points_for_edge[i] = []; //0 subdivisions
            else {
                    subdivision_points_for_edge[i] = [];
                    subdivision_points_for_edge[i].push(data_nodes[data_edges[i].source]);
                    subdivision_points_for_edge[i].push(data_nodes[data_edges[i].target]);
                }
        }
    }

    function initialize_compatibility_lists() {
        for (var i = 0; i < data_edges.length; i++) {
            compatibility_list_for_edge[i] = [];
        } //0 compatible edges.
    }

    function filter_self_loops(edgelist) {
        var filtered_edge_list = [];
        for (var e = 0; e < edgelist.length; e++) {
            if (data_nodes[edgelist[e].source].x != data_nodes[edgelist[e].target].x && data_nodes[edgelist[e].source].y != data_nodes[edgelist[e].target].y) {
                //or smaller than eps
                filtered_edge_list.push(edgelist[e]);
            }
        }

        return filtered_edge_list;
    }
    /*** ********************** ***/

    /*** Force Calculation Methods ***/
    function apply_spring_force(e_idx, i, kP) {

        var prev = subdivision_points_for_edge[e_idx][i - 1];
        var next = subdivision_points_for_edge[e_idx][i + 1];
        var crnt = subdivision_points_for_edge[e_idx][i];

        var x = prev.x - crnt.x + next.x - crnt.x;
        var y = prev.y - crnt.y + next.y - crnt.y;

        x *= kP;
        y *= kP;

        return { 'x': x, 'y': y };
    }

    function apply_electrostatic_force(e_idx, i, S) {
        var sum_of_forces = { 'x': 0, 'y': 0 };
        var compatible_edges_list = compatibility_list_for_edge[e_idx];

        for (var oe = 0; oe < compatible_edges_list.length; oe++) {
            var force = { 'x': subdivision_points_for_edge[compatible_edges_list[oe]][i].x - subdivision_points_for_edge[e_idx][i].x,
                'y': subdivision_points_for_edge[compatible_edges_list[oe]][i].y - subdivision_points_for_edge[e_idx][i].y };

            if (Math.abs(force.x) > eps || Math.abs(force.y) > eps) {

                var diff = 1 / Math.pow(custom_edge_length({ 'source': subdivision_points_for_edge[compatible_edges_list[oe]][i],
                    'target': subdivision_points_for_edge[e_idx][i] }), 1);

                sum_of_forces.x += force.x * diff;
                sum_of_forces.y += force.y * diff;
            }
        }
        return sum_of_forces;
    }

    function apply_resulting_forces_on_subdivision_points(e_idx, P, S) {
        var kP = K / (edge_length(data_edges[e_idx]) * (P + 1)); // kP=K/|P|(number of segments), where |P| is the initial length of edge P.
        // (length * (num of sub division pts - 1))
        var resulting_forces_for_subdivision_points = [{ 'x': 0, 'y': 0 }];
        for (var i = 1; i < P + 1; i++) {
            // exclude initial end points of the edge 0 and P+1
            var resulting_force = { 'x': 0, 'y': 0 };

            var spring_force = apply_spring_force(e_idx, i, kP);
            var electrostatic_force = apply_electrostatic_force(e_idx, i, S);

            resulting_force.x = S * (spring_force.x + electrostatic_force.x);
            resulting_force.y = S * (spring_force.y + electrostatic_force.y);

            resulting_forces_for_subdivision_points.push(resulting_force);
        }
        resulting_forces_for_subdivision_points.push({ 'x': 0, 'y': 0 });
        return resulting_forces_for_subdivision_points;
    }
    /*** ********************** ***/

    /*** Edge Division Calculation Methods ***/
    function update_edge_divisions(P) {
        for (var e_idx = 0; e_idx < data_edges.length; e_idx++) {

            if (P == 1) {
                subdivision_points_for_edge[e_idx].push(data_nodes[data_edges[e_idx].source]); // source
                subdivision_points_for_edge[e_idx].push(edge_midpoint(data_edges[e_idx])); // mid point
                subdivision_points_for_edge[e_idx].push(data_nodes[data_edges[e_idx].target]); // target
            } else {

                var divided_edge_length = compute_divided_edge_length(e_idx);
                var segment_length = divided_edge_length / (P + 1);
                var current_segment_length = segment_length;
                var new_subdivision_points = [];
                new_subdivision_points.push(data_nodes[data_edges[e_idx].source]); //source

                for (var i = 1; i < subdivision_points_for_edge[e_idx].length; i++) {
                    var old_segment_length = euclidean_distance(subdivision_points_for_edge[e_idx][i], subdivision_points_for_edge[e_idx][i - 1]);

                    while (old_segment_length > current_segment_length) {
                        var percent_position = current_segment_length / old_segment_length;
                        var new_subdivision_point_x = subdivision_points_for_edge[e_idx][i - 1].x;
                        var new_subdivision_point_y = subdivision_points_for_edge[e_idx][i - 1].y;

                        new_subdivision_point_x += percent_position * (subdivision_points_for_edge[e_idx][i].x - subdivision_points_for_edge[e_idx][i - 1].x);
                        new_subdivision_point_y += percent_position * (subdivision_points_for_edge[e_idx][i].y - subdivision_points_for_edge[e_idx][i - 1].y);
                        new_subdivision_points.push({ 'x': new_subdivision_point_x,
                            'y': new_subdivision_point_y });

                        old_segment_length -= current_segment_length;
                        current_segment_length = segment_length;
                    }
                    current_segment_length -= old_segment_length;
                }
                new_subdivision_points.push(data_nodes[data_edges[e_idx].target]); //target
                subdivision_points_for_edge[e_idx] = new_subdivision_points;
            }
        }
    }
    /*** ********************** ***/

    /*** Edge compatibility measures ***/
    function angle_compatibility(P, Q) {
        var result = Math.abs(vector_dot_product(edge_as_vector(P), edge_as_vector(Q)) / (edge_length(P) * edge_length(Q)));
        return result;
    }

    function scale_compatibility(P, Q) {
        var lavg = (edge_length(P) + edge_length(Q)) / 2.0;
        var result = 2.0 / (lavg / Math.min(edge_length(P), edge_length(Q)) + Math.max(edge_length(P), edge_length(Q)) / lavg);
        return result;
    }

    function position_compatibility(P, Q) {
        var lavg = (edge_length(P) + edge_length(Q)) / 2.0;
        var midP = { 'x': (data_nodes[P.source].x + data_nodes[P.target].x) / 2.0,
            'y': (data_nodes[P.source].y + data_nodes[P.target].y) / 2.0 };
        var midQ = { 'x': (data_nodes[Q.source].x + data_nodes[Q.target].x) / 2.0,
            'y': (data_nodes[Q.source].y + data_nodes[Q.target].y) / 2.0 };
        var result = lavg / (lavg + euclidean_distance(midP, midQ));
        return result;
    }

    function edge_visibility(P, Q) {
        var I0 = project_point_on_line(data_nodes[Q.source], { 'source': data_nodes[P.source],
            'target': data_nodes[P.target] });
        var I1 = project_point_on_line(data_nodes[Q.target], { 'source': data_nodes[P.source],
            'target': data_nodes[P.target] }); //send acutal edge points positions
        var midI = { 'x': (I0.x + I1.x) / 2.0,
            'y': (I0.y + I1.y) / 2.0 };
        var midP = { 'x': (data_nodes[P.source].x + data_nodes[P.target].x) / 2.0,
            'y': (data_nodes[P.source].y + data_nodes[P.target].y) / 2.0 };
        var result = Math.max(0, 1 - 2 * euclidean_distance(midP, midI) / euclidean_distance(I0, I1));
        return result;
    }

    function visibility_compatibility(P, Q) {
        return Math.min(edge_visibility(P, Q), edge_visibility(Q, P));
    }

    function compatibility_score(P, Q) {
        var result = angle_compatibility(P, Q) * scale_compatibility(P, Q) * position_compatibility(P, Q) * visibility_compatibility(P, Q);

        return result;
    }

    function are_compatible(P, Q) {
        // console.log('compatibility ' + P.source +' - '+ P.target + ' and ' + Q.source +' '+ Q.target);
        return compatibility_score(P, Q) >= compatibility_threshold;
    }

    function compute_compatibility_lists() {
        for (var e = 0; e < data_edges.length - 1; e++) {
            for (var oe = e + 1; oe < data_edges.length; oe++) {
                // don't want any duplicates
                if (e == oe) continue;else {
                    if (are_compatible(data_edges[e], data_edges[oe])) {
                        compatibility_list_for_edge[e].push(oe);
                        compatibility_list_for_edge[oe].push(e);
                    }
                }
            }
        }
    }

    /*** ************************ ***/

    /*** Main Bundling Loop Methods ***/
    var forcebundle = function forcebundle() {
        var S = S_initial;
        var I = I_initial;
        var P = P_initial;

        initialize_edge_subdivisions();
        initialize_compatibility_lists();
        update_edge_divisions(P);
        compute_compatibility_lists();
        for (var cycle = 0; cycle < C; cycle++) {
            for (var iteration = 0; iteration < I; iteration++) {
                var forces = [];
                for (var edge = 0; edge < data_edges.length; edge++) {
                    forces[edge] = apply_resulting_forces_on_subdivision_points(edge, P, S);
                }
                for (var e = 0; e < data_edges.length; e++) {
                    for (var i = 0; i < P + 1; i++) {
                        subdivision_points_for_edge[e][i].x += forces[e][i].x;
                        subdivision_points_for_edge[e][i].y += forces[e][i].y;
                    }
                }
            }
            //prepare for next cycle
            S = S / 2;
            P = P * 2;
            I = I_rate * I;

            update_edge_divisions(P);
            // console.log('C' + cycle);
            // console.log('P' + P);
            // console.log('S' + S);
        }
        return subdivision_points_for_edge;
    };
    /*** ************************ ***/

    /*** Getters/Setters Methods ***/
    forcebundle.nodes = function (nl) {
        if (arguments.length == 0) {
            return data_nodes;
        } else {
            data_nodes = nl;
        }
        return forcebundle;
    };

    forcebundle.edges = function (ll) {
        if (arguments.length == 0) {
            return data_edges;
        } else {
            data_edges = filter_self_loops(ll); //remove edges to from to the same point
        }
        return forcebundle;
    };

    forcebundle.bundling_stiffness = function (k) {
        if (arguments.length == 0) {
            return K;
        } else {
            K = k;
        }
        return forcebundle;
    };

    forcebundle.step_size = function (step) {
        if (arguments.length == 0) {
            return S_initial;
        } else {
            S_initial = step;
        }
        return forcebundle;
    };

    forcebundle.cycles = function (c) {
        if (arguments.length == 0) {
            return C;
        } else {
            C = c;
        }
        return forcebundle;
    };

    forcebundle.iterations = function (i) {
        if (arguments.length == 0) {
            return I_initial;
        } else {
            I_initial = i;
        }
        return forcebundle;
    };

    forcebundle.iterations_rate = function (i) {
        if (arguments.length == 0) {
            return I_rate;
        } else {
            I_rate = i;
        }
        return forcebundle;
    };

    forcebundle.subdivision_points_seed = function (p) {
        if (arguments.length == 0) {
            return P;
        } else {
            P = p;
        }
        return forcebundle;
    };

    forcebundle.subdivision_rate = function (r) {
        if (arguments.length == 0) {
            return P_rate;
        } else {
            P_rate = r;
        }
        return forcebundle;
    };

    forcebundle.compatbility_threshold = function (t) {
        if (arguments.length == 0) {
            return compatbility_threshold;
        } else {
            compatibility_threshold = t;
        }
        return forcebundle;
    };

    /*** ************************ ***/

    return forcebundle;
};

exports.default = GL.GMVI.ForceEdgeBundlingUtil = ForceEdgeBundling;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 根据弧线的坐标节点数组
 */
function getCurvePoints(points) {
    var curvePoints = [];
    for (var i = 0; i < points.length - 1; i++) {
        var p = getCurveByTwoPoints(points[i], points[i + 1]);
        if (p && p.length > 0) {
            curvePoints = curvePoints.concat(p);
        }
    }
    return curvePoints;
}

/**
 * 根据两点获取曲线坐标点数组
 * @param Point 起点
 * @param Point 终点
 */
function getCurveByTwoPoints(obj1, obj2) {
    if (!obj1 || !obj2) {
        return null;
    }

    var B1 = function B1(x) {
        return 1 - 2 * x + x * x;
    };
    var B2 = function B2(x) {
        return 2 * x - 2 * x * x;
    };
    var B3 = function B3(x) {
        return x * x;
    };

    var curveCoordinates = [];

    var count = 40; // 曲线是由一些小的线段组成的，这个表示这个曲线所有到的折线的个数
    var isFuture = false;
    var t, h, h2, lat3, lng3, j, t2;
    var LnArray = [];
    var i = 0;
    var inc = 0;

    if (typeof obj2 == "undefined") {
        if (typeof curveCoordinates != "undefined") {
            curveCoordinates = [];
        }
        return;
    }

    var lat1 = parseFloat(obj1.lat);
    var lat2 = parseFloat(obj2.lat);
    var lng1 = parseFloat(obj1.lng);
    var lng2 = parseFloat(obj2.lng);

    // 计算曲线角度的方法
    if (lng2 > lng1) {
        if (parseFloat(lng2 - lng1) > 180) {
            if (lng1 < 0) {
                lng1 = parseFloat(180 + 180 + lng1);
            }
        }
    }

    if (lng1 > lng2) {
        if (parseFloat(lng1 - lng2) > 180) {
            if (lng2 < 0) {
                lng2 = parseFloat(180 + 180 + lng2);
            }
        }
    }
    j = 0;
    t2 = 0;
    if (lat2 == lat1) {
        t = 0;
        h = lng1 - lng2;
    } else if (lng2 == lng1) {
        t = Math.PI / 2;
        h = lat1 - lat2;
    } else {
        t = Math.atan((lat2 - lat1) / (lng2 - lng1));
        h = (lat2 - lat1) / Math.sin(t);
    }
    if (t2 == 0) {
        t2 = t + Math.PI / 5;
    }
    h2 = h / 2;
    lng3 = h2 * Math.cos(t2) + lng1;
    lat3 = h2 * Math.sin(t2) + lat1;

    for (i = 0; i < count + 1; i++) {
        curveCoordinates.push([lng1 * B1(inc) + lng3 * B2(inc) + lng2 * B3(inc), lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc)]);
        inc = inc + 1 / count;
    }
    return curveCoordinates;
}

function Point(lng, lat) {
    this.lng = lng;
    this.lat = lat;
}

var curve = {
    getPoints: getCurvePoints
};

exports.default = GL.GMVI.CurveUtil = curve;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _os = __webpack_require__(21);

GL.GMVI.Extend = function (dest, args) {
   for (var key in args) {
      dest[key] = args[key];
   }
   return dest;
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLSimplePath = __webpack_require__(5);

var _GLSimplePath2 = _interopRequireDefault(_GLSimplePath);

var _Animator = __webpack_require__(23);

var _Animator2 = _interopRequireDefault(_Animator);

var _GLCategory = __webpack_require__(24);

var _GLCategory2 = _interopRequireDefault(_GLCategory);

var _GLChoropleth = __webpack_require__(25);

var _GLChoropleth2 = _interopRequireDefault(_GLChoropleth);

var _GLIntensity = __webpack_require__(1);

var _GLIntensity2 = _interopRequireDefault(_GLIntensity);

var _GLCanvasArrow = __webpack_require__(26);

var _GLCanvasArrow2 = _interopRequireDefault(_GLCanvasArrow);

var _GLCanvasCluster = __webpack_require__(27);

var _GLCanvasCluster2 = _interopRequireDefault(_GLCanvasCluster);

var _GLCanvasEffect = __webpack_require__(28);

var _GLCanvasEffect2 = _interopRequireDefault(_GLCanvasEffect);

var _GLCanvasGrid = __webpack_require__(29);

var _GLCanvasGrid2 = _interopRequireDefault(_GLCanvasGrid);

var _GLCanvasHeat = __webpack_require__(30);

var _GLCanvasHeat2 = _interopRequireDefault(_GLCanvasHeat);

var _GLCanvasHoneycomb = __webpack_require__(32);

var _GLCanvasHoneycomb2 = _interopRequireDefault(_GLCanvasHoneycomb);

var _GLCanvasIcon = __webpack_require__(33);

var _GLCanvasIcon2 = _interopRequireDefault(_GLCanvasIcon);

var _GLCanvasMigrate = __webpack_require__(34);

var _GLCanvasMigrate2 = _interopRequireDefault(_GLCanvasMigrate);

var _GLCanvasMigrateLines = __webpack_require__(36);

var _GLCanvasMigrateLines2 = _interopRequireDefault(_GLCanvasMigrateLines);

var _GLCanvasScatter = __webpack_require__(38);

var _GLCanvasScatter2 = _interopRequireDefault(_GLCanvasScatter);

var _GLCanvasSimple = __webpack_require__(39);

var _GLCanvasSimple2 = _interopRequireDefault(_GLCanvasSimple);

var _GLCanvasStar = __webpack_require__(40);

var _GLCanvasStar2 = _interopRequireDefault(_GLCanvasStar);

var _GLCanvasTagCloud = __webpack_require__(41);

var _GLCanvasTagCloud2 = _interopRequireDefault(_GLCanvasTagCloud);

var _GLCanvasText = __webpack_require__(42);

var _GLCanvasText2 = _interopRequireDefault(_GLCanvasText);

var _GLCanvasWaterBubble = __webpack_require__(43);

var _GLCanvasWaterBubble2 = _interopRequireDefault(_GLCanvasWaterBubble);

var _GLCanvasRadial = __webpack_require__(44);

var _GLCanvasRadial2 = _interopRequireDefault(_GLCanvasRadial);

var _Circle = __webpack_require__(45);

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import CanvasRadiation from "./../canvas/draw/GLCanvasRadiation"


var SphericalMercator = __webpack_require__(8);
var merc = new SphericalMercator({
    size: 256
});

var maptalks = window.maptalks;
if (!maptalks) throw new Error('not find maptalks lib');

var options = {};

var GMVICanvasLayer = function (_maptalks$Layer) {
    _inherits(GMVICanvasLayer, _maptalks$Layer);

    function GMVICanvasLayer(id, dataSet, options) {
        _classCallCheck(this, GMVICanvasLayer);

        if (!dataSet instanceof GL.GMVI.DataSet) {
            throw new Error('dataset is error');
        }

        var _this = _possibleConstructorReturn(this, (GMVICanvasLayer.__proto__ || Object.getPrototypeOf(GMVICanvasLayer)).call(this, id, options));

        _this.data = dataSet.get();
        _this._initOptions(options);
        _this.data = _this._filterData(_this.data);
        _this.inited = false;
        return _this;
    }

    _createClass(GMVICanvasLayer, [{
        key: "getData",
        value: function getData() {
            return this.data || [];
        }
    }, {
        key: "getDatas",
        value: function getDatas() {
            return this.getData();
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            if (!this.data.length) {
                return true;
            }
            return false;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.data = [];
            this._clearTime();
            this.fire('clear');
            this.redraw();
            return this;
        }

        /**
         * Export the HeatLayer's JSON.
         * @return {Object} layer's JSON
         */

    }, {
        key: "toJSON",
        value: function toJSON(options) {
            if (!options) {
                options = {};
            }
            var json = {
                'type': this.getJSONType(),
                'id': this.getId(),
                'options': this.config()
            };
            var data = this.getData();
            if (options['clipExtent']) {
                var clipExtent = new maptalks.Extent(options['clipExtent']);
                var r = this._getHeatRadius();
                if (r) {
                    clipExtent = clipExtent._expand(r);
                }
                var clipped = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    if (clipExtent.contains(new maptalks.Coordinate(data[i][0], data[i][1]))) {
                        clipped.push(data[i]);
                    }
                }
                json['data'] = clipped;
            } else {
                json['data'] = data;
            }

            return json;
        }
    }, {
        key: "setOption",


        //更新配置
        value: function setOption(options) {
            this._initOptions(options);
            this._filterData(this.data);
            this._init();
            this.redraw();
        }
    }, {
        key: "redraw",
        value: function redraw() {
            var renderer = this._getRenderer();
            if (renderer) {
                renderer.setToRedraw();
            }
            return this;
        }
    }, {
        key: "getRenderer",
        value: function getRenderer() {
            return this._getRenderer();
        }
    }, {
        key: "onRemove",
        value: function onRemove(map) {
            map = map || this.getMap();
            if (this.eventMap) {
                for (var key in this.eventMap) {
                    map.off(key, this.eventMap[key]);
                }
            }
            this._clearTime();
            this.inited = false;
        }

        //重置数据

    }, {
        key: "resetDatas",
        value: function resetDatas(dataSet) {
            this.data = this._filterData(dataSet.get());
            this.redraw();
            // this._reset();
        }

        //增量数据

    }, {
        key: "addDatas",
        value: function addDatas(dataSet) {
            this.data = this.data.concat(this._filterData(dataSet.get()));
            this.redraw();
        }
    }, {
        key: "removeData",
        value: function removeData(data) {
            if (Array.isArray(data) && data.length > 0) {
                var map = {};
                data.forEach(function (value, index) {
                    var id = value.id;
                    if (id) map[id] = value;
                });
                var _data = [];
                for (var i = 0, len = this.data.length; i < len; i++) {
                    var _id = this.data[i].id;
                    if (_id && map[_id]) continue;
                    _data.push(this.data[i]);
                }
                this.data = _data;
                this.redraw();
            }
            if (data && (typeof data === "undefined" ? "undefined" : _typeof(data)) == 'object') {
                var _data = [];
                var id = data.id;
                if (!id) return this;
                for (var i = 0, len = this.data.length; i < len; i++) {
                    var _id = this.data[i].id;
                    if (id == _id) continue;
                    _data.push(this.data[i]);
                }
                this.data = _data;
                this.redraw();
            }
            return this;
        }
    }, {
        key: "remvoeDatas",
        value: function remvoeDatas(data) {
            this.removeData(data);
        }
    }, {
        key: "on",
        value: function on(eventType, callback) {
            if (eventType != 'click') {
                // maptalks.Layer.call(this,eventType,callback);
            } else {
                if (!eventType || !callback) throw new Error('eventType or callback is error');
                var self = this;
                var mapEvent = function mapEvent(e) {
                    self._clickEvent(e, callback);
                };
                this.eventMap[eventType] = mapEvent;
                this._initEvent();
            }
        }
    }, {
        key: "off",
        value: function off(eventType, callback) {
            var v = this.eventMap[eventType];
            var map = this.getMap();
            map.off(eventType, v);
            delete this.eventMap[eventType];
            return this;
        }
    }, {
        key: "getCanvas",
        value: function getCanvas() {
            return this._canvas;
        }
    }, {
        key: "setCanvas",
        value: function setCanvas(canvas) {
            // console.log(this._canvas);
            this._canvas = canvas;
        }
    }, {
        key: "getContext",
        value: function getContext() {
            return this._context;
        }
    }, {
        key: "setContext",
        value: function setContext(context) {
            this._context = context;
        }

        ////////////////////////////////////////////////////////////////////////////

    }, {
        key: "_init",
        value: function _init() {
            this._initCanvasType(); //初始化canvas绘制类型
            this._animationCall(); //动画判断和回调
            this._initEvent();
            this.inited = true;
            this._reset();
        }
    }, {
        key: "_reset",
        value: function _reset() {
            var map = this.getMap();
            if (!map) throw new Error('请现将该图层添加到地图上');

            var distance = 100;
            var size = map.distanceToPixel(distance, distance);
            var width = size.width;
            var height = size.height;
            this.lengthAverage = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / Math.sqrt(Math.pow(distance, 2) * 2);
            this._drawCanvasLayer();
        }

        //经纬度转屏幕坐标

    }, {
        key: "_lnglatToPixel",
        value: function _lnglatToPixel(lnglat, mercatormeters) {
            if (!Array.isArray(lnglat)) {
                console.error(lnglat);
                throw new Error('lnglat is error');
            }
            var devicePixelRatio = this.devicePixelRatio = maptalks.Browser.retina ? 2 : 1;
            var map = this.getMap();
            var projection = map.getProjection();
            var xyArray = [];
            if (Array.isArray(lnglat[0])) {
                for (var i = 0; i < lnglat.length; i++) {
                    var _lnglat = lnglat[i];
                    var lng = _lnglat[0];
                    var lat = _lnglat[1];
                    var xy = projection.project(new maptalks.Coordinate(lng, lat));
                    xy = map._prjToContainerPoint(xy);
                    xyArray.push([xy.x, xy.y]);
                }
            } else {
                var lng = lnglat[0];
                var lat = lnglat[1];
                var xy = projection.project(new maptalks.Coordinate(lng, lat));
                xy = map._prjToContainerPoint(xy);
                xyArray = [xy.x, xy.y];
            }
            return xyArray;
        }
    }, {
        key: "_drawCanvasLayer",
        value: function _drawCanvasLayer() {
            var _this2 = this;

            var renderer = this.getRenderer();
            var newData = [];
            var currenttime = this.time;
            if (this.isEnabledTime) {
                if (this.time == undefined) return;
                var trails = this.animationOptions.trails || 5;
                for (var x in this.data) {
                    var item = this.data[x];
                    if (currenttime && item.time > currenttime - trails && item.time < currenttime) newData.push(item);
                }
                var context = this.getContext();
                context.save();
                context.globalCompositeOperation = 'destination-out';
                context.fillStyle = 'rgba(0, 0, 0, .1)';
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                context.restore();
                renderer.completeRender();
            } else {
                newData = this.data;
                var context = this.getContext();
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            }
            var currentViewData = [];
            var geometry, coordinates, type, e, latlng, raduis, mercatormeters;
            for (var i = 0; i < newData.length; i++) {
                geometry = newData[i].geometry;
                type = geometry.type;
                coordinates = geometry.coordinates;
                raduis = geometry.radius;
                mercatormeters = newData[i].geometry.mercatormeters;
                e = newData[i];
                if (type == GL.GMVI.Geometry.Point || type == GL.GMVI.Geometry.Rectangle) {
                    e.xy = this._lnglatToPixel(coordinates, mercatormeters);
                    if (geometry.width) {
                        e.width = this.lengthAverage * geometry.width;
                    }
                    if (geometry.height) {
                        e.height = this.lengthAverage * geometry.height;
                    }
                    currentViewData.push(e);
                } else {
                    if (type == GL.GMVI.Geometry.Circle) {
                        var circle = new _Circle2.default(coordinates, raduis);
                        var lnglatArr = circle.toArray();
                        e.xy = this._lnglatToPixel(lnglatArr);
                        currentViewData.push(e);
                    } else {
                        var xy = [];
                        for (var j = 0; j < coordinates.length; j++) {
                            var lnglat = coordinates[j];
                            xy.push(this._lnglatToPixel(lnglat, mercatormeters[j]));
                        }
                        e.xy = xy;
                        currentViewData.push(e);
                    }
                }
            }
            var dataSet = new GL.GMVI.DataSet(currentViewData);
            if (this.options.draw != GL.GMVI.Cluster) {
                if (!this.options.noRender) this.canvasType.draw(this.getContext(), dataSet, this.options, renderer);
                if (this.options.callback) this.options.callback(dataSet);
            } else {
                var geometry, coordinates, type;
                var _data = [];
                for (var i = 0; i < newData.length; i++) {
                    geometry = newData[i].geometry;
                    type = geometry.type;
                    if (type != GL.GMVI.Geometry.Point) continue;
                    coordinates = geometry.coordinates;
                    var lng = parseFloat(coordinates[0]);
                    var lat = parseFloat(coordinates[1]);
                    _data.push([lng, lat, 1, newData[i]]);
                }
                var map = this.getMap(),
                    size = map.getSize(),
                    zoom = map.getZoom(),
                    extent = map.getExtent(),
                    center = map.getCenter();
                var maxClusterLv = this.options.maxClusterLv || map.getMaxZoom();
                var minx = extent.xmin;
                var miny = extent.ymin;
                var maxx = extent.xmax;
                var maxy = extent.ymax;
                var width = size.width;
                var height = size.height;
                var crsCode = map.getSpatialReference()._projection.code;
                // console.log(extent)
                if (maxx < minx || maxy < miny) {
                    minx = -180, maxx = 180, miny = -90, maxy = 90;
                }
                // minx=-180,maxx=180,miny=-90,maxy=90;
                var clusterResult = GL.GMVI.SuperCluster(this.data, zoom, maxClusterLv, minx, miny, maxx, maxy, width, height, crsCode);
                if (clusterResult) {
                    var unClustersData = [];
                    var unCluster = [];
                    (clusterResult.unClusters || []).forEach(function (element) {
                        var xy = _this2._lnglatToPixel(element.center);
                        element.xy = xy;
                        element.item.xy = xy;
                        unClustersData.push(element.item);
                        unCluster.push(element);
                    });
                    var clusters = clusterResult.clusters || [];
                    var clusterData = [];
                    this.unClustersData = unClustersData;
                    clusters.forEach(function (element) {
                        // console.log(element.xy);
                        var xy = _this2._lnglatToPixel(element.center);
                        element.xy = xy;
                        // console.log(element.xy);
                        clusterData.push(element);
                        // console.log('==========');
                    });
                    clusterResult.clusters = clusterData;
                    clusterResult.unClusters = unCluster;
                    // console.log(unClustersData);
                    this.canvasType.draw(this.getContext(), clusterResult, this.options);
                }

                //聚合工具对数据进行聚合
                // var clusterResult=GL.GMVI.ClusterUtil.cluster(_data,zoom,maxClusterLv,minx,miny,maxx,maxy,width,height)
                // if(clusterResult) {
                //     var cluster = clusterResult.cluster;
                //     var discrete = clusterResult.discrete
                //     if (cluster) {
                //         for (var x in cluster) {
                //             var o = cluster[x];
                //             var center = o.center;
                //             var xy = this._lnglatToPixel(center);
                //             clusterResult.cluster[x].xy = xy;
                //             this.status = 'cluster'
                //         }
                //     }
                //     if (discrete) {
                //         for (var i = 0; i < discrete.length; i++) {
                //             var o = discrete[i];
                //             var center = o.slice(0, 2);
                //             var xy = this._lnglatToPixel(center);
                //             clusterResult.discrete[i] = clusterResult.discrete[i].concat(xy);
                //             this.status = 'discrete'
                //         }
                //     }
                //     this.canvasType.draw(this.getContext(), clusterResult, this.options);
                // }
            }
        }

        //数据格式化和过滤

    }, {
        key: "_filterData",
        value: function _filterData(data) {
            var self = this;
            var draw = self.options.draw;
            //以下绘制类型统一的规划到Simple下
            if (draw == GL.GMVI.Bubble || draw == GL.GMVI.Intensity || draw == GL.GMVI.Category || draw == GL.GMVI.Choropleth || draw == GL.GMVI.Simple || draw == GL.GMVI.Effect) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (draw == GL.GMVI.Bubble) {
                        data[i]._size = self.intensity.getSize(item.count);
                    }
                    if (draw == GL.GMVI.Intensity) {
                        if (data[i].geometry.type === GL.GMVI.Geometry.LineString || data[i].geometry.type === GL.GMVI.Geometry.Polyline) {
                            data[i].strokeStyle = self.intensity.getColor(item.count);
                        } else {
                            data[i].fillStyle = self.intensity.getColor(item.count);
                        }
                    }
                    if (draw == GL.GMVI.Category) {
                        if (data[i].geometry.type === GL.GMVI.Geometry.LineString || data[i].geometry.type === GL.GMVI.Geometry.Polyline) {
                            data[i].strokeStyle = self.category.get(item.count);
                        } else data[i].fillStyle = self.category.get(item.count);
                    }
                    if (draw == GL.GMVI.Choropleth) {
                        if (data[i].geometry.type === GL.GMVI.Geometry.LineString || data[i].geometry.type === GL.GMVI.Geometry.Polyline) data[i].strokeStyle = self.choropleth.get(item.count);else data[i].fillStyle = self.choropleth.get(item.count);
                    }
                    if (draw == GL.GMVI.Effect) {
                        data[i].size = self.options.size || 15;
                        data[i]._size = data[i].size * Math.random();
                        data[i].strokeStyle = self.choropleth.get(item.count);
                    }
                }
            }

            for (var i = 0, len = data.length; i < len; i++) {
                var mercatormeters = [];
                var coordinates = data[i].geometry.coordinates;
                if (Array.isArray(coordinates[0])) {
                    for (var j = 0; j < coordinates.length; j++) {
                        var mercatormeter = merc.forward(coordinates[j]);
                        mercatormeters.push(mercatormeter);
                    }
                } else {
                    mercatormeters = merc.forward(coordinates);
                }

                data[i].geometry.mercatormeters = mercatormeters;
            }
            return data;
        }
    }, {
        key: "_animationCall",
        value: function _animationCall() {
            var self = this;
            var map = this.getMap();
            if (self.options.draw == 'time' || this.isEnabledTime) {
                var animator = self.animator = new _Animator2.default(function (time) {
                    self.time = time;
                    // console.log(time)
                    self._drawCanvasLayer.bind(self).call(time);
                }, {
                    steps: self.animationOptions.steps || 100,
                    stepsRange: self.animationOptions.stepsRange || 100,
                    animationDuration: self.animationOptions.duration || 10
                });
                animator.start();
                map.addEventListener('movestart', function () {
                    animator.pause();
                });
                // //图层移除，暂停动画
                // GL.Hub.on(GL.E.CanvasLayerRemove,function () {
                //     animator.stop();
                // });
                map.addEventListener('moveend', function () {
                    animator.start();
                });
            }
        }
    }, {
        key: "_initCanvasType",
        value: function _initCanvasType() {
            var canvasType;
            switch (this.options.draw) {
                case GL.GMVI.Heatmap:
                    canvasType = new _GLCanvasHeat2.default();
                    break;
                case GL.GMVI.Grid:
                    canvasType = new _GLCanvasGrid2.default();
                    break;
                case GL.GMVI.Honeycomb:
                    canvasType = new _GLCanvasHoneycomb2.default();
                    break;
                case GL.GMVI.Text:
                    canvasType = new _GLCanvasText2.default();
                    break;
                case GL.GMVI.Icon:
                    canvasType = new _GLCanvasIcon2.default();
                    break;
                case GL.GMVI.Cluster:
                    // console.log('cluster')
                    canvasType = new _GLCanvasCluster2.default();
                    break;
                case GL.GMVI.Effect:
                    canvasType = new _GLCanvasEffect2.default();
                    break;
                case GL.GMVI.TagCloud:
                    canvasType = new _GLCanvasTagCloud2.default();
                    break;
                case GL.GMVI.Migrate:
                    canvasType = new _GLCanvasMigrate2.default();
                    break;
                case GL.GMVI.Bar:
                    canvasType = new CanvasBar();
                    break;
                case GL.GMVI.WaterBubble:
                    canvasType = new _GLCanvasWaterBubble2.default();
                    break;
                // case GL.GMVI.Radiation:
                //     canvasType=new CanvasRadiation();
                //     break;
                case GL.GMVI.Star:
                    canvasType = new _GLCanvasStar2.default();
                    break;
                case GL.GMVI.Scatter:
                    canvasType = new _GLCanvasScatter2.default();
                    break;
                case GL.GMVI.MigrateLines:
                    canvasType = new _GLCanvasMigrateLines2.default();
                    break;
                case GL.GMVI.Arrow:
                    canvasType = new _GLCanvasArrow2.default();
                    break;
                case GL.GMVI.WaterBubble:
                    canvasType = new _GLCanvasWaterBubble2.default();
                    break;
                case GL.GMVI.Radial:
                    canvasType = new _GLCanvasRadial2.default();
                    break;

                default:
                    //simaple
                    canvasType = new _GLCanvasSimple2.default();
            }
            this.canvasType = canvasType;
        }
    }, {
        key: "_clickEvent",
        value: function _clickEvent(e, callback) {
            var map = this.getMap();
            var coordinates = e.coordinate;
            var pixel = map.coordinateToContainerPoint(coordinates);
            // console.log(pixel)
            if (this.options.draw == GL.GMVI.Cluster && this.status == GL.GMVI.Cluster) {
                return this;
            }
            var canvas = document.createElement('canvas');
            canvas.width = this._canvas.width;
            canvas.height = this._canvas.height;
            var ctx = canvas.getContext('2d');
            var data = this.data;
            if (this.options.draw == GL.GMVI.Cluster) data = this.unClustersData;
            for (var i = 0; i < data.length; i++) {
                if (this.canvasType instanceof _GLCanvasMigrateLines2.default) {
                    var xy = data[i].xy;
                    for (var j = 0, len = xy.length; j < len - 1; j++) {
                        var _xy = [xy[j], xy[j + 1]];
                        ctx.beginPath();
                        _GLSimplePath2.default.drawArc(ctx, _xy, this.options);
                        if (ctx.isPointInPath(pixel.x, pixel.y)) {
                            data[i].location = e;
                            callback(data[i], e);
                            return this;
                        }
                    }
                } else {
                    ctx.beginPath();
                    _GLSimplePath2.default.draw(ctx, data[i], this.options);
                    ctx.restore();
                    if (ctx.isPointInPath(pixel.x, pixel.y)) {
                        data[i].location = e;
                        callback(data[i], e);
                        return this;
                    }
                }
            }
            return this;
        }
    }, {
        key: "_initEvent",
        value: function _initEvent() {
            this.eventMap = this.eventMap || {};
            var map = this.getMap();
            for (var eventType in this.eventMap) {
                map.addEventListener(eventType, this.eventMap[eventType]);
            }
        }
    }, {
        key: "_initOptions",
        value: function _initOptions(options) {
            this.options = GL.GMVI.Extend(this.options, options);
            this.animationOptions = this.options.animation;
            this.isEnabledTime = this.animationOptions && !(this.animationOptions.enabled === false);
            this.intensity = new _GLIntensity2.default({
                maxSize: this.options.maxSize,
                gradient: this.options.gradient,
                max: this.options.max
            });
            this.category = new _GLCategory2.default(this.options.splitList);
            this.choropleth = new _GLChoropleth2.default(this.options.splitList);
            this.eventMap = {};
        }
    }, {
        key: "_clearTime",
        value: function _clearTime() {
            if (this.animator) {
                this.animator.stop();
            }
            var canvasType = this.canvasType;
            if (canvasType instanceof _GLCanvasEffect2.default) {
                if (canvasType.anmimation) {
                    cancelAnimationFrame(canvasType.anmimation);
                    delete canvasType.anmimation;
                    console.log('clear effect animation');
                }
            }
            if (canvasType instanceof _GLCanvasMigrate2.default) {
                if (canvasType.migration) {
                    window.cancelAnimationFrame(canvasType.migration.requestAnimationId);
                    canvasType.migration.started = false;
                    console.log('clear migration animation');
                }
            }
            if (canvasType instanceof _GLCanvasMigrateLines2.default) {
                if (canvasType.migration) {
                    window.cancelAnimationFrame(canvasType.migration.requestAnimationId);
                    canvasType.migration.started = false;
                    console.log('clear migrationLine animation');
                }
            }

            if (canvasType instanceof _GLCanvasScatter2.default) {
                if (canvasType.animation) {
                    window.cancelAnimationFrame(canvasType.animation);
                    // canvasType.migration.started=false;
                    console.log('clear scatter animation');
                }
            }
            for (var i = 0, len = this.data.length; i < len; i++) {
                var d = this.data[i];
                var video = d.video;
                if (video && video.timeId) {
                    window.clearInterval(video.timeId);
                }
            }
            return this;
        }
    }], [{
        key: "fromJSON",
        value: function fromJSON(json) {
            if (!json || json['type'] !== 'GMVICanvasLayer') {
                return null;
            }
            return new GMVICanvasLayer(json['id'], json['data'], json['options']);
        }
    }]);

    return GMVICanvasLayer;
}(maptalks.Layer);

GMVICanvasLayer.mergeOptions(options);

GMVICanvasLayer.registerJSONType('GMVICanvasLayer');

var GMVICanvasLayerRenderer = function (_maptalks$renderer$Ca) {
    _inherits(GMVICanvasLayerRenderer, _maptalks$renderer$Ca);

    function GMVICanvasLayerRenderer() {
        _classCallCheck(this, GMVICanvasLayerRenderer);

        return _possibleConstructorReturn(this, (GMVICanvasLayerRenderer.__proto__ || Object.getPrototypeOf(GMVICanvasLayerRenderer)).apply(this, arguments));
    }

    _createClass(GMVICanvasLayerRenderer, [{
        key: "getLayer",
        value: function getLayer() {
            return this.layer;
        }
    }, {
        key: "draw",
        value: function draw() {
            var layer = this.layer;
            this.prepareCanvas();
            if (!layer.getCanvas()) layer.setCanvas(this.canvas);
            if (!layer.getContext()) layer.setContext(this.context);
            if (!layer.inited) {
                layer._init();
                layer.inited = true;
            }
            layer._reset();
        }
    }, {
        key: "drawOnInteracting",
        value: function drawOnInteracting() {
            // this.draw();
        }
    }]);

    return GMVICanvasLayerRenderer;
}(maptalks.renderer.CanvasRenderer);

GMVICanvasLayer.registerRenderer('canvas', GMVICanvasLayerRenderer);
GL.GMVI.CanvasLayer = GMVICanvasLayer;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Abstract handler for animator steps
 */
var AnimatorStepsRange = function AnimatorStepsRange(start, end) {
    if (start < 0) throw new Error('start must be a positive number');
    if (start >= end) throw new Error('start must be smaller than end');

    this.start = start;
    this.end = end;
};

AnimatorStepsRange.prototype = {

    diff: function diff() {
        return this.end - this.start;
    },

    isLast: function isLast(step) {
        // round step into an integer, to be able to compare number as expected (also converts bad input to 0)
        return (step | 0) === this.end;
    }
};

function clamp(a, b) {
    return function (t) {
        return Math.max(Math.min(t, b), a);
    };
}

function invLinear(a, b) {
    var c = clamp(0, 1.0);
    return function (t) {
        return c((t - a) / (b - a));
    };
}

function linear(a, b) {
    var c = clamp(a, b);
    function _linear(t) {
        return c(a * (1.0 - t) + t * b);
    }

    _linear.invert = function () {
        return invLinear(a, b);
    };

    return _linear;
}

var global = typeof window === 'undefined' ? {} : window;

var requestAnimationFrame = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame || function (callback) {
    return global.setTimeout(callback, 1000 / 60);
};

var cancelAnimationFrame = global.cancelAnimationFrame || global.mozCancelAnimationFrame || global.webkitCancelAnimationFrame || global.msCancelAnimationFrame || function (id) {
    clearTimeout(id);
};

/**
 * options:
 *    animationDuration in seconds
 *    animationDelay in seconds
 */
function Animator(callback, options) {
    if (!options.steps) {
        throw new Error("steps option missing");
    }
    this.options = options;
    this.running = false;
    this._tick = this._tick.bind(this);
    this._t0 = +new Date();
    this.callback = callback;
    this._time = 0.0;
    this.itemsReady = false;

    this.options.animationDelay = 0;
    this.options.maxDelta = 0.2;
    this.options.loop = options.loop === undefined ? true : options.loop;

    this.steps(options.steps);
    if (options.stepsRange && options.stepsRange.start !== undefined && options.stepsRange.end !== undefined) {
        this.stepsRange(options.stepsRange.start, options.stepsRange.end);
    }
}

Animator.prototype = {

    start: function start() {
        this.running = true;
        requestAnimationFrame(this._tick);
        this.options.onStart && this.options.onStart();
        if (this.stepsRange().diff() === 1) {
            this.running = false;
        }
    },

    isRunning: function isRunning() {
        return this.running;
    },

    stop: function stop() {
        this.pause();
        this.time(this.stepsRange().start);
        this.options.onStop && this.options.onStop();
    },

    // real animation time
    time: function time(_) {
        if (!arguments.length) return this._time;
        this._time = _;
        var t = this.range(this.domain(this._time));
        this.callback(t);
    },

    toggle: function toggle() {
        if (this.running) {
            this.pause();
        } else {
            this.start();
        }
    },

    rescale: function rescale() {
        this.domainInv = linear(this.options.animationDelay, this.options.animationDelay + this.options.animationDuration);
        this.domain = this.domainInv.invert();
        this.range = linear(0, this._defaultStepsRange.end);
        this.rangeInv = this.range.invert();
        this.time(this._time);
        this.running ? this.start() : this.pause();
        return this;
    },

    duration: function duration(_) {
        if (!arguments.length) return this.options.animationDuration;
        this.options.animationDuration = _;
        if (this.time() > _) {
            this.time(0);
        }
        this.rescale();
        return this;
    },

    steps: function steps(_) {
        this.options.steps = _;
        this._defaultStepsRange = new AnimatorStepsRange(0, _);
        return this.rescale();
    },

    // Returns or sets a (custom) steps range
    // Setting a steps range must be within the full range
    stepsRange: function stepsRange(start, end) {
        if (arguments.length === 2) {
            if (start < this._defaultStepsRange.start) throw new Error('start must be within default steps range');
            if (end > this._defaultStepsRange.end) throw new Error('end must be within default steps range');

            this._customStepsRange = new AnimatorStepsRange(start, end);
            this.options.onStepsRange && this.options.onStepsRange();

            // Change current step if it's outside the new custom range
            var step = this.step() | 0; // round to an integer
            if (step < start || step > end) {
                this.step(start);
            }
        }
        return this._customStepsRange || this._defaultStepsRange;
    },

    removeCustomStepsRange: function removeCustomStepsRange() {
        this._customStepsRange = undefined;
        this.options.onStepsRange && this.options.onStepsRange();
    },

    step: function step(s) {
        if (arguments.length === 0) return this.range(this.domain(this._time));
        this._time = this.domainInv(this.rangeInv(s));
    },

    pause: function pause() {
        this.running = false;
        cancelAnimationFrame(this._tick);
        this.options.onPause && this.options.onPause();
    },

    _tick: function _tick() {
        var t1 = +new Date();
        var delta = (t1 - this._t0) * 0.001;
        // if delta is really big means the tab lost the focus
        // at some point, so limit delta change
        delta = Math.min(this.options.maxDelta, delta);
        this._t0 = t1;
        this._time += delta;

        var stepsRange = this.stepsRange();
        if (stepsRange.isLast(this.step())) {
            if (!this.options.loop) {
                // set time to max time
                this.time(this.options.animationDuration);
                this.pause();
            } else {
                this.step(stepsRange.start);
            }
        }
        if (this.running) {
            this.time(this._time);
            requestAnimationFrame(this._tick);
        }
    }

};

exports.default = Animator;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2016/11/26.
 */

var GLCategory = function () {
    function GLCategory(splitList) {
        _classCallCheck(this, GLCategory);

        this.splitList = splitList || {
            other: 1
        };
    }

    _createClass(GLCategory, [{
        key: 'get',
        value: function get(count) {
            var splitList = this.splitList;

            var value = splitList['other'];

            for (var i in splitList) {
                if (count == i) {
                    value = splitList[i];
                    break;
                }
            }
            return value;
        }
    }]);

    return GLCategory;
}();

exports.default = GLCategory;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2016/11/26.
 */

var GLChoropleth = function () {
    function GLChoropleth(splitList) {
        _classCallCheck(this, GLChoropleth);

        this.splitList = splitList || [{
            start: 0,
            value: 'red'
        }];
    }

    _createClass(GLChoropleth, [{
        key: 'get',
        value: function get(count) {
            count = count.toFixed(0);
            var splitList = this.splitList;
            var value = undefined;
            for (var i = 0; i < splitList.length; i++) {
                if (count >= splitList[i].start && count <= splitList[i].end) {
                    value = splitList[i].color;
                    break;
                }
            }
            // if(!value)
            //     console.log('count:'+count)
            return value;
        }
    }]);

    return GLChoropleth;
}();

exports.default = GLChoropleth;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

var _Marker = __webpack_require__(2);

var _Marker2 = _interopRequireDefault(_Marker);

var _Arc = __webpack_require__(6);

var _Arc2 = _interopRequireDefault(_Arc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var constoptions = {
    pulseRadius: 25,
    pulseBorderWidth: 3,
    arcLabelFont: '15px sans-serif',
    color: 'red',
    size: 10

};

var GLCanvasArrow = function (_BaseCanvas) {
    _inherits(GLCanvasArrow, _BaseCanvas);

    function GLCanvasArrow() {
        _classCallCheck(this, GLCanvasArrow);

        return _possibleConstructorReturn(this, (GLCanvasArrow.__proto__ || Object.getPrototypeOf(GLCanvasArrow)).call(this));
    }

    _createClass(GLCanvasArrow, [{
        key: "draw",
        value: function draw(context, dataSet, options) {
            var data = dataSet.get();
            // var context=canvas.getContext("2d");
            context.clearRect(0, 0, context.width, context.height);
            context.save();
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var startXy = d.xy[0];
                var endXy = d.xy[1];
                var color = d.color || options.fillStyle || constoptions.color;
                var size = d.size || options.size || constoptions.size;
                var startX = startXy[0],
                    startY = startXy[1],
                    endX = endXy[0],
                    endY = endXy[1];
                var arc = new _Arc2.default({
                    startX: startX,
                    startY: startY,
                    endX: endX,
                    endY: endY,
                    color: color
                });
                var marker = new _Marker2.default({
                    x: endX,
                    y: endY,
                    rotation: arc.endAngle + Math.PI / 2,
                    style: 'arrow',
                    color: color,
                    size: size,
                    borderWidth: 0,
                    borderColor: color
                });

                marker.draw(context);
            }
        }
    }]);

    return GLCanvasArrow;
}(_BaseCanvas3.default);

exports.default = GLCanvasArrow;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/1/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
// import  ClusterUtil from "../../utils/ClusterUtil"

var GLCanvasCluster = function (_BaseCanvas) {
    _inherits(GLCanvasCluster, _BaseCanvas);

    function GLCanvasCluster() {
        _classCallCheck(this, GLCanvasCluster);

        return _possibleConstructorReturn(this, (GLCanvasCluster.__proto__ || Object.getPrototypeOf(GLCanvasCluster)).call(this));
    }

    _createClass(GLCanvasCluster, [{
        key: 'draw',
        value: function draw(context, dataSet, options) {
            var ctx = context;
            ctx.clearRect(0, 0, ctx.width, ctx.height);
            ctx.save();
            if (!dataSet) return;
            for (var key in options) {
                ctx[key] = options[key];
            }
            var clusters = dataSet.clusters;
            var unClusters = dataSet.unClusters;
            if (clusters) {
                var self = this;
                var size = options.size || 20;
                clusters.forEach(function (element) {
                    var xy = element.xy;
                    var count = element.count;
                    ctx.fillStyle = self.getOutColor(count);
                    var innerColor = self.getInnerColor(count);
                    if (count > 1000) count = (count / 1000).toFixed(1) + 'k';
                    ctx.beginPath();
                    ctx.arc(xy[0], xy[1], size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.save();
                    ctx.fillStyle = innerColor;
                    ctx.beginPath();
                    ctx.arc(xy[0], xy[1], size - 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.save();

                    ctx.font = options.font || 15 + 'px Microsoft YaHei UI';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = options.fillStyle || '#151515';
                    ctx.fillText(count, xy[0], xy[1]);
                });
            }

            if (unClusters && unClusters.length > 0) {
                var len = unClusters.length;
                var size = options.size || 10;
                for (var i = 0; i < len; i++) {
                    var o = unClusters[i];
                    var xy = o.xy;
                    var item = o.item;
                    var icon = item.icon;
                    if (icon) {
                        ctx.fillStyle = 'white';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.drawImage(icon, xy[0] - icon.width / 2, xy[1] - icon.height / 2, icon.width, icon.height);
                    } else {
                        ctx.fillStyle = options.fillStyle || this.getColor(1);
                        ctx.beginPath();
                        ctx.arc(xy[0], xy[1], size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = options.strokeStyle || '#fff';
                        ctx.stroke();
                    }
                }
            }
        }
    }, {
        key: 'getOutColor',
        value: function getOutColor(count) {
            var color = 'rgba(110, 204, 57, 0.6)';
            if (!count) return color;
            if (count > 1000) color = 'rgba(241, 211, 87, 0.6)';
            if (count > 5000) color = 'rgba(235,129,70,0.6)';
            return color;
        }
    }, {
        key: 'getInnerColor',
        value: function getInnerColor(count) {
            var color = 'rgba(110, 204, 57, 1)';
            if (!count) return color;
            if (count > 1000) color = 'rgba(241, 211, 87, 1)';
            if (count > 5000) color = 'rgba(235,129,70,1)';
            return color;
        }
    }]);

    return GLCanvasCluster;
}(_BaseCanvas3.default);

exports.default = GLCanvasCluster;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/2/24.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GLCanvasEffect = function (_BaseCanvas) {
    _inherits(GLCanvasEffect, _BaseCanvas);

    function GLCanvasEffect() {
        _classCallCheck(this, GLCanvasEffect);

        return _possibleConstructorReturn(this, (GLCanvasEffect.__proto__ || Object.getPrototypeOf(GLCanvasEffect)).call(this));
    }

    _createClass(GLCanvasEffect, [{
        key: 'draw',
        value: function draw(context, dataSet, options, renderer) {
            var data = dataSet.get();
            if (!data || data.length == 0) {
                if (!this.anmimation) {
                    cancelAnimationFrame(this.anmimation);
                    delete this.anmimation;
                }
                return;
            }
            // for(var i=0,len=data.length;i<len;i++){
            //     data[i]._size=1;
            // }
            this.data = data;
            this.options = options;

            var canvas = context.canvas;
            var width = canvas.width,
                height = canvas.height;
            context.clearRect(0, 0, width, height);
            context.save();
            for (var key in options) {
                context[key] = options[key];
            }
            var backDom = document.createElement('canvas');
            backDom.width = width;
            backDom.height = height;
            var backCtx = backDom.getContext('2d');
            backCtx.globalAlpha = 0.85; //关键
            backCtx.globalCompositeOperation = 'copy';
            this.anmimationEnd = true;
            var self = this;

            // if(!this.anmimation) {
            //     this.anmimation = setInterval(function () {
            //         var w=canvas.width,h=canvas.height;
            //         var devicePixelRatio=this.devicePixelRatio=maptalks.Browser.retina ? 2 : 1;
            //         backCtx.drawImage(canvas, 0, 0, w/devicePixelRatio,h/devicePixelRatio);
            //         context.clearRect(0, 0, w,h);
            //         if(self.anmimationEnd){
            //             self.drawEffect(context);
            //         }
            //         context.drawImage(backDom, 0, 0,width, height);
            //         if(renderer) renderer.completeRender();
            //     }, 300)
            // }


            if (!self.anmimation) {
                var _drawFrame = function _drawFrame() {
                    var w = canvas.width,
                        h = canvas.height;
                    var devicePixelRatio = self.devicePixelRatio = maptalks.Browser.retina ? 2 : 1;
                    backCtx.drawImage(canvas, 0, 0, w / devicePixelRatio, h / devicePixelRatio);
                    context.clearRect(0, 0, w, h);
                    if (self.anmimationEnd) {
                        self.drawEffect(context);
                    }
                    context.drawImage(backDom, 0, 0, width, height);
                    if (renderer) renderer.completeRender();
                    self.anmimation = requestAnimationFrame(_drawFrame);
                };

                _drawFrame();
            }
        }
    }, {
        key: 'drawEffect',
        value: function drawEffect(context) {
            this.anmimationEnd = false;
            var options = this.options;
            var offset = options.offset || 1;
            for (var i = 0, len = this.data.length; i < len; i++) {
                var item = this.data[i];
                var size = item._size || 35;
                var xy = item.xy;
                context.strokeStyle = item.color || item.strokeStyle || options.strokeStyle || 'red';
                var devicePixelRatio = this.devicePixelRatio;

                context.save();
                context.arc(xy[0], xy[1], size, 0, Math.PI * 2, true);
                context.closePath();
                context.lineWidth = 3;
                context.stroke();
                context.restore();

                context.beginPath();
                this.data[i]._size += offset;
                if (this.data[i]._size > this.data[i].size) {
                    this.data[i]._size = 1;
                }
            }
            this.anmimationEnd = true;
        }
    }]);

    return GLCanvasEffect;
}(_BaseCanvas3.default);

exports.default = GLCanvasEffect;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLIntensity = __webpack_require__(1);

var _GLIntensity2 = _interopRequireDefault(_GLIntensity);

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016/11/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GLCanvasGrid = function (_BaseCanvas) {
    _inherits(GLCanvasGrid, _BaseCanvas);

    function GLCanvasGrid() {
        _classCallCheck(this, GLCanvasGrid);

        return _possibleConstructorReturn(this, (GLCanvasGrid.__proto__ || Object.getPrototypeOf(GLCanvasGrid)).call(this));
    }

    _createClass(GLCanvasGrid, [{
        key: "draw",
        value: function draw(context, dataSet, options) {
            context.clearRect(0, 0, context.width, context.height);
            context.save();
            var data = dataSet.get();
            var grids = {};
            var size = options._size || options.size || 50;
            var offset = options.offset || {
                x: 0,
                y: 0
            };
            for (var i = 0; i < data.length; i++) {
                var xy = data[i].xy;
                var gridKey = Math.floor((xy[0] - offset.x) / size) + "," + Math.floor((xy[1] - offset.y) / size);
                if (!grids[gridKey]) {
                    grids[gridKey] = 0;
                }
                grids[gridKey] += ~~(data[i].count || 1);
            }
            for (var gridKey in grids) {
                gridKey = gridKey.split(",");
                var intensity = new _GLIntensity2.default({
                    max: options.max || 100,
                    gradient: options.gradient
                });
                context.beginPath();
                var x = gridKey[0] * size + .5 + offset.x;
                var y = gridKey[1] * size + .5 + offset.y;
                context.rect(x, y, size - 1, size - 1);
                context.fillStyle = intensity.getColor(grids[gridKey]);
                context.fill();
                if (options.showText) {
                    context.fillStyle = options.fillStyle || 'white';
                    context.font = options.font || 15 + 'px Microsoft YaHei UI';
                    var wh = context.measureText(grids[gridKey]);
                    var width = wh.width;
                    x = (x + x + size) / 2;
                    y = (y + y + size) / 2;
                    // context.fillText(grids[gridKey], gridKey[0] * size + .5 + offset.x + size / 2 -1, gridKey[1] * size + .5 + offset.y + size / 2 -1);
                    context.fillText(grids[gridKey], x - width / 2, y);
                }
                if (options.strokeStyle || options.lineWidth) {
                    context.stroke();
                }
            }
            context.restore();
        }
    }]);

    return GLCanvasGrid;
}(_BaseCanvas3.default);

exports.default = GLCanvasGrid;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLColorPalette = __webpack_require__(31);

var _GLColorPalette2 = _interopRequireDefault(_GLColorPalette);

var _GLIntensity = __webpack_require__(1);

var _GLIntensity2 = _interopRequireDefault(_GLIntensity);

var _GLSimplePath = __webpack_require__(5);

var _GLSimplePath2 = _interopRequireDefault(_GLSimplePath);

var _GLCanvas = __webpack_require__(9);

var _GLCanvas2 = _interopRequireDefault(_GLCanvas);

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016/11/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GLCanvasHeat = function (_BaseCanvas) {
    _inherits(GLCanvasHeat, _BaseCanvas);

    function GLCanvasHeat() {
        _classCallCheck(this, GLCanvasHeat);

        return _possibleConstructorReturn(this, (GLCanvasHeat.__proto__ || Object.getPrototypeOf(GLCanvasHeat)).call(this));
    }

    _createClass(GLCanvasHeat, [{
        key: "createCircle",
        value: function createCircle(size) {
            if (typeof document === 'undefined') {
                var circle = new _GLCanvas2.default();
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
    }, {
        key: "colorize",
        value: function colorize(pixels, gradient, options) {
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
    }, {
        key: "drawGray",
        value: function drawGray(context, dataSet, options) {
            var max = options.max || 100;
            var minOpacity = options.minOpacity;
            var size = options._size;
            if (size == undefined) {
                size = options.size;
                if (size == undefined) {
                    size = 13;
                }
            }
            for (var key in options) {
                context[key] = options[key];
            }
            var color = new _GLIntensity2.default({
                gradient: options.gradient,
                max: max
            });
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
                if (isNaN(i)) continue;
                var _data = dataOrderByAlpha[i];
                context.beginPath();
                if (!options.withoutAlpha) {
                    context.globalAlpha = i;
                }
                _data.forEach(function (item, index) {
                    if (!item.geometry) {
                        return;
                    }
                    var xy = item.xy;
                    var type = item.geometry.type;
                    if (type === GL.GMVI.Geometry.Point) {
                        var count = item.count === undefined ? 1 : item.count;
                        context.globalAlpha = count / max;
                        context.drawImage(circle, xy[0] - circle.width / 2, xy[1] - circle.height / 2);
                    } else if (type === GL.GMVI.Geometry.LineString || type === GL.GMVI.Geometry.Polyline) {
                        // context.globalAlpha = count / max;
                        context.globalAlpha = Math.max(item.count / max, minOpacity === undefined ? 0.05 : minOpacity);
                        _GLSimplePath2.default.draw(context, item, options);
                    } else if (type === GL.GMVI.Geometry.Polygon) {}
                });
                context.strokeStyle = color.getColor(i * max);
                context.stroke();
            }
        }
    }, {
        key: "draw",
        value: function draw(context, dataSet, options) {
            var strength = options.strength || 0.3;
            // var context=canvas.getContext('2d');
            context.clearRect(0, 0, context.width, context.height);
            context.strokeStyle = 'rgba(0,0,0,' + strength + ')';
            options = options || {};
            var data = dataSet.get();
            context.save();

            this.drawGray(context, data, options);

            if (!options.absolute) {
                var colored = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
                this.colorize(colored.data, _GLColorPalette2.default.getImageData({
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
    }]);

    return GLCanvasHeat;
}(_BaseCanvas3.default);

exports.default = GLCanvasHeat;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author kyle / http://nikai.us/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _GLCanvas = __webpack_require__(9);

var _GLCanvas2 = _interopRequireDefault(_GLCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLColorPalette = function () {
    function GLColorPalette() {
        _classCallCheck(this, GLColorPalette);
    }

    _createClass(GLColorPalette, [{
        key: 'getImageData',
        value: function getImageData(config) {
            var gradientConfig = config.gradient || config.defaultGradient;
            if (typeof document === 'undefined') {
                // var Canvas = require('canvas');
                var paletteCanvas = new _GLCanvas2.default(256, 1);
            } else {
                var paletteCanvas = document.createElement('canvas');
            }
            var paletteCtx = paletteCanvas.getContext('2d');

            paletteCanvas.width = 256;
            paletteCanvas.height = 1;

            var gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
            for (var key in gradientConfig) {
                gradient.addColorStop(parseFloat(key), gradientConfig[key]);
            }

            paletteCtx.fillStyle = gradient;
            paletteCtx.fillRect(0, 0, 256, 1);

            return paletteCtx.getImageData(0, 0, 256, 1).data;
        }
    }]);

    return GLColorPalette;
}();

exports.default = new GLColorPalette();

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLIntensity = __webpack_require__(1);

var _GLIntensity2 = _interopRequireDefault(_GLIntensity);

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/1/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GLCanvasHoneycomb = function (_BaseCanvas) {
    _inherits(GLCanvasHoneycomb, _BaseCanvas);

    function GLCanvasHoneycomb() {
        _classCallCheck(this, GLCanvasHoneycomb);

        return _possibleConstructorReturn(this, (GLCanvasHoneycomb.__proto__ || Object.getPrototypeOf(GLCanvasHoneycomb)).call(this));
    }

    _createClass(GLCanvasHoneycomb, [{
        key: "draw",
        value: function draw(context, dataSet, options) {
            context.clearRect(0, 0, context.width, context.height);
            context.save();
            var data = dataSet.get();
            for (var key in options) {
                context[key] = options[key];
            }
            var grids = {};
            var offset = options.offset || {
                x: 10,
                y: 10
            };
            var r = options._size || options.size || 40;
            r = r / 2 / Math.sin(Math.PI / 3);
            var dx = r * 2 * Math.sin(Math.PI / 3);
            var dy = r * 1.5;
            var binsById = {};
            for (var i = 0; i < data.length; i++) {
                var xy = data[i].xy;
                // var coordinates = data[i].geometry._coordinates || data[i].geometry.coordinates;
                // var latlng=[coordinates[1],coordinates[0]];
                // var point=GL.Hub.$map.toPixel(latlng)
                var py = (xy[1] - offset.y) / dy,
                    pj = Math.round(py),
                    px = (xy[0] - offset.x) / dx - (pj & 1 ? .5 : 0),
                    pi = Math.round(px),
                    py1 = py - pj;
                if (Math.abs(py1) * 3 > 1) {
                    var px1 = px - pi,
                        pi2 = pi + (px < pi ? -1 : 1) / 2,
                        pj2 = pj + (py < pj ? -1 : 1),
                        px2 = px - pi2,
                        py2 = py - pj2;
                    if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) pi = pi2 + (pj & 1 ? 1 : -1) / 2, pj = pj2;
                }
                var id = pi + "-" + pj,
                    bin = binsById[id];
                if (bin) {
                    bin.push(data[i]);
                } else {
                    bin = binsById[id] = [data[i]];
                    bin.i = pi;
                    bin.j = pj;
                    bin.x = (pi + (pj & 1 ? 1 / 2 : 0)) * dx;
                    bin.y = pj * dy;
                }
            }
            var intensity = new _GLIntensity2.default({
                max: options.max || 100,
                maxSize: r,
                gradient: options.gradient
            });
            for (var key in binsById) {
                var item = binsById[key];
                context.beginPath();
                var x1, y1, x, y;
                for (var j = 0; j < 6; j++) {
                    var radius = r;
                    var result = this.hex_corner({
                        x: item.x + offset.x,
                        y: item.y + offset.y
                    }, radius, j);
                    context.lineTo(result[0], result[1]);
                    if (j == 3) {
                        x1 = result[0], y1 = result[1];
                    }
                    if (j == 0) {
                        x = result[0], y = result[1];
                    }
                }
                context.closePath();
                var count = 0;
                for (var i = 0; i < item.length; i++) {
                    count += item[i].count || 1;
                }
                context.fillStyle = intensity.getColor(count);
                context.fill();
                context.strokeStyle = options.strokeStyle || 'white';
                context.stroke();
                if (options.showText && count > 0) {
                    context.textBaseline = 'middle';
                    context.textAlign = 'center';
                    context.font = options.font || "15px Arial";
                    context.fillStyle = options.fillStyle || 'white';
                    var text = count.toFixed(0);
                    var width = context.measureText(text).width;
                    x = (x + x1) / 2;
                    y = (y + y1) / 2;
                    // context.fillText(count.toFixed(0), (item.x+offset.x/2),(item.y+offset.y/2));
                    context.fillText(text, x, y);
                }
            }

            context.restore();
        }
    }, {
        key: "hex_corner",
        value: function hex_corner(center, size, i) {
            var angle_deg = 60 * i + 30;
            var angle_rad = Math.PI / 180 * angle_deg;
            return [center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad)];
        }
    }]);

    return GLCanvasHoneycomb;
}(_BaseCanvas3.default);

exports.default = GLCanvasHoneycomb;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016/11/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import pathSimple from "../path/GLSimplePath";
// import DataSet from "../../data/DataSet";


var GLCanvasIcon = function (_BaseCanvas) {
    _inherits(GLCanvasIcon, _BaseCanvas);

    function GLCanvasIcon() {
        _classCallCheck(this, GLCanvasIcon);

        return _possibleConstructorReturn(this, (GLCanvasIcon.__proto__ || Object.getPrototypeOf(GLCanvasIcon)).call(this));
    }

    _createClass(GLCanvasIcon, [{
        key: "draw",
        value: function draw(context, dataSet, options) {
            var data = dataSet.get();
            // var context=canvas.getContext("2d");
            context.clearRect(0, 0, context.width, context.height);
            // context.fillStyle = 'white';
            // context.textAlign = 'center';
            // context.textBaseline = 'middle';
            for (var i = 0, len = data.length; i < len; i++) {
                if (data[i].geometry) {
                    context.save();
                    var icon = data[i].icon;
                    var xy = data[i].xy;
                    var x = xy[0];
                    var y = xy[1];
                    // var rotate=data[i].rotate||0;
                    // context.translate(x,y);
                    // context.rotate(rotate* Math.PI / 180);
                    // context.translate(-x,-y);
                    context.drawImage(icon, x - icon.width / 2, y - icon.height / 2, icon.width, icon.height);
                    context.restore();
                }
            };
        }
    }]);

    return GLCanvasIcon;
}(_BaseCanvas3.default);

exports.default = GLCanvasIcon;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

var _Migration = __webpack_require__(35);

var _Migration2 = _interopRequireDefault(_Migration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var constoptions = {
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

var GLCanvasMigrate = function (_BaseCanvas) {
    _inherits(GLCanvasMigrate, _BaseCanvas);

    function GLCanvasMigrate() {
        _classCallCheck(this, GLCanvasMigrate);

        var _this = _possibleConstructorReturn(this, (GLCanvasMigrate.__proto__ || Object.getPrototypeOf(GLCanvasMigrate)).call(this));

        _this.options = constoptions;
        _this._style = {
            pulse: {
                radius: _this.options.pulseRadius,
                borderWidth: _this.options.pulseBorderWidth
            },
            arc: {
                width: _this.options.arcWidth,
                label: _this.options.arcLabel,
                font: _this.options.arcLabelFont
            }
        } || {};
        return _this;
    }

    _createClass(GLCanvasMigrate, [{
        key: "draw",
        value: function draw(context, dataSet, options, renderer) {
            var data = dataSet.get();
            this._style.pulse.radius = options.size || options.radius || this._style.pulse.radius;
            this._style.pulse.borderWidth = options.lineWidth || options.borderWidth || this._style.pulse.borderWidth;
            this._style.arc.font = options.font || this._style.arc.font;
            this._style.arc.width = options.lineWidth || options.borderWidth || this._style.arc.width;
            var _data = [];
            var devicePixelRatio = maptalks.Browser.retina ? 2 : 1;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var xy = obj.xy;
                var from = xy[0],
                    to = xy[xy.length - 1];
                from = [from[0] * devicePixelRatio, from[1] * devicePixelRatio];
                to = [to[0] * devicePixelRatio, to[1] * devicePixelRatio];
                _data.push({
                    from: from,
                    to: to,
                    labels: obj.labels,
                    color: obj.color || obj.strokeStyle || obj.fillStyle || options.strokeStyle || options.fillStyle || '#F9000C'
                });
            }

            if (!this.migration) {
                this.migration = new _Migration2.default({
                    data: _data,
                    context: context,
                    style: this._style,
                    speed: options.speed,
                    renderer: renderer,
                    arrowSize: options.arrowSize
                });
            } else {
                this.migration.updateData(_data);
            }
            if (!this.migration.started) {
                this.migration.start(context.canvas);
            }
        }
    }]);

    return GLCanvasMigrate;
}(_BaseCanvas3.default);

exports.default = GLCanvasMigrate;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _Marker = __webpack_require__(2);

var _Marker2 = _interopRequireDefault(_Marker);

var _Arc = __webpack_require__(6);

var _Arc2 = _interopRequireDefault(_Arc);

var _Pulse = __webpack_require__(7);

var _Pulse2 = _interopRequireDefault(_Pulse);

var _Spark = __webpack_require__(10);

var _Spark2 = _interopRequireDefault(_Spark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Migration = function () {
    function Migration(options) {
        _classCallCheck(this, Migration);

        this.data = options.data;
        this.store = {
            arcs: [],
            markers: [],
            pulses: [],
            sparks: []
        };
        this.renderer = options.renderer;
        this.speed = options.speed || 5;
        this.playAnimation = true;
        this.started = false;
        this.context = options.context;
        this.style = options.style;
        this.arrowSize = options.arrowSize || 3;
        this.init();
    }

    _createClass(Migration, [{
        key: "init",
        value: function init() {
            this.updateData(this.data);
        }
    }, {
        key: "add",
        value: function add() {}
    }, {
        key: "clear",
        value: function clear() {
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
    }, {
        key: "updateData",
        value: function updateData(data) {
            if (!data || data.length === 0) {
                return;
            }
            this.clear();
            this.data = data;
            if (this.data && this.data.length > 0) {
                _utils2.default.forEach(this.data, function (element) {
                    var arc = new _Arc2.default({
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
                    var marker = new _Marker2.default({
                        x: element.to[0],
                        y: element.to[1],
                        rotation: arc.endAngle + Math.PI / 2,
                        style: 'arrow',
                        color: element.color,
                        size: this.arrowSize,
                        borderWidth: 0,
                        borderColor: element.color
                    });
                    var pulse = new _Pulse2.default({
                        x: element.to[0],
                        y: element.to[1],
                        radius: this.style.pulse.radius,
                        color: element.color,
                        borderWidth: this.style.pulse.borderWidth
                    });
                    var spark = new _Spark2.default({
                        startX: element.from[0],
                        startY: element.from[1],
                        endX: element.to[0],
                        endY: element.to[1],
                        width: 15,
                        color: element.color,
                        speed: this.speed,
                        arrowSize: this.arrowSize
                    });

                    this.store.arcs.push(arc);
                    this.store.markers.push(marker);
                    this.store.pulses.push(pulse);
                    this.store.sparks.push(spark);
                }, this);
            }
        }
    }, {
        key: "start",
        value: function start(canvas) {
            var that = this;
            var speed = that.speed;
            if (!this.started) {
                (function drawFrame() {
                    that.requestAnimationId = window.requestAnimationFrame(drawFrame, canvas);
                    if (that.playAnimation) {
                        var devicePixelRatio = maptalks.Browser.retina ? 2 : 1;
                        // console.log(canvas);
                        canvas.width += speed;
                        canvas.width -= speed;
                        for (var p in that.store) {
                            var shapes = that.store[p];
                            for (var i = 0, len = shapes.length; i < len; i++) {
                                shapes[i].draw(that.context);
                            }
                        }
                        if (that.renderer) that.renderer.completeRender();
                    }
                })();
                this.started = true;
            }
        }
    }, {
        key: "play",
        value: function play() {
            this.playAnimation = true;
        }
    }, {
        key: "pause",
        value: function pause() {
            this.playAnimation = false;
        }
    }]);

    return Migration;
}();

exports.default = Migration;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

var _MigrationLine = __webpack_require__(37);

var _MigrationLine2 = _interopRequireDefault(_MigrationLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var constoptions = {
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

var GLCanvasMigrateLines = function (_BaseCanvas) {
    _inherits(GLCanvasMigrateLines, _BaseCanvas);

    function GLCanvasMigrateLines() {
        _classCallCheck(this, GLCanvasMigrateLines);

        var _this = _possibleConstructorReturn(this, (GLCanvasMigrateLines.__proto__ || Object.getPrototypeOf(GLCanvasMigrateLines)).call(this));

        _this.options = constoptions;
        _this._style = {
            pulse: {
                radius: _this.options.pulseRadius,
                borderWidth: _this.options.pulseBorderWidth
            },
            arc: {
                width: _this.options.arcWidth,
                label: _this.options.arcLabel,
                font: _this.options.arcLabelFont
            }
        } || {};
        return _this;
    }

    _createClass(GLCanvasMigrateLines, [{
        key: "draw",
        value: function draw(context, dataSet, options, renderer) {
            var data = dataSet.get();
            // var context=canvas.getContext("2d");
            this._style.pulse.radius = options.radius || this._style.pulse.radius;
            this._style.pulse.lineWidth = options.lineWidth || this._style.pulse.borderWidth;
            this._style.arc.font = options.font || this._style.arc.font;
            this._style.arc.width = options.lineWidth || this._style.arc.width;
            var _data = [];
            var devicePixelRatio = maptalks.Browser.retina ? 2 : 1;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var xy = obj.xy;
                var from = xy[0],
                    to = xy[xy.length - 1];
                from = [from[0] * devicePixelRatio, from[1] * devicePixelRatio];
                to = [to[0] * devicePixelRatio, to[1] * devicePixelRatio];
                _data.push({
                    from: from,
                    to: to,
                    labels: obj.labels,
                    width: options.lineWidth || 5,
                    size: options.size || 5,
                    color: obj.color || obj.fillStyle || obj.strokeStyle || options.strokeStyle || options.fillStyle || '#F9000C'
                });
            }

            if (!this.migration) {
                this.migration = new _MigrationLine2.default({
                    data: _data,
                    context: context,
                    style: this._style,
                    speed: options.speed,
                    renderer: renderer,
                    lineWidth: options.lineWidth,
                    arrowSize: options.arrowSize
                });
            } else {
                this.migration.updateData(_data);
            }
            if (!this.migration.started) this.migration.start(context.canvas);
        }
    }]);

    return GLCanvasMigrateLines;
}(_BaseCanvas3.default);

exports.default = GLCanvasMigrateLines;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _Marker = __webpack_require__(2);

var _Marker2 = _interopRequireDefault(_Marker);

var _Arc = __webpack_require__(6);

var _Arc2 = _interopRequireDefault(_Arc);

var _Pulse = __webpack_require__(7);

var _Pulse2 = _interopRequireDefault(_Pulse);

var _Spark = __webpack_require__(10);

var _Spark2 = _interopRequireDefault(_Spark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MigrationLine = function () {
    function MigrationLine(options) {
        _classCallCheck(this, MigrationLine);

        this.renderer = options.renderer;
        this.data = options.data;
        this.store = {
            arcs: [],
            markers: [],
            pulses: [],
            sparks: []
        };
        this.speed = options.speed || 5;
        this.playAnimation = true;
        this.started = false;
        this.context = options.context;
        this.style = options.style;
        this.arrowSize = options.arrowSize || 3;
        this.lineWidth = options.lineWidth || 10;
        this.init();
    }

    _createClass(MigrationLine, [{
        key: "init",
        value: function init() {
            this.updateData(this.data);
        }
    }, {
        key: "add",
        value: function add() {}
    }, {
        key: "clear",
        value: function clear() {
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
    }, {
        key: "updateData",
        value: function updateData(data) {
            if (!data || data.length === 0) {
                return;
            }
            this.clear();
            this.data = data;
            if (this.data && this.data.length > 0) {
                _utils2.default.forEach(this.data, function (element) {
                    var spark = new _Spark2.default({
                        startX: element.from[0],
                        startY: element.from[1],
                        endX: element.to[0],
                        endY: element.to[1],
                        width: this.lineWidth,
                        color: element.color,
                        size: this.arrowSize,
                        speed: this.speed,
                        arrowSize: this.arrowSize
                    });
                    // this.store.arcs.push(arc);
                    this.store.sparks.push(spark);
                }, this);
            }
        }
    }, {
        key: "start",
        value: function start(canvas) {
            var that = this;
            var speed = that.speed;
            if (!this.started) {
                (function drawFrame() {
                    that.requestAnimationId = window.requestAnimationFrame(drawFrame, canvas);
                    if (that.playAnimation) {
                        canvas.width += speed;
                        canvas.width -= speed;
                        // var timer='time'
                        // console.time(timer)
                        for (var p in that.store) {
                            var shapes = that.store[p];
                            for (var i = 0, len = shapes.length; i < len; i++) {
                                shapes[i].draw(that.context);
                            }
                        }
                        if (that.renderer) that.renderer.completeRender();
                    }
                })();
                this.started = true;
            }
        }
    }, {
        key: "play",
        value: function play() {
            this.playAnimation = true;
        }
    }, {
        key: "pause",
        value: function pause() {
            this.playAnimation = false;
        }
    }]);

    return MigrationLine;
}();

exports.default = MigrationLine;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

var _Pulse = __webpack_require__(7);

var _Pulse2 = _interopRequireDefault(_Pulse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var constoptions = {
    pulseRadius: 25,
    pulseBorderWidth: 3,
    arcLabelFont: '15px sans-serif',
    color: 'red',
    size: 30

};

var GLCanvasScatter = function (_BaseCanvas) {
    _inherits(GLCanvasScatter, _BaseCanvas);

    function GLCanvasScatter() {
        _classCallCheck(this, GLCanvasScatter);

        return _possibleConstructorReturn(this, (GLCanvasScatter.__proto__ || Object.getPrototypeOf(GLCanvasScatter)).call(this));
    }

    _createClass(GLCanvasScatter, [{
        key: "draw",
        value: function draw(context, dataSet, options, renderer) {
            var data = dataSet.get();
            var canvas = context.canvas;
            // var context=canvas.getContext("2d");
            context.clearRect(0, 0, context.width, context.height);
            context.save();
            var speed = options.speed || 5;
            var _data = [];
            var devicePixelRatio = maptalks.Browser.retina ? 2 : 1;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var xy = obj.xy;
                var size = obj.size || options.size || constoptions.size;
                var x = xy[0] * devicePixelRatio;
                var y = xy[1] * devicePixelRatio;
                var color = obj.color || obj.strokeStyle || ojb.fillStyle || options.strokeStyle || options.fillStyle || constoptions.color;
                var borderWidth = options.lineWidth || constoptions.pulseBorderWidth;
                var font = options.font || constoptions.font;
                var name = obj.name;
                var p = new _Pulse2.default({
                    x: x,
                    y: y,
                    // size:size,
                    color: color,
                    radius: size,
                    borderWidth: borderWidth,
                    font: font,
                    name: name
                });
                _data.push(p);
            }
            this._data = _data;

            var self = this;
            function drawFrame() {
                canvas.width += speed;
                canvas.width -= speed;
                if (self.animation) {
                    window.cancelAnimationFrame(self.animation);
                }
                self.animation = requestAnimationFrame(drawFrame);
                for (var i = 0; i < self._data.length; i++) {
                    self._data[i].draw(context);
                }
                renderer.completeRender();
                // context.clearRect(0,0,context.width,context.height);
            }
            drawFrame();
        }
    }]);

    return GLCanvasScatter;
}(_BaseCanvas3.default);

exports.default = GLCanvasScatter;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLSimplePath = __webpack_require__(5);

var _GLSimplePath2 = _interopRequireDefault(_GLSimplePath);

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author kyle / http://nikai.us/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import DataSet from "../../data/DataSet";

var GLCanvasSimple = function (_BaseCanvas) {
    _inherits(GLCanvasSimple, _BaseCanvas);

    function GLCanvasSimple() {
        _classCallCheck(this, GLCanvasSimple);

        return _possibleConstructorReturn(this, (GLCanvasSimple.__proto__ || Object.getPrototypeOf(GLCanvasSimple)).call(this));
    }

    _createClass(GLCanvasSimple, [{
        key: "draw",
        value: function draw(context, dataSet, options) {
            var data = dataSet.get();
            // var context=canvas.getContext("2d");
            var canvas = context.canvas;
            context.clearRect(0, 0, context.width, context.height);
            context.save();

            for (var key in options) {
                context[key] = options[key];
            }

            {
                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];
                    context.save();
                    if (item.fillStyle) {
                        context.fillStyle = item.fillStyle;
                    }
                    if (item.strokeStyle) {
                        context.strokeStyle = item.strokeStyle;
                    }
                    var type = item.geometry.type;
                    context.beginPath();
                    _GLSimplePath2.default.draw(context, item, options);
                    if (type == GL.GMVI.Geometry.Point || type == GL.GMVI.Geometry.Polygon || type == GL.GMVI.Geometry.MultiPolygon || type == GL.GMVI.Geometry.Circle) {
                        context.fill();
                        if (item.strokeStyle || options.strokeStyle) {
                            if (!options.stroke || options.stroke == true) context.stroke();
                        }
                    } else if (type == GL.GMVI.Geometry.LineString || type == GL.GMVI.Geometry.Polyline) {
                        context.stroke();
                    }
                    context.restore();
                };
            }

            context.restore();
        }
    }]);

    return GLCanvasSimple;
}(_BaseCanvas3.default);

exports.default = GLCanvasSimple;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GLCanvasStar = function (_BaseCanvas) {
    _inherits(GLCanvasStar, _BaseCanvas);

    function GLCanvasStar() {
        _classCallCheck(this, GLCanvasStar);

        return _possibleConstructorReturn(this, (GLCanvasStar.__proto__ || Object.getPrototypeOf(GLCanvasStar)).call(this));
    }

    _createClass(GLCanvasStar, [{
        key: "draw",
        value: function draw(context, dataSet, options) {
            var data = dataSet.get();
            // var context=canvas.getContext("2d");
            context.clearRect(0, 0, context.width, context.height);
            var starArr = [];
            for (var i = 0, len = data.length; i < len; i++) {
                var _data = data[i];
                var xy = _data.xy;
                var x = xy[0],
                    y = xy[1];
                var color = _data.color || _data.fillStyle || _data.strokeStyle || options.fillStyle || options.strokeStyle || 'red';
                var size = _data.length || _data.size || options.size || 30;
                starArr.push(this.createStar(size, x, y, color));
            }
            for (var i = 0; i < starArr.length; i++) {
                starArr[i].angle += starArr[i].changeAgele;
                context.save();
                context.beginPath();

                context.translate(starArr[i].x, starArr[i].y);
                // context.rotate(starArr[i].angle*Math.PI/180);
                // context.scale(Math.sin(starArr[i].angle*Math.PI/180),Math.sin(starArr[i].angle*Math.PI/180));
                context.globalAlpha = Math.abs(Math.sin(starArr[i].angle * Math.PI / 180));
                //绘制多边形
                this.drawStar(0, 0, starArr[i].radius1, starArr[i].radius2, starArr[i].num, "fill", starArr[i].color, context);
                context.restore();
            }
        }
    }, {
        key: "createStar",
        value: function createStar(size, x, y, color) {
            var starObj = {
                // radius1:20+10*Math.random(),
                radius2: size / 2.5,
                radius1: size,
                // radius2:size,
                x: x,
                y: y,
                num: 6,
                color: color,
                angle: 360 * Math.random(),
                changeAgele: -5 + 10 * Math.random()
            };

            return starObj;
        }
    }, {
        key: "drawStar",
        value: function drawStar(x, y, radius1, radius2, num, drawType, color, cobj) {
            var angle = 360 / (num * 2);
            var arr = [];
            for (var i = 0; i < num * 2; i++) {
                var starObj = {};
                if (i % 2 == 0) {
                    starObj.x = x + radius1 * Math.cos(i * angle * Math.PI / 180);
                    starObj.y = y + radius1 * Math.sin(i * angle * Math.PI / 180);
                } else {
                    starObj.x = x + radius2 * Math.cos(i * angle * Math.PI / 180);
                    starObj.y = y + radius2 * Math.sin(i * angle * Math.PI / 180);
                }

                arr.push(starObj);
            }

            cobj.beginPath();
            cobj.fillStyle = color;
            cobj.moveTo(arr[0].x, arr[0].y);
            for (var i = 1; i < arr.length; i++) {
                cobj.lineTo(arr[i].x, arr[i].y);
            }
            cobj.closePath();
            if (drawType == "fill") {
                cobj.fill();
            } else {
                cobj.stroke();
            }
        }
    }]);

    return GLCanvasStar;
}(_BaseCanvas3.default);

exports.default = GLCanvasStar;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/6/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GLCanvasTagCloud = function (_BaseCanvas) {
    _inherits(GLCanvasTagCloud, _BaseCanvas);

    function GLCanvasTagCloud() {
        _classCallCheck(this, GLCanvasTagCloud);

        return _possibleConstructorReturn(this, (GLCanvasTagCloud.__proto__ || Object.getPrototypeOf(GLCanvasTagCloud)).call(this));
    }

    _createClass(GLCanvasTagCloud, [{
        key: "draw",
        value: function draw(context, dataSet, options) {
            var data = dataSet.get();
            var ctx = context;
            ctx.clearRect(0, 0, ctx.width, ctx.height);
            // ctx.shadowBlur = 10;
            // ctx.shadowColor = "rgba(250, 250, 55, 0.7)";
            ctx.beginPath();
            ctx.textBaseline = "top";
            for (var key in options) {
                ctx[key] = options[key];
            }
            var rects = [];
            var canvasWidth = ctx.canvas.width;
            var canvasHeight = ctx.canvas.height;
            var margin = 200; // canvas扩大范围绘制，使边缘展示一致
            for (var i = 0, len = data.length; i < len; i++) {
                if (!data[i].geometry) continue;
                var xy = data[i].xy;
                var x = xy[0];
                var y = xy[1];
                var size = data[i].size || options.size || parseInt(Math.random() * 20) + 10;
                var name = data[i].name || '';
                var color = data[i].color || data[i].fillStyle || data[i].strokeStyle || options.fillStyle || options.strokeStyle || "red";
                if (x < -margin || y < -margin || x > canvasWidth + margin || y > canvasHeight + margin || !name) {
                    continue;
                }
                ctx.font = "bold " + size + "px Arial";
                var textWidth = ctx.measureText(name).width;

                // 根据文本宽度和高度调整x，y位置，使得绘制文本时候坐标点在文本中心点，这个计算出的是左上角坐标
                var px = x - textWidth / 2;
                var py = y - size / 2;
                var rect = {
                    sw: {
                        x: px,
                        y: py + size
                    },
                    ne: {
                        x: px + textWidth,
                        y: py
                    }
                };
                if (!this.hasOverlay(rects, rect)) {
                    rects.push(rect);
                    ctx.fillStyle = color;
                    ctx.fillText(name, px, py);
                }
            }
        }
    }, {
        key: "hasOverlay",
        value: function hasOverlay(rects, overlay) {
            for (var i = 0; i < rects.length; i++) {
                if (this.isRectOverlay(rects[i], overlay)) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "isRectOverlay",
        value: function isRectOverlay(rect1, rect2) {
            //minx、miny 2个矩形右下角最小的x和y
            //maxx、maxy 2个矩形左上角最大的x和y
            var minx = Math.min(rect1.ne.x, rect2.ne.x);
            var miny = Math.min(rect1.sw.y, rect2.sw.y);
            var maxx = Math.max(rect1.sw.x, rect2.sw.x);
            var maxy = Math.max(rect1.ne.y, rect2.ne.y);
            if (minx > maxx && miny > maxy) {
                return true;
            }
            return false;
        }
    }]);

    return GLCanvasTagCloud;
}(_BaseCanvas3.default);

exports.default = GLCanvasTagCloud;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016/11/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import pathSimple from "../path/GLSimplePath";


var GLCanvasText = function (_BaseCanvas) {
    _inherits(GLCanvasText, _BaseCanvas);

    function GLCanvasText() {
        _classCallCheck(this, GLCanvasText);

        return _possibleConstructorReturn(this, (GLCanvasText.__proto__ || Object.getPrototypeOf(GLCanvasText)).call(this));
    }

    _createClass(GLCanvasText, [{
        key: 'draw',
        value: function draw(context, dataSet, options) {
            var data = dataSet.get();
            // var context=canvas.getContext("2d");
            context.clearRect(0, 0, context.width, context.height);
            // context.fillStyle = 'white';

            for (var key in options) {
                context[key] = options[key];
            }
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            var offset = options.offset || {
                x: 0,
                y: 0
            };
            // var timer='draw:'
            // console.time(timer)
            for (var i = 0, len = data.length; i < len; i++) {
                context.save();
                var d = data[i];
                context.fillStyle = d.color || d.fillStyle || d.strokeStyle || options.fillStyle || options.strokeStyle || 'white';
                var xy = d.xy;
                var x = xy[0],
                    y = xy[1];
                var rotate = d.rotate || 0;
                var text = d.text;
                // var width=context.measureText(text).width;
                // context.translate(x,y);
                // context.rotate(rotate* Math.PI / 180);
                // context.translate(-x,-y);

                context.fillText(text, x, y);
                context.restore();
            };
            // console.timeEnd(timer)
        }
    }]);

    return GLCanvasText;
}(_BaseCanvas3.default);

exports.default = GLCanvasText;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defConfig;

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by Administrator on 2017/7/7.
                                                                                                                                                                                                                   */

var defConfig = (_defConfig = {
    radius: 50,
    lineWidth: 2,
    data: 0.5,
    waterColor: 'rgba(25, 139, 201, 1)',
    textColor: 'rgba(06, 85, 128, 0.8)',
    font: '',
    wave: true,
    txt: undefined,
    animation: true
}, _defineProperty(_defConfig, 'textColor', 'white'), _defineProperty(_defConfig, 'percentNum', 0.8), _defConfig);

function Waterbubble(canvas, config, context, xy) {
    this.xy = xy;
    this.refresh(canvas, config, context);
}

Waterbubble.prototype = {
    refresh: function refresh(canvas, config, context) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        this._init(canvas, config, context);
    },

    _init: function _init(canvas, config, context) {
        var radius = config.radius;
        var lineWidth = config.lineWidth;

        canvas.width = radius * 2 + lineWidth;
        canvas.height = radius * 2 + lineWidth;

        this._buildShape(canvas, config, context);
    },

    _buildShape: function _buildShape(canvas, config, context) {
        var ctx = canvas.getContext('2d');
        var gap = config.lineWidth * 2;
        var r = config.radius - gap;
        var data = config.data;
        var lineWidth = config.lineWidth;

        var waterColor = config.waterColor;
        var textColor = config.textColor;
        var font = config.font;

        var wave = config.wave;

        // //the center of circle
        var x = config.radius + lineWidth / 2;
        var y = config.radius + lineWidth / 2;

        ctx.beginPath();

        ctx.arc(x, y, config.radius, 0, Math.PI * 2);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = waterColor;
        ctx.stroke();
        //if config animation true
        if (config.animation) {
            this._animate(ctx, r, data, lineWidth, waterColor, x, y, wave, context);
        } else {
            this._fillWater(ctx, r, data, lineWidth, waterColor, x, y, wave, context);
        }

        if (typeof config.txt == 'string') {
            this._drawText(ctx, textColor, font, config.radius, data, x, y, config.txt, context);
        }

        return;
    },

    _fillWater: function _fillWater(ctx, r, data, lineWidth, waterColor, x, y, wave, context) {
        ctx.beginPath();

        ctx.globalCompositeOperation = 'destination-over';

        //start co-ordinates
        var sy = r * 2 * (1 - data) + (y - r);
        var sx = x - Math.sqrt(r * r - (y - sy) * (y - sy));
        //middle co-ordinates
        var mx = x;
        var my = sy;
        //end co-ordinates
        var ex = 2 * mx - sx;
        var ey = sy;

        var extent; //extent

        if (data > 0.9 || data < 0.1 || !wave) {
            extent = sy;
        } else {
            extent = sy - (mx - sx) / 4;
        }
        // console.log(ctx.canvas.id)
        ctx.beginPath();

        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo((sx + mx) / 2, extent, mx, my);
        ctx.quadraticCurveTo((mx + ex) / 2, 2 * sy - extent, ex, ey);

        var startAngle = -Math.asin((x - sy) / r);
        var endAngle = Math.PI - startAngle;

        ctx.arc(x, y, r, startAngle, endAngle, false);

        ctx.fillStyle = waterColor;
        ctx.fill();

        var xy = this.xy;
        var x = xy[0],
            y = xy[1];
        var _canvas = ctx.canvas;
        context.drawImage(_canvas, x - _canvas.width / 2, y - _canvas.height / 2, _canvas.width, _canvas.height);
    },

    _drawText: function _drawText(ctx, textColor, font, radius, data, x, y, txt, context) {
        ctx.globalCompositeOperation = 'source-over';

        var size = font ? font.replace(/\D+/g, '') : 0.4 * radius;
        ctx.font = font ? font : 'bold ' + size + 'px Microsoft Yahei';

        txt = txt.length ? txt : data * 100 + '%';

        var sy = y + size / 2;
        var sx = x - ctx.measureText(txt).width / 2;

        ctx.fillStyle = textColor;
        ctx.fillText(txt, sx, sy);
        var xy = this.xy;
        var x = xy[0],
            y = xy[1];
        var _canvas = ctx.canvas;
        context.drawImage(_canvas, x - _canvas.width / 2, y - _canvas.height / 2, _canvas.width, _canvas.height);
    },

    _animate: function _animate(ctx, r, data, lineWidth, waterColor, x, y, wave, context) {
        var datanow = {
            value: 0
        };
        var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (func) {
            setTimeout(func, 16);
        };
        var self = this;
        var update = function update() {
            if (datanow.value < data - 0.01) {
                datanow.value += (data - datanow.value) / 2;
                self._runing = true;
            } else {
                self._runing = false;
            }
        };
        var step = function step() {
            self._fillWater(ctx, r, datanow.value, lineWidth, waterColor, x, y, wave, context);
            update();
            if (self._runing) {
                requestAnimationFrame(step);
            }
        };
        step(ctx, r, datanow, lineWidth, waterColor, x, y, wave, context);
    }
};

var GLCanvasWaterBubble = function (_BaseCanvas) {
    _inherits(GLCanvasWaterBubble, _BaseCanvas);

    function GLCanvasWaterBubble() {
        _classCallCheck(this, GLCanvasWaterBubble);

        return _possibleConstructorReturn(this, (GLCanvasWaterBubble.__proto__ || Object.getPrototypeOf(GLCanvasWaterBubble)).call(this));
    }

    _createClass(GLCanvasWaterBubble, [{
        key: 'draw',
        value: function draw(context, dataSet, options) {
            var data = dataSet.get();
            // var context=canvas.getContext("2d");
            context.clearRect(0, 0, context.width, context.height);
            var maxCount = this.getMaxCount(data) / defConfig.percentNum;
            for (var i = 0, len = data.length; i < len; i++) {
                var _data = data[i];
                defConfig.radius = _data.length || options.size || defConfig.radius;
                defConfig.lineWidth = options.lineWidth || defConfig.lineWidth;
                defConfig.waterColor = _data.color || _data.fillStyle || _data.strokeStyle || options.fillStyle || defConfig.waterColor;
                defConfig.textColor = options.fillStyle || options.strokeStyle || options.textStyle || defConfig.textColor || defConfig.textColor;
                defConfig.data = _data.count / maxCount;
                defConfig.txt = _data.count;
                var xy = _data.xy;
                var _canvas = document.createElement('canvas');
                var waterbubble = new Waterbubble(_canvas, defConfig, context, xy);
            }
        }
    }]);

    return GLCanvasWaterBubble;
}(_BaseCanvas3.default);

exports.default = GLCanvasWaterBubble;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCanvas2 = __webpack_require__(0);

var _BaseCanvas3 = _interopRequireDefault(_BaseCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var n = 40;
var defaultColor = 'red';
var defaultSize = 30;

var GLCanvasRadial = function (_BaseCanvas) {
    _inherits(GLCanvasRadial, _BaseCanvas);

    function GLCanvasRadial() {
        _classCallCheck(this, GLCanvasRadial);

        return _possibleConstructorReturn(this, (GLCanvasRadial.__proto__ || Object.getPrototypeOf(GLCanvasRadial)).call(this));
    }

    _createClass(GLCanvasRadial, [{
        key: "draw",
        value: function draw(context, dataSet, options) {
            var data = dataSet.get();
            // var context=canvas.getContext("2d");
            context.clearRect(0, 0, context.width, context.height);
            for (var i = 0, len = data.length; i < len; i++) {
                var _data = data[i];
                var xy = _data.xy;
                var x = xy[0],
                    y = xy[1];
                var size = _data.length || _data.size || options.size || defaultSize;
                var color = _data.color || _data.fillStyle || _data.strokeStyle || options.strokeStyle || options.fillStyle || defaultColor;
                context.strokeStyle = color;
                var num = 2 * Math.PI / n;
                for (var j = 0; j < n; j++) {
                    var radius = size,
                        sDeg = j * num,
                        eDeg = (j + 1) * num;
                    context.save();
                    context.translate(x, y);
                    context.beginPath();
                    // context.arc(0,0,radius,sDeg, eDeg);
                    context.save();
                    context.rotate(eDeg);
                    context.moveTo(radius, 0);
                    context.lineTo(0, 0);
                    context.restore();
                    // context.rotate(sDeg);
                    // context.lineTo(radius,0);
                    context.closePath();
                    context.stroke();
                    context.restore();
                }
            }
        }
    }]);

    return GLCanvasRadial;
}(_BaseCanvas3.default);

exports.default = GLCanvasRadial;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var maptalks = window.maptalks;

var Circle = function (_maptalks$Circle) {
    _inherits(Circle, _maptalks$Circle);

    function Circle(center, radius, options) {
        _classCallCheck(this, Circle);

        return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, center, radius, options));
    }

    _createClass(Circle, [{
        key: "toArray",
        value: function toArray() {
            var shells = this.getShell();
            var lnglatArr = [];
            for (var i = 0; i < shells.length; i++) {
                var coordinate = shells[i];
                lnglatArr.push([coordinate.x, coordinate.y]);
            }
            return lnglatArr;
        }
    }]);

    return Circle;
}(maptalks.Circle);

module.exports = Circle;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = {"id":"maptalks-gmvi","version":"0.1.0","date":"2018.5.23","skin":"default"}

/***/ })
/******/ ]);
});