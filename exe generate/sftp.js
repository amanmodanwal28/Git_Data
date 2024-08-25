const fs = require('fs')
const { Client } = require('ssh2')
const ping = require('ping')
const path = require('path')
const logger = require('./logger') // Import your logger
    // SFTP connection details
const privateKeyPath = path.join(__dirname, 'PTCS_key11.ppk') // Adjust the private key path as necessary

async function connection(ipAddress) {
    return new Promise((resolve, reject) => {
        const privateKey = fs.readFileSync(privateKeyPath)

        const conn = new Client()
        conn
            .on('ready', () => {
                logger.info(`connection: Connected successfully to ${ipAddress}`)
                resolve(conn)
            })
            .on('error', (err) => {
                logger.error(`connection: SFTP connection error to ${ipAddress}: ${err.message}`)
                reject(err)
            })
            .connect({
                host: ipAddress,
                username: 'root',
                privateKey: privateKey
            })
    })
}

async function uploadFile(sftp, localPath, remotePath) {
    return new Promise((resolve, reject) => {
        sftp.fastPut(localPath, remotePath, (err) => {
            if (err) {
                logger.error(`uploadFile: Error uploading file from ${localPath} to ${remotePath}: ${err.message}`)
                reject(err)
            } else {
                logger.info(`uploadFile: File successfully uploaded from ${localPath} to ${remotePath}`)
                resolve()
            }
        })
    })
}

async function checkRemoteFileExists(sftp, remotePath) {
    return new Promise((resolve, reject) => {
        sftp.stat(remotePath, (err, stats) => {
            if (err) {
                if (err.code === 2) {
                    // No such file or directory
                    logger.info(`checkRemoteFileExists: Remote file does not exist: ${remotePath}`)
                    resolve(false)
                } else {
                    logger.error(`checkRemoteFileExists: Error checking remote file existence for ${remotePath}: ${err.message}`)
                    reject(err)
                }
            } else {
                logger.info(`checkRemoteFileExists: Remote file exists: ${remotePath}`)
                resolve(true)
            }
        })
    })
}

function checkIP(ip, aliance_name) {
    return new Promise((resolve, reject) => {
        ping.sys.probe(ip, function(isAlive) {
            const status = isAlive ? 'active' : 'inactive'
                // logger.info(`sftp file  IP ${ip} is ${status}`)
            resolve({ ip, aliance_name, status })
        })
    })
}

// ipcMain.on('uploadButton-sending-request', async(event) => {
//     console.log('hello upload button')
//     try {
//         const paths = await readConfigFile()
//         console.log('Local Path:', paths.localPath)
//         console.log('Remote Path:', paths.remotePath)
//         let local
//         let remote

//         console.log(activeSelectedIPs)
//         if (activeSelectedIPs.length === 0) {
//             event.sender.send('alert', `Please choose an IP for file transfer.`)
//         } else {
//             for (const ip of activeSelectedIPs) {
//                 try {
//                     const conn = await connection(ip)
//                     const sftp = await new Promise((resolve, reject) => {
//                         conn.sftp((err, sftp) => {
//                             if (err) {
//                                 conn.end()
//                                 console.log('connection end error face')
//                                 reject(err)
//                             } else {
//                                 resolve(sftp)
//                             }
//                         })
//                     })

//                     for (let i = 0; i < paths.localPath.length; i++) {
//                         try {
//                             let local = paths.localPath[i]
//                             let remote = '/usr/share/apache2/htdocs' + paths.remotePath[i]

//                             const exists = await checkRemoteFileExists(sftp, remote)
//                             if (!exists) {
//                                 await uploadFile(sftp, local, remote)
//                                 console.log(
//                                     `File successfully uploaded to ${ip} from ${local} to ${remote}`
//                                 )
//                             } else {
//                                 console.log(
//                                     `File already exists on ${ip} at ${remote}, skipping upload.`
//                                 )
//                             }
//                         } catch (err) {
//                             console.error(
//                                 `Error uploading file to ${ip} from ${local} to ${remote}:`,
//                                 err
//                             )
//                         }
//                     }

//                     conn.end()
//                     console.log('connection end')
//                 } catch (err) {
//                     console.error(`Error with connection or file transfer to ${ip}:`, err)
//                 }
//             }
//         }

//         activeSelectedIPs = []
//     } catch (err) {
//         console.error('Error:', err)
//     }
// })

module.exports = {
    connection,
    checkIP,
    uploadFile,
    checkRemoteFileExists
}