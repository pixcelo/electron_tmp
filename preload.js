const { contextBridge, ipcRenderer, remote } = require('electron');

// publish as global variable
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('apis', {
    openDialog: async () => ipcRenderer.invoke('open-dialog'),
    openBrowser: async () => ipcRenderer.invoke('open-browser'),
    mkDir: async () => ipcRenderer.invoke('make-directory'),
});
