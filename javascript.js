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

var numCircles = 980;

function updateCirclesDiameter(numCircles) {
  circle_div = document.getElementById("circle-div");
  var divWidth = circle_div.offsetWidth;
  var divHeight = circle_div.offsetHeight;
  return Math.floor(Math.sqrt(divWidth * 0.8 * divHeight / numCircles));
}

function addCircle() {
  circle = document.createElement("div");
  circle.className = "circle";
  var diameter = updateCirclesDiameter(numCircles);
  circle.style.width = "{}px".format(diameter);
  circle.style.height = "{}px".format(diameter);
  document.getElementById("circle-div").appendChild(circle);
}

function updateCircles(age) {
  for (let i = 0; i < age; i++) {
    addCircle();
  }
}

function onResize() {
  /*
  circle_div = document.getElementById("circle-div");
  circle_div.remove();

  new_circle_div = document.createElement("div");
  new_circle_div.id = "circle-div";
  document.getElementById("body").appendChild(new_circle_div);
  updateCircles(numCircles);
  */
  ;
}

function setup() {
  createCanvas(windowWidth, windowHeight*0.9);
  background(0, 0, 0);
  var diameter = Math.floor(Math.sqrt(windowWidth * 0.8 * windowHeight / numCircles));
  var x = diameter/2;
  var y = diameter/2;
  
  for (let i = 0; i < numCircles; i++) {
    circle(x, y, diameter);
    x += diameter;
    if (x > windowWidth-diameter) {
      x = diameter/2;
      y += diameter;
    }
  }
}

function windowResized() {
  setup();
}
