<<<<<<< HEAD
// Your sftp.js file (connection and checkIP functions)

const fs = require('fs');
const { Client } = require('ssh2');
const ping = require('ping');
const path = require('path');

// SFTP connection details
const privateKeyPath = path.join(__dirname, 'PTCS_key11.ppk'); // Adjust the private key path as necessary

async function connection(ipAddress, command) {
    return new Promise((resolve, reject) => {
        const privateKey = fs.readFileSync(privateKeyPath);

        const conn = new Client();
        conn.on('ready', () => {
                console.log(`Connected successfully to ${ipAddress}`);

                // Execute command if provided
                if (command) {
                    conn.exec(command, (err, stream) => {
                        if (err) {
                            console.error(`Error executing command on ${ipAddress}:`, err);
                            reject(err);
                            return;
                        }

                        let stdoutData = '';
                        let stderrData = '';

                        stream.on('close', (code, signal) => {
                                conn.end();
                                resolve({
                                    conn,
                                    stdout: stdoutData,
                                    stderr: stderrData,
                                    code,
                                    signal
                                })
                            })
                            .on('data', (data) => {
                                stdoutData += data.toString();
                            }).stderr.on('data', (data) => {
                                stderrData += data.toString();
                            });
                    });
                } else {
                    // No command to execute, resolve immediately
                    resolve({ conn, stdout: '', stderr: '', code: 0, signal: null });
                }
            })
            .on('error', (err) => {
                console.error(`SFTP connection error to ${ipAddress}:`, err);
                reject(err);
=======
const fs = require('fs')
const { Client } = require('ssh2')
const ping = require('ping')
const path = require('path')

// SFTP connection details
const privateKeyPath = path.join(__dirname, 'PTCS_key11.ppk') // Adjust the private key path as necessary

async function connection(ipAddress) {
    return new Promise((resolve, reject) => {
        const privateKey = fs.readFileSync(privateKeyPath)

        const conn = new Client()
        conn
            .on('ready', () => {
                console.log(`Connected successfully to ${ipAddress}`)
                resolve(conn)
            })
            .on('error', (err) => {
                console.error(`SFTP connection error to ${ipAddress}:`, err)
                reject(err)
>>>>>>> d7480ebcd6b59652bcbe89e1472972c0842d7b7a
            })
            .connect({
                host: ipAddress,
                username: 'root',
                privateKey: privateKey
<<<<<<< HEAD
            });
    });
}

async function uploadFile(ipAddress, localPath, remotePath) {
    return new Promise((resolve, reject) => {
        connection(ipAddress)
            .then(({ conn }) => {
                conn.sftp((err, sftp) => {
                    if (err) {
                        reject(err)
                        return
                    }

                    sftp.fastPut(localPath, remotePath, (err) => {
                        conn.end()
                        if (err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    })
                })
            })
            .catch(reject)
=======
            })
    })
}

async function uploadFile(sftp, localPath, remotePath) {
    return new Promise((resolve, reject) => {
        sftp.fastPut(localPath, remotePath, (err) => {
            if (err) {
                reject(err)
            } else {
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
                    resolve(false)
                } else {
                    reject(err)
                }
            } else {
                resolve(true)
            }
        })
    })
}

function checkIP(ip, aliance_name) {
    return new Promise((resolve, reject) => {
        ping.sys.probe(ip, function(isAlive) {
            const status = isAlive ? 'active' : 'inactive'
            resolve({ ip, aliance_name, status })
        })
>>>>>>> d7480ebcd6b59652bcbe89e1472972c0842d7b7a
    })
}



<<<<<<< HEAD

function checkIP(ip, aliance_name) {
    return new Promise((resolve, reject) => {
        ping.sys.probe(ip, function(isAlive) {
            const status = isAlive ? 'active' : 'inactive';
            resolve({ ip, aliance_name, status });
        });
    });
}
=======
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

>>>>>>> d7480ebcd6b59652bcbe89e1472972c0842d7b7a

module.exports = {
    connection,
    checkIP,
<<<<<<< HEAD
    uploadFile
=======
    uploadFile,
    checkRemoteFileExists
>>>>>>> d7480ebcd6b59652bcbe89e1472972c0842d7b7a
}