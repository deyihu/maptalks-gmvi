// import { randomBytes } from 'crypto';

const GridSize=100;

const MINLNG=-179;
const MAXLNG=179;
const MINLAT=-89;
const MAXLAT=89;

const MECATORMINLNG=-19926188.851995967;
const MECATORMAXLNG=19926188.851995967;
const MECATORMINLAT=-20037508.342789244;
const MECATORMAXLAT=20037508.342789244;


const EPSG3857="EPSG:3857";

const SphericalMercator=require('@mapbox/sphericalmercator');
const merc = new SphericalMercator({
    size: 256
});

GL.GMVI.SuperCluster=function(data,  zoom, maxClusterLv,  minx,miny,  maxx,  maxy,  width,  heigh,  crsCode){
    if(EPSG3857===(crsCode)) return mecatorCluster(data,zoom,maxClusterLv,minx,miny,maxx,maxy,width,heigh);
    return cluster(data,zoom,maxClusterLv,minx,miny,maxx,maxy,width,heigh);
}


function cluster(data,  zoom, maxClusterLv,  minx,miny,  maxx,  maxy,  width,  heigh){
        var xAverage=width/(maxx-minx);//单位经度对应的像素个数
        var yAverage=heigh/(maxy-miny);//单位纬度对应的像素个数
        var lngAverage=(maxx-minx)/width;
        var latAverage=(maxy-miny)/heigh;
        var result={};
        var  rangleData=[];
        for(var i=0;i<data.length;i++){
            var element=data[i];
            var geometry=element.geometry;
            if(geometry.type==GL.GMVI.Geometry.Point){
                var coordinates=geometry.coordinates;
                var lng=parseFloat(coordinates[0]),lat=parseFloat(coordinates[1]);
                if(minx<=lng&&lng<=maxx&&miny<=lat&&lat<=maxy) rangleData.push(element);
            }
        }
      
        if(zoom>maxClusterLv){
            var clusterGrid=[];
            var unClusterGrid=[];
            rangleData.forEach(function(element){
                var geometry=element.geometry;
                if(geometry.type==GL.GMVI.Geometry.Point){
                    var coordinates=geometry.coordinates;
                    var lng=parseFloat(coordinates[0]),lat=parseFloat(coordinates[1]);
                    var grid={count:1,center:[lng,lat],item:element};
                    var x=(lng-minx)*xAverage;
                    var y=heigh-(lat-miny)*yAverage;
                    grid.xy=[x,y];
                    unClusterGrid.push(grid);
                }
            })
          
            result["clusters"]=clusterGrid;
            result["unClusters"]=unClusterGrid;
            return result;
        }
        var rowsList=[],colList=[],gridList=[],grids={};
        var c=0;
        var r=0;
        while (true){
            if((r+1)*GridSize*latAverage+MINLAT>=miny){
                rowsList.push(r);
            }
            if((r+1)*GridSize*latAverage+MINLAT>=maxy){
                break;
            }
            r++;
        }
        while (true){
            if((c+1)*GridSize*lngAverage+MINLNG>=minx){
                colList.push(c);
            }
            if((c+1)*GridSize*lngAverage+MINLNG>=maxx){
                break;
            }
            c++;
        }
        var rowColList=[];
        for(var i=0;i<rowsList.length;i++){
            var row=rowsList[i];
            var rowCol=[];
            for(var j=0;j<colList.length;j++){
                var col=colList[j];
                var grid={gridIndex:row+'-'+col};
                if(!grids[row]){
                    grids[row]={};
                }
                grids[row][col]=grid;
                rowCol.push([row,col]);
            }
            rowColList.push(rowCol);
        }
        for(var i=0;i<rangleData.length;i++){
             var element=rangleData[i];
             var geometry=element.geometry;
             if(geometry.type!==GL.GMVI.Geometry.Point) continue;
             var coordinates=geometry.coordinates;
             var lng=parseFloat(coordinates[0]),lat=parseFloat(coordinates[1]);
             var row=parseInt((lat-MINLAT)/(latAverage*GridSize));
             var col=parseInt((lng-MINLNG)/(lngAverage*GridSize));
             if(!grids[row]) console.error(row,'is error');
             if(!grids[row][col]) console.error(col,'is error');
             var grid=grids[row][col];
             if(!grid.center){
                grid.center=[lng,lat];//(new double[]{lng,lat});
                grid.count=1;
                var x=(lng-minx)*xAverage;
                var y=heigh-(lat-miny)*yAverage;
                grid.xy=[x,y];
                grid.item=element;
                grids[row][col]=grid;
             }else{
                grids[row][col].count=grids[row][col].count+1;
             }
         }
        rowColList.forEach(rowCol => {
            rowCol.forEach(rc => {
                var row=rc[0],col=rc[1];
                gridList.push(grids[row][col]);
                
            });
        });
        var IdMap={},NearGridList=[];
        while (true){
            getNearGridList(gridList,IdMap,NearGridList,minx,miny,xAverage,yAverage,heigh,false);
            if(NearGridList.length==0) break;
            gridList= gridList.concat(NearGridList);
            NearGridList=[];
        }
        var clusterGrid=[],unClusterGrid=[];
        for(var i=0;i<gridList.length;i++){
            var grid=gridList[i];
            var id=grid.gridIndex;
            if(IdMap[id]) continue;
            var count=grid.count;
            if(count==1){
                unClusterGrid.push(grid);
            }
            if(count>1){
                clusterGrid.push(grid);
            }
        }
        result["clusters"]=clusterGrid;
        result["unClusters"]=unClusterGrid;
        return  result;
     }


     function getNearGridList(gridList,IdMap,NearGridList,minx, miny, xAverage, yAverage, heigh,isMecator){
            for(var row=0;row<gridList.length;row++){
                var rowGrid=gridList[row];
                var id=rowGrid['gridIndex'];
                if(IdMap[id]!=undefined) continue;
                // if(rowGrid.count<2) continue;
                var lnglat=rowGrid.center;
                if(lnglat==null) continue;
                var lng=lnglat[0],lat=lnglat[1];
                var xy=rowGrid.xy;
                var x=xy[0],y=xy[1];
                for(var col=0;col<gridList.length;col++){
                    var colGrid=gridList[col];
                    // if(colGrid.count<2) continue;
                    var id1=colGrid.gridIndex;
                    if(IdMap[id1]!=undefined||id===id1||IdMap[id]!=undefined) continue;
                    var lnglat1=colGrid.center;
                    if(lnglat1==null) continue;
                    var lng1=lnglat1[0],lat1=lnglat1[1];
                    var xy1=colGrid.xy;
                    var x1=xy1[0],y1=xy1[1];
                    if(Math.sqrt(Math.pow(y1-y,2)+Math.pow(x1-x,2))<=50){
                        // console.log(id,id1,rowGrid.count,colGrid.count);
                        var grid={};
                        grid.center=([(lng+lng1)/2,(lat+lat1)/2]);
                        grid.count=(rowGrid.count+colGrid.count);
                        // console.log(grid.count);
                        grid.gridIndex=(GL.GMVI.uuid());
                        var ax,ay;
                        if(isMecator){
                            var mlnglat=  merc.forward([lng,lat]);
                            var mlnglat1=  merc.forward([lng1,lat1]);
                            ax=((mlnglat[0]+mlnglat1[0])/2-minx)*xAverage;
                            ay=heigh-((mlnglat[1]+mlnglat1[1])/2-miny)*yAverage;
    
                        }else{
                            ax=((lng+lng1)/2-minx)*xAverage;
                            ay=heigh-((lat+lat1)/2-miny)*yAverage;
                        }
                        grid.xy=[ax,ay];
                        NearGridList.push(grid);
                        IdMap[id]=id;
                        IdMap[id1]=id1;
                    }
                }
            }
    }

    function mecatorCluster( data,  zoom,  maxClusterLv, minx,  miny,  maxx,  maxy,  width,  heigh){
            // console.log(minx,miny,maxx,maxy);
            var minxy=  merc.forward([minx,miny]);
            var maxxy= merc.forward([maxx,maxy]);
            minx=minxy[0];miny=minxy[1];maxx=maxxy[0];maxy=maxxy[1];
            // width=(maxx-minx)/width*(MECATORMAXLNG-MECATORMINLNG);
            // heigh=(maxy-miny)/heigh*(MECATORMAXLAT-MECATORMINLAT);
            // minx=-180,maxx=180,miny=-90,maxy=90;
            // minxy=  merc.forward([minx,miny]);
            // maxxy= merc.forward([maxx,maxy]);
            // minx=minxy[0];miny=minxy[1];maxx=maxxy[0];maxy=maxxy[1];
            var xAverage=width/(maxx-minx);
            var yAverage=heigh/(maxy-miny);
            var lngAverage=(maxx-minx)/width;
            var latAverage=(maxy-miny)/heigh;

            var result={};
            var  rangleData=[];

            data.forEach(element => {
                var geometry=element.geometry;
                if(geometry.type==GL.GMVI.Geometry.Point){
                    var mercatormeters=geometry.mercatormeters;
                    var lng=parseFloat(mercatormeters[0]),lat=parseFloat(mercatormeters[1]);
                    if(minx<=lng&&lng<=maxx&&miny<=lat&&lat<=maxy) rangleData.push(element);
                }
            });
            if(zoom>maxClusterLv){
                var clusterGrid=[];
                var unClusterGrid=[];
                rangleData.forEach(function(element){
                    var geometry=element.geometry;
                    if(geometry.type==GL.GMVI.Geometry.Point){
                        var coordinates=geometry.coordinates;
                        var mercatormeters=geometry.mercatormeters;
                        var lng=parseFloat(coordinates[0]),lat=parseFloat(coordinates[1]);
                        var mlng=mercatormeters[0],mlat=mercatormeters[1];
                        var grid={count:1,center:[lng,lat],item:element};
                        var x=(mlng-minx)*xAverage;
                        var y=heigh-(mlat-miny)*yAverage;
                        grid.xy=[x,y];
                        unClusterGrid.push(grid);
                    }
                })
                result["clusters"]=clusterGrid;
                result["unClusters"]=unClusterGrid;
                return result;
            }
          

            var rowsList=[],colList=[],gridList=[],grids={};
            var c=0;
            var r=0;
            while (true){
                if((r+1)*GridSize*latAverage+MECATORMINLAT>=miny){
                    rowsList.push(r);
                }
                if((r+1)*GridSize*latAverage+MECATORMINLAT>=maxy){
                    break;
                }
                r++;
            }
            while (true){
                if((c+1)*GridSize*lngAverage+MECATORMINLNG>=minx){
                    colList.push(c);
                }
                if((c+1)*GridSize*lngAverage+MECATORMINLNG>=maxx){
                    break;
                }
                c++;
            }
            var rowColList=[];
            for(var i=0;i<rowsList.length;i++){
                var row=rowsList[i];
                var rowCol=[];
                for(var j=0;j<colList.length;j++){
                    var col=colList[j];
                    var grid={gridIndex:row+'-'+col};
                    if(!grids[row]){
                        grids[row]={};
                    }
                    grids[row][col]=grid;
                    rowCol.push([row,col]);
                }
                rowColList.push(rowCol);
            }
            for(var i=0;i<rangleData.length;i++){
                var element=rangleData[i];
                var geometry=element.geometry;
                if(geometry.type!==GL.GMVI.Geometry.Point) continue;
                var mercatormeters=geometry.mercatormeters;
                var coordinates=geometry.coordinates;
                var lng=parseFloat(coordinates[0]),lat=parseFloat(coordinates[1]);
                var mlng=mercatormeters[0],mlat=mercatormeters[1];
                var row=parseInt((mlat-MECATORMINLAT)/(latAverage*GridSize));
                var col=parseInt((mlng-MECATORMINLNG)/(lngAverage*GridSize));
                if(!grids[row]) console.error(row,'is error');
                if(!grids[row][col]) console.error(col,'is error');
                var grid=grids[row][col];
                if(!grid.center){
                    grid.center=[lng,lat];//(new double[]{lng,lat});
                    grid.count=1;
                    var x=(mlng-minx)*xAverage;
                    var y=heigh-(mlat-miny)*yAverage;
                    grid.xy=[x,y];
                    grid.item=element;
                    grids[row][col]=grid;
                }else{
                    grids[row][col].count=grids[row][col].count+1;
                }

            }
           
            rowColList.forEach(rowCol => {
                rowCol.forEach(rc => {
                    var row=rc[0],col=rc[1];
                    var grid=grids[row][col];
                    if(grid.center!=undefined)
                       gridList.push(grids[row][col]);
                    
                });
            });
           
            var IdMap={},NearGridList=[];
            while (true){
                getNearGridList(gridList,IdMap,NearGridList,minx,miny,xAverage,yAverage,heigh,true);
                if(NearGridList.length==0) break;
                gridList= gridList.concat(NearGridList);
                NearGridList=[];
            }
            // var total=0;
            // gridList.forEach(element=>{
            //     var c=element.count||0;
            //     total+=c;

            // })
            // console.log(total);
            var clusterGrid=[],unClusterGrid=[];
            for(var i=0;i<gridList.length;i++){
                var grid=gridList[i];
                var id=grid.gridIndex;
                if(IdMap[id]) continue;
                var count=grid.count;
                if(count==1){
                    unClusterGrid.push(grid);
                }
                if(count>1){
                    clusterGrid.push(grid);
                }
            }
            result["clusters"]=clusterGrid;
            result["unClusters"]=unClusterGrid;
            return  result;
        }