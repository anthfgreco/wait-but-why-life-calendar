/**************************************************************************************************************
***  Data  ***********************************************************************************************
***************************************************************************************************************/

// circleColor
//    (r1, g1, b1) is gradient for filled circles
//    (r2, g2, b2) is gradient for unfilled circles
let themes = {
  'Sky Blue': {
    '--offbar-background-color': 'rgb(37, 37, 125)',
    '--canvas-background-color': 'rgb(247, 247, 247)',
    circleColor: {
      r1: [0,70],
      g1: [0,70],
      b1: [80,255],
      r2: [180,220],
      g2: [180,220],
      b2: [200,255]
    }
  },
  'Silver': {
    '--offbar-background-color': 'rgb(50, 50, 50)',
    '--canvas-background-color': 'rgb(247, 247, 247)',
    circleColor: {
      r1: [0,70],
      g1: [0,70],
      b1: [0,70],
      r2: [200,220],
      g2: [200,220],
      b2: [200,220]
    }
  },
  'Mine Shaft': {
    '--offbar-background-color': 'rgb(20, 20, 20)',
    '--canvas-background-color': 'rgb(60, 60, 60)',
    circleColor: {
      r1: [255,200],
      g1: [255,200],
      b1: [255,200],
      r2: [50,25],
      g2: [50,25],
      b2: [50,25]
    }
  },
  'Acid': {
    '--offbar-background-color': 'rgb(0, 0, 0)',
    '--canvas-background-color': 'rgb(0, 0, 0)',
    circleColor: {
      r1: [137,150],
      g1: [200,255],
      b1: [0,0],
      r2: [5,45],
      g2: [5,45],
      b2: [0,0]
    }
  },
  'Fireplace': {
    '--offbar-background-color': 'rgb(130,20,20)',
    '--canvas-background-color': 'rgb(255,100,61)',
    circleColor: {
      r1: [210,255],
      g1: [210,255],
      b1: [0,70],
      r2: [225,255],
      g2: [123,143],
      b2: [40,70]
    }
  },
  'Sweet Purple': {
    '--offbar-background-color': 'rgb(80, 30, 136)',
    '--canvas-background-color': 'rgb(255,245,245)',
    circleColor: {
      r1: [149,195],
      g1: [0,111],
      b1: [255,255],
      r2: [242,228],
      g2: [224,191],
      b2: [255,255]
    }
  }
}

let timePeriod = {
  "years": 1,
  "months": 12,
  "weeks": 52
}

// sizeMultiplier: 0.90/0.95/0.98

/**************************************************************************************************************
***  Main Program
***************************************************************************************************************/

// Load browser local storage
var localStorage = window.localStorage;
//localStorage.clear();

// Global variables for main program and listeners
var expectedAge         = Number(localStorage.getItem("expectedAge")   ) || 80;
var timePeriodSelected  = localStorage.getItem("timePeriodSelected") || "years";
var birthday            = localStorage.getItem("birthday") || dayjs();
var theme               = localStorage.getItem("theme")  || "Sky Blue";

// Custom theme storage
var offbarBackgroundColor = localStorage.getItem("offbarBackgroundColor") || '#111111';
var canvasBackgroundColor = localStorage.getItem("canvasBackgroundColor") || '#f7f7f7';
var filledGradient1       = localStorage.getItem("filledGradient1")       || '#000050';
var filledGradient2       = localStorage.getItem("filledGradient2")       || '#4646ff';
var unfilledGradient1     = localStorage.getItem("unfilledGradient1")     || '#b4b4c8';
var unfilledGradient2     = localStorage.getItem("unfilledGradient2")     || '#dcdcff';

var dateMultiplier      = timePeriod[timePeriodSelected];
var numCircles          = expectedAge * dateMultiplier; // Number of circles to be displayed on canvas
var margin              = 1;
var circlesLived        = birthdayToNowDifference(birthday);


// Algorithm to get the maximum size of n squares that fit into a rectangle with a given width and height
// URL (version: 2017-11-25): https://math.stackexchange.com/q/2536926
function calculateDiameterOfCircle(n, x, y) {
  let sx, sy;
  let px = Math.ceil(Math.sqrt(n*x/y))
  if (Math.floor(px*y/x) * px < n) {
    sx = y / Math.ceil(px * y / x);
  }
  else {
    sx = x / px;
  }
  let py = Math.ceil(Math.sqrt(n*y/x))
  if (Math.floor(py*x/y) * py < n) {
    sy = x / Math.ceil(x * py / y);
  }
  else {
    sy = y / py;
  }

  return Math.max(sx, sy);
}

// Maps a value from one range to another
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

// Gets the difference between a date (birthday) and the current time to calculate age
// Depending on timePeriodSelected, age can be in either years, months, or weeks
function birthdayToNowDifference(date) {
  let now = dayjs();
  return now.diff(date, timePeriodSelected.slice(0, -1), true); // remove 's' from end of string
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return {r: r, g: g, b: b};
}

function changeTheme(newTheme) {
  if (newTheme == "Custom Theme") {
    document.documentElement.style.setProperty('--offbar-background-color', offbarBackgroundColor);
    document.documentElement.style.setProperty('--canvas-background-color', canvasBackgroundColor);
    let rgb1 = hexToRgb(filledGradient1);
    let rgb2 = hexToRgb(filledGradient2);
    let rgb3 = hexToRgb(unfilledGradient1);
    let rgb4 = hexToRgb(unfilledGradient2);
    circleColor = {
      r1: [rgb1.r,rgb2.r],
      g1: [rgb1.g,rgb2.g],
      b1: [rgb1.b,rgb2.b],
      r2: [rgb3.r,rgb4.r],
      g2: [rgb3.g,rgb4.g],
      b2: [rgb3.b,rgb4.b]
    }
  }
  else {
    document.documentElement.style.setProperty('--offbar-background-color', themes[newTheme]['--offbar-background-color']);
    document.documentElement.style.setProperty('--canvas-background-color', themes[newTheme]['--canvas-background-color']);
    circleColor = themes[newTheme]['circleColor'];
  }
}

function setup() {
  changeTheme(theme);

  // Set up canvas
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");

  var diameter = calculateDiameterOfCircle(numCircles, windowWidth-5, windowHeight-5) - margin;
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
    
    // Draw circle
    var c = color(r, g, b);
    fill(c);
    strokeWeight(0);
    circle(x, y, diameter);

    // Draw arc to show fractional circle
    if (j == 0) {
      var c = color(circleColor.r1[1], circleColor.g1[1], circleColor.b1[1]);
      fill(c);
      fractional = circlesLived % 1;
      arc(x, y, diameter, diameter, PI + HALF_PI, (fractional * TWO_PI) + (PI + HALF_PI));
    }

    x += diameter + margin;

    // If the next circle will go off the screen, move down a row
    if (x > windowWidth - diameter/2) {
      x = diameter/2 + margin;
      y += diameter + margin;
    }

    j--;
  }
}

function windowResized() {
  setup();
}

/**************************************************************************************************************
***  Initializers/Listeners  ***********************************************************************************************
***************************************************************************************************************/

// Initialize date picker to current date
document.getElementById("bdayPicker").valueAsDate = new Date(birthday);

// Initialize expected age
document.getElementById("expectedAge").value = expectedAge;

// Initialize radio buttons
document.getElementById(timePeriodSelected).checked = true;

// Initialize theme selector
document.getElementById('theme-selector').value = theme;

// Bday picker listener
document.getElementById("bdayPicker").addEventListener("change", function() {
  birthday = this.value;  //ex. "2000-11-13"
  localStorage.setItem("birthday", birthday);
  circlesLived = birthdayToNowDifference(birthday);
  setup();
});

// Expected age listener
document.getElementById("expectedAge").addEventListener("keyup", function() {
  var input = this.value;
  // Stops app from crashing when expected age is too high
  if (input > 999) {
    input = 999;
    document.getElementById("expectedAge").value = input;
  }
  expectedAge = input;    // Global variable
  localStorage.setItem("expectedAge", expectedAge);
  numCircles = expectedAge * dateMultiplier;
  setup();
});

// Radio buttons listener
document.getElementById("radio-buttons-div").addEventListener("change", function() {
  let newTimePeriod = document.querySelector('input[name="date-format"]:checked').value;
  timePeriodSelected = newTimePeriod;
  dateMultiplier = timePeriod[newTimePeriod];
  localStorage.setItem('timePeriodSelected', newTimePeriod);

  // Update circles
  circlesLived = birthdayToNowDifference(birthday);
  numCircles = expectedAge * dateMultiplier;
  setup();
});

// Theme selector listener
document.getElementById("theme-selector").addEventListener("change", function() {
  theme = document.getElementById("theme-selector").value;
  localStorage.setItem("theme", theme);
  setup();
});

// Initialize custom theme setting
document.getElementById("offbar-background-color").value = offbarBackgroundColor;
document.getElementById("canvas-background-color").value = canvasBackgroundColor;
document.getElementById("filled-gradient-1").value = filledGradient1;
document.getElementById("filled-gradient-2").value = filledGradient2;
document.getElementById("unfilled-gradient-1").value = unfilledGradient1;
document.getElementById("unfilled-gradient-2").value = unfilledGradient2;

// Custom theme settings listener
document.getElementById("custom-theme-settings").addEventListener("change", function() {
  offbarBackgroundColor = document.getElementById("offbar-background-color").value;
  canvasBackgroundColor = document.getElementById("canvas-background-color").value;
  filledGradient1       = document.getElementById("filled-gradient-1").value;
  filledGradient2       = document.getElementById("filled-gradient-2").value;
  unfilledGradient1     = document.getElementById("unfilled-gradient-1").value;
  unfilledGradient2     = document.getElementById("unfilled-gradient-2").value;
  localStorage.setItem("offbarBackgroundColor", offbarBackgroundColor);
  localStorage.setItem("canvasBackgroundColor", canvasBackgroundColor);
  localStorage.setItem("filledGradient1", filledGradient1);
  localStorage.setItem("filledGradient2", filledGradient2);
  localStorage.setItem("unfilledGradient1", unfilledGradient1);
  localStorage.setItem("unfilledGradient2", unfilledGradient2);
  setup();
});

/**************************************************************************************************************
***************************************************************************************************************
***************************************************************************************************************/
