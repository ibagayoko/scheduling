class Task{
    constructor(name="default", priority=Infinity,seq="", x=0, y=0, release=0){
        this.name = name 
        this.priority = priority 
        this.states = []  // de type State
        this.x = x;
        this.y = y;
        this.index= 0;
        this.seq = seq;
        this.release = release
    }
    addState(state){
        state.x = this.x + 50 + (this.release+ this.index)*state.wh;
        state.y = this.y;
        this.states.push(state)
        this.index++;
    }

    show(){
        // Affiche le nom de la tage 
        this.showNameAndPriority();
        // Draw a line
        line(50, this.y, width, this.y);

        // show a liste of state for this task
        this.states.forEach(state => {
            state.show()
        });
    }
    showNameAndPriority(){
        fill(0)
        textSize(24);
        text(`${this.name}, ${this.priority}`,0,  this.y);
        
    }
}