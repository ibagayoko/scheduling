require("./app");

var COLOR = require("./models/constants").COLOR;
var State = require("./models/State").State;
var Task = require("./models/Task").Task;
// var Resource = require("./models/Resource").Resource;


// Scheduling algorithm
var ICPP = require("./models/ICPP").ICPP;
var Default = require("./models/Default").Default;
var PInversion = require("./models/PInverion").PInversion;
var OCPP = require("./models/OCPP").OCPP;

var compare = require("./models/ICPP").compare;

// Overlay to enter tasks
let startMenu;
// La liste des taches
let taksList = [];

// Icpp tasks liste
let icppTaskList = []
let ocppTaskList = []

let pInversiontaksList = []

let Hauteur = 400;

let instant = 0;
let listeIns = [];


let itstrue = false;

// sheduling scheme
let icpp , defaut, pInversion, ocpp;


let newBtn, saveBtn;

// Select scheme
let sel;

function saveFile() {
  let name = prompt(
    "Entrer un nom de fichier avec l'extention (ex : name.jpg)"
  );
  if (name == null || name == "") {
  } else save(name); // save a specific canvas with a filename
}

function showTasks(ts) {
  // console.log(ts);
  for (let i = 0; i < ts.length; i++) {
    const task = ts[i];
    task.show();
  }
}

function _drawFunc() {
  background(255);
  fill(0);
  stroke(0);
  line(50, 0, 50, Hauteur);
  listeIns.push(
    new State(
      50 + instant * 30,
      Hauteur + 30,
      COLOR.BLANCHE,
      instant.toString()
    )
  );
  textSize(16);
  for (let i = 0; i < listeIns.length; i++) {
    const inst = listeIns[i];
    inst.showName(20);
  }
  
  // console.log(instant, taksList);
  // taksList = icpp.ICPPScheduler(taksList)
  // taksList = defaut.defaultScheduler(taksList);
if(itstrue){
  if(item=="ICPP"){
    icppTaskList = icpp.ICPPScheduler(icppTaskList)
      showTasks(icppTaskList);
}
else if(item=="OCPP"){
  ocppTaskList = ocpp.OCPPScheduler(ocppTaskList)
    showTasks(ocppTaskList);
}
else if(item=="default"){
      taksList = defaut.defaultScheduler(taksList);
      showTasks(taksList);
  }
else if(item="PInversion"){
  pInversiontaksList = pInversion.PInversionScheduler(pInversiontaksList);
      showTasks(pInversiontaksList);
}
else{
  showTasks([])
}
}
// textAlign(CENTER);
text(item + " scheduleur!",50+ width/2, height -10);
// textAlign(CENTER);
}
let cns, cc;
window.setup = function setup() {
  background(0);
  cns = createCanvas(600, Hauteur + 200);
  // cc = createCanvas(600, Hauteur + 200);
  startMenu = select(".overlay");
  startMenu.addClass("overlay-open");
  
};
window.draw = function draw() {
  if (itstrue) {
    // mySelectEvent()
    _drawFunc();
  }
};
var item
function mySelectEvent(e) {
  
   item = e.target.value //sel.value();
  console.log("sel", item);
  instant = 0
  
  console.log(pInversiontaksList)
}




window.addEventListener("start:scheduling", function(e) {
  // console.log(e)
  e.tasks.sort(compare).reverse();
  taksList = [];
  e.tasks.forEach((task, index) => {
    taksList.push(
      new Task(
        task.name,
        task.priority,
        task.seq,
        0,
        ((index + 1) * Hauteur) / e.tasks.length - 1,
        task.release
      )

    );
    

    icppTaskList.push(
      new Task(
        task.name,
        task.priority,
        task.seq,
        0,
        ((index + 1) * Hauteur) / e.tasks.length - 1,
        task.release
      )

    );

    ocppTaskList.push(
      new Task(
        task.name,
        task.priority,
        task.seq,
        0,
        ((index + 1) * Hauteur) / e.tasks.length - 1,
        task.release
      )

    );
    pInversiontaksList.push(
      new Task(
        task.name,
        task.priority,
        task.seq,
        0,
        ((index + 1) * Hauteur) / e.tasks.length - 1,
        task.release
      )

    );

  });
  // icppTaskList = taksList.slice(0)
  itstrue = true;
  icpp = new ICPP(icppTaskList)
  ocpp = new OCPP(ocppTaskList)
  defaut = new Default(taksList)
  pInversion = new PInversion(pInversiontaksList)
  startMenu.removeClass("overlay-open");


  saveBtn = createButton("Save as Img");
  saveBtn.position(window.innerWidth-100)
  saveBtn.mousePressed(saveFile)
  
  sel = document.querySelector("#selecScheme")
  sel.addEventListener("change", mySelectEvent)

  // sel = createSelect();
  // sel.position(10, 10);
  // sel.option("default");
  // sel.option("ICPP");
  // sel.option("OCPP");
  // sel.changed(mySelectEvent);
});