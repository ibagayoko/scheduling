let a = { 'priority': 1, 'rtime': 0, 'exseq': "EQQQE" }
let b = { 'priority': 2, 'rtime': 0, 'exseq': "EE" }
let c = { 'priority': 3, 'rtime': 0, 'exseq': "EVVE" }
let d = { 'priority': 4, 'rtime': 0, 'exseq': "EVQVE" }

// La liste des taches
let taksList = [];

var app ;

let inUsedRes = [];
let instant = 0;
let Hauteur = 400;
let listeIns = []

function compare(a, b) {
  if (a.priority < b.priority)
    return -1;
  if (a.priority > b.priority)
    return 1;
  return 0;
}

let newBtn, saveBtn;
let debut ;
function saveFile(){
  let name = prompt("Entrer un nom de fichier avec l'extention (ex : name.jpg)")
  if (name == null || name == "") {}
  else
  save(name); // save a specific canvas with a filename
}



function setup() {
  // var imported = document.createElement('script');
  // imported.src = "/client/scripts/src/components/Task.js";
  // document.head.appendChild(imported);

  // document.writeln("<script type='text/javascript' src='./src/components/Task.js'></script>");
  // Vue.component("TaskList", )
  new Vue({ 
    el: '#app',
    
    data: {
        message: 'Hello Vue!'
    }
  });

  newBtn = createButton('Nouveau');
  saveBtn= createButton("Save Image")

  saveBtn.mousePressed(saveFile)
  debut = select(".overlay");
  debut.addClass("overlay-open")
  // save.position(400, 65);


  // newBtn.
  
  createCanvas(600, 450);
  taksList.push(new Task("d", 4, "EEQVE", 0, Hauteur / 4, 4))
  taksList.push(new Task("c", 3, "EVVE", 0, 2 * Hauteur / 4, 2))
  taksList.push(new Task("b", 2, "EE", 0, 3 * Hauteur / 4, 2))
  taksList.push(new Task("a", 1, "EQQQQE", 0, Hauteur - 1, 0))

  taksList.sort(compare)
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

  tasks.sort(compare)
  for (let index = tasks.length - 1; index >= 0; index--) {
    const task = tasks[index];
    if (task.release <= instant && !task.hasFinish()) {
        let nextMove = task.getNextAction()
        let iOfnex = inUsedRes.indexOf(nextMove)
        if (iOfnex != -1 && !task.byMe()) {
          task.addState(new State(0, 0, COLOR.ROUGE, "B"), true)
        } else {
          if (!qlq) {
            qlq = true;
            task.addState(new State(0, 0, RESOURSECOLOR[nextMove]))//COLOR.VERT))
            if (nextMove != "E") {
              if (iOfnex == -1)
                inUsedRes.push(nextMove)

              if (task.hasFinish()) {

                iOfnex = inUsedRes.indexOf(nextMove)
                inUsedRes.splice(iOfnex, 1)
              } else {

                let newNext = task.getNextAction()
                if (nextMove != newNext) {
                  // have to remove res
                  iOfnex = inUsedRes.indexOf(nextMove)

                  inUsedRes.splice(iOfnex, 1)
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