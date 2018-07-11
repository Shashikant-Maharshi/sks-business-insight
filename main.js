const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const DB = require('./src/database/db');
const dbOperators = DB();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    //fullscreen: true,
    // width: 800,
    // height: 600,
    width: 1920,
    height: 673,
    show: false,
    icon: path.join(__dirname, 'src/assets/img/shri-krishna.jpg')
  });

  // load the dist folder from Angular
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Open the DevTools optionally:
  mainWindow.webContents.openDevTools();

  ipcMain.on('mainWindowLoaded', () => {
    dbOperators.init(mainWindow, ipcMain);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    dbOperators.closeSequelizeConnetion();
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
