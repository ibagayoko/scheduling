require("./app");
/**
 * Importations des dependance
 */ 
let Task  = require("./models/Task").Task;
let State = require("./models/State").State;
let COLOR = require("./models/constants").COLOR;

// let Resource = require("./models/Resource").Resource;


// Scheduling algorithms
let ICPP    = require("./models/ICPP").ICPP;
let OCPP    = require("./models/OCPP").OCPP;
let Default = require("./models/Default").Default;

//  comparateur de tache en fonction de priorite
let compare = require("./models/ICPP").compare;

// Overlay to enter tasks
let startMenu;

// La liste des taches
let icppTaskList     = []
let ocppTaskList     = []
let defaultTasksList = [];

// Hauteur du canvas
let Hauteur = 500;

// coordonnee en x
let listeIns = [];

// afficher ou non  le resultat
let itstrue = false;

// sheduling scheme
let icpp, defaut, ocpp;



// Select scheme
let sel;
let saveBtn;

// l'algorithme selectionne
let selectedScheme

function saveFile() {
  let name = prompt(
    "Entrer un nom de fichier avec l'extention (ex : name, or name.ext)"
  );
  if (name != null && name != "") 
    save(name); // save a specific canvas with a filename
}

/**
 * Affiche une liste taches
 * @param {Array<Task>} ts la liste des taches a affichee
 */
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
  line(100, 0, 100, Hauteur);

  textSize(10);
  for (let i = 0; i < listeIns.length; i++) {
    const inst = listeIns[i];
    inst.showName(10);
  }

  if (itstrue) {
    if (selectedScheme == "ICPP") {
      icppTaskList = icpp.ICPPScheduler(icppTaskList)
      showTasks(icppTaskList);
    }
    else if (selectedScheme == "OCPP") {
      ocppTaskList = ocpp.OCPPScheduler(ocppTaskList)
      showTasks(ocppTaskList);
    }
    else 
    {
      // (selectedScheme == "default")
       selectedScheme = "Default";
      defaultTasksList = defaut.defaultScheduler(defaultTasksList);
      showTasks(defaultTasksList);
    }
  }
  // Ecrire le titre
  text(selectedScheme + " scheduleur!", 50 + width / 2, height - 100);
}
window.setup = function setup() {
  background(0);
  cns = createCanvas(1000, Hauteur + 200);
  // Affichage du menu
  startMenu = select(".overlay");
  startMenu.addClass("overlay-open");

  // Nos coordonnees de l'axe de x
  for (let i = 0; i < 100; i++)
    listeIns.push(
      new State(
        100 + i * 20,
        Hauteur + 20,
        COLOR.BLANCHE,
        i.toString()
      )
    );

};

/**
 * la fonction draw est appel continuellement
 */
window.draw = function draw() {
  if (itstrue) {
    // myProtocolHasChange()
    _drawFunc();
  }
};

/**
 * L'ordonnaceur selectionner a changer
 * @param {Event} e 
 */
function myProtocolHasChange(e) {

  selectedScheme = e.target.value //sel.value();
  console.log("seleted : ", selectedScheme);
  instant = 0

}



/**
 * lorsque l'ordonnancement est declanche 
 * preparer les taches et les differentes algorithmes
 */
window.addEventListener("start:scheduling", function (e) {
  // Pour afficher les tache dans l'ordre de priorite
  e.tasks.sort(compare).reverse();
  defaultTasksList = [];

  e.tasks.forEach((task, index) => {
    defaultTasksList.push(
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
  });

  icpp   = new ICPP(icppTaskList)
  ocpp   = new OCPP(ocppTaskList)
  defaut = new Default(defaultTasksList)
  
  // On cache le menu
  startMenu.removeClass("overlay-open");
  
  // Pour determineer si les taches doient etre afficher
  itstrue = true;

  // Ajoute la posibilte de pouvoir sauvegarder les resultats
  saveBtn = select("#saveBtn");
  saveBtn.mousePressed(saveFile)

  sel = document.querySelector("#selecScheme")
  sel.addEventListener("change", myProtocolHasChange)

});