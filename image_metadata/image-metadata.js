const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const exiftool = require('exiftool-vendored').exiftool

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
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

// Function to process selected file

ipcMain.on('file-selected', async(event, filePath) => {
    const filename = path.basename(filePath)
    const destinationFolder = path.join(__dirname, "file_sharing")
    const destinationPath = path.join(destinationFolder, filename)
    await processSelectedFile(filePath, destinationPath)
})
async function processSelectedFile(inputFilePath, outputFilePath) {

    const originalFilePath = path.join(outputFilePath + '_original')

    try {
        try {
            await fs.promises.access(outputFilePath)
            console.log(`Output file already exists: ${outputFilePath}`)
            return // Skip processing if file exists
        } catch (err) {
            // Output file does not exist, continue with ffmpeg
        }

        // Copy the file to the destination directory
        await fs.promises.copyFile(inputFilePath, outputFilePath)

        // Set metadata using exiftool
        const metadata = {
            Title: 'Aman Modanwal',
            Subject: 'amaan',
            Rating: 5,
            XPComment: 'this is a test comment'
                // Add more custom metadata fields as needed
        }

        // Check if Description field exists, add if not
        const existingMetadata = await exiftool.read(outputFilePath)
        if (!existingMetadata.Description) {
            console.log("not exist description")
            metadata.Description = 'Default description'
        }

        await exiftool.write(outputFilePath, metadata)

        console.log('Metadata written successfully.')

        // Check for and remove the original file if it exists
        if (
            await fs.promises
            .access(originalFilePath)
            .then(() => true)
            .catch(() => false)
        ) {
            await fs.promises.unlink(originalFilePath)
            console.log(`${originalFilePath} has been removed.`)
        } else {
            console.log('No _original file found.')
        }
    } catch (err) {
        console.error(`Error processing image  media file: ${err.message}`)
        throw err // Throw the error to be caught in the calling function
    }
}
// const { app, BrowserWindow, ipcMain } = require('electron')
// const path = require('path')
// const fs = require('fs')

// const exiftool = require('exiftool-vendored').exiftool

// function createWindow() {
//     const mainWindow = new BrowserWindow({
//         width: 300,
//         height: 300,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false
//         }
//     })

//     mainWindow.loadFile('index.html')
// }

// app.whenReady().then(() => {
//     createWindow()

//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) {
//             createWindow()
//         }
//     })
// })

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })

// // Function to process selected file

// ipcMain.on('file-selected', async(event, filePath) => {
//     await processSelectedFile(filePath)
// })
// async function processSelectedFile(filePath) {
//     const destinationDir = path.join(__dirname, 'file_sharing')
//     const fileName = path.basename(filePath)

//     const destinationPath = path.join(destinationDir, fileName)
//     const originalFilePath = path.join(destinationDir, fileName + '_original')
//     console.log(originalFilePath)
//     try {
//         // Ensure destination directory exists
//         try {
//             await fs.promises.mkdir(destinationDir)
//         } catch (error) {
//             if (error.code !== 'EEXIST') throw error
//         }

//         // Copy the file to the destination directory
//         await fs.promises.copyFile(filePath, destinationPath)

//         // Set metadata using exiftool
//         await exiftool.write(destinationPath, {
//             Title: 'Aman Modanwal',
//             Subject: 'amaan',
//             Rating: 5,
//             XPComment: 'this is a test comment',
//             // Add more custom metadata fields as needed
//         })

//         console.log('Metadata written successfully.')

//         // Check for and remove the original file if it exists
//         if (await fs.promises.access(originalFilePath).then(() => true).catch(() => false)) {
//             await fs.promises.unlink(originalFilePath)
//             console.log(`${originalFilePath} has been removed.`)
//         } else {
//             console.log("No _original file found.")
//         }

//         // Add additional verification as needed
//     } catch (error) {
//         console.error('Error processing file:', error)
//     }
// }

// ipcMain.on('file-selected', async(event, filePath) => {
//     const destinationDir = path.join(__dirname, 'file_sharing')
//     const fileName = path.basename(filePath)
//     const destinationPath = path.join(destinationDir, fileName)
//     const originalfileAdd = destinationPath + '_original'

//     try {
//         // Ensure destination directory exists
//         if (!fs.existsSync(destinationDir)) {
//             fs.mkdirSync(destinationDir)
//         }

//         // Copy the file to the destination directory
//         await copyFile(filePath, destinationPath)

//         // Set metadata using exiftool
//         await exiftool.write(destinationPath, {
//             Title: 'Aman Modanwal',
//             Subject: 'amaan',
//             Rating: 5,
//             XPComment: 'this is a test comment'
//                 // Add more custom metadata fields as needed
//         })

//         console.log('Metadata written successfully.')

//         // Check for and remove the original file if it exists
//         if (fs.existsSync(originalfileAdd)) {
//             await unlinkFile(originalfileAdd)
//             console.log(`${originalfileAdd} has been removed.`)
//         } else {
//             console.log("no found")
//         }
//         // Add additional verification as needed
//     } catch (error) {
//         console.error('Error processing file:', error)
//     }
// })