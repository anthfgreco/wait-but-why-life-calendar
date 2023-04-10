// localStorage.clear();

// Load data from local storage or use default values
const localStorageValues = LOCAL_STORAGE_KEYS.map(
  (key) => localStorage.getItem(key) || DEFAULTS[key]
);
let [
  expectedAge,
  timePeriodSelected,
  birthday,
  theme,
  offbarBackgroundColor,
  canvasBackgroundColor,
  filledGradient1,
  filledGradient2,
  unfilledGradient1,
  unfilledGradient2,
] = localStorageValues;

let dateMultiplier = TIME_PERIODS[timePeriodSelected];
let numCircles = expectedAge * dateMultiplier;
let margin = 1;
let numCirclesLived = birthdayToNowDifference(birthday);

// Setup is called once when the page loads, when an input is changed, and when the window is resized
function setup() {
  changeTheme(theme);

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");

  let diameter =
    calculateDiameterOfCircle(numCircles, windowWidth - 5, windowHeight - 5) -
    margin;
  let x = diameter / 2 + margin;
  let y = diameter / 2 + margin;

  let j = int(numCirclesLived);

  for (let i = 0; i < numCircles; i++) {
    let r, g, b;
    // Circles that you've already lived
    if (j > 0) {
      r = map(i, 0, numCirclesLived, circleColor.r1[0], circleColor.r1[1]);
      g = map(i, 0, numCirclesLived, circleColor.g1[0], circleColor.g1[1]);
      b = map(i, 0, numCirclesLived, circleColor.b1[0], circleColor.b1[1]);

      // Circles that you have yet to live
    } else {
      r = map(
        i,
        numCirclesLived,
        numCircles,
        circleColor.r2[0],
        circleColor.r2[1]
      );
      g = map(
        i,
        numCirclesLived,
        numCircles,
        circleColor.g2[0],
        circleColor.g2[1]
      );
      b = map(
        i,
        numCirclesLived,
        numCircles,
        circleColor.b2[0],
        circleColor.b2[1]
      );
    }

    // Draw circle
    let c = color(r, g, b);
    fill(c);
    strokeWeight(0);
    circle(x, y, diameter);

    // Draw arc to show fractional circle
    if (j == 0) {
      let c = color(circleColor.r1[1], circleColor.g1[1], circleColor.b1[1]);
      fill(c);
      fractional = numCirclesLived % 1;
      arc(
        x,
        y,
        diameter,
        diameter,
        PI + HALF_PI,
        fractional * TWO_PI + (PI + HALF_PI)
      );
    }

    x += diameter + margin;

    // If the next circle will go off the screen, move down a row
    if (x > windowWidth - diameter / 2) {
      x = diameter / 2 + margin;
      y += diameter + margin;
    }

    j--;
  }
}

function windowResized() {
  setup();
}

// Algorithm to get the maximum size of n squares that fit into a rectangle with a given width and height
// URL (version: 2017-11-25): https://math.stackexchange.com/q/2536926
function calculateDiameterOfCircle(n, x, y) {
  let sx, sy;

  let px = Math.ceil(Math.sqrt((n * x) / y));
  if (Math.floor((px * y) / x) * px < n) {
    sx = y / Math.ceil((px * y) / x);
  } else {
    sx = x / px;
  }

  let py = Math.ceil(Math.sqrt((n * y) / x));
  if (Math.floor((py * x) / y) * py < n) {
    sy = x / Math.ceil((x * py) / y);
  } else {
    sy = y / py;
  }

  return Math.max(sx, sy);
}

// Gets the difference between a date (birthday) and the current time to calculate age
// Depending on timePeriodSelected, age can be in either years, months, or weeks
function birthdayToNowDifference(date) {
  let now = dayjs();
  return now.diff(date, timePeriodSelected.slice(0, -1), true); // remove 's' from end of string
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r: r, g: g, b: b };
}

function setDocumentStyle(color1, color2) {
  document.documentElement.style.setProperty(
    "--offbar-background-color",
    color1
  );
  document.documentElement.style.setProperty(
    "--canvas-background-color",
    color2
  );
}

function changeTheme(newTheme) {
  if (newTheme == "Custom Theme") {
    setDocumentStyle(offbarBackgroundColor, canvasBackgroundColor);
    let rgb1 = hexToRgb(filledGradient1);
    let rgb2 = hexToRgb(filledGradient2);
    let rgb3 = hexToRgb(unfilledGradient1);
    let rgb4 = hexToRgb(unfilledGradient2);
    circleColor = {
      r1: [rgb1.r, rgb2.r],
      g1: [rgb1.g, rgb2.g],
      b1: [rgb1.b, rgb2.b],
      r2: [rgb3.r, rgb4.r],
      g2: [rgb3.g, rgb4.g],
      b2: [rgb3.b, rgb4.b],
    };
  } else {
    setDocumentStyle(
      THEMES[newTheme]["--offbar-background-color"],
      THEMES[newTheme]["--canvas-background-color"]
    );
    circleColor = THEMES[newTheme]["circleColor"];
  }
}

/***************************************************************************************************************
 ***  Initializers/Listeners  **********************************************************************************
 ***************************************************************************************************************/

function getElem(id) {
  return document.getElementById(id);
}

let expectedAgeInput = getElem("expectedAgeInput");
let bdayInput = getElem("bdayInput");
let themeSelectInput = getElem("themeSelectInput");
let timePeriodInput = getElem("timePeriodInput");

let customThemeFieldset = getElem("customThemeFieldset");
let offbarBackgroundColorInput = getElem("offbarBackgroundColorInput");
let canvasBackgroundColorInput = getElem("canvasBackgroundColorInput");
let filledGradient1Input = getElem("filledGradient1Input");
let filledGradient2Input = getElem("filledGradient2Input");
let unfilledGradient1Input = getElem("unfilledGradient1Input");
let unfilledGradient2Input = getElem("unfilledGradient2Input");

// Initialize date picker to current date
bdayInput.valueAsDate = new Date(birthday);

// Initialize expected age
expectedAgeInput.value = expectedAge;

// Initialize radio buttons
getElem(timePeriodSelected).checked = true;

// Initialize theme selector
themeSelectInput.value = theme;

// Bday picker listener
bdayInput.addEventListener("change", function () {
  birthday = this.value; //ex. "2000-11-13"
  localStorage.setItem("birthday", birthday);
  numCirclesLived = birthdayToNowDifference(birthday);
  setup();
});

// Expected age listener
expectedAgeInput.addEventListener("keyup", function () {
  let input = this.value;
  // Stops app from crashing when expected age is too high
  if (input > 999) {
    input = 999;
    expectedAgeInput.value = input;
  }
  expectedAge = input;
  localStorage.setItem("expectedAge", expectedAge);
  numCircles = expectedAge * dateMultiplier;
  setup();
});

// Radio buttons listener
timePeriodInput.addEventListener("change", function () {
  let newTimePeriod = document.querySelector(
    'input[name="date-format"]:checked'
  ).value;
  timePeriodSelected = newTimePeriod;
  dateMultiplier = TIME_PERIODS[newTimePeriod];
  localStorage.setItem("timePeriodSelected", newTimePeriod);

  // Update circles
  numCirclesLived = birthdayToNowDifference(birthday);
  numCircles = expectedAge * dateMultiplier;
  setup();
});

// Theme selector listener
themeSelectInput.addEventListener("change", function () {
  theme = themeSelectInput.value;
  localStorage.setItem("theme", theme);
  setup();
});

// Initialize custom theme setting
offbarBackgroundColorInput.value = offbarBackgroundColor;
canvasBackgroundColorInput.value = canvasBackgroundColor;
filledGradient1Input.value = filledGradient1;
filledGradient2Input.value = filledGradient2;
unfilledGradient1Input.value = unfilledGradient1;
unfilledGradient2Input.value = unfilledGradient2;

// Custom theme settings listener
customThemeFieldset.addEventListener("change", function () {
  offbarBackgroundColor = offbarBackgroundColorInput.value;
  canvasBackgroundColor = canvasBackgroundColorInput.value;
  filledGradient1 = filledGradient1Input.value;
  filledGradient2 = filledGradient2Input.value;
  unfilledGradient1 = unfilledGradient1Input.value;
  unfilledGradient2 = unfilledGradient2Input.value;
  localStorage.setItem("offbarBackgroundColor", offbarBackgroundColor);
  localStorage.setItem("canvasBackgroundColor", canvasBackgroundColor);
  localStorage.setItem("filledGradient1", filledGradient1);
  localStorage.setItem("filledGradient2", filledGradient2);
  localStorage.setItem("unfilledGradient1", unfilledGradient1);
  localStorage.setItem("unfilledGradient2", unfilledGradient2);
  setup();
});

/***************************************************************************************************************
 ***************************************************************************************************************
 ***************************************************************************************************************/
