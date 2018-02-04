Visualization of geographic data


this is inspire  from  https://github.com/huiyan-fe/mapv

some example


![](gallery/point.png)


![](gallery/chinapoint.png)



![](gallery/weibo.png)


![](gallery/lineString.png)


![](gallery/polygon.png)


![](gallery/effect.png)


![](gallery/categoryLine.png)


![](gallery/honeycomb.png)


![](gallery/heatPoint.png)


![](gallery/heatLine.png)


![](gallery/tagcloud.png)


![](gallery/migratetest.png)


![](gallery/scatter.png)

![](gallery/wuhancar.png)


![](gallery/polyline_simple_animation.png)


![](gallery/liangke.png)


![](gallery/nj-taxi.png)


![](gallery/beijingtongqin.png)


![](gallery/sichuangcar.png)


![](gallery/qianxi-time.png)


--------------------------

more examples:http://120.26.224.171/maptalks-gmvi/examples/


<h2>API</h2>

--------------------------------------------------------------------------------------

<pre>

 1.maptalks.GMVI.CanvasLayer(id,dataSet,options) //矢量图层

  使用CanvasLayer


    var canvasLayer=new maptalks.GMVI.CanvasLayer(id,dataSet,options);

    map.addLayer(canvasLayer);

    map.removeLayer(canvasLayer);

    //重置 配置
    canvasLayer.setOption(Options);


    //获取数据
    canvasLayer.getDatas();

     //重置数据
     canvasLayer.resetDatas(dataSet);


    //添加数据
    canvasLayer.addDatas(dataSet);

    //移除数据
    canvasLayer.removeDatas([data]);

    //清除数据
    canvasLayer.clear();

     //事件处理，仅支持click event
     canvasLayer.on('click',function(e){

     })

    //event remove
    canvasLayer.off(''click',function(e){

    });


    canvasLayer.getId();


    canvasLayer.getOpacity();


    canvasLayer.setOpacity(opacity)


    canvasLayer.show()


    canvasLayer.hide();

 </pre>


  <pre>
  2.maptalks.GMVI.DasetSet是GMvi中统一规范的数据对象，用来保存json数据对象

            var data = [
                    {
                        city: '北京',
                        count: 30
                    },
                    {
                        city: '南京',
                        count: 30
                    }
                ];

                var dataSet = new maptalks.GMVI.DataSet(data); //data is Array

              var data = [
                // 点数据
                {
                    geometry: {
                        type: 'Point',
                        coordinates: [123, 23]
                    }
                },
                // 线数据
                {
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [123, 23],
                            [124, 24]
                        ]
                    },
                    count: 30
                },
                // 面数据
                {
                    geometry: {
                        type: 'Polygon',
                        coordinates:
                            [
                                [123, 23],
                                [123, 23],
                                [123, 23]
                            ]

                    },
                    count: 30 * Math.random()
                },
                //圆
                {
                   geometry: {
                    type: 'Circle',
                    coordinates: [lng,lat],
                    radius:parseInt(100*Math.random()+50)
                  },
                }
            ];
             //data 数组中data对象的完整值
            {
                     geometry: {
                        type: 'Circle',
                        coordinates: [lng,lat],
                        radius:parseInt(100*Math.random()+50)
                     },
                     count: 1, //数据个数，数据个数决定权重,一般用于分类使用
                     time: Math.random() * 100，//时间值，用于动画使用
                     color:randomColor(), ///覆盖option中的值，颜色值
                     id:GL.H.uuid() ，   //主键值
                     icon:img,//图片对象，当绘制icon图或者聚合图会使用到，即需要在地图上绘制图标
  
                     labels:[fromName,toName]，//当且仅当绘制迁徙图时使用到,
                     name:name,//名字
                     text:text,//标注等价于name
                     size:10 //大小值
            }


   

          // dataSet 方法
             
        
         通过此方法可以获取当前数据集的数据
        var data = dataSet.get();
  
        通过此方法可以添加增量数据
     dataSet.add(object/Array);//可以添加数据对象或者一个数据对象的数组
</pre>
 <pre>
     3. options配置对象参数解析。
    
                size: 5, // 大小值，绘制点，矩形（当点用矩形绘制时）等都会用到
                id: UUID, // 图层主键(若不设置为GL.H.uuid())
                fillStyle: 'rgba(200, 200, 50, 1)', // 填充颜色，绘制点，多边形，圆等会用到
                strokeStyle: 'rgba(0, 0, 255, 1)', // 描边颜色，绘制线路时用到
                lineWidth: 4, // 描边宽度
                globalAlpha: 1, // 透明度
                globalCompositeOperation: 'lighter', // 颜色叠加方式
                shadowColor: 'rgba(255, 255, 255, 1)', // 投影颜色
                shadowBlur: 35,  // 投影模糊级数
                maxSize: 20, //最大值，绘制气泡等图形时要限制最大值
                max:100,//最大值，count的最大值
                splitList: [
                      {
                        start: 0,
                        end: 2,
                        color: randomColor()
                    },{
                        start: 3,
                        end: 4,
                        color: randomColor()
                    },{
                        start: 5,
                        end: 6,
                        color: randomColor()
                    },{
                        start: 7,
                        end: 8,
                        color: randomColor()
                    },{
                        start: 9,
                        end:10,
                        color: randomColor()
                    },
                    {
                        start: 11,
                        end:12,
                        color: randomColor()
                    }   
               ],//count区间和对应的颜色值
               gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},//比例值和对应的颜色值
               maxClusterLv:3,//最大的聚合层级的值，当绘制聚合图层时需要使用
               showText:true,//是否显示文字
               font:'18px sans-serif',//标注字体样式
               symbol:'rect',//点的标志，默认是绘制圆，指定后可以绘制矩形
               animation: {
                    type: 'time', // 按时间展示动画
                    stepsRange: { // 动画时间范围,time字段中值
                        start: 0,
                        end: 100
                    },
                    trails: 10, // 时间动画的拖尾大小
                    duration: 5, // 单个动画的时间，单位秒
               },
               draw:'simple'||'bubble'||'intensity'||'category'||'choropleth'||'effect'||
               'heatmap'||'grid'||'honeycomb'||'text'||'icon'||'cluster'||'tagcloud'||'migrate'||
               'waterbubble'||'radial'||'star'||'arrow'||'scatter'||'migrateLines'
                //绘制类型
    </pre>


   


    






