let a = {'priority':1, 'rtime':0, 'exseq':"EQQQE"}
let b = {'priority':2, 'rtime':0, 'exseq':"EE"}
let c = {'priority':3, 'rtime':0, 'exseq':"EVVE"}
let d = {'priority':4, 'rtime':0, 'exseq':"EVQVE"}
let t = [];
const COLOR= {
  ROUGE:"#FF0000",
  NOIR :"#222222",
  VERT :"#00DD00",
  JAUNE:"#FF00FF",
  BLANCHE: "#FFFFFF"
}

let inUsedRes = [];
let instant  = 0;

function compare(a,b) {
  if (a.priority < b.priority)
  return -1;
  if (a.priority > b.priority)
    return 1;
  return 0;
}


// objs.sort(compare);
function setup() {
    
    createCanvas(600, 400);
    t.push(new Task("d", 4, "EEVQVE", 0, height/4, 4))
    t.push(new Task("c", 3, "EVVE", 0, 2*height/4, 2))
    t.push(new Task("b", 2, "EE", 0, 3*height/4, 2))
    t.push(new Task("a", 1, "EQQQE", 0, height-1, 0))

    t.sort(compare)
    console.log(t)

    // let b = new State(0, 0, color=COLOR.NOIR)
    // let a = new State(0, 0, color=COLOR.VERT, "E")
    // t[2].addState(b)
    // t[3].addState(a)
    // t[3].addState(new State(0,0,COLOR.JAUNE, "Q"))

  }
  
  function draw() {
    background(255);
    fill(0)
    stroke(0);
    line(50, 0, 50, height);
    textSize(32);
    showTasks(t)
    t= getNextTask(t)

  }

  function getNextTask(tasks){
    let newTasks = [];
    let qlq = false;

    tasks.sort(compare)
    for (let index = tasks.length-1; index >=0 ; index--) {
      const task = tasks[index];
      if(task.release<=instant){
        if(!task.hasFinish()){
        let nextMove = task.getNextAction()
        let iOfnex = inUsedRes.indexOf(nextMove)
        if(iOfnex!=-1 && !task.byMe()){
          task.addState(new State(0,0, COLOR.ROUGE, "B"), true)
        }else{
          if(!qlq){
            qlq = true;
            // if(!task.hasFinish())
            // {
              
              task.addState(new State(0,0, COLOR.VERT))
              if(nextMove!="E"){
                if(iOfnex==-1) 
                  inUsedRes.push(nextMove)
                  
                if(task.hasFinish()){
                  
                  iOfnex = inUsedRes.indexOf(nextMove)
                  inUsedRes.splice(iOfnex, 1)
                }else {

                  let newNext = task.getNextAction()
                if(nextMove!=newNext){
                  // have to remove res
                  iOfnex = inUsedRes.indexOf(nextMove)
                  
                  inUsedRes.splice(iOfnex, 1)
                }
              }
              }
            // }
          }
          else{
            // if(!task.hasFinish())
            task.addState(new State(0,0, COLOR.BLANCHE), true)
          }
        }

        }
      }
      newTasks.push(task)
      
    }



    instant++;

    return newTasks
  }

  






  function showTasks(ts){
    for (let i = 0; i < ts.length; i++) {
      const task = ts[i];
      task.show()
      
    }
  }