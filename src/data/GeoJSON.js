
import Variables from  "../utils/Variables"
import Geometry from "../geometry/Geometry"
var DEFAULT_HEIGHT=Variables.DEFAULT_HEIGHT;
var onEach = function() {};
class GeoJSON{
    constructor(){
        this.METERS_PER_LEVEL = 3;
        this.WINDING_CLOCKWISE = 'CW';
        this.WINDING_COUNTER_CLOCKWISE = 'CCW';
        this.materialColors = {
            brick:'#cc7755',
            bronze:'#ffeecc',
            canvas:'#fff8f0',
            concrete:'#999999',
            copper:'#a0e0d0',
            glass:'#e8f8f8',
            gold:'#ffcc00',
            plants:'#009933',
            metal:'#aaaaaa',
            panel:'#fff8f0',
            plaster:'#999999',
            roof_tiles:'#f08060',
            silver:'#cccccc',
            slate:'#666666',
            stone:'#996666',
            tar_paper:'#333333',
            wood:'#deb887'
        };
        this.baseMaterials = {
            asphalt:'tar_paper',
            bitumen:'tar_paper',
            block:'stone',
            bricks:'brick',
            glas:'glass',
            glassfront:'glass',
            grass:'plants',
            masonry:'stone',
            granite:'stone',
            panels:'panel',
            paving_stones:'stone',
            plastered:'plaster',
            rooftiles:'roof_tiles',
            roofingfelt:'tar_paper',
            sandstone:'stone',
            sheet:'canvas',
            sheets:'canvas',
            shingle:'tar_paper',
            shingles:'tar_paper',
            slates:'slate',
            steel:'metal',
            tar:'tar_paper',
            tent:'canvas',
            thatch:'plants',
            tile:'roof_tiles',
            tiles:'roof_tiles'
        };
    }

    getMaterialColor(str) {
        str = str.toLowerCase();
        if (str[0] === '#') {
            return str;
        }
        return this.materialColors[this.baseMaterials[str] || str] || null;
    }

    getWinding(points) {
        var x1, y1, x2, y2,
            a = 0,
            i, il;
        for (i = 0, il = points.length-3; i < il; i += 2) {
            x1 = points[i];
            y1 = points[i+1];
            x2 = points[i+2];
            y2 = points[i+3];
            a += x1*y2 - x2*y1;
        }
        return (a/2) > 0 ? this.WINDING_CLOCKWISE : this.WINDING_COUNTER_CLOCKWISE;
}

    makeWinding(points, direction) {
        var winding = this.getWinding(points);
        if (winding === direction) {
            return points;
        }
        var revPoints = [];
        for (var i = points.length-2; i >= 0; i -= 2) {
            revPoints.push(points[i], points[i+1]);
        }
        return revPoints;
    }

    alignProperties(prop) {
        var item = {};
        prop = prop || {};
        item.height    = prop.height    || (prop.levels   ? prop.levels  *this.METERS_PER_LEVEL : DEFAULT_HEIGHT);
        item.minHeight = prop.minHeight || (prop.minLevel ? prop.minLevel*this.METERS_PER_LEVEL : 0);
        var wallColor = prop.material ? this.getMaterialColor(prop.material) : (prop.wallColor || prop.color);
        if (wallColor) {
            item.wallColor = wallColor;
        }
        var roofColor = prop.roofMaterial ? this.getMaterialColor(prop.roofMaterial) : prop.roofColor;
        if (roofColor) {
            item.roofColor = roofColor;
        }
        switch (prop.shape) {
            case 'cylinder':
            case 'cone':
            case 'dome':
            case 'sphere':
                item.shape = prop.shape;
                item.isRotational = true;
                break;
            case 'pyramid':
                item.shape = prop.shape;
                break;
        }
        switch (prop.roofShape) {
            case 'cone':
            case 'dome':
                item.roofShape = prop.roofShape;
                item.isRotational = true;
                break;
            case 'pyramid':
                item.roofShape = prop.roofShape;
                break;
        }
        if (item.roofShape && prop.roofHeight) {
            item.roofHeight = prop.roofHeight;
            item.height = max(0, item.height-item.roofHeight);
        } else {
            item.roofHeight = 0;
        }
        return item;
    }

    getGeometries(geometry) {
        var
            i, il, polygon,
            geometries = [], sub;

        switch (geometry.type) {
            case 'GeometryCollection':
                geometries = [];
                for (i = 0, il = geometry.geometries.length; i < il; i++) {
                    if ((sub = this.getGeometries(geometry.geometries[i]))) {
                        geometries.push.apply(geometries, sub);
                    }
                }
                return geometries;

            case 'MultiPolygon':
                geometries = [];
                for (i = 0, il = geometry.coordinates.length; i < il; i++) {
                    if ((sub = this.getGeometries({ type: 'Polygon', coordinates: geometry.coordinates[i] }))) {
                        geometries.push.apply(geometries, sub);
                    }
                }
                return geometries;

            case 'Polygon':
                polygon = geometry.coordinates;
                break;

            default: return [];
        }

        var
            j, jl,
            p, lat = 1, lon = 0,
            outer = [], inner = [];

        p = polygon[0];
        for (i = 0, il = p.length; i < il; i++) {
            outer.push(p[i][lat], p[i][lon]);
        }
        outer = this.makeWinding(outer, this.WINDING_CLOCKWISE);

        for (i = 0, il = polygon.length-1; i < il; i++) {
            p = polygon[i+1];
            inner[i] = [];
            for (j = 0, jl = p.length; j < jl; j++) {
                inner[i].push(p[j][lat], p[j][lon]);
            }
            inner[i] = this.makeWinding(inner[i],this.WINDING_COUNTER_CLOCKWISE);
        }

        return [{
            outer: outer,
            inner: inner.length ? inner : null
        }];
    }

    clone(obj) {
        var res = {};
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                res[p] = obj[p];
            }
        }
        return res;
    }

    read(geojson) {
        var collection=[];
        if(geojson instanceof Array){
            for(var i in geojson){
                var _geojson=geojson[i];
                if (!_geojson || _geojson.type !== 'FeatureCollection') continue;
                collection=collection.concat(_geojson.features)
            }

        }else
            collection = geojson.features



        // if (!geojson || geojson.type !== 'FeatureCollection') {
        //     return [];
        // }
        var
            i, il, j, jl,
            res = [],
            feature,
            geometries,
            baseItem, item;
        for (i = 0, il = collection.length; i < il; i++) {
            feature = collection[i];
            if (feature.type !== 'Feature' || onEach(feature) === false) {
                continue;
            }
            baseItem = this.alignProperties(feature.properties);
            geometries = this.getGeometries(feature.geometry);

            for (j = 0, jl = geometries.length; j < jl; j++) {
                item = this.clone(baseItem);
                item.footprint = geometries[j].outer;
                if (item.isRotational) {
                    item.radius = Geometry.getLonDelta(item.footprint);
                }
                if (geometries[j].inner) {
                    item.holes = geometries[j].inner;
                }
                if (feature.id || feature.properties.id) {
                    item.id = feature.id || feature.properties.id;
                }
                if (feature.properties.relationId) {
                    item.relationId = feature.properties.relationId;
                }
                res.push(item); // TODO: clone base properties!
            }
        }
        return res;
    }
}

export default new GeoJSON();
