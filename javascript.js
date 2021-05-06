/**************************************************************************************************************
***  Functions
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

/**
 * Source: https://stackoverflow.com/a/2536445/12198438
 * @param {date} d1 
 * @param {date} d2 
 * @returns number of months between d1 and d2
 */
function monthDifference(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function yearDifference(d1, d2) {
  var ms_difference = d2 - d1;
  var ageDate = new Date(ms_difference);
  return ageDate.getUTCFullYear() - 1970;
}

function weekDifference(d1, d2) {
  // # of milliseconds in one week
	var ONE_WEEK = 604800000;
	// Calculate the difference in milliseconds
	var ms_difference = Math.abs(d1.getTime() - d2.getTime());
	// Convert back to weeks and return weeks
	return Math.floor(ms_difference / ONE_WEEK);
}

/**************************************************************************************************************
***  Main Program
***************************************************************************************************************/

var expectedAge = 80;
var dateMultiplier = 1;    // 1 for years, 12 for months, 52 for weeks
var numCircles = expectedAge * dateMultiplier;    // Number of circles to be displayed on canvas
var margin = 2;           // Controls space between circles
var sizeMultiplier = 0.90;
var circlesLived = 0;
var presentDate = new Date(Date.now());
var birthday = new Date(Date.now());

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
  
  var j = circlesLived;

  for (let i = 0; i < numCircles; i++) {
    // Circles that you've already lived
    if (j > 0) {
      var c = color(0, 255, 0);
    // Circles that you have yet to live
    }
    else {
      var c = color(0, 0, map(i, 0, numCircles, 0, 255));
    }
    fill(c);
    circle(x, y, diameter);
    x += diameter + margin;
    if (x > windowWidth*0.95 - diameter/2) {
      x = diameter/2 + margin; //default
      y += diameter + margin;
    }
    j--;
  }
}

function windowResized() {
  setup();
}

/**************************************************************************************************************
***  Listeners
***************************************************************************************************************/

// Initializes date picker to current date
document.getElementById("bdayPicker").valueAsDate = new Date();

// Bday picker listener
document.getElementById("bdayPicker").addEventListener("change", function() {
  var input = this.value;      //e.g. 2015-11-13
  birthday = new Date(input);  //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
  
  // Update circles that you've already lived
  switch (dateMultiplier) {
    case 1:
      circlesLived = yearDifference(birthday, presentDate);
      break;
    case 12:
      circlesLived = monthDifference(birthday, presentDate);
      break;
    case 52:
      circlesLived = weekDifference(birthday, presentDate);
      break;
  }
  
  setup();
});

// Expected age listener
document.getElementById("expectedAge").addEventListener("keyup", function() {
  var input = this.value;
  expectedAge = input;
  numCircles = expectedAge * dateMultiplier;
  setup();
});

// Radio buttons listener
document.getElementById("radio-buttons-div").addEventListener("change", function() {
  var input = document.querySelector('input[name="date-format"]:checked').value;

  switch (input) {
    case "years":
      dateMultiplier = 1;
      sizeMultiplier = 0.90;
      circlesLived = yearDifference(birthday, presentDate);
      break;
    case "months":
      dateMultiplier = 12;
      sizeMultiplier = 0.95;
      circlesLived = monthDifference(birthday, presentDate);
      break;
    case "weeks":
      dateMultiplier = 52;
      sizeMultiplier = 0.98;
      circlesLived = weekDifference(birthday, presentDate);
      break;
  }

  numCircles = expectedAge * dateMultiplier;
  setup();
});

// Theme selector listener
document.getElementById("theme-selector").addEventListener("change", function() {
  var input = document.getElementById("theme-selector").value;

  switch (input) {
    case "Dark Grey":
      document.documentElement.style.setProperty('--offbar-background-color', 'rgb(37, 37, 37)');
      break;
    case "Sky Blue":
      document.documentElement.style.setProperty('--offbar-background-color', 'rgb(37, 37, 125)');
      break;
    case "test":

      break;
  }
});