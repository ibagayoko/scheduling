var COLOR = require("./constants").COLOR
 const RESOURSECOLOR = {
    "E": COLOR.VERT,
    "Q": COLOR.JAUNE,
    "V": COLOR.VERTISH
  }
// var RESOURSECOLOR = require("./constants").RESOURSECOLOR 
var State = require("./State").State
var Task = require("./Task").Task

export {State,Task, COLOR, RESOURSECOLOR}