const dgram = require('dgram');

// Create a UDP socket
const socket = dgram.createSocket({ type: 'udp4' });

// Define the multicast group and port
const multicastAddress = '224.0.0.1'; // Example multicast address
const multicastPort = 8000;

// Join the multicast group
socket.on('listening', () => {
    socket.addMembership(multicastAddress);
    console.log(`Joined multicast group ${multicastAddress}`);
});

// Handle incoming messages
socket.on('message', (msg, rinfo) => {
    console.log(`Received message from device 2: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

// Bind the socket to the multicast port
socket.bind(multicastPort, () => {
    console.log(`UDP socket is listening on port ${multicastPort} for multicast messages`);
});









// const obj = {
//     aman: 23,
//     ankit: 25, 
//     aman :35
// }

// console.table(obj)

// const arr = ["aman" ,"ankit","aaa","aman"]
// console.table(arr)

// console.log(typeof obj)










// var PORT = 5007;
// var MULTICAST_ADDR = '239.255.255.10'; // Multicast address within site-local scope
// // var WIFI_INTERFACE_ADDR = '192.168.10.54'; // WiFi interface address

// var dgram = require('dgram');
// var client = dgram.createSocket({ type: 'udp4', reuseAddr: true });

// var message = Buffer.from('Hello from multicast client!');

// function sendMessage() {
//     client.send(message, 0, message.length, PORT, MULTICAST_ADDR, function (err) {
//         if (err) throw err;
//         console.log(`Message sent to ${MULTICAST_ADDR}`);
//     });
// }

// // Send message initially
// sendMessage();

// // Send message every two seconds
// setInterval(sendMessage, 20);

// client.on('message', function (message, remote) {
//     console.log('Received response from server: ' + message.toString());
// });

// client.on('listening', function () {
//     var address = client.address();
//     console.log('Multicast UDP Client listening on ' + address.address + ":" + address.port);
//     client.setMulticastTTL(128);
//     client.addMembership(MULTICAST_ADDR); // Specify the network interface for the membership
// });








// // client.js
// var PORT = 5007;
// var HOST = '192.168.10.54'; // Example IP address of the Wi-Fi interface

// var dgram = require('dgram');
// var client = dgram.createSocket('udp4');

// var message = Buffer.from('Hello from client!');

// client.send(message, 0, message.length, PORT, HOST, function (err) {
//     if (err) throw err;
//     console.log('Message sent to server!');

// });

// client.on('message', function (message, remote) {
//     console.log('Received response from server: ' + message.toString());
// });


// client.on('listening', function () {
//     var address = client.address();
//     console.log('UDP Client listening on ' + address.address + ":" + address.port);
// });










// var PORT = 5007;
// var dgram = require('dgram');

// // var client = dgram.createSocket({ type: 'udp4', reuseAddr: true })
// var client = dgram.createSocket('udp4')
// var HOST = '192.168.10.54'; //this is your own IP

// client.on('listening', function () {
//     var address = client.address();
//     console.log('UDP Client listening on ' + address.address + ":" + address.port);
//     client.setBroadcast(true)
//     client.setMulticastTTL(128);
//     client.addMembership('239.255.255.252');
// });

// client.on('message', function (message, remote) {
//     console.log(' ');
//     console.log('From: ' + remote.address + ':' + remote.port + ' - ' + message);
// });


// client.bind(PORT);