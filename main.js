const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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

ipcMain.on('openFolder', (event) => {
    dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] })
        .then(result => {
            if (result.filePaths[0]) {
                event.reply('folderSelected', result.filePaths[0]);
            }
        });
})