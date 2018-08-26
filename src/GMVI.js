
/*
全局常量
 */



let GMVI=window.GMVI||{}
GMVI.Geometry=GMVI.Geometry||{};
GMVI.Geometry.LineString='LineString';
GMVI.Geometry.Point='Point'
GMVI.Geometry.Polyline='Polyline'
GMVI.Geometry.Polygon='Polygon'
GMVI.Geometry.Rectangle='Rectangle'
GMVI.Geometry.Circle='Circle'
GMVI.Geometry.MultiPolygon='MultiPolygon';

GMVI.Circle='circle'
GMVI.Rect='rect'
GMVI.Bubble='bubble';
GMVI.Intensity='intensity';
GMVI.Category='category'
GMVI.Choropleth='choropleth'
GMVI.Simple='simple'
GMVI.Effect='effect'
GMVI.Heatmap='heatmap'
GMVI.Grid='grid'
GMVI.Honeycomb='honeycomb';
GMVI.Text='text'
GMVI.Icon='icon'
GMVI.Cluster='cluster'
GMVI.TagCloud="tagcloud";
GMVI.Webgl='webgl'
GMVI.Migrate='migrate';
GMVI.Bar='bar'
GMVI.WaterBubble='waterbubble'
GMVI.Radiation='radiation'
GMVI.Radial='radial'
GMVI.Star='star'
GMVI.Percent='percent'
GMVI.Video='video';
GMVI.Scatter='scatter'
GMVI.MigrateLines='migrateLines';
GMVI.Arrow='arrow'

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
GMVI.uuid=function(prefix = 'ID'){
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
window.GMVI=GMVI;





