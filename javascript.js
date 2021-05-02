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

/**************************************************************************************************************
***  Main Program
***************************************************************************************************************/

var numCircles = 980;

function getDiameter() {
  circle_div = document.getElementById("circle-div");
  var divWidth = circle_div.offsetWidth;
  var divHeight = circle_div.offsetHeight;
  return Math.floor(Math.sqrt((divWidth * 0.96 * divHeight) / numCircles));
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight*0.9);
  canvas.id("circle-div");
  background(0, 0, 0);

  var diameter = getDiameter();
  var x = diameter/2;
  var y = diameter/2;
  
  for (let i = 0; i < numCircles; i++) {
    circle(x, y, diameter);
    x += diameter;
    if (x > windowWidth-diameter/2) {
      x = diameter/2;
      y += diameter;
    }
  }
}

function windowResized() {
  setup();
}
