const { spawn } = require('child_process')
const fs = require('fs').promises
const path = require('path');
(async() => {
    const inputFilePath = 'C:\\Users\\PTCS\\Desktop\\crc\\MESSAGES\\AA0001.MP3'
    const filename = path.basename(inputFilePath)
    const outputDir = 'content\\Add'
    const outputFilePath = path.join(outputDir, filename)

    try {
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
                    console.log(filename)
                } catch (err) {
                    console.error('Output file was not created.')
                }
            } else {
                console.error('PowerShell script failed.')
            }
        })
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
})()

// //


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
//
// const { spawn } = require('child_process')
// const fs = require('fs').promises
// const path = require('path')

// ;
// (async() => {
//     const inputFilePath =
//         'C:\\Users\\PTCS\\Desktop\\crc\\movies\\bollywood\\animal.mp4'
//     const outputDir = 'content\\Add'
//     const outputFilePath = path.join(outputDir, 'temp.mp4')

//     try {
//         // Check if the output directory exists, and create it if it doesn't
//         await fs.mkdir(outputDir, { recursive: true })
//         console.log(`Output directory ensured: ${outputDir}`)

//         // Construct the PowerShell script to execute ffmpeg
//         const psScript = `
//             ffmpeg -i "${inputFilePath}" -metadata title="Aman Modanwal" -c copy "${outputFilePath}";
//             $(Get-Item "${outputFilePath}").LastWriteTime = Get-Date
//         `
//         console.log(`Executing PowerShell script: ${psScript}`)

//         // Execute the PowerShell script
//         const ps = spawn('powershell.exe', ['-NoProfile', '-Command', psScript])

//         ps.stdout.on('data', (data) => {
//             console.log(`PowerShell stdout: ${data}`)
//         })

//         ps.stderr.on('data', (data) => {
//             console.error(`PowerShell stderr: ${data}`)
//         })

//         ps.on('close', async(code) => {
//             console.log(`PowerShell script exited with code ${code}`)
//             if (code === 0) {
//                 try {
//                     await fs.access(outputFilePath)
//                     console.log(
//                         'Output file successfully created and date modified set to current date.'
//                     )
//                 } catch (err) {
//                     console.error('Output file was not created.')
//                 }
//             } else {
//                 console.error('PowerShell script failed.')
//             }
//         })
//     } catch (err) {
//         console.error(`Error: ${err.message}`)
//     }
// })()//
//
//
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///
// const { spawn } = require('child_process')
// const fs = require('fs').promises
// const path = require('path')

// ;
// (async() => {
//     const inputFilePath =
//         'C:\\Users\\PTCS\\Desktop\\crc\\movies\\bollywood\\animal.mp4'
//     const outputDir = 'content\\Add'
//     const outputFilePath = path.join(outputDir, 'temp.mp4')

//     try {
//         // Check if the output directory exists, and create it if it doesn't
//         await fs.mkdir(outputDir, { recursive: true })
//         console.log(`Output directory ensured: ${outputDir}`)

//         // Construct the ffmpeg command arguments
//         const ffmpegArgs = [
//             '-i',
//             inputFilePath,
//             '-metadata',
//             'title=Aman Modanwal',
//             '-c',
//             'copy',
//             outputFilePath
//         ]
//         console.log(`Executing ffmpeg with args: ${ffmpegArgs.join(' ')}`)

//         // Execute the command using spawn
//         const ffmpeg = spawn('ffmpeg', ffmpegArgs)

//         ffmpeg.stdout.on('data', (data) => {
//             console.log(`ffmpeg stdout: ${data}`)
//         })

//         ffmpeg.stderr.on('data', (data) => {
//             console.error(`ffmpeg stderr: ${data}`)
//         })

//         ffmpeg.on('close', async(code) => {
//             console.log(`ffmpeg process exited with code ${code}`)
//             if (code === 0) {
//                 try {
//                     await fs.access(outputFilePath)
//                     console.log('Output file successfully created.')
//                 } catch (err) {
//                     console.error('Output file was not created.')
//                 }
//             } else {
//                 console.error('ffmpeg process failed.')
//             }
//         })
//     } catch (err) {
//         console.error(`Error: ${err.message}`)
//     }
// })()