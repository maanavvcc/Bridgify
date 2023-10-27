const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const robot = require('robotjs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// CONNECTION KEY ENGINE

ipcMain.on('button-pressed', (event, shortcut) => {
    if (shortcut === 'ctrl-c') {
      console.log('CTRL+C pressed');
      // Handle CTRL+C
    } else if (shortcut === 'ctrl-v') {
      console.log('CTRL+V pressed');
      // Handle CTRL+V
    } else if (shortcut === 'windows') {
        console.log('Windows Key pressed');
        robot.keyTap('command');
    }
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
