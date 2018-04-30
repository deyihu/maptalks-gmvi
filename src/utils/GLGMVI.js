
/*
全局常量
 */


var GL=window.GL||{};
window.GL=GL;
GL.GMVI=window.GL.GMVI||{}
GL.GMVI.Geometry=GL.GMVI.Geometry||{};
GL.GMVI.Geometry.LineString='LineString';
GL.GMVI.Geometry.Point='Point'
GL.GMVI.Geometry.Polyline='Polyline'
GL.GMVI.Geometry.Polygon='Polygon'
GL.GMVI.Geometry.Rectangle='Rectangle'
GL.GMVI.Geometry.Circle='Circle'
GL.GMVI.Geometry.MultiPolygon='MultiPolygon';

GL.GMVI.Circle='circle'
GL.GMVI.Rect='rect'
GL.GMVI.Bubble='bubble';
GL.GMVI.Intensity='intensity';
GL.GMVI.Category='category'
GL.GMVI.Choropleth='choropleth'
GL.GMVI.Simple='simple'
GL.GMVI.Effect='effect'
GL.GMVI.Heatmap='heatmap'
GL.GMVI.Grid='grid'
GL.GMVI.Honeycomb='honeycomb';
GL.GMVI.Text='text'
GL.GMVI.Icon='icon'
GL.GMVI.Cluster='cluster'
GL.GMVI.TagCloud="tagcloud";
GL.GMVI.Webgl='webgl'
GL.GMVI.Migrate='migrate';
GL.GMVI.Bar='bar'
GL.GMVI.WaterBubble='waterbubble'
GL.GMVI.Radiation='radiation'
GL.GMVI.Radial='radial'
GL.GMVI.Star='star'
GL.GMVI.Percent='percent'
GL.GMVI.Video='video';
GL.GMVI.Scatter='scatter'
GL.GMVI.MigrateLines='migrateLines';
GL.GMVI.Arrow='arrow'

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
GL.GMVI.uuid=function(prefix = 'ID'){
        let uuid = new Array(36), rnd = 0, r;
        for (let i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid[i] = '-';
            } else if (i === 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = CHARS[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return prefix + '-' + uuid.join('');
}





