/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get the directory name from the module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.join(__dirname, '../content/database/registersr.csv');

// Check and create the CSV file if it doesn't exist
const checkAndCreateFile = async (filePath) => {
    try {
        await fs.promises.access(filePath);
        console.log('File already exists:', filePath);
    } catch (err) {
        await fs.promises.writeFile(filePath, '');
        console.log('File created successfully:', filePath);
    }
};

// Call the function to ensure the file exists
checkAndCreateFile(csvFilePath)
    .then(() => {
        console.log('Check and create file operation completed.');
    })
    .catch((error) => {
        console.error('Error:', error);
    });

// Function to read data from the CSV file
const readCsvFile = async (filePath) => {
    try {
        return await fs.promises.readFile(filePath, 'utf8');
    } catch (error) {
        throw new Error('File is busy or cannot be opened: ' + error.message);
    }
};

// Function to append data to the CSV file
const appendToCsvFile = async (filePath, data) => {
    try {
        await checkAndCreateFile(filePath);
        await fs.promises.appendFile(filePath, data);
    } catch (err) {
        throw new Error('Error appending data: ' + err.message);
    }
};

// Endpoint to get data
app.get('/data', async (req, res) => {
    try {
        const data = await readCsvFile(csvFilePath);
        const lines = data.split('\n').filter(line => line.trim());
        const result = lines.map(line => {
            const [pnr, passengerName, contactNumber, seatNumber, serviceType, complaint, date, time, status, actionTaken] = line.split(',');
            return { pnr, passengerName, contactNumber, seatNumber, serviceType, complaint, date, time, status, actionTaken };
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading the CSV file: ' + error.message });
    }
});

// Endpoint to save new data
app.post('/data', async (req, res) => {
    const { pnr, passengerName, contactNumber, seatNumber, serviceType, complaint, date, time, status, actionTaken } = req.body;

    if (!pnr || !passengerName || !contactNumber || !seatNumber || !serviceType || !complaint || !date || !time || !status || !actionTaken) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newEntry = `${pnr},${passengerName},${contactNumber},${seatNumber},${serviceType},${complaint},${date},${time},${status},${actionTaken}\n`;

    try {
        await appendToCsvFile(csvFilePath, newEntry);
        res.status(201).json({ message: 'Data saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving data to the CSV file: ' + error.message });
    }
});

// Endpoint to update existing data
app.put('/data/:pnr/:index', async (req, res) => {
    const { pnr, index } = req.params;
    const { passengerName, contactNumber, seatNumber, serviceType, complaint, date, time, status, actionTaken } = req.body;

    if (!passengerName || !contactNumber || !seatNumber || !serviceType || !complaint || !date || !time || !status || !actionTaken) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const data = await readCsvFile(csvFilePath);
        const lines = data.split('\n').filter(line => line.trim());

        if (index < 0 || index >= lines.length) {
            return res.status(400).json({ error: 'Invalid index.' });
        }

        let updatedLines = lines.map((line, lineIndex) => {
            const [currentPnr, ...rest] = line.split(',');
            if (currentPnr === pnr && lineIndex === parseInt(index, 10)) {
                return `${pnr},${passengerName},${contactNumber},${seatNumber},${serviceType},${complaint},${date},${time},${status},${actionTaken}`;
            }
            return line;
        });

        const updatedData = updatedLines.join('\n');
        await fs.promises.writeFile(csvFilePath, updatedData);

        res.json({ message: 'Data updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating data in the CSV file: ' + error.message });
    }
});

// New function to read music directory
const readDirectory = (directoryPath) => {
    const files = fs.readdirSync(directoryPath);
    const fileList = [];

    files.forEach((file) => {
        const fullPath = path.join(directoryPath, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            fileList.push({
                name: file,
                type: 'directory',
                children: readDirectory(fullPath),
            });
        } else {
            fileList.push({
                name: file,
                type: 'file',
            });
        }
    });

    return fileList;
};

app.get('/:mediaType', (req, res) => {
    const { mediaType } = req.params;
    const folderPath = path.join(__dirname, `../content/${mediaType}`);

    if (!fs.existsSync(folderPath)) {
        return res.status(404).json({ error: `${mediaType} folder does not exist` });
    }

    try {
        const files = readDirectory(folderPath);
        res.json(files);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Unable to list ${mediaType} files` });
    }
});

// API to serve media files (images/videos) from the 'add' folder
app.get('/:media/:fileName', (req, res) => {
    const {media, fileName } = req.params;
    const filePath = path.join(__dirname, `../content/${media}/${fileName}`)

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    res.sendFile(filePath);
});


app.get('/:folderType/:mediaType/:videoName', (req, res) => {
    const { folderType, mediaType, videoName } = req.params;
    const videoPath = path.join(__dirname, `../content/${folderType}/${mediaType}/${videoName}`);
    const posterPath = path.join(__dirname, `../content/poster/${folderType}/${mediaType}/${videoName.replace('.mp4', '.jpg')}`);

    try {
        if (fs.existsSync(videoPath)) {
            return res.sendFile(videoPath);
        } else if (fs.existsSync(posterPath)) {
            return res.sendFile(posterPath);
        } else {
            return res.status(404).json({ error: 'Video or poster not found' });
        }
    } catch (error) {
        console.error('Error serving the file:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});




// Function to get local IPs
const getLocalIPs = () => {
    const interfaces = os.networkInterfaces();
    const ips = [];
    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                ips.push(alias.address);
            }
        }
    }
    return ips;
};

const localIPs = getLocalIPs();

const ipsFilePath = path.join(__dirname, 'ips.json');

// Function to write local IPs to a JSON file
const writeIPsToJsonFile = (filePath, ips) => {
    const data = { ips: ips.map(ip => `http://${ip}:${PORT}`) };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

 writeIPsToJsonFile(ipsFilePath, localIPs)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
