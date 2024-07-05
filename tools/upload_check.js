const { ipcMain } = require('electron')
const { spawn } = require('child_process')
const fs = require('fs').promises
const path = require('path')

const musicFileExtensions = ['mp3', 'wav', 'ogg', 'pcm', 'aiff', 'aac', 'wma', 'flac', 'alac', 'opus', 'dts', 'ac3', 'amr', 'mid']
const videoFileExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', 'mpeg', 'mpg', 'm4v', '3gp', 'ogv', 'ts', 'vob']
const musicVideoEXT = [...musicFileExtensions, ...videoFileExtensions]
    // Handler for 'upload-files' event from renderer process
ipcMain.on('upload-files', async(event, { filePaths }) => {
    try {
        console.log('Received file upload request:', filePaths)
        const destinationFolder = localPath // Assuming `localPath` is defined and points to the correct folder

        // Process each file
        for (const filePath of filePaths) {
            const filename = path.basename(filePath)
            const destinationPath = path.join(destinationFolder, filename)

            // Check if the file extension is in musicVideoEXT
            if (musicVideoEXT.some((ext) => filePath.toLowerCase().endsWith(ext))) {
                // Handle media files (e.g., run ffmpeg)
                await processMediaFile(filePath, destinationPath)
            } else {
                // Copy the file directly to the destination folder
                await copyFile(filePath, destinationPath)
                console.log(`File copied to ${destinationPath}`)
            }
        }

        // Write filenames to CONFIG.SYS
        await writeToFile(filePaths, destinationFolder)

        // Send back a confirmation or update UI as needed
        event.sender.send('files-uploaded-now-reload', {
            filePaths: filePaths.map((fp) =>
                path.join(destinationFolder, path.basename(fp))
            )
        })
    } catch (error) {
        console.error('Error uploading files:', error)
            // Handle error appropriately (send error to renderer process or log)
    }
})

// Function to process media file using ffmpeg
async function processMediaFile(inputFilePath, outputFilePath) {
    try {
        // Check if the output file already exists
        try {
            await fs.access(outputFilePath)
            console.log(`Output file already exists: ${outputFilePath}`)
            return // Skip processing if file exists
        } catch (err) {
            // Output file does not exist, continue with ffmpeg
        }

        // Construct the PowerShell script to execute ffmpeg
        const psScript = `ffmpeg -i "${inputFilePath}" -metadata title="PT Communication Systems" -c copy "${outputFilePath}"`
        console.log(`Executing PowerShell script: ${psScript}`)

        // Execute the PowerShell script
        const ps = spawn('powershell.exe', ['-NoProfile', '-Command', psScript])

        ps.stdout.on('data', (data) => {
            console.log(`PowerShell stdout: ${data}`)
        })

        ps.stderr.on('data', (data) => {
            console.error(`PowerShell stderr: ${data}`)
        })

        ps.on('close', async(code) => {
            console.log(`PowerShell script exited with code ${code}`)
            if (code === 0) {
                try {
                    await fs.access(outputFilePath)
                    console.log('Output file successfully created.')
                } catch (err) {
                    console.error('Output file was not created.')
                }
            } else {
                console.error('PowerShell script failed.')
            }
        })
    } catch (err) {
        console.error(`Error processing media file: ${err.message}`)
    }
}


// Sample implementation of copyFile and writeToFile functions (for completeness)
async function copyFile(source, destination) {
    await fs.copyFile(source, destination)
}

async function writeToFile(filePaths, destinationFolder) {
    const configFilePath = path.join(destinationFolder, 'CONFIG.SYS')
    const content = filePaths.map((fp) => path.basename(fp)).join('\n')
    await fs.writeFile(configFilePath, content)
}