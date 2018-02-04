/**
 * Created by Administrator on 2016/11/26.
 */

import DataSet from "./GLDataSet";

class GLCsv{
   constructor(){

   }
    CSVToArray(strData, strDelimiter) {
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
            (
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec( strData )){
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ){
                arrData.push( [] );
            }

            var strMatchedValue;
            if (arrMatches[ 2 ]){
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                );
            } else {
                strMatchedValue = arrMatches[ 3 ];
            }
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        return( arrData );
    }

    getDataSet(csvStr){
        var arr = this.CSVToArray(csvStr, ',');
        var data = [];
        var header  = arr[0];
        for (var i = 1; i < arr.length - 1; i++) {
            var line = arr[i];
            var item = {};
            for (var j = 0; j < line.length; j++) {
                var value = line[j];
                if (header[j] == 'geometry') {
                    value = JSON.parse(value);
                }
                item[header[j]] = value;
            }
            data.push(item);
        }
        return new DataSet(data);
    }
}

export  default GL.GMVI.Csv=GLCsv;
