export class Task{
    constructor(name="default", priority=Infinity, seq="", x=0, y=0, release=0){
        this.name = name 
        this.priority = priority 
        this.priority0 = priority 
        this.states = []  // de type State
        this.x = x;
        this.y = y;
        this.index= 0;
        this.seq = seq;
        this.curSeq = seq;
        this.release = release
        this.res = []
    }

    hasFinish(){
        return this.curSeq.length==0
    }
    raisePriority(priority){
        this.priority = priority
    }
    defaultPriority(){
        this.priority = this.priority0
    }
    getNextAction(){
        return this.curSeq[0]
    }
    byMe(){
        return this.res.includes(this.getNextAction())
    }
    addState(state, blocked=false){
        state.x = this.x + 50 + (this.release+ this.index)*state.wh;
        state.y = this.y;
        this.states.push(state)
        if(!blocked){
            state.name = this.curSeq[0]
            if(state.name!="E"){
                if(this.res.indexOf(state.name))
                    this.res.push(state.name)
            }
            this.curSeq = this.curSeq.slice(1)
        }
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