const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 300,
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

ipcMain.on('confirm-delete', async(event) => {
    const options = {
        type: 'question',
        buttons: ['OK', 'Cancel'],
        defaultId: 1,
        title: 'Confirmation',
        message: 'Are you sure you want to delete the file?',
    }
    const choice = await dialog.showMessageBox(mainWindow, options)
    if (choice.response === 0) {
        event.reply('delete-status', { success: true })
    } else {
        // User clicked Cancel or closed the dialog
        console.log('Delete operation cancelled.')
        event.reply('delete-status', { cancelled: true })
    }
})


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
// const { app, BrowserWindow, ipcMain, dialog } = require('electron')
// const path = require('path')
// const fs = require('fs')

// let mainWindow
// let filePathdata;

// function createWindow() {
//     mainWindow = new BrowserWindow({
//         width: 500,
//         height: 300,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//         },
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

// ipcMain.on('confirm-delete', async(event, filePath) => {
//     const options = {
//         type: 'question',
//         buttons: ['OK', 'Cancel'],
//         defaultId: 1,
//         title: 'Confirmation',
//         message: 'Are you sure you want to delete the file?',
//     }
//     console.log(filePathdata)
//     const choice = await dialog.showMessageBox(mainWindow, options)
//     if (choice.response === 0) {
//         // User clicked OK, perform delete operation
//         console.log('Performing delete operation for file:', filePathdata)
//             // Example: fs.unlink(filePath, (err) => { if (err) throw err; });
//             // Replace the example with your actual delete logic
//         fs.unlink(filePathdata, (err) => {
//             if (err) {
//                 console.error('Error deleting file:', err)
//                 event.reply('delete-status', { success: false, error: err.message })
//             } else {
//                 console.log('File deleted successfully.')
//                 event.reply('delete-status', { success: true })
//             }
//         })
//     } else {
//         // User clicked Cancel or closed the dialog
//         console.log('Delete operation cancelled.')
//         event.reply('delete-status', { cancelled: true })
//     }
// })

// ipcMain.on('file-selected', async(event, filePath) => {
//     console.log("file-selected", filePath)
//     filePathdata = filePath
// })