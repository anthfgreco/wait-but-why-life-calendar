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

function addCircle() {
  circle = document.createElement("div");
  circle.className = "circle";
  circle.style.border = "3px solid #FF0000";
  circlediv = document.getElementById("circle-div");
  document.getElementById("circle-div").appendChild(circle, circlediv);
}

function updateCircles() {
  for (let i = 0; i < 80; i++) {
    addCircle();
  }
  console.log("Screen Width: " + screen.width);
  console.log("Screen Height: " + screen.height);
  console.log("Available Screen Width: " + screen.availWidth);
  console.log("Available Screen Height: " + screen.availHeight);
}

updateCircles();
