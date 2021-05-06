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

// Global variables for main program and listeners
var expectedAge = 80;
var dateMultiplier = 1;    // 1 for years, 12 for months, 52 for weeks
var numCircles = expectedAge * dateMultiplier;    // Number of circles to be displayed on canvas
var margin = 1;           // Controls space between circles
var sizeMultiplier = 0.90;
var circlesLived = 0;
var presentDate = new Date(Date.now());
var birthday = new Date(Date.now());

// Object for coloring circles
// (r1, g1, b1) is gradient for filled circles
// (r2, g2, b2) is gradient for unfilled circles
var circleColor = {
  r1: [0,70],
  g1: [0,70],
  b1: [80,255],
  r2: [180,220],
  g2: [180,220],
  b2: [200,255]
}

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
  background(getComputedStyle(document.documentElement).getPropertyValue('--canvas-background-color'));

  var diameter = getDiameter() - margin;
  var x = diameter/2 + margin;
  var y = diameter/2 + margin;
  
  var j = circlesLived;

  for (let i = 0; i < numCircles; i++) {
    // Circles that you've already lived
    if (j > 0) {
      // 0 70
      var r = map(i, 0, circlesLived, circleColor.r1[0], circleColor.r1[1]);
      var g = map(i, 0, circlesLived, circleColor.g1[0], circleColor.g1[1]);
      var b = map(i, 0, circlesLived, circleColor.b1[0], circleColor.b1[1]);
      var c = color(r, g, b);
    // Circles that you have yet to live
    }
    else {
      // 200 220
      var r = map(i, circlesLived, numCircles, circleColor.r2[0], circleColor.r2[1]);
      var g = map(i, circlesLived, numCircles, circleColor.g2[0], circleColor.g2[1]);
      var b = map(i, circlesLived, numCircles, circleColor.b2[0], circleColor.b2[1]);
      var c = color(r, g, b);
    }
    fill(c);
    strokeWeight(0);
    //strokeWeight(1);
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
    case "Sky Blue":
      document.documentElement.style.setProperty('--offbar-background-color', 'rgb(37, 37, 125)');
      document.documentElement.style.setProperty('--canvas-background-color', 'rgb(247, 247, 247)');
      document.documentElement.style.setProperty('--hamburger-color', 'rgb(0, 0, 0)');
      circleColor = {
        r1: [0,70],
        g1: [0,70],
        b1: [80,255],
        r2: [180,220],
        g2: [180,220],
        b2: [200,255]
      }
      break;
    case "Silver":
      document.documentElement.style.setProperty('--offbar-background-color', 'rgb(50, 50, 50)');
      document.documentElement.style.setProperty('--canvas-background-color', 'rgb(247, 247, 247)');
      document.documentElement.style.setProperty('--hamburger-color', 'rgb(0, 0, 0)');
      circleColor = {
        r1: [0,70],
        g1: [0,70],
        b1: [0,70],
        r2: [200,220],
        g2: [200,220],
        b2: [200,220]
      }
      break;
    case "Mine Shaft":
      document.documentElement.style.setProperty('--offbar-background-color', 'rgb(20, 20, 20)');
      document.documentElement.style.setProperty('--canvas-background-color', 'rgb(60, 60, 60)');
      document.documentElement.style.setProperty('--hamburger-color', 'rgb(230, 230, 230)');
      circleColor = {
        r1: [255,200],
        g1: [255,200],
        b1: [255,200],
        r2: [50,25],
        g2: [50,25],
        b2: [50,25]
      }
      break;
      case "Acid":
      document.documentElement.style.setProperty('--offbar-background-color', 'rgb(0,0,0)');
      document.documentElement.style.setProperty('--canvas-background-color', 'rgb(0,0,0)');
      document.documentElement.style.setProperty('--hamburger-color', 'rgb(137,255,0)');	
      circleColor = {
        r1: [137,150],
        g1: [200,255],
        b1: [0,0],
        r2: [5,45],
        g2: [5,45],
        b2: [0,0]
      }
      break;
  }

  setup();
});