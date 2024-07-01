const fs = require('fs').promises

async function extractFilenamePaths() {
    try {
        const data = await fs.readFile('./CONFIG.SYS', { encoding: 'utf8' })
        const lines = data.split('\n')
        const filenamePaths = []
            // console.log(lines)
        lines.forEach((line) => {
                const parts = line.trim().split(/\s+/)
                if (parts.length >= 3) {
                    const filename = parts[2]
                    if (!filenamePaths.includes(filename)) {
                        filenamePaths.push(filename)
                    }
                }
            })
            // Filter out 'FILENAME' if present in the array
        filenamePaths = filenamePaths.filter((path) => path !== 'FILENAME')

        console.log(filenamePaths)
    } catch (err) {
        console.error('Error reading or processing CONFIG.SYS:', err)
    }
}

extractFilenamePaths()