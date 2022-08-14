const { app, BrowserView, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { getExportName, downLoadFile } = require('./modules/helper');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
  });
  ipcMain.handle('open-dialog', async (_e, _arg) => {
    return dialog
      // show file dialog
      .showOpenDialog(win, {
        properties: ['openFile'],
      })
      .then((result) => {
        // if click cancel button
        if (result.canceled) return '';
        // return selected absolute pathname
        return result.filePaths[0];
      });
  });
  ipcMain.handle('make-directory', async (_e, _arg) => {
    const pathName = 'import_' + getExportName();
    if (!fs.existsSync('./download/' + pathName)) {
      return fs
        .mkdirSync('download/' + pathName, { recursive: true }, (err, folder) => {
          if (err) throw err;
          console.log(folder);
        });
    }
  });
  ipcMain.handle('open-browser', async (_e, _arg) => {
    // work on Main process
    const view = new BrowserView({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      }
    });
    win.setBrowserView(view);
    view.setBounds({ x: 400, y: 400, width: 500, height: 500 });
    view.webContents.loadURL('https://electronjs.org');
  });

  win.loadFile('index.html');

  // open devTools
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
