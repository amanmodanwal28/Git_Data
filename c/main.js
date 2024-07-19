const electron = require('electron')
const path = require('path')
const fs = require('fs')
const { spawn, exec } = require('child_process')
const { app, BrowserWindow, ipcMain, Menu, dialog } = electron
const xml2js = require('xml2js')

const url = require('url')
const crc = require('crc')
const { performance } = require('perf_hooks')
const ProgressBar = require('electron-progressbar')
const exiftool = require('exiftool-vendored').exiftool
const ffmpegScript = require('./ffmpeg_path') // Adjust the path as necessary
const {
    connection,
    checkIP,
    uploadFile,
    checkRemoteFileExists
} = require('./sftp') // Import functions from sftp.js
const {
    createDatabaseDirectories,
    readXmlFile,
    extractFolderInfo,
    extractField
} = require('./xmlParser')
const {
    processMediaFile,
    processImageFile,
    copyFile,
    writeToFile,
    calculateFileCRC32,
    getFrameRate,
    updateConfigFile,
    imageExtensions,
    videoFileExtensions,
    musicFileExtensions
} = require('./fileAdd')

// Create a new instance of the parser
const parser = new xml2js.Parser({ explicitArray: false })

const directoryPath = './content' // Replace with your folder path
    // Define your music and video file extensions

const musicVideoEXT = [...musicFileExtensions, ...videoFileExtensions]
let SourceFilePath = []
let DestinationFilePath = []

let store
let mainWindow
let activeSelectedIPs = []
let localPath = 'content'
let main_folders = []
let renderIDfromWeb
let local_filepath
let count = 0
let progressBar

async function createMainWindow(ipList) {
    try {
        const { default: Store } = await
        import ('electron-store')
        store = new Store()

        const savedPosition = store.get('windowPosition')
        const { screen } = electron
        const { width, height } = screen.getPrimaryDisplay().workAreaSize
        mainWindow = new BrowserWindow({
            width: 1366,
            height: 768,
            x: savedPosition ? savedPosition.x : (width - 340) / 2,
            y: savedPosition ? savedPosition.y : (height - 400) / 2,
            title: 'PPS',
            icon: path.join(__dirname, 'assets', 'pps_logo.ico'), // Adjust the path as necessary
            alwaysOnTop: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        })
        mainWindow.on('move', () => {
            const [x, y] = mainWindow.getPosition()
            store.set('windowPosition', { x, y })
        })
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.webContents.send('initial-data', { ipList })
        })

        // Load your HTML file from the 'views' folder
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, 'views', 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        )
    } catch (error) {
        console.error('Error in createMainWindow:', error)
    }
}

app.on('ready', async() => {
    try {
        await processXmlData()
        await ffmpegScript.setupFfmpeg()
    } catch (error) {
        console.error('Failed to create main window:', error)
    }
})

async function processXmlData() {
    try {
        const data = await readXmlFile(path.join(__dirname, 'Iot_Config.xml')) // Adjust the path as necessary
        const xml_result = await parser.parseStringPromise(data)
        const dataStructure = xml_result.IOTConfig.DATA_STRUCTURE
        const folderInfo = extractFolderInfo(dataStructure)
        const IPs_promises = xml_result.IOTConfig.Device_list.Ipaddress.map((ip) =>
            checkIP(ip.$.ip, ip.$.aliance_name)
        )
        const IPs_results = await Promise.all(IPs_promises)
        activeIPs = IPs_results.filter(({ status }) => status === 'active').map(
            ({ ip, aliance_name }) => ({ ip, aliance_name })
        )
        const inactiveIPs = IPs_results.filter(
                ({ status }) => status === 'inactive'
            ).map(({ ip, aliance_name }) => ({ ip, aliance_name }))
            // console.log(activeIPs);

        // Extract folder information from DATA_STRUCTURE
        main_folders = extractField(folderInfo, 'folder_name')

        // // Retrieve folders and regularFiles
        // const { folders } = await listFilesAndFolders(directoryPath);

        // console.log(subFolders)

        await createMainWindow(IPs_results)
    } catch (error) {
        console.error('Error processing XML data:', error)
    }
}

ipcMain.on('selected-ips', async(event, selectedIPs) => {
    try {
        console.log('Received selected-ips event with:', selectedIPs)
        activeSelectedIPs = selectedIPs.filter((ip) =>
            activeIPs.some((active) => active.ip === ip)
        )
    } catch (e) {
        console.error('Error connecting to selected IPs:', e)
    }
})

ipcMain.on('create-database', async(event) => {
    count++
    // if (count == '1') {
    try {
        // console.log('Database button clicked');
        // console.log('Database Created ');
        await createDatabaseDirectories()

        const { folders } = await listFilesAndFolders(directoryPath)
        mainWindow.webContents.send('database-created', { folders, count })
        console.log(count)
    } catch (error) {
        console.error('Error creating database:')
    }
    // } else {
    //     console.log("database already created")
    // }
})

async function listFilesAndFolders(directoryPath) {
    try {
        const items = await fs.promises.readdir(directoryPath)
        let folders = []
        let regularFiles = []

        for (const item of items) {
            const fullPath = path.join(directoryPath, item)
            const stats = await fs.promises.stat(fullPath)

            if (stats.isDirectory()) {
                folders.push(item)
            } else {
                regularFiles.push(item)
            }
        }
        return { folders, regularFiles }
    } catch (err) {
        console.error('Error reading directory:', err)
        throw err // Propagate the error upwards
    }
}

ipcMain.on('selected-folder', async(event, folderName, renderID) => {
    try {
        const folderPath = path.join(directoryPath, folderName)
        localPath = folderPath
        renderIDfromWeb = renderID
        console.log('Selected folderName:', folderPath)
        const { folders, regularFiles } = await listFilesAndFolders(folderPath)
        event.sender.send('folder-contents', { folders, regularFiles })
            // Send localPath to renderer process
        event.sender.send('local-path', folderPath)
    } catch (e) {
        console.error('Error listing folders:', e)
    }
})

ipcMain.on('selected-subfolder', async(event, subfolderPath, renderID) => {
    try {
        const SubfolderPath = path.join(directoryPath, subfolderPath)
        localPath = SubfolderPath
        renderIDfromWeb = renderID
        console.log('selected SubfolderPath ', SubfolderPath)
        const { folders, regularFiles } = await listFilesAndFolders(SubfolderPath)
        event.sender.send('subfolder-contents', { folders, regularFiles })
            // Send localPath to renderer process
        event.sender.send('local-path', SubfolderPath)
    } catch (e) {
        console.error('Error listing subfolders:', e)
    }
})

// Handle 'selected-subsubfolder' event from renderer process
ipcMain.on(
    'selected-subsubfolder',
    async(event, subsubfolderPath, renderID) => {
        try {
            const SubsubfolderPath = path.join(directoryPath, subsubfolderPath)
            localPath = SubsubfolderPath
            renderIDfromWeb = renderID
            console.log('Selected Sub-Subfolder :', SubsubfolderPath)
                // List files and folders in the selected sub-subfolder path
            const { folders, regularFiles } = await listFilesAndFolders(
                    SubsubfolderPath
                )
                // Send the list of files back to the renderer process
            event.sender.send('subsubfolder-files', { folders, regularFiles })
                // Send localPath to renderer process
            event.sender.send('local-path', SubsubfolderPath)
        } catch (e) {
            console.error('Error listing files in sub-subfolder:', e)
        }
    }
)

ipcMain.on('refresh-folder-fileList', async(event, selectedfilePathDir) => {
    try {
        // console.log(renderIDfromWeb)
        const { folders, regularFiles } = await listFilesAndFolders(
                selectedfilePathDir
            ) // Use the new function
        event.sender.send(renderIDfromWeb, { folders, regularFiles })
            // console.log('refresh-folder-fileList')
    } catch (error) {
        console.error('Error refreshing folder contents:', error)
            // Handle error appropriately (send error to renderer process or log)
    }
})

ipcMain.on('upload-files', async(event, { filePaths }) => {
    try {
        let SourceFilePath = []
        let DestinationFilePath = []
        console.log('Received file upload request:', filePaths)
        const destinationFolder = localPath // Ensure `localPath` is defined
        const filesToWrite = []
        let extension
        let ExtensionNotMatch = false
        let ExtensionNotSupport = []
            // Initialize progress bar
        progressBar = new ProgressBar({
            title: 'Adding Files',
            text: 'Initializing...',
            detail: 'Starting Add...',
            indeterminate: false,
            alwaysOnTop: true,
            closeOnComplete: false,
            maxValue: 100,
            style: {
                // the keys are all elements of the progress bar
                text: {
                    // pair of CSS properties/values
                    color: '#contextIsolation',
                    'font-Size': '14px'
                },
                detail: {
                    color: '#000000',
                    'font-Size': '16px'
                },
                bar: {
                    background: '#ffffff',
                    height: 10,
                    width: 50
                },
                value: {
                    background: '#059212'
                }
            },
            browserWindow: {
                width: 500,
                height: 200,
                minimizable: true,
                resizable: false,
                maximizable: true,
                closable: true,
                icon: './assets/pps_logo.ico', // path to the icon file
                backgroundColor: '#FAF6F0'
            }
        })

        progressBar
            .on('completed', () => {
                progressBar.detail = 'File adding...'
                console.log('Upload complete')
            })
            .on('aborted', () => {
                console.warn('Upload aborted')
                aborted = true // Set aborted flag
            })

        // Process each file
        for (let index = 0; index < filePaths.length; index++) {
            const filePath = filePaths[index]
            let filename = path.basename(filePath)
            extension = path.extname(filename).toLowerCase().slice(1)

            let destinationPath = path.join(destinationFolder, filename)

            // Skip certain video file extensions
            if (
                [
                    'webm',
                    'wmv',
                    'ogv',
                    'flv',
                    'alac',
                    'svg',
                    'webp',
                    'psd',
                    'bmp',
                    'ico'
                ].includes(extension)
            ) {
                ExtensionNotSupport.push(extension)
                console.log(`Skipping file with extension: ${extension}`)

                ExtensionNotMatch = true
                continue // Skip processing for this file
            }

            // Measure start time before processing each file
            const start = performance.now()

            // Adjust file extensions based on type
            if (videoFileExtensions.includes(extension)) {
                destinationPath = path.join(
                    destinationFolder,
                    filename.replace(path.extname(filename), '.mp4')
                )
            } else if (musicFileExtensions.includes(extension)) {
                destinationPath = path.join(
                    destinationFolder,
                    filename.replace(path.extname(filename), '.mp3')
                )
            } else {
                destinationPath = path.join(destinationFolder, filename)
            }

            SourceFilePath.push(filePath)
            DestinationFilePath.push(destinationPath)

            // Check if destination file already exists
            try {
                await fs.promises.access(destinationPath)
                console.log(`File already exists: ${destinationPath}`)
                continue // Skip processing if file exists
            } catch {
                console.log(`File does not exist, processing: ${destinationPath}`)
                    // Process file based on type
                    // Determine file processing based on type
                checkFileSize(SourceFilePath, DestinationFilePath)

                let processFilePromise
                if (musicVideoEXT.some((ext) => filePath.toLowerCase().endsWith(ext))) {
                    processFilePromise = processMediaFile(filePath, destinationPath)
                } else if (
                    imageExtensions.some((ext) => filePath.toLowerCase().endsWith(ext))
                ) {
                    processFilePromise = processImageFile(filePath, destinationPath)
                } else {
                    processFilePromise = copyFile(filePath, destinationPath)
                }

                // Run file processing and CRC32 calculation sequentially
                try {
                    await processFilePromise
                    const crc32 = await calculateFileCRC32(destinationPath)
                    console.log(crc32)
                    filesToWrite.push({ destinationPath, crc32 })
                } catch (err) {
                    console.error('Error processing file or calculating CRC32:', err)
                    throw err // Propagate error to outer catch block
                }
            }

            // Calculate and log elapsed time
            const end = performance.now()
            const elapsed = Math.floor((end - start) / 1000)
                // console.log(`File processing took ${elapsed} seconds`);
        }

        if (filesToWrite.length > 0) {
            await writeToFile(filesToWrite, destinationFolder)
        } else {
            console.log('All files already exist, skipping write to CONFIG.SYS')
        }

        event.sender.send('files-uploaded-now-reload', {
            filePaths: filePaths.map((fp) =>
                path.join(destinationFolder, path.basename(fp))
            )
        })

        if (ExtensionNotMatch) {
            event.sender.send(
                'alert',
                `File with extension:  (${ExtensionNotSupport}) is not supported`
            )
        }
        progressBar.close() // Close progress bar
    } catch (error) {
        console.error('Error uploading files:', error)
    }
})

async function checkFileSize(filepaths, destination) {
    let totalFileSize = 0
    let totalDestSize = 0

    let progressTotalDestSize = 0
        // Calculate total size of all filepaths
    for (const filepath of filepaths) {
        try {
            const stats = await fs.promises.stat(filepath)
            totalFileSize += stats.size
        } catch (err) {
            console.error(`Error getting size of file ${filepath}:`, err)
        }
    }
    // console.log(`Total size of all filepaths: ${totalFileSize} bytes`)
    // Update progress bar

    for (let i = 0; i < filepaths.length; i++) {
        const filepath = filepaths[i]
        const destPath = destination[i]
        let count = 0
            // Wait until destination file exists
        while (true) {
            try {
                await fs.promises.access(destPath)
                break
            } catch (err) {
                // console.log(`Destination file ${destPath} does not exist yet, waiting...`)
                await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for 1 second before checking again
            }
        }

        // Once destination file exists, check sizes
        while (true) {
            progressTotalDestSize = 0
            try {
                const [fileStats, destStats] = await Promise.all([
                    fs.promises.stat(filepath),
                    fs.promises.stat(destPath)
                ])

                const sizeDifference = Math.abs(destStats.size - fileStats.size)
                const percentageDifference = (sizeDifference / fileStats.size) * 100

                if (
                    percentageDifference < 5 // Allow up to 5% difference for large files
                ) {
                    totalDestSize += destStats.size
                        // console.log(`File size of ${filepath}: ${fileStats.size} bytes`)
                        // console.log(
                        //     `Destination size of ${destPath}: ${destStats.size} bytes`
                        // )

                    break // Break out of the loop once size matches or is close enough
                } else {
                    progressTotalDestSize += destStats.size + totalDestSize
                        // console.log(`Destination file size ${destStats.size} does not match or is not close enough to ${fileStats.size} waiting...`)
                        // console.log(
                        //     `Total Destination file size ${progressTotalDestSize} does not match or is not close enough to ${totalFileSize}, waiting...`
                        // )
                    progressBar.value = (progressTotalDestSize / totalFileSize) * 100 // Update progress value
                    progressBar.detail = `${Math.floor(
            (progressTotalDestSize / totalFileSize) * 100
          )}% Complete`
                    progressBar.text = `Adding file: ${path.basename(filepath)}`
                }
            } catch (err) {
                // console.error(`Error getting size of file ${filepath} or destination ${destPath}:`, err)
                break
            }

            await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for 1 second before checking again
        }
    }

    // console.log(`Total size of all filepaths: ${totalFileSize} bytes`)
    // console.log(`Total size of all destination paths: ${totalDestSize} bytes`)
}

ipcMain.on('uploadButton-sending-request', async(event) => {
    console.log('hello upload button')
    let local
    let remote
    try {
        const paths = await readConfigFile()
            // console.log('Local Path:', paths.localPath)
            // console.log('Remote Path:', paths.remotePath)
            // console.log('Text File Size:', paths.textFileSize)
        console.log('Text CRC:', paths.textCrc)

        let size
        let expectedCrc

        if (activeSelectedIPs.length === 0) {
            event.sender.send('alert', `Please choose an IP for file transfer.`)
            return
        }
        let crcMismatchFound = false;

        const uploadTasks = activeSelectedIPs.map(async(ip) => {
            try {
                const conn = await connection(ip)
                const sftp = await new Promise((resolve, reject) => {
                    conn.sftp((err, sftp) => {
                        if (err) {
                            conn.end()
                            reject(err)
                        } else {
                            resolve(sftp)
                        }
                    })
                })

                for (let i = 0; i < paths.localPath.length; i++) {
                    try {
                        let local = paths.localPath[i]
                        let remote = '/usr/share/apache2/htdocs' + paths.remotePath[i]
                        let size = paths.textFileSize[i]
                        let expectedCrc = paths.textCrc[i]

                        // Calculate CRC32 of the local file
                        const localCrc = await calculateFileCRC32(local)
                        console.log(`Local CRC32 for ${local}: ${localCrc}`)
                        console.log(`Expected CRC32: ${expectedCrc}`)

                        const exists = await checkRemoteFileExists(sftp, remote)
                        if (!exists) {
                            if (localCrc === expectedCrc) {
                                await uploadFile(sftp, local, remote)
                                console.log(`File successfully uploaded to ${ip} from ${local} to ${remote}`)
                            } else {
                                console.log(`CRC mismatch for ${local}. Expected ${expectedCrc}, got ${localCrc}. Skipping upload.`)
                                crcMismatchFound = true
                            }
                        } else {
                            console.log(`File already exists on ${ip} at ${remote}, skipping upload.`)
                        }

                    } catch (err) {
                        console.error(`Error uploading file to ${ip} from ${local} to ${remote}:`, err)
                    }
                }
                conn.end()
            } catch (err) {
                console.error(`Error with connection or file transfer to ${ip}:`, err)
            }
        })
        await Promise.all(uploadTasks)

        if (crcMismatchFound) {
            event.sender.send('alert', 'Error code 12345')
        }


        activeSelectedIPs = []
    } catch (err) {
        console.error('Error:', err)
    }
})

async function readConfigFile() {
    try {
        const data = await fs.promises.readFile('./CONFIG.SYS', {
            encoding: 'utf8'
        })
        const lines = data.split('\n')
        let localPath = []
        let remotePath = []
        let textFileSize = []
        let textCrc = []

        lines.forEach((line) => {
            const parts = line.match(/^([A-F0-9]{8})\s+(\d+)\s+(.*)$/)
            if (parts && parts.length === 4) {
                const filename = parts[3].trim()
                const crc = parts[1]
                const size = parts[2]
                if (!localPath.includes(filename)) {
                    localPath.push(filename)
                    remotePath.push(filename)
                    textFileSize.push(size)
                    textCrc.push(crc)
                }
            }
        })

        localPath = localPath
            .filter((path) => path !== 'FILENAME')
            .map((path) => (path.startsWith('/') ? path.substring(1) : path))

        remotePath = remotePath
            .filter((path) => path !== 'FILENAME')
            .map((path) => {
                const parts = path.split('/')
                const lowercaseParts = parts.map((part, index) => {
                    return index === parts.length - 1 ? part : part.toLowerCase()
                })
                return lowercaseParts.join('/')
            })

        return { localPath, remotePath, textFileSize, textCrc } // Return both arrays as an object
    } catch (err) {
        console.error('Error reading or processing CONFIG.SYS:', err)
        throw err // Re-throw the error to be handled by the caller
    }
}



ipcMain.on('delete-request', async(event, filePaths) => {
    try {
        // console.log('renderIDfromWeb =>', renderIDfromWeb)
        for (let filename of filePaths) {
            console.log('Deleting file:', filename)
            await fs.promises.unlink(filename)
                // console.log('File deleted successfully:', filename)
        }

        await updateConfigFile(filePaths)

        event.reply('delete-response', {
            success: true,
            message: 'All files deleted successfully'
        })

        event.sender.send('files-uploaded-now-reload', {
            filePaths: filePaths.map((fp) => path.join(localPath, path.basename(fp)))
        })
    } catch (error) {
        console.error('Error deleting file:', error.message)
        event.reply('delete-response', {
            success: false,
            message: 'Error deleting file: ' + error.message
        })
    }
})




ipcMain.on('confirm-delete', async(event) => {
    const options = {
        type: 'question',
        buttons: ['OK', 'Cancel'],
        defaultId: 1,
        title: 'Confirmation',
        message: 'Are you sure you want to delete the file?'
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