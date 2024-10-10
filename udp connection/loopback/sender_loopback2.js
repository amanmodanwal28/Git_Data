const dgram = require('dgram')

// Create a socket for UDP
const udpSocket = dgram.createSocket('udp4')

const PORT = 8001
const HOST = '127.0.0.1' // Loopback IP for sender

let count = 1 // Initialize a count variable
let count_open = 1 // Initialize a count variable
let count_close = 1 // Initialize a count variable
let isConnectionOpen = true // Flag to manage connection state

// Function to send a message
const sendMessage = () => {
  if (isConnectionOpen) {
    const message = Buffer.from(`Hello from localhost - message ${count}`) // Include count in the message
    udpSocket.send(message, 0, message.length, PORT, HOST, (err) => {
      if (err) {
        console.error('Error sending message:', err)
      } else {
        console.log(`Message sent: ${message.toString()}`)
      }
    })
    count++ // Increment count after sending the message
  }
}

// Function to open connection
const openConnection = () => {
  count_open++
  isConnectionOpen = true
  const message = Buffer.from('open') // Send "open" message
  udpSocket.send(message, 0, message.length, PORT, HOST)
  console.log('Connection opened', count_open)

}

// Function to close connection
const closeConnection = () => {
  count_close++
  isConnectionOpen = false
  const message = Buffer.from('close') // Send "close" message
  udpSocket.send(message, 0, message.length, PORT, HOST)
  console.log('Connection closed' , count_close)

  // Schedule to reopen the connection after 5 seconds
  setTimeout(openConnection, 5000) // Reopen connection after 5 seconds
}

// Send a message every second
const messageInterval = setInterval(sendMessage, 1000) // Send the message every second

// Close connection every 35 seconds
setInterval(closeConnection, 35000) // Close connection every 35 seconds

// Make sure to handle clean-up on process exit
process.on('SIGINT', () => {
  clearInterval(messageInterval) // Clear the message sending interval
  udpSocket.close(() => {
    console.log('Socket closed')
    process.exit()
  })
})

// Start by opening the connection
openConnection()
