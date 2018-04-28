
import  SimplePath from "../canvas/path/GLSimplePath"
import Animator from "./../utils/animation/Animator"
import CategoryUtil from "./../utils/data-range/GLCategory"
import ChoroplethUtil from "./../utils/data-range/GLChoropleth"
import IntensityUtil from "./../utils/data-range/GLIntensity"
import CanvasArrow from "./../canvas/draw/GLCanvasArrow"
import CanvasCluster from "./../canvas/draw/GLCanvasCluster"
import CanvasEffect from "./../canvas/draw/GLCanvasEffect"
import CanvasGrid from "./../canvas/draw/GLCanvasGrid"
import CanvasHeat from "./../canvas/draw/GLCanvasHeat"
import CanvasHoneycomb from "./../canvas/draw/GLCanvasHoneycomb"
import CanvasIcon from "./../canvas/draw/GLCanvasIcon"
import CanvasMigrate from "./../canvas/draw/GLCanvasMigrate"
import CanvasMigrateLines from "./../canvas/draw/GLCanvasMigrateLines"
// import CanvasRadiation from "./../canvas/draw/GLCanvasRadiation"
import CanvasScatter from "./../canvas/draw/GLCanvasScatter"
import CanvasSimple from "./../canvas/draw/GLCanvasSimple"
import CanvasStar from "./../canvas/draw/GLCanvasStar"
import CanvasTagCloud from "./../canvas/draw/GLCanvasTagCloud"
import CanvasText from "./../canvas/draw/GLCanvasText"
import CanvasWaterBubble from "./../canvas/draw/GLCanvasWaterBubble"
import CanvasRadial from "./../canvas/draw/GLCanvasRadial"

import Circle from "./../geometry/Circle"

const SphericalMercator=require('@mapbox/sphericalmercator');
const merc = new SphericalMercator({
    size: 256
});



const maptalks=window.maptalks;
if(!maptalks) throw new Error('not find maptalks lib');

const options={};

class GMVICanvasLayer extends maptalks.Layer {

    constructor(id, dataSet, options) {
        if (! dataSet instanceof GL.GMVI.DataSet) {
          throw new Error('dataset is error');
        }
        super(id, options);
        this.data=dataSet.get();
        this._initOptions(options);
        this.data=this._filterData(this.data);
        this.inited=false;
    }

    getData() {
        return this.data||[];
    }

    getDatas(){
        return this.getData();
    }

    isEmpty() {
        if (!this.data.length) {
            return true;
        }
        return false;
    }

    clear() {
        this.data=[];
        this._clearTime();
        this.fire('clear');
        this.redraw();
        return this;
    }

    /**
     * Export the HeatLayer's JSON.
     * @return {Object} layer's JSON
     */
    toJSON(options) {
        if (!options) {
            options = {};
        }
        const json = {
            'type'      : this.getJSONType(),
            'id'        : this.getId(),
            'options'   : this.config()
        };
        const data = this.getData();
        if (options['clipExtent']) {
            let clipExtent = new maptalks.Extent(options['clipExtent']);
            const r = this._getHeatRadius();
            if (r) {
                clipExtent = clipExtent._expand(r);
            }
            const clipped = [];
            for (let i = 0, len = data.length; i < len; i++) {
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


    static fromJSON(json) {
        if (!json || json['type'] !== 'GMVICanvasLayer') { return null; }
        return new GMVICanvasLayer(json['id'], json['data'], json['options']);
    }

    //更新配置
    setOption (options) {
        this._initOptions(options);
        this._filterData(this.data);
        this._init();
        this.redraw();
    }

    redraw() {
        const renderer = this._getRenderer();
        if (renderer) {
            renderer.setToRedraw();
        }
        return this;
    }

    getRenderer(){
        return this._getRenderer();
    }


    onRemove (map) {
        map=map||this.getMap();
        if(this.eventMap){
            for(var key in this.eventMap){
                    map.off(key,this.eventMap[key])
            }
        }
        this._clearTime();
        this.inited=false;
    }


    //重置数据
    resetDatas(dataSet) {
        this.data=this._filterData(dataSet.get());
        this.redraw();
        // this._reset();
    }

    //增量数据
    addDatas (dataSet) {
        this.data=this.data.concat(this._filterData(dataSet.get()))
        this.redraw();
    }


    removeData (data) {
        if(Array.isArray(data)&&data.length>0){
            var map={};
            data.forEach(function (value,index) {
                var id=value.id;
                if(id)
                    map[id]=value;
            })
            var _data=[];
            for(var i=0,len=this.data.length;i<len;i++){
                var _id=this.data[i].id;
                if(_id&&map[_id]) continue;
                _data.push(this.data[i]);
            }
            this.data=_data;
            this.redraw();
        }
        if(data&&(typeof data)=='object'){
            var _data=[];
            var id=data.id;
            if(!id) return this;
            for(var i=0,len=this.data.length;i<len;i++){
                var _id=this.data[i].id;
                if(id==_id) continue;
                _data.push(this.data[i]);
            }
            this.data=_data;
            this.redraw();
        }
        return this;
    }

    remvoeDatas(data){
        this.removeData(data);
    }

    on(eventType,callback){
        if(eventType!='click'){
            // maptalks.Layer.call(this,eventType,callback);
        }else{
            if(!eventType||!callback)
                throw  new Error('eventType or callback is error');
            var self=this;
            var mapEvent=function (e) {
                self._clickEvent(e,callback)
            };
            this.eventMap[eventType]=mapEvent;
            this._initEvent();
        }
    }

    off (eventType,callback) {
          var v=this.eventMap[eventType];
          let map=this.getMap();
          map.off(eventType,v);
          delete this.eventMap[eventType];
          return this;
    }

    getCanvas(){
        return this._canvas;
    }

    setCanvas(canvas){
        // console.log(this._canvas);
        this._canvas=canvas;
    }

    getContext(){
        return this._context;
    }
    setContext(context){
        this._context=context;
    }


////////////////////////////////////////////////////////////////////////////
    _init(){
            this._initCanvasType(); //初始化canvas绘制类型
            this._animationCall();  //动画判断和回调
            this._initEvent();
            this.inited=true;
            this._reset();
          
    }

    _reset () {
        let map=this.getMap();
        if(!map)
            throw new Error( '请现将该图层添加到地图上');

        const distance=100;
        let size=map.distanceToPixel(distance,distance);
        let width=size.width;
        let height=size.height;
        this.lengthAverage=(Math.sqrt(Math.pow(width,2)+Math.pow(height,2)))/(Math.sqrt(Math.pow(distance,2)*2))
        this._drawCanvasLayer();
    }

    //经纬度转屏幕坐标
    _lnglatToPixel(lnglat,mercatormeters){
        if(!Array.isArray(lnglat)) {
            console.error(lnglat)
            throw new Error('lnglat is error');
        }
        var devicePixelRatio=this.devicePixelRatio=maptalks.Browser.retina ? 2 : 1;
        let map=this.getMap();
        const projection = map.getProjection();
        var xyArray=[];
        if(Array.isArray(lnglat[0])){
            for(let i=0;i<lnglat.length;i++){
                var _lnglat=lnglat[i];
                var lng=_lnglat[0];
                var lat=_lnglat[1];
                var xy=projection.project(new maptalks.Coordinate(lng, lat));
                xy = map._prjToContainerPoint(xy);
                xyArray.push([xy.x,xy.y]);
            }
        }else{
            var lng=lnglat[0];
            var lat=lnglat[1];
            var xy=projection.project(new maptalks.Coordinate(lng, lat));
            xy = map._prjToContainerPoint(xy);
            xyArray= [xy.x,xy.y];
        }
        return xyArray;
    }


    _drawCanvasLayer () {
        let renderer=this.getRenderer();
        var newData=[];
        var currenttime=this.time;
        if (this.isEnabledTime) {
            if(this.time==undefined) return;
            var trails = this.animationOptions.trails || 5;
            for(var x in this.data) {
                var item = this.data[x];
                if (currenttime && item.time > (currenttime - trails) && item.time < currenttime)
                    newData.push(item);
            }
            var context=this.getContext();
            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.fillStyle = 'rgba(0, 0, 0, .1)';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.restore();
            renderer.completeRender();
        } else {
            newData=this.data;
            var context=this.getContext();
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
        var currentViewData=[];
        var geometry,coordinates,type,e,latlng,raduis,mercatormeters;
        for(var i=0;i<newData.length;i++){
            geometry=newData[i].geometry;
            type=geometry.type;
            coordinates=geometry.coordinates;
            raduis=geometry.radius;
            mercatormeters=newData[i].geometry.mercatormeters;
            e=newData[i];
            if(type==GL.GMVI.Geometry.Point||type==GL.GMVI.Geometry.Rectangle){
                e.xy=this._lnglatToPixel(coordinates,mercatormeters);
                if(geometry.width){
                    e.width=this.lengthAverage*geometry.width;
                }
                if(geometry.height){
                    e.height=this.lengthAverage*geometry.height;
                }
                currentViewData.push(e);
            }
            else{
                if(type==GL.GMVI.Geometry.Circle){
                    let circle=new Circle(coordinates,raduis);
                    var lnglatArr=circle.toArray();
                    e.xy=this._lnglatToPixel(lnglatArr);
                    currentViewData.push(e);
                }else{
                    var xy=[];
                    for(var j=0;j<coordinates.length;j++){
                        var lnglat=coordinates[j];
                        xy.push(this._lnglatToPixel(lnglat,mercatormeters[j]));
                    }
                    e.xy=xy;
                    currentViewData.push(e);
                }
            }
        }
        var dataSet=new GL.GMVI.DataSet(currentViewData);
        if(this.options.draw!=GL.GMVI.Cluster){
           if(!this.options.noRender)  this.canvasType.draw(this.getContext(),dataSet, this.options,renderer);
           if(this.options.callback) this.options.callback(dataSet);
        }
           
        else{
            var geometry,coordinates,type;
            var _data=[];
            for(var i=0;i<newData.length;i++){
                geometry=newData[i].geometry;
                type=geometry.type;
                if(type!=GL.GMVI.Geometry.Point) continue;
                coordinates=geometry.coordinates;
                var lng=parseFloat(coordinates[0]);
                var lat=parseFloat(coordinates[1]);
                _data.push([lng,lat,1,newData[i]]);
            }
            var map=this.getMap(), size=map.getSize (),zoom=map.getZoom(), extent=map.getExtent();
            var maxClusterLv=this.options.maxClusterLv||map.getMaxZoom();
            var minx=extent.xmin;
            var miny=extent.ymin;
            var maxx=extent.xmax;
            var maxy=extent.ymax;
            var width=size.width;
            var height=size.height;
            //聚合工具对数据进行聚合
            var clusterResult=GL.GMVI.ClusterUtil.cluster(_data,zoom,maxClusterLv,minx,miny,maxx,maxy,width,height)
            if(clusterResult) {
                var cluster = clusterResult.cluster;
                var discrete = clusterResult.discrete
                if (cluster) {
                    for (var x in cluster) {
                        var o = cluster[x];
                        var center = o.center;
                        var xy = this._lnglatToPixel(center);
                        clusterResult.cluster[x].xy = xy;
                        this.status = 'cluster'
                    }
                }
                if (discrete) {
                    for (var i = 0; i < discrete.length; i++) {
                        var o = discrete[i];
                        var center = o.slice(0, 2);
                        var xy = this._lnglatToPixel(center);
                        clusterResult.discrete[i] = clusterResult.discrete[i].concat(xy);
                        this.status = 'discrete'
                    }
                }
                this.canvasType.draw(this.getContext(), clusterResult, this.options);
            }
        }
    }

    //数据格式化和过滤
    _filterData (data) {
        var self=this;
        var draw = self.options.draw;
        //以下绘制类型统一的规划到Simple下
        if (draw == GL.GMVI.Bubble||draw == GL.GMVI.Intensity||draw == GL.GMVI.Category||draw == GL.GMVI.Choropleth||draw == GL.GMVI.Simple||draw==GL.GMVI.Effect) {
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
                    if (data[i].geometry.type === GL.GMVI.Geometry.LineString || data[i].geometry.type ===GL.GMVI.Geometry.Polyline) {
                        data[i].strokeStyle = self.category.get(item.count);
                    }else
                        data[i].fillStyle = self.category.get(item.count);
                }
                if (draw ==GL.GMVI.Choropleth) {
                    if (data[i].geometry.type === GL.GMVI.Geometry.LineString || data[i].geometry.type === GL.GMVI.Geometry.Polyline)
                        data[i].strokeStyle = self.choropleth.get(item.count);
                    else
                        data[i].fillStyle = self.choropleth.get(item.count);
                }
                if(draw==GL.GMVI.Effect){
                    data[i].size = self.options.size||15;
                    data[i]._size=data[i].size*Math.random();
                    data[i].strokeStyle = self.choropleth.get(item.count);
                }

            }
        }
       
        for(var i=0,len=data.length;i<len;i++){
            var mercatormeters=[];
            var coordinates=data[i].geometry.coordinates;
            if(Array.isArray(coordinates[0])){
                for(var j=0;j<coordinates.length;j++){
                    var mercatormeter=merc.forward(coordinates[j]);
                    mercatormeters.push(mercatormeter)
                }
                
            }else{
                mercatormeters=merc.forward(coordinates);
            }
           
            data[i].geometry.mercatormeters=mercatormeters;

        }
        return data;
    }

    _animationCall () {
        var self=this;
        let map=this.getMap();
        if (self.options.draw == 'time' || this.isEnabledTime) {
            var animator=self.animator = new Animator(function(time) {
                self.time=time;
                // console.log(time)
                self._drawCanvasLayer.bind(self).call(time)
            }, {
                steps: self.animationOptions.steps || 100,
                stepsRange: self.animationOptions.stepsRange || 100,
                animationDuration: self.animationOptions.duration || 10
            });
            animator.start();
            map.addEventListener('movestart', function() {
                animator.pause();
            });
            // //图层移除，暂停动画
            // GL.Hub.on(GL.E.CanvasLayerRemove,function () {
            //     animator.stop();
            // });
            map.addEventListener('moveend', function() {
                animator.start();
            });
        }
    }

    _initCanvasType () {
        var canvasType;
        switch (this.options.draw) {
            case GL.GMVI.Heatmap:
                canvasType = new CanvasHeat();
                break;
            case GL.GMVI.Grid:
                canvasType=new CanvasGrid();
                break;
            case GL.GMVI.Honeycomb:
                canvasType=new CanvasHoneycomb();
                break;
            case GL.GMVI.Text:
                canvasType=new CanvasText();
                break;
            case GL.GMVI.Icon:
                canvasType=new CanvasIcon();
                break;
            case GL.GMVI.Cluster:
                // console.log('cluster')
                canvasType=new CanvasCluster();
                break;
            case  GL.GMVI.Effect:
                canvasType=new CanvasEffect();
                break;
            case GL.GMVI.TagCloud:
                canvasType=new CanvasTagCloud();
                break;
            case GL.GMVI.Migrate:
                canvasType=new CanvasMigrate();
                break;
            case GL.GMVI.Bar:
                canvasType=new CanvasBar();
                break;
            case GL.GMVI.WaterBubble:
                canvasType=new CanvasWaterBubble();
                break;
            // case GL.GMVI.Radiation:
            //     canvasType=new CanvasRadiation();
            //     break;
            case GL.GMVI.Star:
                canvasType=new CanvasStar()
                break;
            case GL.GMVI.Scatter:
                canvasType=new CanvasScatter();
                break;
            case GL.GMVI.MigrateLines:
                canvasType=new CanvasMigrateLines();
                break;
            case GL.GMVI.Arrow:
                canvasType=new CanvasArrow();
                break;
            case GL.GMVI.WaterBubble:
                canvasType=new CanvasWaterBubble();
                break;
            case GL.GMVI.Radial:
                canvasType=new CanvasRadial();
                break;
                
            default: //simaple
                canvasType = new CanvasSimple();
        }
        this.canvasType=canvasType;
    }

    _clickEvent(e,callback) {
        let map=this.getMap();
        let coordinates=e.coordinate;
        let pixel=map.coordinateToContainerPoint(coordinates);
        // console.log(pixel)
        if(this.options.draw==GL.GMVI.Cluster&&this.status==GL.GMVI.Cluster) {
            return this;
        }
        var canvas=document.createElement('canvas');
        canvas.width=this._canvas.width;
        canvas.height=this._canvas.height;
        var ctx=canvas.getContext('2d');
        var data = this.data;
        for (var i = 0; i < data.length; i++) {
            if(this.canvasType instanceof CanvasMigrateLines){
               var xy=data[i].xy;
               for(var j=0,len=xy.length;j<len-1;j++){
                    var _xy=[xy[j],xy[j+1]]
                    ctx.beginPath(); 
                    SimplePath.drawArc(ctx, _xy, this.options);
                    if (ctx.isPointInPath(pixel.x,pixel.y)) {
                        data[i].location=e;
                        callback(data[i], e);
                        return this;
                    }
               }


            }else{
                ctx.beginPath();
                SimplePath.draw(ctx, data[i], this.options);
                ctx.restore();
                if (ctx.isPointInPath(pixel.x,pixel.y)) {
                    data[i].location=e;
                    callback(data[i], e);
                    return this;
                }
            }
        }
        return this;
    }

    _initEvent () {
        this.eventMap=this.eventMap||{};
        let map=this.getMap();
        for(var eventType in this.eventMap){
            map.addEventListener(eventType,this.eventMap[eventType]);
        }
    }


    _initOptions(options){
        this.options=GL.GMVI.Extend(this.options,options);
        this.animationOptions = this.options.animation;
        this.isEnabledTime = (
            this.animationOptions
            && !(this.animationOptions.enabled === false)
        );
        this.intensity = new IntensityUtil({
            maxSize: this.options.maxSize,
            gradient: this.options.gradient,
            max: this.options.max
        });
        this.category = new CategoryUtil(this.options.splitList);
        this.choropleth = new ChoroplethUtil(this.options.splitList);
        this.eventMap={};

    }

    _clearTime () {
        if(this.animator){
            this.animator.stop();
        }
        var canvasType=this.canvasType;
        if(canvasType instanceof CanvasEffect){
            if(canvasType.anmimation){
                window.clearInterval(canvasType.anmimation)
                canvasType.anmimation=null;
                console.log('clear effect animation')
            }
        }
        if(canvasType instanceof CanvasMigrate){
            if(canvasType.migration){
                window.cancelAnimationFrame(canvasType.migration.requestAnimationId)
                canvasType.migration.started=false;
                console.log('clear migration animation')
            }
        }
        if(canvasType instanceof CanvasMigrateLines){
            if(canvasType.migration){
                window.cancelAnimationFrame(canvasType.migration.requestAnimationId)
                canvasType.migration.started=false;
                console.log('clear migrationLine animation')
            }
        }

        if(canvasType instanceof CanvasScatter){
            if(canvasType.animation){
                window.cancelAnimationFrame(canvasType.animation)
                // canvasType.migration.started=false;
                console.log('clear scatter animation')
            }
        }
        for(var i=0,len=this.data.length;i<len;i++){
            var d=this.data[i];
            var video=d.video;
            if(video&&video.timeId){
                window.clearInterval(video.timeId)
            }
        }
        return this;

    }

}

GMVICanvasLayer.mergeOptions(options);

GMVICanvasLayer.registerJSONType('GMVICanvasLayer');

class GMVICanvasLayerRenderer extends maptalks.renderer.CanvasRenderer{

    getLayer(){
        return this.layer;
    }

    draw() {
        const layer = this.layer;
        this.prepareCanvas();
        if(!layer.getCanvas())
             layer.setCanvas(this.canvas);
        if(!layer.getContext()) layer.setContext(this.context);     
        if(!layer.inited) {
            layer._init();
            layer.inited=true;
        }
        layer._reset();
    }

    drawOnInteracting() {
        // this.draw();
    }

}
GMVICanvasLayer.registerRenderer('canvas',GMVICanvasLayerRenderer);
GL.GMVI.CanvasLayer=GMVICanvasLayer;

