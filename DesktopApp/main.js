const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const { setupConnectionKeyEngine } = require('./ConnectionKeyEngine/connectionKeyEngine');

let mainWindow;
let connectionKeyEngine; // Store a reference to the connection key engine

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');

  ipcMain.on('upload-file', async (event, filePath, name) => {
    try {
      const fileData = fs.readFileSync(filePath);
      const formData = new FormData();
  
      // Convert Buffer to Blob
      const blob = new Blob([fileData], { type: 'application/octet-stream' });
  
      // Append the file to FormData
      formData.append('file', blob, name);
  
      // Use fetch API for the HTTP request
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        event.reply('file-uploaded', 'File uploaded successfully');
      } else {
        throw new Error(`Failed to upload file. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
      event.reply('file-upload-error', 'Error uploading file');
    }
  });

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
