// circleColor
//    (r1, g1, b1) is gradient for filled circles
//    (r2, g2, b2) is gradient for unfilled circles
const THEMES = {
  "Sky Blue": {
    "--offbar-background-color": "rgb(37, 37, 125)",
    "--canvas-background-color": "rgb(247, 247, 247)",
    circleColor: {
      r1: [0, 70],
      g1: [0, 70],
      b1: [80, 255],
      r2: [180, 220],
      g2: [180, 220],
      b2: [200, 255],
    },
  },
  Silver: {
    "--offbar-background-color": "rgb(50, 50, 50)",
    "--canvas-background-color": "rgb(247, 247, 247)",
    circleColor: {
      r1: [0, 70],
      g1: [0, 70],
      b1: [0, 70],
      r2: [200, 220],
      g2: [200, 220],
      b2: [200, 220],
    },
  },
  "Mine Shaft": {
    "--offbar-background-color": "rgb(20, 20, 20)",
    "--canvas-background-color": "rgb(60, 60, 60)",
    circleColor: {
      r1: [255, 200],
      g1: [255, 200],
      b1: [255, 200],
      r2: [50, 25],
      g2: [50, 25],
      b2: [50, 25],
    },
  },
  Acid: {
    "--offbar-background-color": "rgb(0, 0, 0)",
    "--canvas-background-color": "rgb(0, 0, 0)",
    circleColor: {
      r1: [137, 150],
      g1: [200, 255],
      b1: [0, 0],
      r2: [5, 45],
      g2: [5, 45],
      b2: [0, 0],
    },
  },
  Fireplace: {
    "--offbar-background-color": "rgb(130,20,20)",
    "--canvas-background-color": "rgb(255,100,61)",
    circleColor: {
      r1: [210, 255],
      g1: [210, 255],
      b1: [0, 70],
      r2: [225, 255],
      g2: [123, 143],
      b2: [40, 70],
    },
  },
  "Sweet Purple": {
    "--offbar-background-color": "rgb(80, 30, 136)",
    "--canvas-background-color": "rgb(255,245,245)",
    circleColor: {
      r1: [149, 195],
      g1: [0, 111],
      b1: [255, 255],
      r2: [242, 228],
      g2: [224, 191],
      b2: [255, 255],
    },
  },
};

const TIME_PERIODS = {
  years: 1,
  months: 12,
  weeks: 52,
};

// Keys to be stored in local storage
const LOCAL_STORAGE_KEYS = [
  "expectedAge",
  "timePeriodSelected",
  "birthday",
  "theme",
  "offbarBackgroundColor",
  "canvasBackgroundColor",
  "filledGradient1",
  "filledGradient2",
  "unfilledGradient1",
  "unfilledGradient2",
];

// Default values for each key
const DEFAULTS = {
  expectedAge: 80,
  timePeriodSelected: "years",
  birthday: dayjs(),
  theme: "Sky Blue",
  offbarBackgroundColor: "#111111",
  canvasBackgroundColor: "#f7f7f7",
  filledGradient1: "#000050",
  filledGradient2: "#4646ff",
  unfilledGradient1: "#b4b4c8",
  unfilledGradient2: "#dcdcff",
};
