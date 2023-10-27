const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    sendShortcut: (shortcut) => ipcRenderer.send('button-pressed', shortcut),
  });