export function compare(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }
  
  
var Resource = require("./Resource").Resource;
var State = require("./State").State;
var RESOURSECOLOR = require("./constants").RESOURSECOLOR;
var COLOR = require("./constants").COLOR;
export class PInversion{
constructor(tasks, res=[]) {
    this.tasks = tasks;
    console.log(tasks)

    this.inUsedRes = [];
    this.instant = 0;

}

     getResources(tasks, str = false) {
        let resList = []; // array<Resource>
        let addedRes = []; // array<string>
        
      
        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i];
          for (let j = 0; j < task.seq.length; j++) {
            const pres = task.seq[j];
            let iOfnex = addedRes.indexOf(pres);
            if (iOfnex == -1) {
              resList.push(new Resource(pres, task.priority));
              addedRes.push(pres);
            } else {
              resList[iOfnex].setPriority(task.priority);
              // addedRes[iOfnex]
            }
          }
      
          resList.sort(compare);
          if (str) return addedRes;
      
          return resList;
        }
      }
       PInversionScheduler(tasks) {
        let newTasks = [];
        let inExTask = null;
        let qlq = false;
      
        tasks.sort(compare);
        for (let index = tasks.length - 1; index >= 0; index--) {
          const task = tasks[index];
          // if (task.release <= this.instant && !task.hasFinish()) {
            
          //   let nextMove = task.getNextAction();
          //   let iOfnex = this.inUsedRes.indexOf(nextMove);
          //   if (iOfnex != -1 && !task.byMe()) {
          //     task.addState(new State(0, 0, COLOR.ROUGE, "B"), true);
          //   }
          //   else if (!qlq) {
          //     qlq = true;
    
          //     task.addState(new State(0, 0, RESOURSECOLOR[nextMove])); //COLOR.VERT))
             
          //   }



          // }

          newTasks.push(task);
        }
      
        if (this.instant < 50) this.instant++;

      return newTasks
    }
}