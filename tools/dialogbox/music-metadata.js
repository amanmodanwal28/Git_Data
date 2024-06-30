const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const nodeID3 = require('node-id3')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('file-selected', async(event, filePath) => {
    try {
        // Define destination directory and file path
        const destinationDir = path.join(__dirname, 'file_sharing')
        const fileName = path.basename(filePath)
        const destinationPath = path.join(destinationDir, fileName)

        // Ensure the destination directory exists
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir)
        }

        // Copy file to the destination path
        fs.copyFileSync(filePath, destinationPath)
        console.log(`File copied to ${destinationPath}`)

        // Now read and update metadata of the copied file
        const { parseFile } = await
        import ('music-metadata')

        const metadata = await parseFile(destinationPath)

        // Log the existing metadata (optional)
        console.log('Existing metadata:', metadata)

        // Updating metadata
        const tags = {
            title: 'Aman Modanwal',
        }

        const success = nodeID3.write(tags, destinationPath)
        if (success) {
            console.log('Metadata updated successfully')
        } else {
            console.error('Error updating metadata')
        }
    } catch (error) {
        console.error('Error processing file:', error)
    }
})