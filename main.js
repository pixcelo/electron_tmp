const { app, BrowserView, BrowserWindow, ipcMain, dialog } = require('electron');
const { getExportName, downLoadFile } = require('./modules/helper');
const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');
const csv = require('csvtojson');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
  });

  // ICP handler
  ipcMain.handle('open-dialog', async (_e, _arg) => {
    return dialog
      // show file dialog
      .showOpenDialog(win, {
        properties: ['openFile'],
        title: 'Select csv file',
        filters: [
          { name:'csv', extensions: ['csv']}
        ]
      })
      .then((result) => {
        // if click cancel button
        if (result.canceled) return '';
        // return selected absolute pathname
        return result.filePaths[0];
      });
  });

  ipcMain.handle('make-directory', async (_e, _arg) => {
    const dirName = getExportName() +  '_import';
    if (!fs.existsSync('./download/' + pathName)) {
      return fs
        .mkdirSync('download/' + pathName, { recursive: true }, (err, folder) => {
          if (err) throw err;
          console.log(folder);
        });
    }
  });

  ipcMain.handle('download-file', async (_e, _arg) => {
    const url = 'https://electronjs.org/test.jpg';
    downLoadFile(win, path.resolve('./download/'), 'test.jpg', url);
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

  // Event listener
  ipcMain.on('load-csv-file', (_e, filePath) => {
    const parse = (filePath) => {
      return new Promise((resolve, reject) => {
        let datas = [];
        fs.createReadStream(filePath)
          .pipe(iconv.decodeStream('Shift_JIS'))
          .pipe(iconv.encodeStream('utf-8'))
          .pipe(csv().on('data', data => datas.push(JSON.parse(data))))
          .on('end', () => resolve(datas));
      });
    }

    const csvDataList = [];
    parse(filePath).then((results) => {
      for (const item of results) {
        const obj1 = {
          'id': item['No'],
          'url': item['url1'],
          'name': 'test2.jpg',
        }
        csvDataList.push(obj1);

        const obj2 = {
          'id': item['No'],
          'url': item['url2'],
          'name': 'test2.jpg',
        }
        csvDataList.push(obj2);
      }
    })
    .then((results) => {
      const dirPath = './download/' + getExportName() +  '_import';
      for (const csv of csvDataList) {
        const savePath = path.join(dirPath, csv.id);
        fs.mkdirSync(savePath, { recursive: true });
        console.log('mkdir called', savePath);
        downLoadFile(win, path.resolve(savePath), csv.name, csv.url);
      }
    })
    .catch(function(results) {
      console.log('result:' + results);
    });

  });

  ipcMain.on('close', () => {
    app.quit();
  });

  win.loadFile('index.html');

  // open devTools
  //win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
