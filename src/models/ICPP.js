export function compare(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }
  
  
var Resource = require("./Resource").Resource;
var State = require("./State").State;
var RESOURSECOLOR = require("./constants").RESOURSECOLOR;
var COLOR = require("./constants").COLOR;
export class ICPP{
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
       ICPPScheduler(tasks) {
        let newtasks = [];
        let qlq = false;
        let inExTask = null;
      
        tasks.sort(compare);
        let resources = this.getResources(tasks);
        let resourcesStr = this.getResources(tasks, true);
      
        for (let index = tasks.length - 1; index >= 0; index--) {
          const task = tasks[index];
          if (task.release <= this.instant && !task.hasFinish()) {
            let nextMove = task.getNextAction();
            let iOfnex = this.inUsedRes.indexOf(nextMove);
            let presIndex = resourcesStr.indexOf(nextMove);
            if (this.inUsedRes.length == 1 && !task.byMe()) {
              // if (iOfnex != -1 && !task.byMe()) {
              if (inExTask && task.priority0 < inExTask.priority0)
                task.addState(new State(0, 0, COLOR.BLANCHE), true);
              else 
                task.addState(new State(0, 0, COLOR.ROUGE, "B"), true);
            } else {
              if (!qlq) {
                qlq = true;
                task.addState(new State(0, 0, RESOURSECOLOR[nextMove])); //COLOR.VERT))
                if (nextMove != "E") {
                  if (iOfnex == -1) {
                    // resourese index to raise task priority
                    let presIndex = resourcesStr.indexOf(nextMove);
                    if (presIndex != -1)
                      task.raisePriority(resources[presIndex].priority);
                    this.inUsedRes.push(nextMove);
                    inExTask = task;
                  }
      
                  if (task.hasFinish()) {
                    iOfnex = this.inUsedRes.indexOf(nextMove);
      
                    this.inUsedRes.splice(iOfnex, 1);
                    inExTask = null;
                  } else {
                    let newNext = task.getNextAction();
                    if (nextMove != newNext) {
                      // have to remove res
                      iOfnex = this.inUsedRes.indexOf(nextMove);
                      // resourese index to normal task priority
                      // let presIndex = resourcesStr.indexOf(nextMove)
                      task.defaultPriority();
      
                      this.inUsedRes.splice(iOfnex, 1);
                      inExTask = null;
                    }
                  }
                }
      
                inExTask = task;
              } else {
                task.addState(new State(0, 0, COLOR.BLANCHE), true);
              }
            }
          }
      
          newtasks.push(task);
        }
      
        if (this.instant < 50) this.instant++;
      
        return newtasks;
      }
}