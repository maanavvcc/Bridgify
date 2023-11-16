// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// Expose functions to the window's global context
contextBridge.exposeInMainWorld('electron', {
  sendShortcut: (shortcut) => ipcRenderer.send('button-pressed', shortcut),
  disconnect: () => ipcRenderer.send('disconnect'),
});
