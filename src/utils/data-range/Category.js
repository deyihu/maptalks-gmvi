/**
 * Created by Administrator on 2016/11/26.
 */

class Category{
    constructor(splitList){
        this.splitList = splitList || {
                other: 1
            };
    }

    get(count){
        var splitList = this.splitList;

        var value = splitList['other'];

        for (var i in splitList) {
            if (count == i) {
                value = splitList[i];
                break;
            }
        }
        return value;
    }

}
export  default Category
