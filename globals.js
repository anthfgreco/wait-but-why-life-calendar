const THEMES = {
  "Sky Blue": {
    "--offbar-background-color": "#25257D",
    "--canvas-background-color": "#F7F7F7",
    filledGradientStart: "#000050",
    filledGradientEnd: "#4646FF",
    unfilledGradientStart: "#B4B4C8",
    unfilledGradientEnd: "#DCDCFF",
  },
  Silver: {
    "--offbar-background-color": "#323232",
    "--canvas-background-color": "#F7F7F7",
    filledGradientStart: "#000000",
    filledGradientEnd: "#464646",
    unfilledGradientStart: "#c8c8c8",
    unfilledGradientEnd: "#dcdcdc",
  },
  "Mine Shaft": {
    "--offbar-background-color": "#141414",
    "--canvas-background-color": "#3C3C3C",
    filledGradientStart: "#ffffff",
    filledGradientEnd: "#c8c8c8",
    unfilledGradientStart: "#323232",
    unfilledGradientEnd: "#191919",
  },
  Acid: {
    "--offbar-background-color": "#000000",
    "--canvas-background-color": "#000000",
    filledGradientStart: "#89c800",
    filledGradientEnd: "#96ff00",
    unfilledGradientStart: "#050500",
    unfilledGradientEnd: "#2d2d00",
  },
  Fireplace: {
    "--offbar-background-color": "#821414",
    "--canvas-background-color": "#FF643D",
    filledGradientStart: "#d2d200",
    filledGradientEnd: "#ffff46",
    unfilledGradientStart: "#e17b28",
    unfilledGradientEnd: "#ff8f46",
  },
  "Sweet Purple": {
    "--offbar-background-color": "#501E88",
    "--canvas-background-color": "#FFF5F5",
    filledGradientStart: "#9500ff",
    filledGradientEnd: "#c36fff",
    unfilledGradientStart: "#f2e0ff",
    unfilledGradientEnd: "#e4bfff",
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
  "themeName",
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
  themeName: "Sky Blue",
  offbarBackgroundColor: "#111111",
  canvasBackgroundColor: "#f7f7f7",
  filledGradient1: "#000050",
  filledGradient2: "#4646ff",
  unfilledGradient1: "#b4b4c8",
  unfilledGradient2: "#dcdcff",
};
