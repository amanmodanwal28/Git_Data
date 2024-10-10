const dgram = require('dgram');

// UDP Multicast address and port
const MULTICAST_ADDR = '239.0.0.1';
const PORT = 800;

// Create a UDP socket
const server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

// Bind socket to listen for messages
server.bind(PORT, () => {
    console.log(`UDP server listening on port ${PORT}`);

    // Add membership to multicast group
    server.addMembership(MULTICAST_ADDR);
});

// Handle incoming messages
server.on('message', (msg, rinfo) => {
    console.log(`Received message from ${rinfo.address}:${rinfo.port}`);
    console.log(`Message content: ${msg.toString()}`);
});

// Handle errors
server.on('error', (err) => {
    console.error('UDP server error:', err);
    server.close();
});

// Close socket on process exit
process.on('SIGINT', () => {
    console.log('Closing UDP server');
    server.close();
    process.exit();
});