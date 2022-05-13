const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const url = require("url");
const path = require("path");
const fs = require('fs');

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
});

ipcMain.on('openExternal', (_event, arg) => {
    shell.openExternal(arg)
});

ipcMain.on('loadNodes', (event, arg) => {
    fs.readdir(arg, { withFileTypes: true }, function (err, nodes) {
        if (err) {
            console.log('Unable to read directory. ' + err);
        }

        let directories = nodes
            .filter(node => node.isDirectory())
            .map(node => {
                var nodePath = path.join(arg, node.name);
                return { name: node.name, path: nodePath, isDirectory: true };
            });
        let files = nodes
            .filter(node => node.isFile())
            .filter(node => !node.name.startsWith('.'))
            .map(node => {
                var nodePath = path.join(arg, node.name);
                return { name: node.name, path: nodePath, isDirectory: false };
            });

        let result = directories.concat(files);
        event.reply('nodesLoaded', result);
    });
});

ipcMain.on('getParentDirectory', (event, arg) => {
    var parent = path.dirname(arg[0]);
    event.returnValue = parent;
});