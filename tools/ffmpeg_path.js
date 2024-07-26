const { exec } = require('child_process')
const path = require('path')
const os = require('os')
const fs = require('fs').promises

// Function to check if a path ending with the given suffix is in the environment variable PATH
function isSuffixInEnvVariable(suffix) {
    const paths = process.env.PATH.split(path.delimiter)
    return paths.some((p) => p.endsWith(suffix))
}

// Function to copy ffmpeg directory
async function copyFfmpegDirectory(sourceDir, destDir) {
    try {
        // Check if the destination directory already exists
        await fs.access(destDir)
            // console.log(`Directory '${destDir}' already exists. Skipping copy.`)
        return // If directory exists, skip copying
    } catch (err) {
        // Directory does not exist, proceed with copying
    }

    try {
        await fs.mkdir(destDir, { recursive: true })
        await fs.copyFile(
            path.join(sourceDir, 'ffmpeg'),
            path.join(destDir, 'ffmpeg')
        )
        console.log(`Copied ffmpeg directory from ${sourceDir} to ${destDir}`)
    } catch (error) {
        console.log(`Error copying ffmpeg directory: `)
            // throw new Error(`Error copying ffmpeg directory: ${error.message}`)
    }
}

// Function to set up ffmpeg if not already set up
async function setupFfmpeg() {
    const userInfo = os.userInfo()
    const homeDir = userInfo.homedir

    // Source directory of ffmpeg files
    const sourceFfmpegDir = path.join(__dirname, 'ffmpeg')

    // Destination directory in the user's home directory
    const destFfmpegDir = path.join(homeDir, 'ffmpeg')
    const bin = path.join(destFfmpegDir, 'bin')
    const suffixToCheck = path.join('ffmpeg', 'bin')

    // Check if a path ending with '\\ffmpeg\\bin' exists in PATH
    if (!isSuffixInEnvVariable(suffixToCheck)) {
        try {
            await copyFfmpegDirectory(sourceFfmpegDir, destFfmpegDir)

            // PowerShell command to set environment variable
            const command = `powershell -Command "[Environment]::SetEnvironmentVariable('PATH', '${process.env.PATH}${path.delimiter}${bin}', 'User'); [Environment]::SetEnvironmentVariable('PATH', [Environment]::GetEnvironmentVariable('PATH', 'User'), 'Process')"`

            await new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        console.error(`Error: ${err.message}`)
                        reject(err)
                        return
                    }
                    // console.log(
                    //     `Path '${destFfmpegDir}' added successfully to the environment variable PATH.`
                    // )
                    resolve()
                })
            })
        } catch (error) {
            console.error(`Error setting up ffmpeg: ${error.message}`)
            throw error
        }
    } else {
        // console.log(
        //     `A path ending with '${suffixToCheck}' already exists in the environment variable PATH.`
        // )
    }
}

module.exports = {
    setupFfmpeg
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//  for delete environment complete then use this //////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// // // Command to add the directory to PATH using setx (requires admin rights)
// // const command = `setx PATH "%PATH%;${newPath}"`
// const { spawn } = require('child_process')
// const fs = require('fs').promises
// const path = require('path')

// ;
// (async() => {
//     const inputFilePath = 'C:\\aman111'
//         // const inputFilePath = '"%PATH%;C:\\aman111'
//     try {
//         // Construct the env command arguments
//         const envArgs = ['PATH', `${inputFilePath}"`]
//         console.log(`Executing env with args: ${envArgs.join(' ')}`)

//         // Execute the command using spawn
//         const env = spawn('setx', envArgs)

//         env.stdout.on('data', (data) => {
//             console.log(`env stdout: ${ data }`)
//         })

//         env.stderr.on('data', (data) => {
//             console.error(`
//                     env stderr: $ { data }
//                     `)
//         })

//         env.on('close', async(code) => {
//             console.log(` env process exited with code ${code}`)
//             if (code === 0) {
//                 console.log('Output file successfully created.')
//             } else {
//                 console.error('env process failed.')
//             }
//         })
//     } catch (err) {
//         console.error(`
//                     Error: $ { err.message }
//                     `)
//     }
// })()

// const { exec } = require('child_process')
// const path = require('path') // Require the path module

// // New path to add
// const newPath = 'C:\\lux cozi'

// // PowerShell command to set environment variable
// const command = `powershell -Command "[Environment]::SetEnvironmentVariable('PATH', '${process.env.PATH}${path.delimiter}${newPath}', 'User')"`

// exec(command, (err, stdout, stderr) => {
//     if (err) {
//         console.error(`Error: ${err.message}`)
//         return
//     }
//     console.log('Path added successfully!')
// })

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// complete setup   without pass in electron

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// const { exec } = require('child_process')
// const path = require('path')
// const os = require('os')
// const fs = require('fs').promises

// // Path suffix to check for
// const suffixToCheck = path.join('ffmpeg', 'bin')

// // Function to check if a path ending with the given suffix is in the environment variable PATH
// function isSuffixInEnvVariable(suffix) {
//     const paths = process.env.PATH.split(path.delimiter)
//     return paths.some((p) => p.endsWith(suffix))
// }

// // Function to copy ffmpeg directory
// // Function to copy ffmpeg directory
// async function copyFfmpegDirectory(sourceDir, destDir) {
//     try {
//         // Check if the destination directory already exists
//         try {
//             await fs.access(destDir)
//             console.log(`Directory '${destDir}' already exists. Skipping copy.`)
//             return // If directory exists, skip copying
//         } catch (err) {
//             // Directory does not exist, proceed with copying
//         }

//         await fs.cp(sourceDir, destDir, { recursive: true })
//         console.log(`Copied ffmpeg directory from ${sourceDir} to ${destDir}`)
//     } catch (error) {
//         console.error(`Error copying ffmpeg directory: ${error.message}`)
//     }
// }

// // Get user info and home directory
// const userInfo = os.userInfo()
// const homeDir = userInfo.homedir

// // Source directory of ffmpeg files
// const sourceFfmpegDir = path.join(__dirname, 'ffmpeg')

// // Destination directory in the user's home directory
// const destFfmpegDir = path.join(homeDir, 'ffmpeg')

// // Check if a path ending with '\\ffmpeg\\bin' exists in PATH
// if (!isSuffixInEnvVariable(suffixToCheck)) {
//     const bin = path.join(destFfmpegDir, 'bin')
//         // Copy the ffmpeg directory to the new path
//     copyFfmpegDirectory(sourceFfmpegDir, destFfmpegDir)
//         .then(() => {
//             // PowerShell command to set environment variable
//             const command = `powershell -Command "[Environment]::SetEnvironmentVariable('PATH', '${process.env.PATH}${path.delimiter}${bin}', 'User'); [Environment]::SetEnvironmentVariable('PATH', [Environment]::GetEnvironmentVariable('PATH', 'User'), 'Process')"`

//             exec(command, (err, stdout, stderr) => {
//                 if (err) {
//                     console.error(`Error: ${err.message}`)
//                     return
//                 }
//                 console.log(
//                     `Path '${destFfmpegDir}' added successfully to the environment variable PATH.`
//                 )
//             })
//         })
//         .catch((error) => {
//             console.error(`Error copying ffmpeg directory: ${error.message}`)
//         })
// } else {
//     console.log(
//         `A path ending with '${suffixToCheck}' already exists in the environment variable PATH.`
//     )
// }