/**
 * Created by Administrator on 2017/7/11.
 */


class BaseCanvas{

    constructor(){

    }


    draw(canvas, dataSet, options){

    }

    getMaxCount(data){
        var maxCount=0;
        for(var x in data){
            var _data=data[x];
            var count=_data.count;
            if(!count) continue;
            if(count>maxCount)
                maxCount=count;
        }
        return  parseFloat(maxCount);
    }
}


export default BaseCanvas
