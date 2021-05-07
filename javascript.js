/**************************************************************************************************************
***  Functions  ***********************************************************************************************
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

/**
 * Maps value from [x1, y1] -> [x2, y2]
 * @param {number} value  Number in range [x1, y1]
 * @param {number} x1     Beginning range [x1, y1]
 * @param {number} y1     Beginning range [x1, y1]
 * @param {number} x2     End range [x2, y2]
 * @param {number} y2     End range [x2, y2]
 * @returns mapped value from [x1, y1] -> [x2, y2]
 */
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

/**
 * Get the difference between a date (birthday) and the current time to calculate age
 * Depending on dateMultiplier, age can be in either years, months, or weeks
 * @param {date object} date                  Birthday date
 * @param {int: (1, 12, 52)} dateMultiplier   1 for years, 12 for months, 52 for weeks
 * @returns {float}                           Difference in weeks, months, or years depending on dateMultiplier
 */
function birthdayToNowDifference(date, dateMultiplier) {
  var now = dayjs();

  switch (dateMultiplier) {
    case 1:
      difference = now.diff(date, 'year', true);
      break;
    case 12:
      difference = now.diff(date, 'month', true);
      break;
    case 52:
      difference = now.diff(date, 'week', true);
      break
  }
  
  return difference;
}

/**************************************************************************************************************
***  Main Program
***************************************************************************************************************/

// Global variables for main program and listeners
var expectedAge = 80;
var dateMultiplier = 1; // 1 for years, 12 for months, 52 for weeks
var numCircles = expectedAge * dateMultiplier;  // Number of circles to be displayed on canvas
var margin = 1; // Controls space between circles
var sizeMultiplier = 0.90;  // Controls size of canvas
var circlesLived = 0;
var birthday = dayjs();  // Set default to today's date

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
  
  var j = int(circlesLived);

  for (let i = 0; i < numCircles; i++) {
    // Circles that you've already lived
    if (j > 0) {
      var r = map(i, 0, circlesLived, circleColor.r1[0], circleColor.r1[1]);
      var g = map(i, 0, circlesLived, circleColor.g1[0], circleColor.g1[1]);
      var b = map(i, 0, circlesLived, circleColor.b1[0], circleColor.b1[1]);
      
    // Circles that you have yet to live
    }
    else {
      var r = map(i, circlesLived, numCircles, circleColor.r2[0], circleColor.r2[1]);
      var g = map(i, circlesLived, numCircles, circleColor.g2[0], circleColor.g2[1]);
      var b = map(i, circlesLived, numCircles, circleColor.b2[0], circleColor.b2[1]);
    }

    var c = color(r, g, b);
    fill(c);
    strokeWeight(0);
    circle(x, y, diameter);

    // Draw arc to show fractional circle
    if (j == 0) {
      var c = color(circleColor.r1[1], circleColor.g1[1], circleColor.b1[1]);
      fill(c);
      fractional = circlesLived % 1;
      arc(x, y, diameter, diameter, 0, (fractional) * (2*PI));
    }

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
***  Listeners  ***********************************************************************************************
***************************************************************************************************************/

// Initializes date picker to current date
document.getElementById("bdayPicker").valueAsDate = new Date();

// Bday picker listener
document.getElementById("bdayPicker").addEventListener("change", function() {
  birthday = this.value;  //ex. 2000-11-13
  // Update circles that you've already lived
  circlesLived = birthdayToNowDifference(birthday, dateMultiplier);
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
      break;
    case "months":
      dateMultiplier = 12;
      sizeMultiplier = 0.95;
      break;
    case "weeks":
      dateMultiplier = 52;
      sizeMultiplier = 0.98;
      break;
  }

  // Update circles
  circlesLived = birthdayToNowDifference(birthday, dateMultiplier);
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
      case "Fireplace":
      document.documentElement.style.setProperty('--offbar-background-color', 'rgb(130,20,20)');
      document.documentElement.style.setProperty('--canvas-background-color', 'rgb(255,100,61)');
      document.documentElement.style.setProperty('--hamburger-color', 'rgb(50, 0, 0)');
      circleColor = {
        r1: [210,255],
        g1: [210,255],
        b1: [0,70],
        r2: [225,255],
        g2: [123,143],
        b2: [40,70]
      }
      break;
      case "Sweet Purple":
      document.documentElement.style.setProperty('--offbar-background-color', 'rgb(80, 30, 136)');
      document.documentElement.style.setProperty('--canvas-background-color', 'rgb(255,245,245)');
      document.documentElement.style.setProperty('--hamburger-color', 'rgb(144,149,225)');
      circleColor = {
        r1: [149,195],
        g1: [0,111],
        b1: [255,255],
        r2: [242,228],
        g2: [224,191],
        b2: [255,255]
      }
      break;
  }

  setup();
});

/**************************************************************************************************************
***************************************************************************************************************
***************************************************************************************************************/