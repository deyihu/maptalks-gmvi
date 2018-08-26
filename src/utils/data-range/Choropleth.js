/**
 * Created by Administrator on 2016/11/26.
 */

class Choropleth{
    constructor(splitList){
        this.splitList = splitList || [
                {
                    start: 0,
                    value: 'red'
                }
            ];
    }


    get(count){
        count=count.toFixed(0)
        var splitList = this.splitList;
        var value = undefined;
        for (var i = 0; i < splitList.length; i++) {
            if (count >= splitList[i].start &&count <= splitList[i].end) {
                value = splitList[i].color;
                break;
            }
        }
        // if(!value)
        //     console.log('count:'+count)
        return value;
    }
}
export default Choropleth;
