const electron = require('electron');
const path = require('path');
const fs = require('fs');
const { stat } = require('fs').promises
const { app, BrowserWindow, ipcMain, Menu, dialog } = electron;
const xml2js = require('xml2js');
const { connection, checkIP, uploadFile } = require('./sftp') // Import functions from sftp.js
const url = require('url');
const crc = require('crc')
const {
    createDatabaseDirectories,
    readXmlFile,
    extractFolderInfo,
    extractField
} = require('./xmlParser')
    // Create a new instance of the parser
const parser = new xml2js.Parser({ explicitArray: false });

const directoryPath = './content'; // Replace with your folder path


let store;
let mainWindow;
let activeIPs = [];
let localPath;
let main_folders = [];
let renderIDfromWeb;

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
        console.log('active ip is ', activeSelectedIPs)
        for (const ip of activeSelectedIPs) {
            // console.log("active ip is ", ip)
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
        console.log('Database button clicked');
        console.log('Database Created ');
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
    } catch (error) {
        console.error('Error refreshing folder contents:', error)
            // Handle error appropriately (send error to renderer process or log)
    }
})

ipcMain.on('upload-files', async(event, { filePaths }) => {
    try {
        console.log(`Received file upload request ):`, filePaths);

        const destinationFolder = localPath; // Assuming `localPath` is defined and points to the correct folder
        // Copy each file to the destination folder
        for (const filePath of filePaths) {
            const destinationPath = path.join(destinationFolder, path.basename(filePath));
            await copyFile(filePath, destinationPath)
            console.log(`File copied to ${destinationPath}`);
        }
        // Write filenames to CONFIG.SYS
        await writeToFile(filePaths, destinationFolder);

        // Optionally, send back a confirmation or update UI as needed
        event.sender.send('files-uploaded-now-reload', { filePaths: filePaths.map(fp => path.join(destinationFolder, path.basename(fp))) });
    } catch (error) {
        console.error('Error uploading files:', error);
        // Handle error appropriately (send error to renderer process or log)
    }
});

function copyFile(source, target) {
    return new Promise((resolve, reject) => {
        const rd = fs.createReadStream(source)
        const wr = fs.createWriteStream(target)

        rd.on('error', reject)
        wr.on('error', reject)
        wr.on('finish', resolve)

        rd.pipe(wr)
    })
}


// Function to write file paths to CONFIG.SYS
// Function to write file paths to CONFIG.SYS
async function writeToFile(filePaths, destinationFolder) {
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
        const fileDataPromises = filePaths.map(async(fp) => {
            const absolutePath = path.join(destinationFolder, path.basename(fp))
            const relativePath = path.join('/', absolutePath).replace(/\\/g, '/')
            const stats = await new Promise((resolve, reject) => {
                fs.stat(fp, (err, stats) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(stats)
                    }
                })
            })
            const crc = await calculateFileCRC32(fp)
            return {
                absolutePaths: absolutePath,
                path: relativePath,
                size: stats.size,
                crc: crc.toString(16).toUpperCase().padStart(8, '0')
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

async function calculateFileCRC32(filePath) {
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


async function extractFilenamePaths() {
    try {
        const data = await fs.readFile('./CONFIG.SYS', { encoding: 'utf8' })
        const lines = data.split('\n')
        let filenamePaths = []

        lines.forEach((line) => {
            const parts = line.trim().split(/\s+/)
            if (parts.length >= 3) {
                const filename = parts[2]
                if (!filenamePaths.includes(filename)) {
                    filenamePaths.push(filename)
                }
            }
        })

        // Filter out 'FILENAME' if present in the array
        filenamePaths = filenamePaths.filter((path) => path !== 'FILENAME')

        console.log(filenamePaths)
        return filenamePaths
    } catch (err) {
        console.error('Error reading or processing CONFIG.SYS:', err)
        return []
    }
}



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