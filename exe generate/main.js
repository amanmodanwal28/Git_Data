const electron = require('electron')
const path = require('path')
const fs = require('fs')
const { spawn, exec } = require('child_process')
const { app, BrowserWindow, ipcMain, Menu, dialog, screen } = electron
const xml2js = require('xml2js')
const url = require('url')
const crc = require('crc')
const ProgressBar = require('electron-progressbar')
const exiftool = require('exiftool-vendored').exiftool
const { setupFfmpeg } = require('./ffmpeg_path') // Adjust the path as necessary
const logger = require('./logger')
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
    getMainPath,
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
const { createFileIfNotExists } = require('./generateXmlFile')

const { checkPathsSync } = require('./pathExistVerify')
    // Create a new instance of the parser
const parser = new xml2js.Parser({ explicitArray: false })

let CreateMainFolder
let directoryPath = String(CreateMainFolder) // Replace with your folder path
    // Define your music and video file extensions

const musicVideoEXT = [...musicFileExtensions, ...videoFileExtensions]
let SourceFilePath = []
let DestinationFilePath = []
let store
let mainWindow
let activeSelectedIPs = []
let localPath = 'content'
let renderIDfromWeb
let activeIPs = []
let count = 0
let progressBar

// Get the path to the installation directory
let installationPath = path.dirname(process.execPath)
    // Path to config.xml
let xmlFilePath = path.join(
        installationPath,
        'resources',
        'resources',
        'Iot_Config.xml'
    ) // Adjust the file path as needed
let sourceFfmpegDir = path.join(
    installationPath,
    'resources',
    'resources',
    'ffmpeg'
)
async function createMainWindow(ipList) {
    try {
        const { default: Store } = await
        import ('electron-store')
        store = new Store()

        const savedPosition = store.get('windowPosition')
        const savedSize = store.get('windowSize')
            // console.log(savedPosition, savedSize)
        const primaryDisplay = screen.getPrimaryDisplay()
        let { width, height } = primaryDisplay.workAreaSize

        mainWindow = new BrowserWindow({
                width: savedSize ? savedSize.width : 1366,
                height: savedSize ? savedSize.height : 768,
                x: savedPosition ? savedPosition.x : (width - 340) / 2,
                y: savedPosition ? savedPosition.y : (height - 400) / 2,
                title: 'PT Tool',
                icon: path.join(__dirname, 'assets', 'pt_logo.ico'), // Adjust the path as necessary
                alwaysOnTop: true,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            })
            // Listen for the 'move' event
        mainWindow.on('move', () => {
            const [x, y] = mainWindow.getPosition()
            store.set('windowPosition', { x, y })
                // console.log(x, y)
        })

        // Listen for the 'resize' event
        mainWindow.on('resize', () => {
                const bounds = mainWindow.getBounds()
                const { width, height } = bounds // Destructure the object correctly
                // console.log(`Window resized to ${width}x${height}`)
                store.set('windowSize', { width, height })
                    // Perform other actions based on the new size
            })
            // Set the main window to always stay on top
        mainWindow.setAlwaysOnTop(true)

        mainWindow.webContents.on('did-finish-load', () => {
                mainWindow.webContents.send('initial-data', { ipList })
            })
            // Set the main menu bar hidden to always

        const isMac = process.platform === 'darwin'
        const template = [
            // { role: 'appMenu' }
            ...(isMac ? [{
                label: app.name,
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }] : []),
            // { role: 'fileMenu' }
            {
                label: 'File',
                submenu: [{
                        label: 'New',
                        click: async() => {
                            try {
                                // Prompt the user to select a location and specify a folder name
                                const { canceled, filePath } = await dialog.showSaveDialog(
                                    mainWindow, {
                                        title: 'Select location to create new folder',
                                        buttonLabel: 'Create Folder',
                                        properties: ['createDirectory']
                                    }
                                )

                                // Reassign filePath to FolderPath for clarity
                                CreateMainFolder = filePath

                                if (!canceled && CreateMainFolder) {
                                    fs.mkdir(
                                        CreateMainFolder, { recursive: true },
                                        async(err) => {
                                            if (err) {
                                                logger.error(`Failed to create folder:, ${err}`)
                                            } else {
                                                logger.info(
                                                    `New folder created at: ${CreateMainFolder}`
                                                )
                                                getMainPath(CreateMainFolder)
                                                await createDatabaseDirectories(CreateMainFolder)
                                                mainWindow.webContents.send(
                                                    'create-database-Dir',
                                                    CreateMainFolder
                                                )
                                            }
                                        }
                                    )
                                }
                            } catch (err) {
                                logger.error('Error during folder creation: %o', err)
                            }
                        }
                    },
                    {
                        label: 'Open',
                        click: async() => {
                            mainWindow.webContents.send('click-database-button')
                        }
                    },
                    { type: 'separator' },
                    isMac ? { role: 'close' } : { role: 'quit' }
                ]
            }
            // {
            //     label: 'View',
            //     submenu: [{
            //             label: 'Toggle Developer Tools',
            //             accelerator: isMac ? 'Command+I' : 'Ctrl+I',
            //             click: () => {
            //                 mainWindow.webContents.toggleDevTools()
            //             }
            //         },
            //         {
            //             label: 'Refresh',
            //             accelerator: isMac ? 'Command+R' : 'Ctrl+R',
            //             click: () => {
            //                 mainWindow.reload()
            //             }
            //         }
            //     ]
            // }
        ]

        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)

        // Load your HTML file from the 'views' folder
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, 'views', 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        )
    } catch (error) {
        // console.error('Error in createMainWindow:', error)
        logger.error(`Error in createMainWindow: %o, ${error}`)
    }
}

app.on('ready', async() => {
    try {
        const paths = checkPathsSync(xmlFilePath, sourceFfmpegDir)
        xmlFilePath = paths.xmlFilePath
        sourceFfmpegDir = paths.sourceFfmpegDir
            // Get the path to the installation directory
        installationPath = path.dirname(process.execPath)
            // Path to config.xml
            // xmlFilePath = path.join(installationPath, 'resources', 'Iot_Config.xml')
            // sourceFfmpegDir = path.join(installationPath, 'resources', 'ffmpeg')
        await createFileIfNotExists(xmlFilePath)
        await processXmlData()
        await setupFfmpeg(sourceFfmpegDir)
    } catch (error) {
        logger.error(`Failed to create main window: %o, ${error}`)
    }
})

// Example error handling
process.on('uncaughtException', (error) => {
    console.log(error)
    logger.error(`Uncaught Exception:, ${error}`)
})

process.on('unhandledRejection', (reason, promise) => {
    let reasonMessage = ''
    if (reason instanceof Error) {
        reasonMessage = `${reason.message}\n${reason.stack}`
    } else {
        reasonMessage = JSON.stringify(reason)
    }

    logger.error({
        level: 'error',
        message: 'Unhandled Rejection at:',
        promise: promise.toString(),
        reason: reasonMessage,
        service: 'user-service',
        timestamp: new Date().toISOString()
    })
})
new Promise((resolve, reject) => {
    reject(new Error('Simulated error'))
})

async function processXmlData() {
    try {
        const data = await readXmlFile(xmlFilePath) // Adjust the path as necessary
        const xml_result = await parser.parseStringPromise(data)
        const dataStructure = xml_result.IOTConfig.DATA_STRUCTURE
        const folderInfo = extractFolderInfo(dataStructure)
        const IPs_promises = xml_result.IOTConfig.Device_list.Ipaddress.map((ip) =>
            checkIP(ip.$.ip, ip.$.aliance_name)
        )
        let IPs_results = await getIPsStatus(xml_result)

        // Extract folder information from DATA_STRUCTURE
        main_folders = extractField(folderInfo, 'folder_name')

        // // Retrieve folders and regularFiles
        // const { folders } = await listFilesAndFolders(directoryPath);

        // console.log(subFolders)

        await createMainWindow(IPs_results)
            // Start checking the status of active IPs every 5 seconds
        setInterval(async() => {
            IPs_results = await getIPsStatus(xml_result)
            mainWindow.webContents.send('update-ip-status', { IPs_results })
                // console.log('Updated IP Status:', IPs_results)
                // You can update the UI or perform other actions with the updated IPs_results here
        }, 15000)
    } catch (error) {
        logger.error('Error processing98 XML data:', error)
    }
}

async function getIPsStatus(xml_result) {
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
        // console.log('Active IPs:', activeIPs);
        // console.log('Inactive IPs:', inactiveIPs);

    return IPs_results
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

ipcMain.handle('choose-contentdir', async() => {
    try {
        const result = await dialog.showOpenDialog(mainWindow, {
            title: 'Select a folder',
            properties: ['openDirectory']
        })
        return result
    } catch (err) {
        console.error('Error opening folder selection dialog:', err)
        throw err
    }
})

async function create_Database(event, DatabaseFolder) {
    count++

    try {
        CreateMainFolder = DatabaseFolder
        getMainPath(CreateMainFolder)
        selectedfilePathDir = CreateMainFolder

        console.log('Database open ', CreateMainFolder)

        // Paths for all folders and INDEX.SYS
        const folderPaths = main_folders.map((folder) =>
            path.join(CreateMainFolder, folder)
        )
        const indexFilePath = path.join(CreateMainFolder, 'INDEX.SYS')

        // Check if all folders and the INDEX.SYS file exist
        const checks = await Promise.all([
            ...folderPaths.map(
                (folderPath) =>
                new Promise((resolve) => {
                    fs.access(folderPath, (err) => {
                        if (err) {
                            // console.log(`Folder missing: ${folderPath}`)
                            resolve(false) // Resolve with false if folder is missing
                        } else {
                            // console.log(`Folder exists: ${folderPath}`)
                            resolve(true) // Resolve with true if folder exists
                        }
                    })
                })
            ),
            new Promise((resolve) => {
                fs.access(indexFilePath, (err) => {
                    if (err) {
                        console.log(`File missing: ${indexFilePath}`)
                        resolve(false) // Resolve with false if file is missing
                    } else {
                        // console.log(`File exists: ${indexFilePath}`)
                        resolve(true) // Resolve with true if file exists
                    }
                })
            })
        ])

        // Extract results from checks
        const folderChecks = checks.slice(0, main_folders.length)
        const indexFileExists = checks[main_folders.length]
            // Check if all folders exist
        const allFoldersExist = folderChecks.every((exists) => exists)
        const allConditionsMet = allFoldersExist && indexFileExists

        // console.log('All folders exist:', allFoldersExist)
        // console.log('INDEX.SYS exists:', indexFileExists)

        if (allConditionsMet) {
            // Proceed to list files and folders if all folders and the file exist
            event.sender.send('local-path', path.basename(CreateMainFolder))

            const { folders } = await listFilesAndFolders(CreateMainFolder)
            mainWindow.webContents.send('database-created', {
                folders,
                count,
                CreateMainFolder
            })

            event.sender.send('choose-mainfolder-update', CreateMainFolder)

            // console.log('Folders listed:', folders)
        } else {
            // Show dialog if any folder or the file is missing
            dialog.showMessageBox(mainWindow, {
                    type: 'error',
                    title: 'Path Error',
                    message: 'Wrong DataBase Select.',
                    buttons: ['OK'],
                    alwaysOnTop: true
                })
                //  window reload
            mainWindow.reload()
            console.log(
                'One or more required directories or INDEX.SYS file are missing in the database folder.'
            )
        }

        console.log(count)
    } catch (error) {
        console.error('Error creating database:', error)
    }
}

ipcMain.on('create-database', async(event, DatabaseFolder) => {
    console.log('Database Folder Path', DatabaseFolder)
    await create_Database(event, DatabaseFolder)
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
        // console.log(CreateMainFolder)
        // console.log(folderName)
        // console.log(renderID)
        const folderPath = path.join(CreateMainFolder, folderName)

        const BrowserolderPath = path.join(
            path.basename(CreateMainFolder),
            folderName
        )
        localPath = folderPath
        renderIDfromWeb = renderID
        console.log('Selected folderName:', folderPath)
        const { folders, regularFiles } = await listFilesAndFolders(folderPath)
        event.sender.send('folder-contents', { folders, regularFiles })
            // Send localPath to renderer process
        event.sender.send('local-path', BrowserolderPath)
    } catch (e) {
        console.error('Error listing folders:', e)
    }
})

ipcMain.on('selected-subfolder', async(event, subfolderPath, renderID) => {
    try {
        const SubfolderPath = path.join(CreateMainFolder, subfolderPath)
        const BrowserSubfolderPath = path.join(
            path.basename(CreateMainFolder),
            subfolderPath
        )
        localPath = SubfolderPath
        renderIDfromWeb = renderID
        console.log('selected SubfolderPath ', SubfolderPath)
        const { folders, regularFiles } = await listFilesAndFolders(SubfolderPath)
        event.sender.send('subfolder-contents', { folders, regularFiles })
            // Send localPath to renderer process
        event.sender.send('local-path', BrowserSubfolderPath)
    } catch (e) {
        console.error('Error listing subfolders:', e)
    }
})

// Handle 'selected-subsubfolder' event from renderer process
ipcMain.on(
    'selected-subsubfolder',
    async(event, subsubfolderPath, renderID) => {
        try {
            const SubsubfolderPath = path.join(CreateMainFolder, subsubfolderPath)
            const BrowserSubsubfolderPath = path.join(
                path.basename(CreateMainFolder),
                subsubfolderPath
            )
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
            event.sender.send('local-path', BrowserSubsubfolderPath)
        } catch (e) {
            console.error('Error listing files in sub-subfolder:', e)
        }
    }
)

ipcMain.on('refresh-folder-fileList', async(event, selectedfilePathDir) => {
    try {
        console.log(renderIDfromWeb)
        let RefreshfilePathDir = path.join(
            path.dirname(CreateMainFolder),
            selectedfilePathDir
        )
        const { folders, regularFiles } = await listFilesAndFolders(
                RefreshfilePathDir
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
        SourceFilePath = []
        DestinationFilePath = []
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
                text: {
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
                closable: true,
                parent: mainWindow,
                modal: false,
                alwaysOnTop: true,
                minimizable: true,
                resizable: false,
                maximizable: true,
                closable: true,
                icon: './assets/pt_logo.ico', // path to the icon file
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

        // First loop: initial file processing
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
            }

            SourceFilePath.push(filePath)
            DestinationFilePath.push(destinationPath)
        }

        // Second loop: file operations
        for (let index = 0; index < SourceFilePath.length; index++) {
            const filePath = SourceFilePath[index]
            const destinationPath = DestinationFilePath[index]

            // Check if destination file already exists
            try {
                await fs.promises.access(destinationPath)
                console.log(`File already exists: ${destinationPath}`)
                continue // Skip processing if file exists
            } catch {
                console.log(`File does not exist, processing: ${destinationPath}`)

                // Process file based on type
                checkFileSize()

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
                        // console.log(crc32)
                    filesToWrite.push({ destinationPath, crc32 })
                } catch (err) {
                    console.error('Error processing file or calculating CRC32:', err)
                    throw err // Propagate error to outer catch block
                }
            }
        }

        if (filesToWrite.length > 0) {
            await writeToFile(filesToWrite, destinationFolder)
        } else {
            console.log('All files already exist, skipping write to INDEX.SYS')
        }

        event.sender.send('files-uploaded-now-reload', {
            filePaths: filePaths.map((fp) => {
                path.join(destinationFolder, path.basename(fp))
            })
        })

        if (ExtensionNotMatch) {
            event.sender.send(
                'alert',
                `File with extension: (${ExtensionNotSupport}) is not supported`
            )
        }
        progressBar.close() // Close progress bar
    } catch (error) {
        console.error('Error uploading files:', error)
    }
})

async function checkFileSize() {
    let filepaths = SourceFilePath
    let destination = DestinationFilePath
    let processedFiles = 0
    const totalFiles = filepaths.length

    // Check each file and update the progress bar accordingly
    for (let i = 0; i < filepaths.length; i++) {
        const filepath = filepaths[i]
        const destPath = destination[i]

        // Wait until destination file exists
        while (true) {
            try {
                await fs.promises.access(destPath)
                break
            } catch (err) {
                await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for 0.1 second before checking again
            }
        }

        // Update progress bar after confirming the file exists at the destination
        processedFiles++
        const progressPercent = (processedFiles / totalFiles) * 100
            // console.log(progressPercent, "progressPercent", "progressPercent")
        progressBar.value = progressPercent // Update progress value
        progressBar.detail = `${Math.floor(progressPercent)}% Complete`
        progressBar.text = `Processing file:${processedFiles} out of ${totalFiles} ${path.basename(
      filepath
    )}`
    }

    // console.log(`Processed ${processedFiles} out of ${totalFiles} files.`)
}

// Handle SFTP connection errors
ipcMain.on('sftp-connection-error', (event, errorMessage) => {
    dialog.showMessageBox({
        type: 'error',
        title: 'SFTP Connection Error',
        message: `An error occurred while connecting to the SFTP server:\n${errorMessage}`,
        buttons: ['OK']
    })
})

ipcMain.on('uploadButton-sending-request', async(event) => {
    console.log('hello upload button')
    let local, remote
    let sftp
    let existingFileCount = 0 // Counter for existing files

    try {
        if (!CreateMainFolder) {
            await dialog.showMessageBox(mainWindow, {
                type: 'error',
                title: 'Path Error',
                message: 'Please choose the correct path for file transfer.',
                buttons: ['OK']
            })
            logger.error('Path not selected for file transfer.')
            return
        }

        ConfigFilePath = path.join(CreateMainFolder, 'INDEX.SYS')

        // Check if the configuration file exists
        try {
            await fs.promises.access(ConfigFilePath)
        } catch (err) {
            await dialog.showMessageBox(mainWindow, {
                type: 'error',
                title: 'File Not Found',
                message: `Error: Configuration file not found at ${ConfigFilePath}. Please ensure the file exists.`,
                buttons: ['OK']
            })
            logger.error(`Configuration file not found at ${ConfigFilePath}.`)
                // console.log(err, 'Error checking file existence')
            return
        }

        const paths = await readConfigFile(ConfigFilePath)
        logger.info(`'Text CRC:', ${paths.textCrc}`)

        let crcMismatchFound = false

        if (activeSelectedIPs.length === 0) {
            event.sender.send('alert', 'Please choose an IP for file transfer.')
            logger.error('No IP selected for file transfer.')
            return
        }

        const totalFiles = paths.localPath.length * activeSelectedIPs.length
        let completedFiles = 0

        const progressBar = new ProgressBar({
            indeterminate: false,
            text: 'Uploading files...',
            detail: 'Initializing...',
            maxValue: totalFiles,
            browserWindow: {
                parent: mainWindow,
                modal: false,
                alwaysOnTop: true,
                minimizable: true,
                resizable: false,
                maximizable: true,
                closable: true,
                icon: './assets/pt_logo.ico',
                backgroundColor: '#FAF6F0'
            }
        })

        progressBar
            .on('completed', () => {
                console.log('Upload complete')
                progressBar.detail = 'Upload complete'
            })
            .on('aborted', () => {
                logger.warn('Upload aborted')
            })
            .on('progress', (value) => {
                progressBar.detail = `Uploading file ${value} of ${totalFiles}`
            })

        const updateProgressBar = () => {
            completedFiles++
            progressBar.value = completedFiles

            if (completedFiles === totalFiles) {
                progressBar.setCompleted()
            }
        }

        const uploadTasks = activeSelectedIPs.map(async(ip) => {
            try {
                const conn = await connection(ip)
                logger.info(`SFTP connection established to ${ip}`)
                sftp = await new Promise((resolve, reject) => {
                    conn.sftp((err, sftp) => {
                        if (err) {
                            logger.error(`Error obtaining SFTP client for ${ip}:`, err)
                            conn.end()
                            reject(err)
                        } else {
                            resolve(sftp)
                        }
                    })
                })

                for (let i = 0; i < paths.localPath.length; i++) {
                    try {
                        local = path.join(CreateMainFolder, paths.localPath[i])
                        remote = '/usr/share/apache2/htdocs/content' + paths.remotePath[i]
                        const size = paths.textFileSize[i]
                        const expectedCrc = paths.textCrc[i]

                        const localCrc = await calculateFileCRC32(local)
                        logger.info(`Local CRC32 for ${local}: ${localCrc}`)
                        logger.info(`Expected CRC32: ${expectedCrc}`)

                        const exists = await checkRemoteFileExists(sftp, remote)
                        if (!exists) {
                            if (localCrc === expectedCrc) {
                                await uploadFile(sftp, local, remote)
                                logger.info(
                                    `File successfully uploaded to ${ip} from ${local} to ${remote}`
                                )
                            } else {
                                logger.warn(
                                    `CRC mismatch for ${local}. Expected ${expectedCrc}, got ${localCrc}. Skipping upload.`
                                )
                                crcMismatchFound = true
                            }
                        } else {
                            logger.info(
                                `File already exists on ${ip} at ${remote}, skipping upload.`
                            )
                            existingFileCount++
                        }
                        updateProgressBar()
                    } catch (err) {
                        if (err.code === 'ENOENT') {
                            const PathParsing = path.parse(err.path)
                            const errPath = path.join(
                                path.basename(PathParsing.dir),
                                PathParsing.base
                            )
                            await dialog.showMessageBox(mainWindow, {
                                type: 'error',
                                title: 'File Not Found',
                                message: `Error: File not found. Could not open '${errPath}'`,
                                buttons: ['OK']
                            })
                            logger.error(`File not found: ${errPath}`)
                        } else {
                            logger.error(
                                `Error uploading file to ${ip} from ${local} to ${remote}:`,
                                err
                            )
                            await dialog.showMessageBox(mainWindow, {
                                type: 'error',
                                title: 'File Transfer Error',
                                message: `Error uploading file`,
                                buttons: ['OK']
                            })

                            if (progressBar) progressBar.close()
                            activeSelectedIPs = []
                        }
                        updateProgressBar()
                    }
                }

                await uploadFile(
                    sftp,
                    ConfigFilePath,
                    '/usr/share/apache2/htdocs/content/database/INDEX.SYS'
                )
                conn.end()
                if (progressBar) progressBar.close()
            } catch (err) {
                logger.error(`Error with connection or file transfer to ${ip}:`, err)
                await dialog.showMessageBox(mainWindow, {
                    type: 'error',
                    title: 'Connection Loss',
                    message: `Connection to ${ip} lost. Please check the connection and try again.`,
                    buttons: ['OK']
                })
                if (progressBar) progressBar.close() // Close the progress bar on connection error
            }

            // Ensure progress bar is updated even if there's an error
            updateProgressBar()
        })

        await Promise.all(uploadTasks)

        if (crcMismatchFound) {
            event.sender.send('alert', 'Error code 12345')
        }

        // Show a single popup if any files already existed
        if (existingFileCount > 0) {
            await dialog.showMessageBox(mainWindow, {
                type: 'warning',
                title: 'Skip Files',
                message: `The Destination already has files ${existingFileCount} out of: ${totalFiles}.`,
                buttons: ['OK']
            })
        }

        activeSelectedIPs = []
    } catch (err) {
        logger.error('Error:', err)
    } finally {
        if (progressBar && !progressBar.completed) {
            progressBar.setCompleted() // Ensure progress bar is closed
        }
    }
})
async function readConfigFile(ConfigFilePath) {
    try {
        const data = await fs.promises.readFile(ConfigFilePath, {
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
        logger.error('Error reading or processing INDEX.SYS:', err)
        throw err // Re-throw the error to be handled by the caller
    }
}

ipcMain.on('delete-request', async(event, filePaths) => {
    let success = true

    try {
        for (let filePath of filePaths) {
            // Resolve the full path based on the system's directory separator
            const fullPath = path.join(path.dirname(CreateMainFolder), filePath)

            try {
                console.log('Deleting file:', fullPath)
                await fs.promises.unlink(fullPath)
            } catch (err) {
                console.error('Error deleting file:', fullPath, err.message)
                success = false
            }
        }

        try {
            await updateConfigFile(filePaths)
        } catch (err) {
            console.error('Error updating INDEX.SYS:', err.message)
            success = false
        }

        if (success) {
            event.reply('delete-status', { delete_success: true })
            event.sender.send('files-uploaded-now-reload', {
                filePaths: filePaths.map((fp) => path.resolve(fp))
            })
        } else {
            // User clicked Cancel or closed the dialog
            console.log('Delete operation cancelled.')
            event.reply('delete-status', { error: true })
        }
    } catch (error) {
        console.error('Unexpected error during delete-request:', error.message)
        event.reply('delete-response', {
            error: true,
            message: 'Unexpected error: ' + error.message
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
        event.reply('delete-status', { error: true })
    }
})