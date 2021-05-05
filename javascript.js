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

var expectedAge = 80;
var dateMultiplier = 1;    // 1 for years, 12 for months, 52 for weeks
var numCircles = expectedAge * dateMultiplier;    // Number of circles to be displayed on canvas
var margin = 2;           // Controls space between circles
var sizeMultiplier = 0.90;

function getDiameter() {
  circle_div = document.getElementById("circle-div");
  var divWidth = circle_div.offsetWidth;
  var divHeight = circle_div.offsetHeight;
  return sizeMultiplier * (Math.floor(Math.sqrt((divWidth * divHeight) / numCircles)));
}

function setup() {
  // Set up canvas
  var canvas = createCanvas(windowWidth*0.95, windowHeight*0.9);
  canvas.id("circle-div");
  var canvasX = (windowWidth - width) / 2;
  var canvasY = 20 + (windowHeight - height) / 2;
  canvas.position(canvasX, canvasY);
  background(240, 248, 255);

  var diameter = getDiameter() - margin;
  var x = diameter/2 + margin;
  var y = diameter/2 + margin;
  
  for (let i = 0; i < numCircles; i++) {
    let c = color(0, 0, map(i, 0, numCircles, 0, 255));
    fill(c);
    circle(x, y, diameter);
    x += diameter + margin;
    if (x > windowWidth*0.95 - diameter/2) {
      x = diameter/2 + margin; //default
      y += diameter + margin;
    }
  }
}

function windowResized() {
  setup();
}

/**************************************************************************************************************
***  Listeners
***************************************************************************************************************/

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
  numCircles = input;
  setup();
});

document.getElementById("radio-buttons").addEventListener("change", function() {
  var input = document.querySelector('input[name="date-format"]:checked').value;
  switch (input) {
    case "weeks":
      dateMultiplier = 52;
      sizeMultiplier = 0.98;
      break;
    case "months":
      dateMultiplier = 12;
      sizeMultiplier = 0.95;
      break;
    case "years":
      dateMultiplier = 1;
      sizeMultiplier = 0.90;
      break;
  }
  numCircles = expectedAge * dateMultiplier;
  setup();
});

document.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);
