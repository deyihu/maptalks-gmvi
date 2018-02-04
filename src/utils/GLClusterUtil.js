/**
 * Created by Blue on 2017/2/21.
 */
GL.GMVI.ClusterUtil = {
    cluster: function (data, zoom, maxClusterLv, minx, miny, maxx, maxy, width, height) {
        // console.log('cluster...');

        var gridClusters = new GL.GMVI.ClusterUtil.Grid.GridCell([minx, miny, maxx, maxy], [width, height]);
        var ungridClusters = [];
        this.filter(data, minx, maxx, miny, maxy, gridClusters, ungridClusters, zoom < maxClusterLv);
        var cluster = this.merge(ungridClusters, gridClusters);
        gridClusters = null;
        var object = {discrete: ungridClusters, cluster: cluster};
        return object;
    },

    filter: function (data, minx, maxx, miny, maxy, gridClusters, ungridClusters, iscluster) {
        // var gridmsg = 'grid cluster cost';
        // console.time(gridmsg);

        var i = 0, len = data.length;
        for (; i < len; i++) {
            var lng = data[i][0];
            var lat = data[i][1];
            var num = data[i][2];
            var obj=data[i][3];
            if (lng < minx || lng > maxx || lat < miny || lat > maxy) continue;

            if (!iscluster) {
                ungridClusters.push([lng, lat, num,obj]);
                continue;
            }
            gridClusters.add(lng, lat, num,obj);

        }
        // console.timeEnd(gridmsg);
    },

    merge: function (ungridClusters, gridClusters) {
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

            var vminx = center[0] - gridClusters.perLng / 2, vmaxx = center[0] + gridClusters.perLng / 2;
            var vminy = center[1] - gridClusters.perLat / 2, vmaxy = center[1] + gridClusters.perLat / 2;

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
            resultGirdClusters[rid] = {count: 0, item: [], center: null};

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

    getNearGrid: function (row, col) {
        var topGridId1 = (row + 1) + '-' + (col - 1);
        var topGridId2 = (row + 1) + '-' + (col);
        var topGridId3 = (row + 1) + '-' + (col + 1);
        var bottomGridId1 = (row - 1) + '-' + (col - 1);
        var bottomGridId2 = (row - 1) + '-' + (col);
        var bottomGridId3 = (row - 1) + '-' + (col + 1);
        var leftGridId = row + '-' + (col - 1);
        var rightGridId = row + '-' + (col + 1);
        return [topGridId1, topGridId2, topGridId3, bottomGridId1, bottomGridId2, bottomGridId3, leftGridId, rightGridId];
    }
};



/**
 * Created by Blue on 2017/2/21.
 */

GL.GMVI.ClusterUtil.Grid = {
    GridCell: function (env, wh, cr) {
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
            this.grid[id] = this.grid[id] || {item: [], count: 0, center: [lng, lat]};

            var count = this.grid[id].count + 1 * num;
            var center = [(this.grid[id].center[0] + lng) / 2, (this.grid[id].center[1] + lat) / 2];

            this.grid[id].count = count;
            this.grid[id].center = center;
            this.grid[id].item.push([lng, lat, num]);
        }
    }

};



/**
 * Created by Blue on 2017/2/21.
 */
GL.GMVI.ClusterUtil.Util = {
    generate: function (len) {
        var num = len;
        var list = [];
        var center = [31.30115627, 120.58105869];
        var msg = `prepare ${len}w test data cost`;

        console.time(msg);
        for (var i = 0; i < num; i++) {
            var lng = center[1] + Math.random() * 0.5;
            var lat = center[0] + Math.random() * 0.5;
            list.push([lng, lat, parseInt(1+Math.random() * 100)]);
        }
        console.timeEnd(msg);
        return list;
    },
    getScale: function (minLng, maxLng, minLat, maxLat, width, height) {
        var scaleX = ((maxLng - minLng) * 3600) / width;
        var scaleY = ((maxLat - minLat) * 3600) / height;
        return [scaleX, scaleY];
    },
    toPixel: function (scale, lng, lat, minlng, maxlat) {
        var x = (lng - minlng) * 3600.0 / scale[0];
        var y = (maxlat - lat) * 3600.0 / scale[1];
        return [x, y];
    },
    toLnglat: function (scale, x, y, minlng, maxlat) {
        var lng = x * scale[0] / 3600.0 + minlng;
        var lat = maxlat - y * scale[1] / 3600.0;
        return [lng, lat];
    }
};


