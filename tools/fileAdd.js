const path = require('path')
const fs = require('fs')
const { spawn, exec } = require('child_process')
const url = require('url')
const exiftool = require('exiftool-vendored').exiftool
const ffmpegScript = require('./ffmpeg_path')
const { performance } = require('perf_hooks')
const crc = require('crc')
const ProgressBar = require('electron-progressbar')
    // Function to process media file using ffmpeg
let ConfigFilePath = './content/CONFIG.SYS'
let CreateMainFolder = "";
let MainFolderName;
const musicFileExtensions = [
    'mp3',
    'wav',
    'ogg',
    'pcm',
    'aif',
    'aiff',
    'aac',
    'wma',
    'flac',
    'alac',
    'opus',
    'dts',
    'ac3',
    'amr',
    'mid'
]
const videoFileExtensions = [
    'mp4',
    'avi',
    'mkv',
    'mov',
    'wmv',
    'flv',
    'webm',
    'mpeg',
    'mpg',
    'm4v',
    '3gp',
    'ogv',
    'ts',
    'vob'
]
const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'tiff',
    'tif',
    'svg',
    'webp',
    'heic',
    'ico',
    'avif',
    'psd',
    'raw'
]
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
        const isAudioFile =
            musicFileExtensions.includes(extension.slice(1)) && extension !== '.mp3' // slice(1) removes the dot from the extension
        let ffmpegCommand

        // console.log(isAudioFile, 'Audio File Check')

        if (isAudioFile) {
            // console.log('Processing as Audio File')
            // For audio files, convert to MP3
            ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c:a libmp3lame -q:a 2 "${outputFilePath}"`
        } else {
            // console.log('Processing as Video File')
            // For video files, just copy without re-encoding
            ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c copy "${outputFilePath}"`

            // Get the frame rate of the video file
            try {
                const frameRate = await getFrameRate(inputFilePath)
                    // console.log(`Frame Rate: ${frameRate}`)
            } catch (err) {
                console.error('Error getting frame rate:', err)
            }
        }

        // ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c copy "${outputFilePath}"`
        //     // console.log(`Executing PowerShell script: ${ffmpegCommand}`)

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
            XPComment: 'this is a of PT Communication Systems'
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
    return fs.promises
        .copyFile(source, destination)
        .then(() => {
            // console.log(`File copied successfully from ${source} to ${destination}`)
        })
        .catch((err) => {
            // console.error(`Error copying file from ${source} to ${destination}:`, err)
            throw err // Re-throw the error to be caught by the calling function
        })
}

const getMainPath = async(CreateMainFolder) => {
    CreateMainFolder = CreateMainFolder
    MainFolderName = path.basename(CreateMainFolder)
    ConfigFilePath = path.join(CreateMainFolder, 'CONFIG.SYS')
        // console.log(`getMainPath =>  ${CreateMainFolder}  get MainFolderName ${MainFolderName}`)
        // console.log(`ConfigFilePath =>  ${ConfigFilePath} `)
}



// Function to find the path segment after a specific directory and convert backslashes to forward slashes
async function getPathAfterDirectory(filePath, dirToFind) {
    const parts = filePath.split(path.sep);
    const index = parts.indexOf(dirToFind);

    if (index === -1 || index === parts.length - 1) {
        return ''; // Directory not found or it's the last segment
    }

    // Join the remaining parts after the found directory
    let resultPath = path.join(...parts.slice(index + 1));

    // Convert backslashes to forward slashes
    resultPath = resultPath.replace(/\\/g, '/');

    return '/' + resultPath;
}




const writeToFile = async(filesToWrite, destinationFolder) => {
    try {

        console.log('ConfigFilePath', ConfigFilePath)
            // Check if the file already has content
        let fileContent = ''
        try {
            fileContent = await new Promise((resolve, reject) => {
                fs.readFile(ConfigFilePath, 'utf8', (err, data) => {
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
        const fileDataPromises = filesToWrite.map(
            async({ destinationPath, crc32 }) => {
                // outputFilePath => content\Add\AA0002.MP3
                // const relativePath = path.join('/', destinationPath).replace(/\\/g, '/')
                const relativePath = await getPathAfterDirectory(destinationPath, MainFolderName)
                    // console.log(relativePath, typeof relativePath) // Output: /Add/MA0002HI.mp3
                const stats = await fs.promises.stat(destinationPath)
                return {
                    destinationPath: destinationPath,
                    path: relativePath,
                    size: stats.size,
                    crc: crc32.padStart(8, '0') // Ensure CRC32 is 8 characters long
                }
            }
        )

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
            fs.writeFile(ConfigFilePath, formattedContent, { flag: 'a' }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })

        console.log('Data appended to CONFIG.SYS', ConfigFilePath)

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
            const checksum = crc32.toString(16).toUpperCase().padStart(8, '0')
            resolve(checksum)
        })

        stream.on('error', (error) => {
            console.error('Error calculating CRC32:', error)
            reject(error)
        })
    })
}
const getFrameRate = (filePath) => {
    return new Promise((resolve, reject) => {
        const command = `ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 "${filePath}"`

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`)
            } else {
                const frameRate = stdout.trim()
                resolve(frameRate)
            }
        })
    })
}



async function updateConfigFile(deletedFiles) {
    try {
        // Ensure ConfigFilePath is properly defined and accessible
        const data = await fs.promises.readFile(ConfigFilePath, {
            encoding: 'utf8'
        })
        const lines = data.split('\n')

        // Convert deleted files paths to match the format in CONFIG.SYS
        // const relativePaths = deletedFiles.map((deleteFilePath) =>
        //     path.join('/', deleteFilePath).replace(/\\/g, '/')
        // )
        const relativePaths = deletedFiles.map((deleteFilePath) => {
                let parts = deleteFilePath.split('\\')
                    // console.log(parts)
                parts.shift() // Remove the first part dynamically
                return '/' + parts.join('/').replace(/\\/g, '/')
            })
            // console.log("r", relativePaths)
            // Filter out lines that match the deleted files
        const updatedLines = lines.filter((line) => {
            const parts = line.match(/^([A-F0-9]{8})\s+(\d+)\s+(.*)$/)
            if (parts && parts.length === 4) {
                const filename = parts[3].trim()
                    // Check if the filename is in the list of deleted files
                    // console.log("f", filename)
                return !relativePaths.includes(filename)
            }
            // Keep lines that do not match the expected format
            return true
        })

        // Write the updated lines back to CONFIG.SYS
        await fs.promises.writeFile(ConfigFilePath, updatedLines.join('\n'), {
            encoding: 'utf8'
        })
        console.log('CONFIG.SYS updated successfully', ConfigFilePath)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.warn('CONFIG.SYS file does not exist:', ConfigFilePath)
        } else {
            console.error('Error updating CONFIG.SYS:', error.message)
            throw error // Re-throw unexpected errors for further handling
        }
    }
}



module.exports = {
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
    musicFileExtensions,

}