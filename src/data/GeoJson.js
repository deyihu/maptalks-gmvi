/**
 * Created by Administrator on 2016/11/26.
 */

import DataSet from "./DataSet";

class GeoJson{
    constructor(){

    }

    getDataSet (geoJson) {

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
     return new DataSet(data);

}
}

export default GMVI.GeoJson=new GeoJson();
