const { spawn } = require('child_process')
const fs = require('fs').promises
const path = require('path')

;
(async() => {
    const inputFilePath =
        'C:\\Users\\PTCS\\Desktop\\crc\\movies\\bollywood\\animal.mp4'
    const outputDir = 'content\\Add'
    const outputFilePath = path.join(outputDir, 'temp.mp4')

    try {
        // Check if the output directory exists, and create it if it doesn't
        await fs.mkdir(outputDir, { recursive: true })
        console.log(`Output directory ensured: ${outputDir}`)

        // Construct the ffmpeg command arguments
        const ffmpegArgs = [
            '-i',
            inputFilePath,
            '-metadata',
            'title=Aman Modanwal',
            '-c',
            'copy',
            outputFilePath
        ]
        console.log(`Executing ffmpeg with args: ${ffmpegArgs.join(' ')}`)

        // Execute the command using spawn
        const ffmpeg = spawn('ffmpeg', ffmpegArgs)

        ffmpeg.stdout.on('data', (data) => {
            console.log(`ffmpeg stdout: ${data}`)
        })

        ffmpeg.stderr.on('data', (data) => {
            console.error(`ffmpeg stderr: ${data}`)
        })

        ffmpeg.on('close', async(code) => {
            console.log(`ffmpeg process exited with code ${code}`)
            if (code === 0) {
                try {
                    await fs.access(outputFilePath)
                    console.log('Output file successfully created.')
                } catch (err) {
                    console.error('Output file was not created.')
                }
            } else {
                console.error('ffmpeg process failed.')
            }
        })
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
})()