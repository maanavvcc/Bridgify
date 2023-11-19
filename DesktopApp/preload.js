// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const shortcutDBmgr = require('./DataBases/dbManagers/shortcutDBmgr');


// Expose functions to the window's global context
contextBridge.exposeInMainWorld('electron', {
  sendShortcut: (shortcut) => ipcRenderer.send('button-pressed', shortcut),
  disconnect: () => ipcRenderer.send('disconnect'),
  changeWindow: (newRender) => ipcRenderer.send(channel = newRender),
  getNames: () => { return shortcutDBmgr.getNames() },
});
