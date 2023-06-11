var CANVASWIDTH = window.innerWidth;
var CANVASHEIGHT = window.innerHeight;


const TREEX = CANVASWIDTH / 2;     
const TREEY = 200;                 
const BACKGROUNDCOLOR = color('#2e233b'); 

function setup() {
    
    var canvas = createCanvas(CANVASWIDTH, CANVASHEIGHT);
    canvas.parent('canvas-placeholder');

    
    var tree = new Tree(TREEX, TREEY, BACKGROUNDCOLOR);
    var controls = new Controls(tree)
}
