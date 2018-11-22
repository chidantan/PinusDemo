export  class Position{
    public x:number = 0;
    public y:number = 0;

    constructor(...arg:number[]){
        if(arg.length > 0){
            this.x = arg[0];
        }
        if (arg.length > 1){
            this.y = arg[1];
        }
    }

}


export  class Rect{
    public x:number = 0;
    public y:number = 0;
    public width:number = 0;
    public height:number = 0;

    constructor(...arg:number[]){
        if(arg.length > 0){
            this.x = arg[0];
        }
        if (arg.length > 1){
            this.y = arg[1];
        }
        if (arg.length > 2){
            this.width  = arg[2];
        }
        if (arg.length > 3){
            this.height = arg[3];
        }
    }

}