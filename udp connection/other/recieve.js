const dgram = require('dgram')

// Create a socket for UDP
const udpSocket = dgram.createSocket('udp4')

const PORT = 8001
const MULTICAST_GROUP = '224.0.0.1'

// Sample message to be sent
const message = Buffer.from('Hello from device 1')

// Handle any errors
udpSocket.on('error', (error) => {
  console.log(`Socket error: ${error.stack}`)
  udpSocket.close()
})

// Send a message
udpSocket.send(message, 0, message.length, PORT, MULTICAST_GROUP, (err) => {
  if (err) {
    console.error('Error sending message:', err)
  } else {
    console.log(`Message sent: ${message.toString()}`)
  }
  udpSocket.close() // Close the socket after sending the message
})
