const { contextBridge, ipcRenderer } = require('electron');

// publish as global variable
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    openDialog: async () => ipcRenderer.invoke('open-dialog'),
});
