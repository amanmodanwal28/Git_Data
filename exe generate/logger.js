const { app } = require('electron')
const { createLogger, format, transports } = require('winston')
const path = require('path')
const os = require('os')
const fs = require('fs')

// Get the path to the installation directory
const installationPath = path.dirname(process.execPath)

// Use a user-writable directory for logs
const logsPath = path.join(os.homedir(), 'AppData', 'Local', 'PT-Tool', 'logs')

// Helper function to ensure the logs directory exists and handle errors
const ensureDirectoryExists = (dirPath) => {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
        }
    } catch (error) {
        // Log the error to a fallback log file
        const fallbackLogFile = path.join(os.homedir(), 'Downloads', 'log.txt')
        fs.appendFileSync(
            fallbackLogFile,
            `Failed to create directory ${dirPath}: ${error}\n`
        )
        console.error(`Failed to create directory ${dirPath}: ${error}`)
        return false
    }
    return true
}

// Check if the logs directory exists and handle accordingly
const directoryExists = ensureDirectoryExists(logsPath)

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({
            filename: path.join(logsPath, 'error.log'),
            level: 'error',
            handleExceptions: true
        }),
        new transports.File({
            filename: path.join(logsPath, 'warn.log'),
            level: 'warn',
            handleExceptions: true
        }),
        new transports.File({
            filename: path.join(logsPath, 'combined.log'),
            handleExceptions: true
        })
    ]
})

// Fallback logging if the directory is not accessible
if (!directoryExists) {
    logger.transports.forEach((t) => {
        if (t instanceof transports.File) {
            t.filename = path.join(os.homedir(), 'Downloads', 'log.txt')
        }
    })
}

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple())
        })
    )
}

module.exports = logger