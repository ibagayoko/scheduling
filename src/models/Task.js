/**
 * La classe Task permet de represente une tache 
 * Elle sait comment dessiner ces etats (Blocked, Execution, Ressource...)
 * 
 */
export class Task{
    /**
     * Pour cree une tache donnee aec les parametres suivant
     * 
     * @param {string} name Le nom de la tache
     * @param {integer} priority la priorite de la tache
     * @param {string} seq La sequence d'execution de la tache ex: EEEREE
     * @param {float} x la position en x de la tache pour le dessin
     * @param {float} y la position en y de la tache pour le dessin
     * @param {int} release le release time de la tache instant d'arrivé
     */
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
    /**
     * Determine si la tache a terminer ou non
     * 
     * @return {boolean}
     */
    hasFinish(){
        return this.curSeq.length==0
    }
    /**
     * Elever la priorite a une priorite specifique
     * @param {int} priority 
     */
    raisePriority(priority){
        if(priority>this.priority)
        this.priority = priority
    }
    /**
     * Retourner a la priorite d'origine
     */
    defaultPriority(){
        this.priority = this.priority0
    }
    /**
     * retourne la prochaine action dans la sequence d'execution
     * @return {char}
     */
    getNextAction(){
        return this.curSeq[0]
    }
    /**
     * Determiner si une ressource specifiée est utiliser par moi ou si ma prochaine ressource est
     * deja en ma possession
     * @param {boolean} resource optionnel 
     */
    byMe(resource=null){
        if(!resource) resource =  this.getNextAction()
        return this.res.includes(resource)
    }
    /**
     * Ajoute un etat a la tache
     * @param {State} state l'etat de l'intstant a etre ajouter la dans la liste des etat de la tache
     * @param {boolean} blocked Est ce que l'etat est bloquant ou non
     */
    addState(state, blocked=false){
        state.x = this.x + 100 + (this.release+ this.index)*state.wh;
        state.y = this.y;
        this.states.push(state)
        if(!blocked){
            state.name = this.curSeq[0]
            if(state.name!="E"){
                if(this.res.indexOf(state.name))
                    this.res.push(state.name)
            }
            this.curSeq = this.curSeq.slice(1)

            /**Liberer les resource si la tache fini ou n'a plus besoin */
            if (this.hasFinish()) 
                this.res = [] 
              
            else{
                let newNext = this.getNextAction()
                if (state.name != newNext) {
                    let iOfnex = this.res.indexOf(state.name)
                    if(iOfnex!=1) 
                        this.res.splice(iOfnex, 1)
                }
              }
        }
        this.index++;
    }

    /**
     * Affiche la tache et les different etat qu'elle a eu au cour du temps
     */
    show(){
        this.showNameAndPriority();
        
        // Draw a line
        line(100, this.y, width, this.y);

        // show a liste of state for this task
        this.states.forEach(state => {
            state.show()
        });
    }
    /**
     * Affiche le nom et priorite de la tache
     */
    showNameAndPriority(){
        fill(0)
        textSize(24);
        text(`${this.name}, ${this.priority}`,0,  this.y);
        
    }
}