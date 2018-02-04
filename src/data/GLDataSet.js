/**
 * @author kyle / http://nikai.us/
 */

// import Event from "../utils/Event";


class GLDataSet{
    constructor(data,options){
        this._options = options || {};
        this._data = []; // map with data indexed by id

        // add initial data when provided
       this._data=data;
    }

    add(data,senderId){
        if (Array.isArray(data)) {
            // Array
            for (var i = 0, len = data.length; i < len; i++) {
                this._data.push(data[i]);
            }
        } else if (data instanceof Object) {
            // Single item
            this._data.push(data);
        } else {
            throw new Error('Unknown dataType');
        }
        // this.lnglatTransFormMercator();
    }

    get(args){
        return this._data;
        // args = args || {};

        // //console.time('copy data time')
        // var start = new Date();
        // // TODO: 不修改原始数据，在数据上挂载新的名称，每次修改数据直接修改新名称下的数据，可以省去deepCopy
        // // var data = deepCopy(this._data);
        // var data = this._data;

        // //console.timeEnd('copy data time')

        // //console.time('transferCoordinate time')

        // var start = new Date();

        // if (args.filter) {
        //     var newData = [];
        //     for (var i = 0; i < data.length; i++) {
        //         if (args.filter(data[i])) {
        //             newData.push(data[i]);
        //         }
        //     }
        //     data = newData;
        // }

        // if (args.transferCoordinate) {
        //     data = this.transferCoordinate(data, args.transferCoordinate);
        // }

        // //console.timeEnd('transferCoordinate time')

        // return data;
    }

    set(data){
        this.clear();
        this.add(data);
        this._trigger('change');
    }

    clear(args){
        this._data = []; // map with data indexed by id
    }

    remove(args){

    }

    update(args){

    }

    transferCoordinate(data,transferFn){
        for (var i = 0; i < data.length; i++) {

            var item = data[i];

            if (data[i].geometry) {

                if (data[i].geometry.type === GL.GMVI.Geometry.Point) {
                    var coordinates = data[i].geometry.coordinates;
                    data[i].geometry._coordinates = transferFn(coordinates);
                }

                if (data[i].geometry.type === GL.GMVI.Geometry.Polygon || data[i].geometry.type === GL.GMVI.Geometry.MultiPolygon) {

                    var coordinates = data[i].geometry.coordinates;

                    if (data[i].geometry.type === GL.GMVI.Geometry.Polygon ) {

                        var newCoordinates = getPolygon(coordinates);
                        data[i].geometry._coordinates = newCoordinates;

                    } else if (data[i].geometry.type === GL.Geomtry.MultiPolygon) {
                        var newCoordinates = [];
                        for (var c = 0; c < coordinates.length; c++) {
                            var polygon = coordinates[c];
                            var polygon = getPolygon(polygon);
                            newCoordinates.push(polygon);
                        }

                        data[i].geometry._coordinates = newCoordinates;
                    }

                }

                if (data[i].geometry.type ===GL.Geomtry.LineString) {
                    var coordinates = data[i].geometry.coordinates;
                    var newCoordinates = [];
                    for (var j = 0; j < coordinates.length; j++) {
                        newCoordinates.push(transferFn(coordinates[j]));
                    }
                    data[i].geometry._coordinates = newCoordinates;
                }
            }
        }

        function getPolygon(coordinates) {
            var newCoordinates = [];
            for (var c = 0; c < coordinates.length; c++) {
                var coordinate = coordinates[c];
                var newcoordinate = [];
                for (var j = 0; j < coordinate.length; j++) {
                    newcoordinate.push(transferFn(coordinate[j]));
                }
                newCoordinates.push(newcoordinate);
            }
            return newCoordinates;
        }

        return data;
    }


    initGeometry(transferFn){
        if (transferFn) {
            this._data.forEach(function (item) {
                item.geometry = transferFn(item);
            });
        } else {
            this._data.forEach(function (item) {
                if (!item.geometry && item.lng && item.lat) {
                    item.geometry = {
                        type: 'Point',
                        coordinates: [item.lng, item.lat]
                    }
                }
            });
        }
    }

    lnglatTransFormMercator(){
        for(var i=0;i<this._data.length;i++){
            var coordinate=this._data[i].geometry.coordinates;
            var type=this._data[i].geometry.type;
            
            if(type==GL.GMVI.Geometry.Point){
                this._data[i].geometry.mercator_coordinates=proj4('EPSG:4326','EPSG:3857',coordinate)
            }else{
                var mercator_coordinates=[];
                for(var j=0;j<coordinate.length;j++){
                    var coord=coordinate[j];
                    mercator_coordinates.push(proj4('EPSG:4326','EPSG:3857',coord));
                }
                 this._data[i].geometry.mercator_coordinates=mercator_coordinates;
            }
        }
    }

}

export  default GL.GMVI.DataSet=GLDataSet
//
// function deepCopy(obj) {
//     var newObj;
//     if (typeof obj == 'object') {
//         newObj = obj instanceof Array ? [] : {};
//         for (var i in obj) {
//             newObj[i] = obj[i] instanceof HTMLElement ? obj[i] : deepCopy(obj[i]);
//         }
//     } else {
//         newObj = obj
//     }
//     return newObj;
// }

// export default DataSet;
