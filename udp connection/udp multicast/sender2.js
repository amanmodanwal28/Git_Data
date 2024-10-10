const dgram = require('dgram')

// Create a socket for UDP
const udpSocket = dgram.createSocket('udp4')

const PORT = 8001
const MULTICAST_GROUP = '224.0.0.1'

// Sample message to be sent
let count = 0 // To keep track of messages sent

// Handle any errors
udpSocket.on('error', (error) => {
  console.log(`Socket error: ${error.stack}`)
  udpSocket.close()
})

// Function to send a message
const sendMessage = () => {
  const message = Buffer.from(`Hello from device 1 - message ${count}`)
  udpSocket.send(message, 0, message.length, PORT, MULTICAST_GROUP, (err) => {
    if (err) {
      console.error('Error sending message:', err)
    } else {
      console.log(`Message sent: ${message.toString()}`)
    }
  })
}

// Send a message every second
setInterval(() => {
  count++
  sendMessage()
}, 1000) // 1000 milliseconds = 1 second

// Make sure to handle clean-up on process exit
process.on('SIGINT', () => {
  udpSocket.close(() => {
    console.log('Socket closed')
    process.exit()
  })
})
