function compare(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
}
  
/**
 * Importations des dependance
 */
var Resource = require("./Resource").Resource;
var State = require("./State").State;
var RESOURSECOLOR = require("./constants").RESOURSECOLOR;
var COLOR = require("./constants").COLOR;

/**
 * La classe Default simule le comportement par defaut d'un ordonnanceur sans 
 * echange de priorites
 */
export class Default{
  /**
   * 
   * @param {Array<Task>} tasks La listes des taches a ordonnance
   * @param {Array<Resource>} res La liste de resource // not in use yet
   */
    constructor(tasks, res=[]) {
        this.tasks = tasks;
        this.inUsedRes = [];
        this.instant = 0;
    
    }
    /**
     * Prends un liste de tache caclule le prochain etait de chaque tache
     * et retourne une nouvelle liste de taches a l'instant d'apres
     * @param {Array<Task>} tasks La liste des tache a ordonnace
     * @return {Array<Task>} newTasks La nouvelles liste de taches
     */
    defaultScheduler(tasks) {
        let newTasks = [];
        let allDone = true;
        let qlq = false;
      
        tasks.sort(compare);

        /**
         * Pour chaque tache (du plus prioritaire ) on detemine son etat a l'instant  prochain
         */
        for (let index = tasks.length - 1; index >= 0; index--) {
          const task = tasks[index];
          if (task.release <= this.instant && !task.hasFinish()) {
            let nextMove = task.getNextAction();
            let iOfnex = this.inUsedRes.indexOf(nextMove);
            if (iOfnex != -1 && !task.byMe()) {
              task.addState(new State(0, 0, COLOR.ROUGE, "B"), true);
            } else {
              if (!qlq) {
                qlq = true;
                allDone = false;
                task.addState(new State(0, 0, RESOURSECOLOR[nextMove])); //COLOR.VERT))
                if (nextMove != "E") {
                  if (iOfnex == -1) this.inUsedRes.push(nextMove);
      
                  if (task.hasFinish()) {
                    iOfnex = this.inUsedRes.indexOf(nextMove);
                    this.inUsedRes.splice(iOfnex, 1);
                  } else {
                    let newNext = task.getNextAction();
                    if (nextMove != newNext) {
                      // have to remove res
                      iOfnex = this.inUsedRes.indexOf(nextMove);
      
                      this.inUsedRes.splice(iOfnex, 1);
                    }
                  }
                }
              } else {
                task.addState(new State(0, 0, COLOR.BLANCHE), true);
                allDone = false;
              }
            }
          }
      
          newTasks.push(task);
        }
      
        if (!allDone) this.instant++;
      
        return newTasks;
      }
      

}