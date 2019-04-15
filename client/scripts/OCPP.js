let a = { 'priority': 1, 'rtime': 0, 'exseq': "EQQQE" }
let b = { 'priority': 2, 'rtime': 0, 'exseq': "EE" }
let c = { 'priority': 3, 'rtime': 0, 'exseq': "EVVE" }
let d = { 'priority': 4, 'rtime': 0, 'exseq': "EVQVE" }

// La liste des taches
let taksList = [];

let wait = 0;

let inUsedRes = []
let instant = 0;
let Hauteur = 400;
let listeIns = []

let resPriority = [];

function compare(a, b) {
  if (a.priority < b.priority)
    return -1;
  if (a.priority > b.priority)
    return 1;
  return 0;
}

let newBtn;
function saveFile(name){

  save(name); // save a specific canvas with a filename
}

function setup() {

  newBtn = createButton('Nouveau');
  // newBtn.
  createCanvas(600, 450);
  taksList.push(new Task("d", 4, "EEQVE", 0, Hauteur / 4, 4))
  taksList.push(new Task("c", 3, "EVVE", 0, 2 * Hauteur / 4, 2))
  taksList.push(new Task("b", 2, "EE", 0, 3 * Hauteur / 4, 2))
  taksList.push(new Task("a", 1, "EQQQQE", 0, Hauteur - 1, 0))
  
  taksList.sort(compare)

  
//   console.log(taksList[0].seq[0]);

  for (let index = 0; index < taksList.length; index++) {
      for (let i = 0; i < taksList[index].seq.length; i++) {
          resPriority[taksList[index].seq[i]] = taksList[index].priority;
      }      
  }
  resPriority['E'] = 0
//   resPriority['Q'] = 0
// //   resPriority['V'] = 0

  console.log(resPriority);
}

function draw() {

  _drawFunc()

}
function _drawFunc(){
  background(255);
  fill(0)
  stroke(0);
  line(50, 0, 50, Hauteur);
  listeIns.push(new State(50 + instant * 30, Hauteur + 30, COLOR.BLANCHE, instant.toString()))
  textSize(16);
  for (let i = 0; i < listeIns.length; i++) {
    const inst = listeIns[i];
    inst.showName(20)
  }


  showTasks(taksList)
  taksList = defaultScheduler(taksList)

}

function defaultScheduler(tasks) {
  let newTasks = [];
  let qlq = false;
  let state = 0;
  let pri = false;

  tasks.sort(compare)
  for (let index = tasks.length - 1; index >= 0; index--) {
    const task = tasks[index];
    if (task.release <= instant && !task.hasFinish()) {
        let nextMove = task.getNextAction()
        let iOfnex = inUsedRes.indexOf(nextMove)      

        if(pri && !task.byMe())
        {
            task.addState(new State(0, 0, COLOR.ROUGE, "B"), true)
            pri = true
        }

        else if (!task.byMe() && resPriority[nextMove] <= resPriority[inUsedRes[0]] && task.priority <= resPriority[nextMove]){//&&nextMove != "E") {
            task.addState(new State(0, 0, COLOR.ROUGE, "B"), true)
            resPriority[nextMove]++
            pri = true
          } 

          else {
            if (!qlq) {
                
                
                    qlq = true;
              task.addState(new State(0, 0, RESOURSECOLOR[nextMove]))
                
              if (nextMove != "E") {
                if (iOfnex == -1){
                  inUsedRes.push(nextMove)
                }
  
                if (task.hasFinish()) {
  
                  iOfnex = inUsedRes.indexOf(nextMove)
                  inUsedRes.splice(iOfnex, 1)
                  wait = 0
                  pri = false

                } else {
  
                  let newNext = task.getNextAction()
                  if (nextMove != newNext) {
                    // have to remove res
                    iOfnex = inUsedRes.indexOf(nextMove)                    
                    inUsedRes.splice(iOfnex, 1)
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


  if (instant < 50)
    instant++;


  return newTasks
  
}


function showTasks(ts) {
  for (let i = 0; i < ts.length; i++) {
    const task = ts[i];
    task.show()

  }
}