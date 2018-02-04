
import  SimplePath from "../canvas/path/GLSimplePath"
import Animator from "./../utils/animation/Animator"
import CategoryUtil from "./../utils/data-range/GLCategory"
import ChoroplethUtil from "./../utils/data-range/GLChoropleth"
import IntensityUtil from "./../utils/data-range/GLIntensity"
import CanvasArrow from "./../canvas/draw/GLCanvasArrow"
import CanvasBar from "./../canvas/draw/GLCanvasBar"
import CanvasCluster from "./../canvas/draw/GLCanvasCluster"
import CanvasEffect from "./../canvas/draw/GLCanvasEffect"
import CanvasGrid from "./../canvas/draw/GLCanvasGrid"
import CanvasHeat from "./../canvas/draw/GLCanvasHeat"
import CanvasHoneycomb from "./../canvas/draw/GLCanvasHoneycomb"
import CanvasIcon from "./../canvas/draw/GLCanvasIcon"
import CanvasMigrate from "./../canvas/draw/GLCanvasMigrate"
import CanvasMigrateLines from "./../canvas/draw/GLCanvasMigrateLines"
import CanvasPercent from "./../canvas/draw/GLCanvasPercent"
import CanvasRadial from "./../canvas/draw/GLCanvasRadial"
import CanvasRadiation from "./../canvas/draw/GLCanvasRadiation"
import CanvasScatter from "./../canvas/draw/GLCanvasScatter"
import CanvasSimple from "./../canvas/draw/GLCanvasSimple"
import CanvasStar from "./../canvas/draw/GLCanvasStar"
import CanvasTagCloud from "./../canvas/draw/GLCanvasTagCloud"
import CanvasText from "./../canvas/draw/GLCanvasText"
import CanvasVideo from "./../canvas/draw/GLCanvasVideo"
import CanvasWaterBubble from "./../canvas/draw/GLCanvasWaterBubble"

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
        this.dataSet=dataSet;
        this._initOptions(options);
        this.inited=false;
        // var self=this;
        // this.on('renderstart',function(){
        //   self.redraw();
        // })
    }

    getData() {
        return this.dataSet;
    }

   

    onConfig(conf) {
        for (const p in conf) {
            if (options[p]) {
                return this.redraw();
            }
        }
        return this;
    }

    // redraw() {
    //     const renderer = this._getRenderer();
    //     if (renderer) {
    //         // renderer.clearHeatCache();
    //         renderer.setToRedraw();
    //     }
    //     return this;
    // }

    isEmpty() {
        if (!this.data.length) {
            return true;
        }
        return false;
    }

    clear() {
        this._heats = [];
        this.redraw();
        this.fire('clear');
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

    // //更新配置
    // setOptions (options) {
    //     this._initOptions(options);
    //     this._initCanvasType(); //初始化canvas绘制类型
    //     this._reset();
    //     this._animationCall();  //动画判断和回调
    // }

    // redraw() {
    //     const renderer = this._getRenderer();
    //     if (renderer) {
    //         // renderer.clearHeatCache();
           
    //         this._initCanvasType(); //初始化canvas绘制类型
    //         this._reset();
    //         this._animationCall();  //动画判断和回调
    //         // this._clickEvent = this._clickEvent.bind(this);
    //         // this._bindEvent();
    //         // renderer.setToRedraw();
    //     }
    //     return this;
    // }

    getRenderer(){
        return this._getRenderer();
    }



    // onAdd (map) {
    //     this._map = map;
    //     if (!this._canvas) {
    //         this._initCanvas();
    //     }
    //     map._panes.overlayPane.appendChild(this._canvas);
       
    //     map.on('moveend', this._reset, this); //移动调整
    //     // map.on('resize', this._reset, this); //移动调整
    //     if (map.options.zoomAnimation && L.Browser.any3d) {
    //         map.on('zoomanim', this._animateZoom, this);//缩放调整
    //     }
    //     this._initCanvasType(); //初始化canvas绘制类型
    //     this._reset();
    //     this._animationCall();  //动画判断和回调
    //     this._clickEvent = this._clickEvent.bind(this);
    //     this._bindEvent();
   
    // }

    // onRemove: function (map) {
    //     map.getPanes().overlayPane.removeChild(this._canvas);
    //     map.off('moveend', this._reset, this);
    //     if (map.options.zoomAnimation) {
    //         map.off('zoomanim', this._animateZoom, this);
    //     }
    //     if(this.eventMap){
    //         for(var key in this.eventMap){
    //             map.off(key,this.eventMap[key])
    //         }
    //     }
    //     this._clearTime();
    // }

    // addTo: function (map) {
    //     map.addLayer(this);
    //     return this;
    // }



     //重置数据
    resetData (dataSet) {
        this.data=this._filterData(dataSet.get());
        this._reset();
    }

    //重置数据
    resetDatas(dataSet) {
        this.data=this._filterData(dataSet.get());
        this._reset();
    }

    //增量数据
    addDatas (dataSet) {
        this.data=this.data.concat(this._filterData(dataSet.get()))
        this._reset();
    }

    removeDatas (datas) {
        if(Array.isArray(datas)&&datas.length>0){
            var map={};
            datas.forEach(function (value,index) {
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
            this._reset();
        }
    }

    removeData (data) {
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
            this._reset();
        }
    }

    // on:function(eventType,callback){
    //     if(!eventType||!callback)
    //         throw  new Error('eventType or callback is error');
    //     var self=this;
    //     var mapEvent=function (e) {
    //         self._clickEvent(e,callback)
    //     };
    //     this.eventMap[eventType]=mapEvent;
    //     this._initEvent();
    // }

    // off:function (eventType,callback) {
    //       var v=this.eventMap[eventType];
    //       map.off(eventType,v);
    //       delete this.eventMap[eventType];
    //       return this;
    // }

    // setZindex:function(zIndex){
    //     this._canvas.style.zIndex=zIndex;
    // }
    
    // show:function () {
    //     this.setOpacity(1)
    // }
    // hide:function () {
    //     this.setOpacity(0)
    // }
    // setOpacity:function (opacity) {
    //     opacity=parseFloat(opacity)
    //     if(Number.isFinite(opacity))
    //         this._canvas.style.opacity=opacity;
    // }
    // AnimationPause:function(){
    //     var canvasType=this.canvasType;
    //     if(!canvasType) throw new Error('not find canvasType');
    //     if(canvasType instanceof CanvasMigrateLines){
    //         if(canvasType.migration){
    //             canvasType.migration.pause();
    //         }

    //     }else{
    //         throw new Error('current canvasType is not support this method')
    //     }
    // }

    // AnimationPlay:function(){
    //     var canvasType=this.canvasType;
    //     if(!canvasType) throw new Error('not find canvasType');
    //     if(canvasType instanceof CanvasMigrateLines){
    //         if(canvasType.migration){
    //             canvasType.migration.play();
    //         }

    //     }else{
    //         throw new Error('current canvasType is not support this method')
    //     }
    // }


    // AnimationRePlay:function(){
    //     var canvasType=this.canvasType;
    //     if(!canvasType) throw new Error('not find canvasType');
    //     if(canvasType instanceof CanvasMigrateLines){
    //         if(canvasType.migration){
    //             canvasType.migration.init();
    //             if(!canvasType.migration.started)
    //             canvasType.migration.start(this._canvas);
    //         }

    //     }else{
    //         throw new Error('current canvasType is not support this method')
    //     }
    // }

    getCanvas(){
        return this._canvas;
    }

    setCanvas(canvas){
        this._canvas=canvas;
    }


////////////////////////////////////////////////////////////////////////////
    _init(){
            this._initCanvasType(); //初始化canvas绘制类型
            this._reset();
            this._animationCall();  //动画判断和回调
    }

    _reset () {
        let map=this.getMap();
        if(!map)
            throw new Error( '请现将该图层添加到地图上');
        this._redraw();
    }

    //经纬度转屏幕坐标
    _lnglatToPixel(lnglat,mercatormeters){
        if(!Array.isArray(lnglat)) throw new Error('lnglat is error');
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

    _redraw () {
       let map=this.getMap();
       const distance=100;
       let size=map.distanceToPixel(distance,distance);
       let width=size.width;
       let height=size.height;
       this.lengthAverage=(Math.sqrt(Math.pow(width,2)+Math.pow(height,2)))/(Math.sqrt(Math.pow(distance,2)*2))
       this._drawCanvasLayer();
    }


    _drawCanvasLayer () {
        var self=this;
        let renderer=this.getRenderer();
        var newData=[];
        var currenttime=self.time;
        if (self.isEnabledTime) {
            if(this.time==undefined)
                return;
             // console.log(currenttime)
            var trails = self.animationOptions.trails || 5;
            for(var x in this.data) {
                var item = this.data[x];
                if (currenttime && item.time > (currenttime - trails) && item.time < currenttime)
                    newData.push(item);
            }
            var context=this._canvas.getContext("2d");
            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.fillStyle = 'rgba(0, 0, 0, .1)';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.restore();
            renderer.completeRender();
        } else {
            newData=this.data;
            var context=this._canvas.getContext("2d");
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
      
        // if(!newData||newData.length==0) return;
        var currentViewData=[];
        var geometry,coordinates,type,e,latlng,raduis,mercatormeters;
        var timeId="经纬度转屏幕坐标时间  ";
        console.time(timeId)
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
                    var circle=new Circle(coordinates,raduis);
                    // console.log(circle.getShell())
                    // var centerXY=this._lnglatToPixel(coordinates,mercatormeters);
                    // var length=this.lengthAverage*raduis;
                    // e.xy=centerXY;
                    // e.length=length;
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
        // console.log(currentViewData.length)
        // console.timeEnd(timeId)
        // if(!currentViewData||currentViewData.length==0) return;
        var dataSet=new GL.GMVI.DataSet(currentViewData);
        if(self.options.draw!=GL.GMVI.Cluster)
            this.canvasType.draw(this._canvas, dataSet, this.options,renderer);
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
            var map=self._map;
            var size=map.getSize ();
            var boundary=map.getBounds ();
            var _northEast=boundary._northEast;
            var _southWest=boundary._southWest;
            var zoom=map.getZoom();
            var maxClusterLv=self.options.maxClusterLv;
            if(!maxClusterLv)  maxClusterLv=map.getMaxZoom();
            var minx=_southWest.lng;
            var miny=_southWest.lat;
            var maxx=_northEast.lng;
            var maxy=_northEast.lat;
            var width=size.x;
            var height=size.y;
            //聚合工具对数据进行聚合
            var timeId='数据聚合时间 '
            // console.time(timeId)
            var clusterResult=GL.GMVI.ClusterUtil.cluster(_data,zoom,maxClusterLv,minx,miny,maxx,maxy,width,height)
            // console.timeEnd(timeId)
            if(clusterResult) {
                var cluster = clusterResult.cluster;
                var discrete = clusterResult.discrete
                if (cluster) {
                    for (var x in cluster) {
                        var o = cluster[x];
                        var center = o.center;
                        var xy = self._lnglatToPixel(center);
                        clusterResult.cluster[x].xy = xy;
                        this.status = 'cluster'
                    }
                }
                if (discrete) {
                    for (var i = 0; i < discrete.length; i++) {
                        var o = discrete[i];
                        var center = o.slice(0, 2);
                        var xy = self._lnglatToPixel(center);
                        clusterResult.discrete[i] = clusterResult.discrete[i].concat(xy);
                        this.status = 'discrete'
                    }
                }
                this.canvasType.draw(this._canvas, clusterResult, this.options);
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
            case GL.GMVI.Radiation:
                canvasType=new CanvasRadiation();
                break;
            case GL.GMVI.Radial:
                canvasType=new CanvasRadial();
                break;
            case GL.GMVI.Star:
                canvasType=new CanvasStar()
                break;
            case GL.GMVI.Percent:
                canvasType=new CanvasPercent();
                break;
            case GL.GMVI.Video:
                canvasType=new CanvasVideo();
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
                
            default: //simaple
                canvasType = new CanvasSimple();
        }
        this.canvasType=canvasType;
    }

    // _clickEvent : function(e,callback) {
    //     var pixel = this._map.toPixel(e.latlng)
    //     if(this.options.draw==GL.GMVI.Cluster&&this.status==GL.GMVI.Cluster) {
    //         return this;
    //     }
    //     var context = this._canvas.getContext('2d');
    //     var canvas=document.createElement('canvas');
    //     canvas.width=context.canvas.width;
    //     canvas.height=context.canvas.height;
    //     var ctx=canvas.getContext('2d');
    //     var data = this.dataSet.get();
    //     for (var i = 0; i < data.length; i++) {
    //         if(this.canvasType instanceof CanvasMigrateLines){
    //            var xy=data[i].xy;
    //            for(var j=0,len=xy.length;j<len-1;j++){
    //                 var _xy=[xy[j],xy[j+1]]
    //                 ctx.beginPath(); 
    //                 SimplePath.drawArc(ctx, _xy, this.options);
    //                 if (ctx.isPointInPath(pixel.x,pixel.y)) {
    //                     data[i].location=e;
    //                     callback(data[i], e);
    //                     return this;
    //                 }
    //            }


    //         }else{
    //             ctx.beginPath();
    //             SimplePath.draw(ctx, data[i], this.options);
    //             ctx.restore();
    //             if (ctx.isPointInPath(pixel.x,pixel.y)) {
    //                 data[i].location=e;
    //                 callback(data[i], e);
    //                 return this;
    //             }
    //         }
    //     }
    //     return this;
    // }

    // _initEvent:function () {
    //     this.eventMap=this.eventMap||{};
    //     for(var eventType in this.eventMap){
    //         this._map.addEventListener(eventType,this.eventMap[eventType]);
    //     }
    // }

    // _bindEvent :function(e) {
    //     var self=this;
    //     if (this.options.methods) {
    //         if (this.options.methods.click) {
    //             var mapEvent=function (e) {
    //                 self._clickEvent(e,self.options.methods.click)
    //             };
    //             this.eventMap['click']=mapEvent;
    //         }
    //     }
    //     this._initEvent();
    // }

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
        this.data=this._filterData(this.dataSet.get());
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

    onConfig(conf) {
        for (const p in conf) {
            if (options[p]) {
                return this.redraw();
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

    // getData(){

    // }
    draw() {
       
        const map = this.getMap(),
            layer = this.layer;
        this.prepareCanvas();
        //     extent = map.getContainerExtent();
        // let maskExtent = this.prepareCanvas();
        //     displayExtent = extent;
        // if (maskExtent) {
        //     maskExtent = maskExtent.convertTo(c => map._pointToContainerPoint(c));
        //     //out of layer mask
        //     if (!maskExtent.intersects(extent)) {
        //         this.completeRender();
        //         return;
        //     }
        //     displayExtent = extent.intersection(maskExtent);
        // }
        let timer='timer'
        console.time(timer)
        if(!layer.getCanvas()) layer.setCanvas(this.canvas)
        if(!layer.inited) {
            layer._init();
            layer.inited=true;
        }
        console.timeEnd(timer)
       
        layer._reset();
       
        this.completeRender();
    }

    drawOnInteracting() {
        // this.draw();
    }

   

    onZoomEnd() {
        super.onZoomEnd.apply(this, arguments);
    }

    onResize() {
        if (this.canvas) {
            // this._heater._width  = this.canvas.width;
            // this._heater._height = this.canvas.height;
        }
        super.onResize.apply(this, arguments);
    }

    onRemove() {
        // this.clearHeatCache();
        delete this._heater;
    }

    clearHeatCache() {
        // delete this._heatViews;
    }
}
GMVICanvasLayer.registerRenderer('canvas',GMVICanvasLayerRenderer);

// maptalks.GMVICanvasLayer=GMVICanvasLayer;
GL.GMVI.CanvasLayer=GMVICanvasLayer;
// module.exports=GMVICanvasLayer;

