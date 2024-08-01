const path = require('path')
const fs = require('fs')
const logger = require('./logger')




function pathExistsSync(p) {
    try {
        fs.accessSync(p, fs.constants.F_OK)
        return true
    } catch (err) {
        return false
    }
}

function checkPathsSync(xmlFilePath, sourceFfmpegDir) {
    // Check in installationPath
    if (pathExistsSync(xmlFilePath) && pathExistsSync(sourceFfmpegDir)) {
        logger.info('Found XML file and FFmpeg directory in installationPath')

        logger.info('Updated paths to __dirname')
        return { xmlFilePath, sourceFfmpegDir }
    }

    // Update paths to __dirname if not found in installationPath
    xmlFilePath = path.join(__dirname, 'resources', 'Iot_Config.xml')
    sourceFfmpegDir = path.join(__dirname, 'resources', 'ffmpeg')

    // Check in __dirname
    if (pathExistsSync(xmlFilePath) && pathExistsSync(sourceFfmpegDir)) {
        logger.info('Found XML file and FFmpeg directory in __dirname')
        logger.info(`xml => ${xmlFilePath}, ffmpeg =>  ${sourceFfmpegDir}`)
        return { xmlFilePath, sourceFfmpegDir }
    }

    // If not found in both
    logger.error(
        'Files or directories not found in both installationPath and __dirname.'
    )
    return null // Return null or any appropriate value if paths are not found
}

module.exports = {
    checkPathsSync
}