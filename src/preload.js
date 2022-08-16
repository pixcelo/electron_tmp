const { contextBridge, ipcRenderer } = require('electron');

// publish as global variable
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('apis', {
    openDialog: async () => ipcRenderer.invoke('open-dialog'),
    openBrowser: async () => ipcRenderer.invoke('open-browser'),
    downloadFile: async () => ipcRenderer.invoke('download-file'),
    //mkDir: async () => ipcRenderer.invoke('make-directory'),
    loadCsvFile: (path) => ipcRenderer.send('load-csv-file', path),
    closeApp: () => ipcRenderer.send('close'),
});
