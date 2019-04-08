class State{
    constructor(x,y,color=0, name=""){
        this.x=x
        this.y=y
        this.color=color
        this.name=name
        this.wh = 10
    }
    show(){
        fill(this.color); // Use color variable 'c' as fill color
        rect(this.x, this.y-this.wh, this.wh, this.wh); // Draw rectangle
        
    }
}