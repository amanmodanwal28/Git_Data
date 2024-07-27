const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const xmlFilePath = './Iot_Config.xml';



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///    for create  the directory and   pass the data in main.js   ////////////////////////////////////////////////////

// Define the base path where the directories should be created
<<<<<<< HEAD
const basePath = path.join(__dirname, 'content');
=======
let basePath = path.join(__dirname, 'content');
>>>>>>> d7480ebcd6b59652bcbe89e1472972c0842d7b7a

// Arrays to store folder names
const folderNames = [];
const subFolderNames = {};
const subSubFolderNames = {};

const createDirectories = (dirPath) => {
<<<<<<< HEAD
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
=======
    // console.log(typeof dirPath)
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        // console.log(`Directory created: ${dirPath}`);
>>>>>>> d7480ebcd6b59652bcbe89e1472972c0842d7b7a
    } else {
        // console.log(`Directory already exists: ${dirPath}`);
    }
};

const parseXMLAndCreateDirectories = (xml) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            const dataStructure = result.IOTConfig.DATA_STRUCTURE[0];

            for (const key in dataStructure) {
                if (Array.isArray(dataStructure[key])) {
                    dataStructure[key].forEach(element => {
                        const folderName = element['$'].folder_name;
                        folderNames.push(folderName);
<<<<<<< HEAD
                        const folderUrl = path.join(basePath, folderName);
=======
                        const folderUrl = path.join(basePath, folderName)
>>>>>>> d7480ebcd6b59652bcbe89e1472972c0842d7b7a
                        createDirectories(folderUrl);

                        if (!subFolderNames[folderName]) {
                            subFolderNames[folderName] = [];
                        }

                        for (const subKey in element) {
                            if (Array.isArray(element[subKey])) {
                                element[subKey].forEach(subElement => {
                                    const subFolderName = subElement['$'][Object.keys(subElement['$'])[0]];
                                    subFolderNames[folderName].push(subFolderName);
                                    const subFolderUrl = path.join(folderUrl, subFolderName);
                                    createDirectories(subFolderUrl);

                                    if (!subSubFolderNames[subFolderName]) {
                                        subSubFolderNames[subFolderName] = [];
                                    }

                                    for (const subSubKey in subElement) {
                                        if (Array.isArray(subElement[subSubKey])) {
                                            subElement[subSubKey].forEach(subSubElement => {
                                                const subSubFolderName = subSubElement['$'][Object.keys(subSubElement['$'])[0]];
                                                subSubFolderNames[subFolderName].push(subSubFolderName);
                                                const subSubFolderUrl = path.join(subFolderUrl, subSubFolderName);
                                                createDirectories(subSubFolderUrl);
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }

            resolve();
        });
    });
};

<<<<<<< HEAD
const createDatabaseDirectories = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(xmlFilePath, 'utf8', (err, xmlData) => {
            if (err) {
                console.error(`Error reading XML file: ${err.message}`);
                reject(err);
                return;
            }

            // Check if the main "content" directory exists
            if (fs.existsSync(basePath)) {
                // console.log(`Directory already exists: ${basePath}`);
            } else {
                // Create the main "content" directory
                createDirectories(basePath);
=======
const createDatabaseDirectories = (CreateMainFolder) => {
    basePath = CreateMainFolder;

    return new Promise((resolve, reject) => {
        fs.readFile(xmlFilePath, 'utf8', (err, xmlData) => {
            if (err) {
                console.log(`Error reading XML file: ${err}`);
                reject(err);
                return;
            }
            // Check if the main "content" directory exists
            if (fs.existsSync(CreateMainFolder)) {
                console.log(`Directory already exists: ${basePath}`)
            } else {
                // Create the main "content" directory
                console.log(`Directory Created ${basePath}`)
                createDirectories(CreateMainFolder)
>>>>>>> d7480ebcd6b59652bcbe89e1472972c0842d7b7a
            }

            // Parse XML and create directories
            parseXMLAndCreateDirectories(xmlData).then(resolve).catch(reject);
        });
    });
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///    for Reading the xml data and  pass the data in main.js   ////////////////////////////////////////////////////

async function readXmlFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading XML file:', err);
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

function extractFolderInfo(dataStructure, result = []) {
    for (const key in dataStructure) {
        const value = dataStructure[key];
        if (typeof value === 'object' && value !== null) {
            if (value.$) {
                const folderInfo = { tag: key };
                for (const attr in value.$) {
                    folderInfo[attr] = value.$[attr];
                }
                result.push(folderInfo);
            }
            // Recursively check nested objects
            extractFolderInfo(value, result);
        }
    }
    return result;
}

function extractField(folderInfo, fieldName) {
    return folderInfo.map(content => content[fieldName]).filter(name => name !== undefined);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    createDatabaseDirectories,
    readXmlFile,
    extractFolderInfo,
    extractField,
    folderNames,
    subFolderNames,
    subSubFolderNames
};