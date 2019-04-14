require("./app")
// require("./models")



const COLOR = {
    ROUGE: "#FF0000",
    NOIR: "#222222",
    VERTISH: "#00DD00",
    VERT: "#54ffba",
    JAUNE: "#fff654",
    BLANCHE: "#FFFFFF"
  }
  

const RESOURSECOLOR = {
    "E": COLOR.VERT,
    "Q": COLOR.JAUNE,
    "V": COLOR.VERTISH
  }
// var RESOURSECOLOR = require("./constants").RESOURSECOLOR 
var State = require("./models/State").State
var Task = require("./models/Task").Task
// var Task = new require("./models/Task").Task

// export {State,Task, COLOR, RESOURSECOLOR}


let debut;
// La liste des taches
let taksList = [];

let inUsedRes = [];
let instant = 0;
let Hauteur = 400;
let listeIns = []
let itstrue = false
function compare(a, b) {
    if (a.priority < b.priority)
      return -1;
    if (a.priority > b.priority)
      return 1;
    return 0;
  }

  let newBtn, saveBtn;
function saveFile(){
  let name = prompt("Entrer un nom de fichier avec l'extention (ex : name.jpg)")
  if (name == null || name == "") {}
  else
  save(name); // save a specific canvas with a filename
}

function showTasks(ts) {
    console.log(ts)
    for (let i = 0; i < ts.length; i++) {
      const task = ts[i];
      task.show()
  
    }
  }

function defaultScheduler(tasks) {
    let newTasks = [];
    let qlq = false;
  
    tasks.sort(compare)
    // let a = []
    // a.reverse
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
window.addEventListener("start:scheduling", function(e){
    // console.log(e)
    e.tasks.sort(compare).reverse()
    taksList = []
    e.tasks.forEach((task, index) => {
        taksList.push(new Task(task.name, task.priority, task.seq,0 ,  ((index+1)*Hauteur/e.tasks.length) -1, task.release))
    });
    itstrue = true
    debut.removeClass("overlay-open")
})
let sel ;
window.setup = function setup(){
    background(0)
    createCanvas(600, Hauteur+200);
debut = select(".overlay");
  debut.addClass("overlay-open")
  sel = createSelect();
  sel.position(10, 10);
  sel.option('default');
  sel.option('ICPP');
  sel.option('OCPP');
  sel.changed(mySelectEvent);
}
window.draw = function draw() {

    if(itstrue && instant<50){
        mySelectEvent()
        _drawFunc()
    }
  
  }
  function mySelectEvent() {
    var item = sel.value();
    console.log(item)
    text(item + ' scheduleur!', 50, height);
  }
