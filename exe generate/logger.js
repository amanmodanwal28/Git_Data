const { app } = require('electron')
const { createLogger, format, transports } = require('winston')
const path = require('path')
const os = require('os')

// Get the path to the Downloads folder
const downloadsPath = path.join(os.homedir(), 'Downloads')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({
            filename: path.join(downloadsPath, 'error.log'),
            level: 'error'
        }),
        new transports.File({
            filename: path.join(downloadsPath, 'combined.log')
        })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple())
        })
    )
}

module.exports = logger