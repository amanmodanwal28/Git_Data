const crc32 = require('crc')
crc32(fs.readFileSync('./content/Add/5.jpg', 'utf-8')).toString(16)