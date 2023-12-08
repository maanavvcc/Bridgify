// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// Expose functions to the window's global context
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer,
  disconnect: () => ipcRenderer.send('disconnect'),
});
