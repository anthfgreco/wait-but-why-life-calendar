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

function calculateCircleDiameter(numCircles) {
  circle_div = document.getElementById("circle-div");
  var divWidth = circle_div.offsetWidth;
  var divHeight = circle_div.offsetHeight;
  return Math.floor(Math.sqrt(divWidth * 0.8 * divHeight / numCircles))
}

function addCircle() {
  circle = document.createElement("div");
  circle.className = "circle";
  var diameter = calculateCircleDiameter(80);
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
  circle_div = document.getElementById("circle-div");
  circle_div.remove();

  new_circle_div = document.createElement("div");
  new_circle_div.id = "circle-div";
  document.getElementById("body").appendChild(new_circle_div);
  updateCircles(80);
}

updateCircles(80);
