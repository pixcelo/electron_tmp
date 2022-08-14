const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// const func = async () => {
//     const response = await window.versions.ping()
//     console.log(response);
// }

// func();

// Notification of Renderer process
// const NOTIFICATION_TITLE = 'Title';
// const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.';
// const CLICK_MESSAGE = 'Notification clicked!';

// new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
//   .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE;

// Dialog
const btn = document.getElementById('btn');
const text = document.getElementById('text');
btn.onclick = async () => {
    text.textContent = await window.versions.openDialog();
};
