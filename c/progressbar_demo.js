const { app, BrowserWindow } = require('electron')
const ProgressBar = require('electron-progressbar')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadFile('index.html')

    // Create a determinate progress bar instance
    const progressBar = new ProgressBar({
        text: 'Loading...',
        detail: 'Preparing the app...',
        browserWindow: {
            webPreferences: {
                nodeIntegration: true
            },
            parent: mainWindow,
            modal: true
        },
        // Make sure to set indeterminate to false for a determinate progress bar
        indeterminate: false
    })

    // Simulate progress
    let currentValue = 0
    const interval = setInterval(() => {
        currentValue += 1
        progressBar.value = currentValue

        if (currentValue >= 100) {
            clearInterval(interval)
            progressBar.setCompleted()
            mainWindow.show()
        }
    }, 50)

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)
    // Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})