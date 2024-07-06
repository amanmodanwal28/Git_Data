const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const exiftool = require('exiftool-vendored').exiftool

const copyFile = promisify(fs.copyFile)

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 200,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('file-selected', async(event, filePath) => {
    const destinationDir = path.join(__dirname, 'file_sharing')
    const fileName = path.basename(filePath)
    const destinationPath = path.join(destinationDir, fileName)

    try {
        // Copy file from original path to destination path
        await copyFile(filePath, destinationPath)

        // Set metadata using exiftool
        await exiftool.write(destinationPath, {
            Title: 'Aman Modanwal',
            Subject: 'amaan',
            Rating: 5,
            XPComment: 'this is a test comment',
            // Add more custom metadata fields as needed
        })

        console.log('Metadata written successfully.')

        // Add additional verification as needed
    } catch (error) {
        console.error('Error processing file:', error)
    }
})