const dgram = require('dgram')

const PORT = 8000
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
    console.log(asciiOutput)
    // console.log(`Received message from device 2: ${message} from :${remoteInfo.address}`)
})

udpSocket.bind(PORT, () => {
    udpSocket.addMembership(MULTICAST_GROUP);
    console.log(
        `Listening for multicast packets on ${MULTICAST_GROUP}:${PORT}`
    )
})

////////////////////////////////////////////////////////////////////////////////////

// const dgram = require('dgram')

// // Create a UDP socket
// const socket = dgram.createSocket({ type: 'udp4' })
//     // Define the multicast group and port
// const multicastAddress = '224.0.0.1' // Example multicast address
// const multicastPort = 8000

// // Join the multicast group
// socket.on('listening', () => {
//     console.log(`Joined multicast group ${multicastAddress}`)
// })

// // Handle incoming messages
// socket.on('message', (msg, rinfo) => {
//     console.log(
//         `Received message from device 2: ${msg} from ${rinfo.address}:${rinfo.port}`
//     )
// })

// // Bind the socket to the multicast port
// socket.bind(multicastPort, () => {
//     console.log(
//         `UDP socket is listening on port ${multicastPort} for multicast messages`
//     )
//     socket.addMembership(multicastAddress)
// })





////////////////////////////////////////////////////////////////////////////////////

// const dgram = require('dgram')

// const MYPORT = 8000
// const MYGROUP_4 = '224.0.0.1'

// function receiver(group) {
//     const socket = dgram.createSocket('udp4')

//     socket.on('error', (err) => {
//         console.log(`Socket error:\n${err.stack}`)
//         socket.close()
//     })

//     socket.on('message', (msg, rinfo) => {
//         const hexStr = msg.toString('hex').toUpperCase()
//         console.log(hexStr)

//         const next5Bytes = msg.slice(10, 15)
//         const asciiString = next5Bytes.toString('ascii').replace(/[^ -~]+/g, '') // Remove non-printable ASCII characters
//         console.log(asciiString)
//     })

//     socket.bind(MYPORT, () => {
//         socket.addMembership(group)
//     })
// }

// function main() {
//     const group = MYGROUP_4
//     receiver(group)
// }

// main()