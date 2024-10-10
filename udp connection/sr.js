const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`Received message from ${rinfo.address}:${rinfo.port}: ${msg.toString()}`);
    // Process the message here
});

server.bind(8000, '0.0.0.0'); // Bind to all available interfaces

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on('error', (err) => {
    console.error(`UDP server error:\n${err.stack}`);
    server.close();
});