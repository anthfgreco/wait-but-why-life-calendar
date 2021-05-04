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
var margin = 4;           // Controls space between circles

function getDiameter() {
  circle_div = document.getElementById("circle-div");
  var divWidth = circle_div.offsetWidth;
  var divHeight = circle_div.offsetHeight;
  return Math.floor(Math.sqrt((divWidth * divHeight) / numCircles)) / 1.1;
}

function setup() {
  // Set up canvas
  var canvas = createCanvas(windowWidth*0.9, windowHeight*0.9);
  canvas.id("circle-div");
  var x = (windowWidth - width) / 2;
  var y = 20 + (windowHeight - height) / 2;
  canvas.position(x, y);
  background(240, 248, 0);

  var diameter = getDiameter() - margin;
  var x = diameter/2 + margin;
  var y = diameter/2 + margin;
  
  for (let i = 0; i < numCircles; i++) {
    let c = color(0, 0, map(i, 0, numCircles, 0, 255));
    fill(c);
    circle(x, y, diameter);
    x += diameter + margin;
    if (x > windowWidth*0.9 - diameter/2) {
      x = diameter/2 + margin; //default
      y += diameter + margin;
    }
  }
}

function windowResized() {
  setup();
}



// Initializes date picker to current date
document.querySelector("#bdayPicker").valueAsDate = new Date();

// Bday picker listener
document.getElementById("bdayPicker").addEventListener("change", function() {
  var input = this.value;
  var dateEntered = new Date(input);
  console.log(input); //e.g. 2015-11-13
  console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
});

// Expected age listener
document.getElementById("expectedAge").addEventListener("change", function() {
  var input = this.value;
  console.log(input);
});