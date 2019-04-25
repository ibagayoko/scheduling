function compare(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }
  
  
var Resource = require("./Resource").Resource;
var State = require("./State").State;
var RESOURSECOLOR = require("./constants").RESOURSECOLOR;
var COLOR = require("./constants").COLOR;

export class Default{
    constructor(tasks, res=[]) {
        this.tasks = tasks;
    
        this.inUsedRes = [];
        this.instant = 0;
    
    }

    defaultScheduler(tasks) {
        let newTasks = [];
        let inExTask = null;
        let qlq = false;
      
        tasks.sort(compare);
        // let a = []
        // a.reverse
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
              }
            }
          }
      
          newTasks.push(task);
        }
      
        if (this.instant < 50) this.instant++;
      
        return newTasks;
      }
      

}