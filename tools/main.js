const electron = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { app, BrowserWindow, ipcMain, Menu } = electron;
const xml2js = require('xml2js');
const { connection, checkIP } = require('./sftp'); // Import functions from sftp.js
const url = require('url');
const {
    createDatabaseDirectories,
    readXmlFile,
    extractFolderInfo,
    extractField,

} = require('./xmlParser');
// Create a new instance of the parser
const parser = new xml2js.Parser({ explicitArray: false });

const directoryPath = './Content'; // Replace with your folder path


let store;
let mainWindow;
let activeIPs = [];
let localPath;
let main_folders = [];



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

        for (const ip of activeSelectedIPs) {

            // Execute pwd
            const pwdResult = await executeCommand(ip, 'cd .. && cd /usr/share/apache2/htdocs/content/ && ls');
            // Split the stdout by newline and add each folder name to the array
            const folders = pwdResult.stdout.split('\n').filter(folder => folder.trim() !== '');
            // console.log('Folders:', folders);

            // Send folders back to renderer process if needed
            event.sender.send('folders', { ip, folders });
            // Send localPath to renderer process
            event.sender.send('local-path', localPath);
        }
    } catch (e) {
        console.error('Error connecting to selected IPs:', e);
    }
});

ipcMain.on('selected-folder', async(event, folderName) => {
    try {
        const folderPath = path.join(directoryPath, folderName);
        localPath = folderPath
        console.log('Selected folderName:', folderPath);
        const { folders, regularFiles } = await listFilesAndFolders(folderPath);
        event.sender.send('folder-contents', { folders, regularFiles });
        // Send localPath to renderer process
        event.sender.send('local-path', folderPath);
    } catch (e) {
        console.error('Error listing folders:', e);
    }
});

ipcMain.on('selected-subfolder', async(event, subfolderPath) => {
    try {
        const SubfolderPath = path.join(directoryPath, subfolderPath);
        localPath = SubfolderPath
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
ipcMain.on('selected-subsubfolder', async(event, subsubfolderPath) => {
    try {
        const SubsubfolderPath = path.join(directoryPath, subsubfolderPath);
        localPath = SubsubfolderPath
        console.log('Selected Sub-Subfolder :', SubsubfolderPath);
        // List files and folders in the selected sub-subfolder path
        const { regularFiles } = await listFilesAndFolders(SubsubfolderPath);
        // Send the list of files back to the renderer process
        event.sender.send('subsubfolder-files', regularFiles);
        // Send localPath to renderer process
        event.sender.send('local-path', SubsubfolderPath);
    } catch (e) {
        console.error('Error listing files in sub-subfolder:', e);
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

let count = 0
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
        const items = await fs.readdir(directoryPath);
        let folders = [];
        let regularFiles = [];

        for (const item of items) {
            const fullPath = path.join(directoryPath, item);
            const stats = await fs.stat(fullPath);

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

ipcMain.on('upload-files', async(event, { filePaths, fileSizes }) => {
    try {
        console.log(`Received file upload request ):`, filePaths);

        const destinationFolder = localPath; // Assuming `localPath` is defined and points to the correct folder
        // Copy each file to the destination folder
        for (const filePath of filePaths) {
            const destinationPath = path.join(destinationFolder, path.basename(filePath));
            await fs.copyFile(filePath, destinationPath);
            console.log(`File copied to ${destinationPath}`);
        }
        // Optionally, send back a confirmation or update UI as needed
        event.sender.send('files-uploaded', { filePaths: filePaths.map(fp => path.join(destinationFolder, path.basename(fp))) });
    } catch (error) {
        console.error('Error uploading files:', error);
        // Handle error appropriately (send error to renderer process or log)
    }
});


ipcMain.on('delete-request', async(event, { filename }) => {

    try {
        await fs.unlink(filename);
        console.log('File deleted successfully', filename);
        event.reply('delete-response', { success: true, message: `File deleted successfully: ${filename}` });
    } catch (error) {
        console.error('Error deleting file:', error.message);
        event.reply('delete-response', { success: false, message: `Error deleting file:` });
    }
});