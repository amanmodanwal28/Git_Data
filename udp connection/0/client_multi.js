const dgram = require('dgram');

// UDP Multicast address and port
const MULTICAST_ADDR = '239.0.0.1';
const PORT = 8001;

// Message to send
const message = 'Hello Multicast World!';

// Create a UDP socket
const client = dgram.createSocket('udp4');

// Bind socket to send from specific port (optional, but often required for multicast)
client.bind(8001, () => {
    client.setBroadcast(true); // Enable broadcasting (not necessary for multicast, but doesn't hurt)
    client.setMulticastTTL(128); // Set TTL for multicast packets
    client.addMembership(MULTICAST_ADDR); // Add membership to multicast group

    // Send message every second
    setInterval(() => {
        client.send(message, "800", MULTICAST_ADDR, (err) => {
            if (err) {
                console.error('Error sending message:', err);
            } else {
                console.log(`Message sent to ${MULTICAST_ADDR}:${PORT}`);
            }
        });
    }, 1000); // Send message every 1000 ms (1 second)
});

// Handle errors
client.on('error', (err) => {
    console.error('UDP client error:', err);
    client.close();
});

// Close socket on process exit
process.on('SIGINT', () => {
    console.log('Closing UDP client');
    client.close();
    process.exit();
});