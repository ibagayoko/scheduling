require("./app");

var COLOR = require("./models/constants").COLOR;
var State = require("./models/State").State;
var Task = require("./models/Task").Task;
// var Resource = require("./models/Resource").Resource;


// Scheduling algorithm
var ICPP = require("./models/ICPP").ICPP;
var Default = require("./models/Default").Default;


let debut;
// La liste des taches
let taksList = [];

let instant = 0;
let Hauteur = 400;
let listeIns = [];
let itstrue = false;

let icpp , defaut;

function compare(a, b) {
  if (a.priority < b.priority) return -1;
  if (a.priority > b.priority) return 1;
  return 0;
}

let newBtn, saveBtn;
function saveFile() {
  let name = prompt(
    "Entrer un nom de fichier avec l'extention (ex : name.jpg)"
  );
  if (name == null || name == "") {
  } else save(name); // save a specific canvas with a filename
}

function showTasks(ts) {
  console.log(ts);
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
  showTasks(taksList);
  taksList = icpp.ICPPScheduler(taksList)
  console.log(instant, taksList);
  // taksList = defaut.defaultScheduler(taksList);
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
  });
  itstrue = true;
  icpp = new ICPP(taksList)
  defaut = new Default(taksList)
  debut.removeClass("overlay-open");
});
let sel;
window.setup = function setup() {
  background(0);
  createCanvas(600, Hauteur + 200);
  debut = select(".overlay");
  debut.addClass("overlay-open");
  sel = createSelect();
  sel.position(10, 10);
  sel.option("default");
  sel.option("ICPP");
  sel.option("OCPP");
  sel.changed(mySelectEvent);
};
window.draw = function draw() {
  if (itstrue && instant < 20) {
    // mySelectEvent()
    _drawFunc();
  }
};
function mySelectEvent() {
  var item = sel.value();
  console.log(item);
  text(item + " scheduleur!", 50, height);
}
