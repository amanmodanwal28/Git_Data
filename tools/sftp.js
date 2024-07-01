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
            })
            .connect({
                host: ipAddress,
                username: 'root',
                privateKey: privateKey
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
    })
}




function checkIP(ip, aliance_name) {
    return new Promise((resolve, reject) => {
        ping.sys.probe(ip, function(isAlive) {
            const status = isAlive ? 'active' : 'inactive';
            resolve({ ip, aliance_name, status });
        });
    });
}

module.exports = {
    connection,
    checkIP,
    uploadFile
}