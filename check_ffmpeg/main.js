const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src/renderer.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('src/index.html');
}

// Set FFmpeg path
const ffmpegPath = path.join(__dirname, 'ffmpeg', 'ffmpeg.exe');
ffmpeg.setFfmpegPath(ffmpegPath);

app.whenReady().then(() => {
    createWindow();

    // Handle any IPC messages from renderer process here if needed
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});