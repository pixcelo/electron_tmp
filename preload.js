const { contextBridge, ipcRenderer, remote } = require('electron');

// publish as global variable
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('apis', {
    openDialog: async () => ipcRenderer.invoke('open-dialog'),
    mkDir: async () => ipcRenderer.invoke('make-directory'),
});
