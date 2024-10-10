const dgram = require('dgram')

const PORT = 8001
const HOST = '127.0.0.1' // Loopback IP for receiver

const udpSocket = dgram.createSocket('udp4')

udpSocket.on('error', (error) => {
  console.log(`Socket error: ${error.stack}`)
  udpSocket.close()
})

udpSocket.on('message', (message, remoteInfo) => {
  // Convert message to string
  const receivedMessage = message.toString();
  // Remove non-printable ASCII characters
  console.log(`message from sender: ${message}   ${receivedMessage}`);

  // Check if the message is for open or close
  if (receivedMessage.includes('open')) {
    console.log('Done: Connection opened.')
  } else if (receivedMessage.includes('close')) {
    console.log('Ok: Wait for open.')
  } else {
  }
})

udpSocket.bind(PORT, HOST, () => {
  console.log(`Listening for messages on ${HOST}:${PORT}`)
})
