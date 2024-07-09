const electron = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process')
const { app, BrowserWindow, ipcMain, Menu, dialog } = electron;
const xml2js = require('xml2js');
const { connection, checkIP, uploadFile } = require('./sftp') // Import functions from sftp.js
const url = require('url');
const crc = require('crc')
const exiftool = require('exiftool-vendored').exiftool
const ffmpegScript = require('./ffmpeg_path'); // Adjust the path as necessary
const { performance } = require('perf_hooks')

const {
    createDatabaseDirectories,
    readXmlFile,
    extractFolderInfo,
    extractField
} = require('./xmlParser')
    // Create a new instance of the parser
const parser = new xml2js.Parser({ explicitArray: false });

const directoryPath = './content'; // Replace with your folder path
// Define your music and video file extensions
const musicFileExtensions = ['mp3', 'wav', 'ogg', 'pcm', 'aif', 'aiff', 'aac', 'wma', 'flac', 'alac', 'opus', 'dts', 'ac3', 'amr', 'mid']
const videoFileExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', 'mpeg', 'mpg', 'm4v', '3gp', 'ogv', 'ts', 'vob']
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'svg', 'webp', 'heic', 'ico', 'avif', 'psd', 'raw']

const musicVideoEXT = [...musicFileExtensions, ...videoFileExtensions]

let store;
let mainWindow;
let activeIPs = [];
let localPath;
let main_folders = [];
let renderIDfromWeb;
let local_filepath;
let count = 0


async function createMainWindow(ipList) {
    try {
        const { default: Store } = await
        import ('electron-store');
        store = new Store();

        const savedPosition = store.get('windowPosition');
        const { screen } = electron;
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;
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
        });
        mainWindow.on('move', () => {
            const [x, y] = mainWindow.getPosition();
            store.set('windowPosition', { x, y });
        });
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.webContents.send('initial-data', { ipList });
        });

        // Load your HTML file from the 'views' folder
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'views', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));

    } catch (error) {
        console.error('Error in createMainWindow:', error);
    }
}

app.on('ready', async() => {
    try {
        await processXmlData();
        await ffmpegScript.setupFfmpeg();

    } catch (error) {
        console.error('Failed to create main window:', error);
    }
});



async function processXmlData() {
    try {
        const data = await readXmlFile(path.join(__dirname, 'Iot_Config.xml')); // Adjust the path as necessary
        const xml_result = await parser.parseStringPromise(data);
        const dataStructure = xml_result.IOTConfig.DATA_STRUCTURE;
        const folderInfo = extractFolderInfo(dataStructure);
        const IPs_promises = xml_result.IOTConfig.Device_list.Ipaddress.map(ip => checkIP(ip.$.ip, ip.$.aliance_name));
        const IPs_results = await Promise.all(IPs_promises);
        activeIPs = IPs_results.filter(({ status }) => status === 'active').map(({ ip, aliance_name }) => ({ ip, aliance_name }));
        const inactiveIPs = IPs_results.filter(({ status }) => status === 'inactive').map(({ ip, aliance_name }) => ({ ip, aliance_name }));
        // console.log(activeIPs);

        // Extract folder information from DATA_STRUCTURE
        main_folders = extractField(folderInfo, 'folder_name');

        // // Retrieve folders and regularFiles
        // const { folders } = await listFilesAndFolders(directoryPath);


        // console.log(subFolders)

        await createMainWindow(IPs_results);
    } catch (error) {
        console.error('Error processing XML data:', error);
    }
}




ipcMain.on('selected-ips', async(event, selectedIPs) => {
    try {
        console.log('Received selected-ips event with:', selectedIPs);
        const activeSelectedIPs = [selectedIPs].filter(ip => activeIPs.some(active => active.ip === ip));
        // console.log('active ip is ', activeSelectedIPs)
        for (const ip of activeSelectedIPs) {
            console.log("active ip is ", ip)
            await executeCommand(ip, "pwd")
        }
    } catch (e) {
        console.error('Error connecting to selected IPs:', e);
    }
});

async function executeCommand(ipAddress, command) {
    try {
        const result = await connection(ipAddress, command);
        return result;
    } catch (error) {
        console.error(`Error executing command '${command}'`)
        throw error;
    }
}



ipcMain.on('create-database', async(event) => {
    count++
    // if (count == '1') {
    try {
        // console.log('Database button clicked');
        // console.log('Database Created ');
        await createDatabaseDirectories();

        const { folders } = await listFilesAndFolders(directoryPath);
        mainWindow.webContents.send('database-created', { folders, count });
        console.log(count)
    } catch (error) {
        console.error('Error creating database:', );
    }
    // } else {
    //     console.log("database already created")
    // }
})


async function listFilesAndFolders(directoryPath) {
    try {
        const items = await fs.promises.readdir(directoryPath)
        let folders = [];
        let regularFiles = [];

        for (const item of items) {
            const fullPath = path.join(directoryPath, item);
            const stats = await fs.promises.stat(fullPath)

            if (stats.isDirectory()) {
                folders.push(item);
            } else {
                regularFiles.push(item);
            }
        }
        return { folders, regularFiles };
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err; // Propagate the error upwards
    }
}


ipcMain.on('selected-folder', async(event, folderName, renderID) => {
    try {
        const folderPath = path.join(directoryPath, folderName);
        localPath = folderPath
        renderIDfromWeb = renderID
        console.log('Selected folderName:', folderPath);
        const { folders, regularFiles } = await listFilesAndFolders(folderPath);
        event.sender.send('folder-contents', { folders, regularFiles });
        // Send localPath to renderer process
        event.sender.send('local-path', folderPath);
    } catch (e) {
        console.error('Error listing folders:', e);
    }
});

ipcMain.on('selected-subfolder', async(event, subfolderPath, renderID) => {
    try {
        const SubfolderPath = path.join(directoryPath, subfolderPath);
        localPath = SubfolderPath
        renderIDfromWeb = renderID
        console.log('selected SubfolderPath ', SubfolderPath);
        const { folders, regularFiles } = await listFilesAndFolders(SubfolderPath);
        event.sender.send('subfolder-contents', { folders, regularFiles });
        // Send localPath to renderer process
        event.sender.send('local-path', SubfolderPath);
    } catch (e) {
        console.error('Error listing subfolders:', e);
    }
});

// Handle 'selected-subsubfolder' event from renderer process
ipcMain.on('selected-subsubfolder', async(event, subsubfolderPath, renderID) => {
    try {
        const SubsubfolderPath = path.join(directoryPath, subsubfolderPath);
        localPath = SubsubfolderPath
        renderIDfromWeb = renderID
        console.log('Selected Sub-Subfolder :', SubsubfolderPath);
        // List files and folders in the selected sub-subfolder path
        const { folders, regularFiles } = await listFilesAndFolders(SubsubfolderPath);
        // Send the list of files back to the renderer process
        event.sender.send('subsubfolder-files', { folders, regularFiles });
        // Send localPath to renderer process
        event.sender.send('local-path', SubsubfolderPath);
    } catch (e) {
        console.error('Error listing files in sub-subfolder:', e);
    }
});


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
        console.log('Received file upload request:', filePaths)
        const destinationFolder = localPath // Ensure `localPath` is defined

        const filesToWrite = []
            // Process each file
        await Promise.all(
            filePaths.map(async(filePath) => {
                let filename = path.basename(filePath)
                let extension = path.extname(filename).toLowerCase().slice(1)
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
                    console.log(`Skipping file with extension: ${extension}`)
                    event.sender.send(
                        'alert',
                        `File with extension: ${extension} is not supported`
                    )
                    return // Skip processing for this file
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

                // console.log('Processing file:', filename)

                try {
                    await fs.promises.access(destinationPath)
                    console.log(`File already exists: ${destinationPath}`)
                } catch {
                    console.log(
                        `File does not exist, processing: ${destinationPath}`
                    )

                    let processFilePromise

                    if (
                        musicVideoEXT.some((ext) =>
                            filePath.toLowerCase().endsWith(ext)
                        )
                    ) {
                        processFilePromise = processMediaFile(
                            filePath,
                            destinationPath
                        )
                    } else if (
                        imageExtensions.some((ext) =>
                            filePath.toLowerCase().endsWith(ext)
                        )
                    ) {
                        processFilePromise = processImageFile(
                            filePath,
                            destinationPath
                        )
                    } else {
                        processFilePromise = copyFile(filePath, destinationPath)
                    }

                    // Run file processing and CRC32 calculation in parallel
                    try {
                        const [crc32] = await Promise.all([
                            calculateFileCRC32(filePath),
                            processFilePromise
                        ])

                        // console.log(`CRC32 for ${filename}: ${crc32}`)
                        filesToWrite.push({ destinationPath, crc32 })
                    } catch (err) {
                        console.error(
                            'Error processing file or calculating CRC32:',
                            err
                        )
                        throw err
                    }
                }
                // Calculate and log elapsed time
                const end = performance.now()
                const elapsed = Math.floor((end - start) / 1000)
                console.log(`File processing took ${elapsed} seconds`)
            })
        )

        // console.log('filesToWrite', filesToWrite)

        if (filesToWrite.length > 0) {
            await writeToFile(filesToWrite, destinationFolder)
        } else {
            console.log('All files already exist, skipping write to CONFIG.SYS')
        }

        event.sender.send('files-uploaded-now-reload', {
            filePaths: filePaths.map((fp) =>
                path.join(destinationFolder, path.basename(fp))
            ),
        })
    } catch (error) {
        console.error('Error uploading files:', error)
    }
})


// Function to process media file using ffmpeg
const processMediaFile = async(inputFilePath, outputFilePath) => {
    try {
        // Check if the output file already exists
        try {
            await fs.promises.access(outputFilePath)
            console.log(`Output file already exists: ${outputFilePath}`)
            return // Skip processing if file exists
        } catch (err) {
            // Output file does not exist, continue with ffmpeg
        }
        // Determine if the file extension is in musicFileExtensions (audio file) or not (video file)
        const extension = path.extname(inputFilePath).toLowerCase()
        const isAudioFile = musicFileExtensions.includes(extension.slice(1)) // slice(1) removes the dot from the extension

        // Construct ffmpeg command based on file type
        let ffmpegCommand

        if (isAudioFile) {
            // For audio files, convert to MP3
            ffmpegCommand = `ffmpeg -i "${inputFilePath}" '-c:a', 'libmp3lame', '-q:a', '2' "${outputFilePath}"`
        } else {
            // For video files, just copy without re-encoding
            ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c copy "${outputFilePath}"`
        }
        // console.log(`Executing PowerShell script: ${ffmpegCommand}`)

        // Execute the PowerShell script
        const ps = spawn('powershell.exe', [
            '-NoProfile',
            '-Command',
            ffmpegCommand
        ])

        // Return a promise to await completion of ffmpeg
        return new Promise((resolve, reject) => {
            ps.on('close', async(code) => {
                // console.log(`PowerShell script exited with code ${code}`)
                if (code === 0) {
                    try {
                        await fs.promises.access(outputFilePath)
                            // console.log('Output file successfully created.', OutputFilePath)
                        resolve() // Resolve the promise on success
                    } catch (err) {
                        console.error('Output file was not created.')
                        reject(err) // Reject the promise on failure
                    }
                } else {
                    console.error('PowerShell script failed.')
                    reject(new Error('PowerShell script failed.'))
                }
            })

            ps.on('error', (err) => {
                console.error('Error executing PowerShell script:', err)
                reject(err) // Reject the promise on error
            })
        })
    } catch (err) {
        console.error(`Error processing media file: ${err.message}`)
        throw err // Throw the error to be caught in the calling function
    }
}

const processImageFile = async(inputFilePath, outputFilePath) => {
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
            Title: 'PT Communication Systems',
            Subject: 'PT Communication Systems',
            Rating: 5,
            XPComment: 'this is a of PT Communication Systems',
            // Add more custom metadata fields as needed
        }

        // Check if Description field exists, add if not
        const existingMetadata = await exiftool.read(outputFilePath)
        if (!existingMetadata.Description) {
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
        // Return a successful resolution
        return Promise.resolve() // or just return; since async functions return promises implicitly
    } catch (err) {
        console.error(`Error processing image media file: ${err.message}`)
        return Promise.resolve() // Resolve the promise even if there is an error
    }
}

// Sample implementation of copyFile and writeToFile functions (for completeness)
const copyFile = async(source, destination) => {
    await fs.promises.copyFile(source, destination)
}

// Function to write file paths to CONFIG.SYS
const writeToFile = async(filesToWrite, destinationFolder) => {
    try {
        const configFilePath = path.join(__dirname, 'CONFIG.SYS')

        // Check if the file already has content
        let fileContent = ''
        try {
            fileContent = await new Promise((resolve, reject) => {
                fs.readFile(configFilePath, 'utf8', (err, data) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            resolve('')
                        } else {
                            reject(err)
                        }
                    } else {
                        resolve(data)
                    }
                })
            })
        } catch (err) {
            throw err // Re-throw if error is not "file not found"
        }
        // Fetch file sizes for each filePath asynchronously
        const fileDataPromises = filesToWrite.map(async({ destinationPath, crc32 }) => {
            // console.log('filePath1 =>', destinationPath) // outputFilePath => content\Add\AA0002.MP3
            const relativePath = path.join('/', destinationPath).replace(/\\/g, '/')
            const stats = await fs.promises.stat(destinationPath)

            return {
                destinationPath: destinationPath,
                path: relativePath,
                size: stats.size,
                crc: crc32.padStart(8, '0') // Ensure CRC32 is 8 characters long
            }
        })

        // Wait for all promises to resolve
        const fileData = await Promise.all(fileDataPromises)

        // Format data with headings and file sizes
        let formattedContent = ''
        if (!fileContent.includes('  CRC             SIZE   FILENAME')) {
            formattedContent += '  CRC             SIZE   FILENAME\n'
        }

        fileData.forEach((item) => {
            formattedContent += `${item.crc}    ${item.size
          .toString()
          .padStart(10)}   ${item.path}\n`
        })

        // Append to CONFIG.SYS
        await new Promise((resolve, reject) => {
            fs.writeFile(configFilePath, formattedContent, { flag: 'a' }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })

        console.log('Data appended to CONFIG.SYS')
    } catch (error) {
        console.error('Error writing to CONFIG.SYS:', error)
        throw error // Propagate the error upwards
    }
}

const calculateFileCRC32 = async(filePath) => {
    // Calculate CRC32 checksum for a file
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
        let crc32

        stream.on('data', (chunk) => {
            crc32 = crc.crc32(chunk, crc32)
        })

        stream.on('end', () => {
            const checksum = crc32.toString(16).toUpperCase()
            resolve(checksum)
        })

        stream.on('error', (error) => {
            console.error('Error calculating CRC32:', error)
            reject(error)
        })
    })
}

ipcMain.on('uploadButton-sending-request', async(event) => {
    console.log("hello upload button ")
    console.log(local_filepath)
    console.log('hello upload button ')
})



ipcMain.on('delete-request', async(event, filePaths) => {

    try {
        console.log('renderIDfromWeb =>', renderIDfromWeb)
        for (let filename of filePaths) {
            console.log('Deleting file:', filename);
            await fs.promises.unlink(filename)
            console.log('File deleted successfully:', filename);
        }
        event.reply('delete-response', { success: true, message: `
                All files deleted successfully ` });
        // Optionally, send back a confirmation or update UI as needed
        event.sender.send('files-uploaded-now-reload', { filePaths: filePaths.map(fp => path.join(localPath, path.basename(fp))) });

    } catch (error) {
        console.error('Error deleting file:', error.message);
        event.reply('delete-response', { success: false, message: `
                Error deleting file: ` });
    }
});

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