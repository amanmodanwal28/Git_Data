const dgram = require('dgram')
const os = require('os') // Use require instead of import

// Create a socket for UDP
const udpSocket = dgram.createSocket('udp4')

const PORT = 8001

let count_open = 0 // Initialize a count variable for open
let count_close = 0 // Initialize a count variable for close
let isConnectionOpen = true // Flag to manage connection state
let closeIntervalId // ID for close interval
const eachSecond = 1000;
const tenSecond = 11000;
const TwentySecond = 21000;
const openMessage = 'open'
const closeMessage = 'close'
// Function to get local IPs
const getLocalIPs = () => {
  const interfaces = os.networkInterfaces()
  const ips = []
  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        ips.push(alias.address)
      }
    }
  }
  return ips
}

// Retrieve all local IPs
const localIPs = getLocalIPs()

// Function to send "open" message to all local IPs
const sendOpenMessage = () => {
  localIPs.forEach((ip) => {
    const message = Buffer.from(openMessage) // Send "open" message
    udpSocket.send(message, 0, message.length, PORT, ip, (err) => {
      if (err) {
        console.error('Error sending open message to', ip, ':', err)
      } else {
        console.log(`Sent message :=> ${message}-${count_open}  to  ${ip}`)
      }
    })
  })
  count_open++
}

// Function to send "close" message to all local IPs
const sendCloseMessage = () => {
  localIPs.forEach((ip) => {
    const message = Buffer.from(closeMessage) // Send "close" message
    udpSocket.send(message, 0, message.length, PORT, ip, (err) => {
      if (err) {
        console.error('Error sending close message to', ip, ':', err)
      } else {
        console.log(`Sent message :=> ${message}-${count_close}  to  ${ip}`)
      }
    })
  })
  count_close++
}

// Function to start sending "close" messages every second for 10 seconds
const closeConnection = () => {
  count_close = 0
  console.log(`Starting to send ${closeMessage} messages for 10 seconds...`)

  closeIntervalId = setInterval(() => {
    sendCloseMessage() // Send "close" every second
  }, eachSecond)

  // Stop sending "close" messages after 10 seconds
  setTimeout(() => {
    clearInterval(closeIntervalId) // Stop "close" messages
    console.log(`Stopped sending ${closeMessage} messages. Resuming ${openMessage} messages.`)
    openConnection() // Resume sending "open" messages
  }, tenSecond) // 10 seconds
}

// Function to continuously send "open" messages and close after 20 seconds
const openConnection = () => {
  console.log(`Resuming ${openMessage} messages...`)

  // Start sending "open" messages every 1 second
  const openInterval = setInterval(sendOpenMessage, eachSecond)

  // After 20 seconds, stop sending "open" and start sending "close"
  setTimeout(() => {
    clearInterval(openInterval) // Stop "open" messages
    closeConnection() // Start "close" process
  }, TwentySecond) // 20 seconds
}

// Start the process by opening the connection
openConnection()

// Make sure to handle clean-up on process exit
process.on('SIGINT', () => {
  udpSocket.close(() => {
    console.log('Socket closed')
    process.exit()
  })
})
