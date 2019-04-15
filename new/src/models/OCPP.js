export function compare(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }
  
  
var Resource = require("./Resource").Resource;
var State = require("./State").State;
var RESOURSECOLOR = require("./constants").RESOURSECOLOR;
var COLOR = require("./constants").COLOR;
export class OCPP{
constructor(tasks, res=[]) {
    this.tasks = tasks;
    console.log(tasks)

    this.inUsedRes = [];
    this.instant = 0;

    this.resPriority = []
    tasks.sort(compare)
    for (let index = 0; index < tasks.length; index++) {
      for (let i = 0; i < tasks[index].seq.length; i++) {
          this.resPriority[tasks[index].seq[i]] = tasks[index].priority;
      }      
  }
  this.resPriority['E'] = 0
  console.log(this.resPriority)

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
      OCPPScheduler(tasks) {
        let newTasks = [];
        let qlq = false;
        let state = 0;
        let pri = false;
      
        tasks.sort(compare)
        for (let index = tasks.length - 1; index >= 0; index--) {
          const task = tasks[index];
          if (task.release <= this.instant && !task.hasFinish()) {
              let nextMove = task.getNextAction()
              let iOfnex = this.inUsedRes.indexOf(nextMove)      
      
              if(pri && !task.byMe())
              {
                  task.addState(new State(0, 0, COLOR.ROUGE, "B"), true)
                  pri = true
              }
      
              else if (!task.byMe() && this.resPriority[nextMove] <= this.resPriority[this.inUsedRes[0]] && task.priority <= this.resPriority[nextMove]){//&&nextMove != "E") {
                  task.addState(new State(0, 0, COLOR.ROUGE, "B"), true)
                  this.resPriority[nextMove]++
                  pri = true
                } 
      
                else {
                  if (!qlq) {
                      
                      
                          qlq = true;
                    task.addState(new State(0, 0, RESOURSECOLOR[nextMove]))
                      
                    if (nextMove != "E") {
                      if (iOfnex == -1){
                        this.inUsedRes.push(nextMove)
                      }
        
                      if (task.hasFinish()) {
        
                        iOfnex = this.inUsedRes.indexOf(nextMove)
                        this.inUsedRes.splice(iOfnex, 1)
                        wait = 0
                        pri = false
      
                      } else {
        
                        let newNext = task.getNextAction()
                        if (nextMove != newNext) {
                          // have to remove res
                          iOfnex = this.inUsedRes.indexOf(nextMove)                    
                          this.inUsedRes.splice(iOfnex, 1)
                        pri = false
                          
                        }
                      }
                    }
                  }
                  else {
                    task.addState(new State(0, 0, COLOR.BLANCHE), true)
                  }
                }
                } 
          
      
          newTasks.push(task)
        }
      
      
        if (this.instant < 50)
          this.instant++;
      
      
        return newTasks
      }
}