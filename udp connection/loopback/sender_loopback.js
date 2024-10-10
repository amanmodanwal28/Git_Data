const dgram = require('dgram')

// Create a socket for UDP
const udpSocket = dgram.createSocket('udp4')

const PORT = 8001
const HOST = '127.0.0.1' // Loopback IP for sender

// Function to send a message
const sendMessage = () => {
  const message = Buffer.from('Hello from localhost') // Static message
  udpSocket.send(message, 0, message.length, PORT, HOST, (err) => {
    if (err) {
      console.error('Error sending message:', err)
    } else {
      console.log(`Message sent: ${message.toString()}`)
    }
  })
}

// Send a message every second
setInterval(sendMessage, 1000) // Send the static message every second

// Make sure to handle clean-up on process exit
process.on('SIGINT', () => {
  udpSocket.close(() => {
    console.log('Socket closed')
    process.exit()
  })
})
