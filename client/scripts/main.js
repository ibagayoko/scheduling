let a = { 'priority': 1, 'rtime': 0, 'exseq': "EQQQE" }
let b = { 'priority': 2, 'rtime': 0, 'exseq': "EE" }
let c = { 'priority': 3, 'rtime': 0, 'exseq': "EVVE" }
let d = { 'priority': 4, 'rtime': 0, 'exseq': "EVQVE" }

let t = [];
const COLOR = {
  ROUGE: "#FF0000",
  NOIR: "#222222",
  VERTISH: "#00DD00",
  VERT: "#54ffba",
  JAUNE: "#fff654",
  BLANCHE: "#FFFFFF"
}

const RESCOLOS = {
  "E": COLOR.VERT,
  "Q": COLOR.JAUNE,
  "V": COLOR.VERTISH
}

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

let newBtn;

// objs.sort(compare);
function setup() {
  // input = createInput();
  // input.position(20, 65);

  newBtn = createButton('Nouveau');
  createCanvas(600, 450);
  t.push(new Task("d", 4, "EEQVE", 0, Hauteur / 4, 4))
  t.push(new Task("c", 3, "EVVE", 0, 2 * Hauteur / 4, 2))
  t.push(new Task("b", 2, "EE", 0, 3 * Hauteur / 4, 2))
  t.push(new Task("a", 1, "EQQQQE", 0, Hauteur - 1, 0))

  t.sort(compare)
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
  showTasks(t)
  t = getNextTask(t)
  fill(0)

}

function getNextTask(tasks) {
  let newTasks = [];
  let qlq = false;

  tasks.sort(compare)
  for (let index = tasks.length - 1; index >= 0; index--) {
    const task = tasks[index];
    if (task.release <= instant) {
      if (!task.hasFinish()) {
        let nextMove = task.getNextAction()
        let iOfnex = inUsedRes.indexOf(nextMove)
        if (iOfnex != -1 && !task.byMe()) {
          task.addState(new State(0, 0, COLOR.ROUGE, "B"), true)
        } else {
          if (!qlq) {
            qlq = true;
            task.addState(new State(0, 0, RESCOLOS[nextMove]))//COLOR.VERT))
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
            // if(!task.hasFinish())
            task.addState(new State(0, 0, COLOR.BLANCHE), true)
          }
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