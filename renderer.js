// Login
const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', async () => {
    await window.apis.openBrowser();
});

// Browse
const btnLoad = document.getElementById('btnLoad');
const uploadFile = document.getElementById('uploadFile');
btnLoad.addEventListener('click', async () => {
    uploadFile.value = await window.apis.openDialog();
});

// Run
const btnRun = document.getElementById('btnRun');
btnRun.addEventListener('click', async () => {
    window.apis.loadCsvFile(uploadFile.value);
});

// Exit
const btnExit = document.getElementById('btnExit');
btnExit.addEventListener('click', async () => {
    await window.apis.closeApp();
});

// Download test
const btnTest = document.getElementById('btnTest');
btnTest.addEventListener('click', async () => {
    await window.apis.downloadFile();
});
