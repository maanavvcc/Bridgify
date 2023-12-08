const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { setupConnectionKeyEngine } = require('./ConnectionKeyEngine/connectionKeyEngine');

let mainWindow;
let connectionKeyEngine; // Store a reference to the connection key engine

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Bridgify Desktop',
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
    disconnect(); // Disconnect on window close
  });
}

function initializeApp() {
  createWindow();

  // Commenting out the setupConnectionKeyEngine line
  // setupConnectionKeyEngine((error, engine) => {
  //   if (error) {
  //     console.error('Error setting up connection key engine:', error);
  //   } else {
  //     connectionKeyEngine = engine;
  //   }
  // });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

ipcMain.on('change-view-shortcuts', () => {
  BrowserWindow.getAllWindows()[0].loadFile('shortcuts.html');
});

ipcMain.on('change-view-disconnect', () => {
  BrowserWindow.getAllWindows()[0].loadFile('index.html');
});

app.whenReady().then(initializeApp);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Add this block to handle disconnect
ipcMain.on('disconnect', () => {
  console.log('Disconnected from the server');
  disconnect();
});

// Function to disconnect the connection
function disconnect() {
  // Commenting out the disconnection logic related to connectionKeyEngine
  // if (connectionKeyEngine) {
  //   connectionKeyEngine.disconnect();
  // }
}
