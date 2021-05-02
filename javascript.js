/**************************************************************************************************************
***  General Functions
***************************************************************************************************************/

/**
 * @param String 
 * @returns String object with all {}'s replaced with the specified variables
 */
String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

/**************************************************************************************************************
***  Main Program
***************************************************************************************************************/

var numCircles = 4160/52;    // Number of circles to be displayed on canvas
var margin = 0;           // Controls space between circles

function getDiameter() {
  circle_div = document.getElementById("circle-div");
  var divWidth = circle_div.offsetWidth;
  var divHeight = circle_div.offsetHeight;
  console.log(divWidth, divHeight);
  return Math.floor(Math.sqrt((divWidth * divHeight) / numCircles)) / 1.1;
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight*0.9);
  canvas.id("circle-div");
  background(240, 248, 255);

  var diameter = getDiameter() - margin;
  console.log(diameter)
  var x = diameter/2 + margin;
  var y = diameter/2 + margin;
  
  for (let i = 0; i < numCircles; i++) {
    let c = color(0, 0, map(i, 0, numCircles, 0, 255));
    fill(c);
    circle(x, y, diameter);
    x += diameter + margin;
    if (x > windowWidth-diameter/2) {
      x = diameter/2 + margin; //default
      y += diameter + margin;
    }
  }
}

function windowResized() {
  setup();
}
