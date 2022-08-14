const { app, BrowserView, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
  });
  ipcMain.handle('ping', () => 'pong');
  win.loadFile('index.html');

  // open devTools
  win.webContents.openDevTools();

  // work on Main process
  const view = new BrowserView();
  win.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
  view.webContents.loadURL('https://electronjs.org');
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
