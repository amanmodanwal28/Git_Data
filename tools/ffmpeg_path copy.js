const { spawn } = require('child_process')
const fs = require('fs').promises
const path = require('path')

;
(async() => {
    const inputFilePath = 'C:\\aman111'
        // const inputFilePath = '"%PATH%;C:\\aman111'
    try {
        // Construct the env command arguments
        const envArgs = ['PATH', `${inputFilePath}"`]
        console.log(`Executing env with args: ${envArgs.join(' ')}`)

        // Execute the command using spawn
        const env = spawn('setx', envArgs)

        env.stdout.on('data', (data) => {
            console.log(`env stdout: ${ data }`)
        })

        env.stderr.on('data', (data) => {
            console.error(`
                    env stderr: $ { data }
                    `)
        })

        env.on('close', async(code) => {
            console.log(` env process exited with code ${code}`)
            if (code === 0) {
                console.log('Output file successfully created.')
            } else {
                console.error('env process failed.')
            }
        })
    } catch (err) {
        console.error(`
                    Error: $ { err.message }
                    `)
    }
})()