let a = {'priority':1, 'rtime':0, 'exseq':"EQQQE"}
let b = {'priority':2, 'rtime':0, 'exseq':"EE"}
let c = {'priority':3, 'rtime':0, 'exseq':"EVVE"}
let d = {'priority':4, 'rtime':0, 'exseq':"EVQVE"}

function setup() {
    
    createCanvas(400, 400);
    
  }
  
  function draw() {
    background(255);
    fill(0)
    stroke(0);
    line(50, 0, 50, height);
    textSize(32);
    let c="#222222"
    let a = new State(50, height/4, color=c)
    c="#FF0000"
    let b= new State(50, 2*height/4 , color=c)
    a.show()
    b.show()
    fill(0)
    text('d',0,  height/4);
    line(50, height/4, width, height/4);
    text('c',0,  2*height/4);
    line(50, 2*height/4, width, 2*height/4);
    text('b',0,  3*height/4);
    line(50, 3*height/4, width, 3*height/4);
    text('a',0,  4*height/4);
    line(50, height-1, width, height-1);

  
    // rect(0,0, width, height)

  }