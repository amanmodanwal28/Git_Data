const dgram = require('dgram')
const udpSocket = dgram.createSocket('udp4')
const PORT = 8001
const HOST = '192.168.10.15'
let count = 0


udpSocket.on('error', (error) => {
  console.log(`Socket error: ${error.stack}`)
  udpSocket.close()
})

const sendMessage = () => {
  const message = Buffer.from(
    `Hello from device at 12.168.11.54 - message ${count}`
  )
  udpSocket.send(message, 0, message.length, PORT, HOST, (err) => {
    if (err) {
      console.error('Error sending message:', err)
    } else {
      console.log(`Message sent: ${message.toString()}`)
    }
  })
}

setInterval(() => {
  count++
  sendMessage()
}, 1000)


process.on('SIGINT', () => {
  udpSocket.close(() => {
    console.log('Socket closed')
    process.exit()
  })
})
