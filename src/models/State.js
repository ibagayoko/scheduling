export class State {
    constructor(x,y,color=0, name=""){
        this.x=x
        this.y=y
        this.color=color
        this.name=name
        this.wh = 30
    }
    show(){
        fill(this.color); // Use color variable 'c' as fill color
        rect(this.x, this.y-this.wh, this.wh, this.wh); // Draw rectangle
        this.showName()

        
    }
    showName(size=24){
        fill(0)
        let TextSize = size
        textSize(TextSize);
        text(`${this.name}`,this.x+(this.wh - TextSize),  this.y-(this.wh-TextSize));
        
    }
}