class Task{
    constructor(name, priority, x, y){
        this.name = name 
        this.priority = priority 
        this.states = []  // de type State
    }

    show(){
        fill(0)
    text(`${this.name}, ${this.priority}`,0,  height/4);
    line(50, height/4, width, height/4);
        this.states.forEach(state => {
            state.show()
        });
    }
}