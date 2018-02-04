const maptalks=window.maptalks;


class Circle extends maptalks.Circle{
    constructor(center,radius,options){
        super(center,radius,options);
    }

    toArray(){
        var shells=this.getShell();
        let lnglatArr=[];
        for(let i=0;i<shells.length;i++){
               let coordinate=shells[i];
               lnglatArr.push([coordinate.x,coordinate.y]);
        }
        return lnglatArr;
    }
}

module.exports=Circle;