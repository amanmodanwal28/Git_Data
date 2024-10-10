const dgram = require('dgram');

const PORT = 8001;
const HOST = '192.168.10.15'; // Static IP for receiver

const udpSocket = dgram.createSocket('udp4');

udpSocket.on('error', (error) => {
    console.log(`Socket error: ${error.stack}`);
    udpSocket.close();
});

udpSocket.on('message', (message, remoteInfo) => {
    const hexString = message.toString('hex').toUpperCase();
    console.log(`Hex: ${hexString}`);

    const extractedBytes = message.slice(10, 15);
    const asciiOutput = extractedBytes.toString('ascii').replace(/[^ -~]+/g, ''); // Remove non-printable ASCII characters
    console.log(`ASCII: ${asciiOutput}`);
});

udpSocket.bind(PORT, HOST, () => {
    console.log(`Listening for messages on ${HOST}:${PORT}`);
});
