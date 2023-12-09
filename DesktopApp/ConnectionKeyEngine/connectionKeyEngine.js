// connectionKeyEngine.js
const { ipcMain } = require("electron");
const robot = require("robotjs");

function setupConnectionKeyEngine() {
  ipcMain.on("button-pressed", (event, shortcut) => {
    if (shortcut === "ctrl-c") {
      console.log("CTRL+C pressed");
      // Handle CTRL+C
    } else if (shortcut === "ctrl-v") {
      console.log("CTRL+V pressed");
      // Handle CTRL+V
    } else if (shortcut === "windows") {
      console.log("Windows Key pressed");
      robot.keyTap("command");
    } else if (shortcut === "openbracket") {
      console.log("Open Bracket pressed");
      robot.keyTap("[");
    } else if (shortcut === "closedbracket") {
      console.log("Closed Bracket pressed");
      robot.keyTap("]");
    }
  });
}

module.exports = { setupConnectionKeyEngine };
