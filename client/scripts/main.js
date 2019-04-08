let a = {'priority':1, 'rtime':0, 'exseq':"EQQQE"}
let b = {'priority':2, 'rtime':0, 'exseq':"EE"}
let c = {'priority':3, 'rtime':0, 'exseq':"EVVE"}
let d = {'priority':4, 'rtime':0, 'exseq':"EVQVE"}
let t = [];
const COLOR= {
  ROUGE:"#FF0000",
  NOIR :"#222222",
  VERT :"#00DD00",
  JAUNE:"#FF00FF"
}
function setup() {
    
    createCanvas(400, 400);
    t.push(new Task("d", 4, "EVQVE", 0, height/4, 4))
    t.push(new Task("c", 3, "EVVE", 0, 2*height/4, 2))
    t.push(new Task("b", 2, "EE", 0, 3*height/4, 2))
    t.push(new Task("a", 1, "EQQQE", 0, height-1, 0))

    let b = new State(0, 0, color=COLOR.NOIR)
    let a = new State(0, 0, color=COLOR.VERT, "E")
    t[2].addState(b)
    t[3].addState(a)
    t[3].addState(new State(0,0,COLOR.JAUNE, "Q"))

  }
  
  function draw() {
    background(255);
    fill(0)
    stroke(0);
    line(50, 0, 50, height);
    textSize(32);
    showTasks(t)

  }

  function showTasks(ts){
    for (let i = 0; i < ts.length; i++) {
      const task = ts[i];
      task.show()
      
    }
  }