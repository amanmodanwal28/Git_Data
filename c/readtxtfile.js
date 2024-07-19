const fs = require('fs')

async function extractLocalPath() {
    try {
        const data = await fs.promises.readFile('./CONFIG.SYS', {
            encoding: 'utf8'
        })
        const lines = data.split('\n')
        let localPath = []
        let remotePath = []
            // console.log(lines)
        lines.forEach((line) => {
                const parts = line.match(/^([A-F0-9]{8})\s+(\d+)\s+(.*)$/)
                if (parts && parts.length === 4) {
                    const filename = parts[3].trim()
                    if (!localPath.includes(filename)) {
                        localPath.push(filename)
                        remotePath.push(filename)
                    }
                }
            })
            // Filter out 'FILENAME' if present in the array
        localPath = localPath
            .filter((path) => path !== 'FILENAME')
            .map((path) => (path.startsWith('/') ? path.substring(1) : path))

        // remotePath = remotePath.filter((path) => path !== 'FILENAME')

        // Filter out 'FILENAME' if present in the array and adjust paths in remotePath
        remotePath = remotePath
            .filter((path) => path !== 'FILENAME')
            .map((path) => {
                const parts = path.split('/')
                    // Lowercase only the directory part, not the filename
                const lowercaseParts = parts.map((part, index) => {
                    console.log(part)
                    return index === parts.length - 1 ? part : part.toLowerCase()
                })
                return lowercaseParts.join('/')
            })

        return { localPath, remotePath } // Return both arrays as an object
    } catch (err) {
        console.error('Error reading or processing CONFIG.SYS:', err)
        throw err // Re-throw the error to be handled by the caller
    }
}

extractLocalPath()
    .then((paths) => {
        console.log('Local Path:', paths.localPath)
        console.log('Remote Path:', paths.remotePath)
    })
    .catch((err) => {
        console.error('Error:', err)
    })