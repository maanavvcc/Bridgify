// preload.js
const { contextBridge, ipcRenderer } = require("electron");
const { exec } = require("child_process");
const shortcutDBmgr = require("./DataBases/dbManagers/shortcutDBmgr");

// Expose functions to the window's global context
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: ipcRenderer,
  disconnect: () => ipcRenderer.send("disconnect"),
  changeWindow: (newRender) => ipcRenderer.send((channel = newRender)),
  getNames: () => {
    return shortcutDBmgr.getNames();
  },
  addShortcut: (name, desc, type, context) => {
    shortcutDBmgr.addShortcut(name, desc, type, context);
  },
  editShortcut: (id, name, desc, type, context) => {
    shortcutDBmgr.editShortcut(id, name, desc, type, context);
  },
  removeShortcut: (id) => {
    shortcutDBmgr.removeShortcut(id);
  },
  getShortcut: (id) => {
    return shortcutDBmgr.getShortcut(id);
  },
  runScript: (path) => {
    exec('"' + path + '"', (err, stdout, stderr) => {
      if (err) {
        console.log("Error: " + err.message);
        return;
      }
      if (strerr) {
        console.log("Error: " + strerr.message);
        return;
      }
      console.log("stdout: " + stdout);
    });
  },
});
