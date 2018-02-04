/**
 * Created by Administrator on 2017/6/28.
 */

// var canvas=document.getElementById('container');
// var width = canvas.width;
// var height =canvas.height;

var stage = new Konva.Stage({
    container: document.getElementById('container'),
    width: 1000,
    height: 500
});
var layer = new Konva.Layer();
var circle = new Konva.Circle({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});
// add the shape to the layer
layer.add(circle);
// add the layer to the stage
stage.add(layer);