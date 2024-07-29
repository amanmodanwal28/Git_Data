const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, './Dummy_database');
const newFolderPath = path.join(__dirname, 'content');

// Function to copy files and directories recursively
function copyFolderSync(from, to) {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.statSync(fromPath).isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    });
}

// Check if the new folder already exists
if (!fs.existsSync(newFolderPath)) {
    // Copy the contents of the Dummy_database to the new folder
    copyFolderSync(directoryPath, newFolderPath);
    console.log(`Copied contents to ${newFolderPath}`);
} else {
    console.log(` already exists. :=> ${newFolderPath}`);
}
// List the contents of the new folder
fs.readdir(newFolderPath, (err, files) => {
    if (err) {
        return console.error('Unable to scan new directory: ' + err);
    }

    console.log(`Contents of ${newFolderPath}:`);
    files.forEach(file => {
        const filePath = path.join(newFolderPath, file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                return console.error('Unable to get file stats: ' + err);
            }

            if (stats.isFile()) {
                console.log(`${file} is a file`);
            } else if (stats.isDirectory()) {
                console.log(`${file} is a directory`);
            }
        });
    });
});