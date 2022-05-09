const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/tag-files/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

ipcMain.on('req', (event, arg) => {
    console.log(arg)
    event.reply('resp', 'data from main')
})