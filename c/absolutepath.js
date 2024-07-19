const path = require('path')
const fs = require('fs')
    // const filePath = 'C:Users\\PTCS\\Desktop\\crc\\MESSAGES\\AA0002.MP3'
const filePath = 'content\\Add\\AA0002.MP3'
console.log(filePath)
console.log(" ")
    //   inputFilePath => C:\Users\PTCS\Desktop\crc\MESSAGES\AA0002.MP3
    // outputFilePath => content\Add\AA0002.MP3
const destinationFolder = __dirname
const absolutePath = path.join(destinationFolder, path.basename(filePath))
const relativePath = path.join('/', filePath).replace(/\\/g, '/')
    // const stats = fs.stat(filePath)


console.log(absolutePath)
console.log(relativePath)
    // console.log(stats.size)