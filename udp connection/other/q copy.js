const dgram = require('dgram')

const PORT = 8001
const MULTICAST_GROUP = '224.0.0.1'

const udpSocket = dgram.createSocket('udp4')

udpSocket.on('error', (error) => {
  // console.log(`Socket error:\n${error.stack}`)
  udpSocket.close()
})

udpSocket.on('message', (message, remoteInfo) => {
  const hexString = message.toString('hex').toUpperCase()
  console.log(hexString)

  const extractedBytes = message.slice(10, 15)
  const asciiOutput = extractedBytes.toString('ascii').replace(/[^ -~]+/g, '') // Remove non-printable ASCII characters
//   console.log(asciiOutput)
  console.log(`Received message from device 2: ${message} from :${remoteInfo.address}`)
})

udpSocket.bind(PORT, () => {
  udpSocket.addMembership(MULTICAST_GROUP)
  console.log(`Listening for multicast packets on ${MULTICAST_GROUP}:${PORT}`)
})
