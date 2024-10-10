const dgram = require('dgram');

// Create a UDP socket
const socket = dgram.createSocket({ type: 'udp4' });

// Define the multicast group and port
const multicastAddress = '239.192.0.1'; // Example multicast address
const multicastPort = 12345;

setInterval(sendMessage, 2000)

function sendMessage() {

  socket.send(message, 0, message.length, multicastPort, multicastAddress, (err) => {
  if (err) {
    console.error('Error sending message:', err);
  } else {
    console.log('Message sent successfully:', message);
  }


});
}

// Send a multicast message
const message = 'Hello from sender from aman .';












// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const fs = require('fs');
// const path = require('path');

// // Serve static files from the "uploads" folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Serve the HTML and JavaScript client code
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Handle socket.io connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   let currentVideoIndex = -1;
//   let videoFiles = [];

//   // Get the list of video files from the "uploads" folder
//   fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return;
//     }
//     videoFiles = files.filter(file => file.endsWith('.mp4')); // Assuming only MP4 files
//     if (videoFiles.length > 0) {
//       playNextVideo();
//     }
//   });

//   // Play the next video in the sequence
//   function playNextVideo() {
//     currentVideoIndex++;
//     if (currentVideoIndex >= videoFiles.length) {
//       currentVideoIndex = 0; // Loop back to the first video if no more videos left
//     }
//     const nextVideoUrl = `/uploads/${videoFiles[currentVideoIndex]}`;
//     io.emit('playVideo', nextVideoUrl);
//   }

//   // Listen for the 'videoEnded' event from the client
//   socket.on('videoEnded', () => {
//     playNextVideo();
//   });

//   // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });

// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


















// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const fs = require('fs');
// const path = require('path');
// const rangeParser = require('range-parser');

// // Serve the HTML and JavaScript client code
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Handle socket.io connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   let currentVideoIndex = -1;
//   let videoFiles = [];

//   // Get the list of video files from the "uploads" folder
//   fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return;
//     }
//     videoFiles = files.filter(file => file.endsWith('.mp4')); // Assuming only MP4 files
//     if (videoFiles.length > 0) {
//       playNextVideo();
//     }
//   });

//   // Play the next video in the sequence
//   function playNextVideo() {
//     currentVideoIndex++;
//     if (currentVideoIndex >= videoFiles.length) {
//       currentVideoIndex = 0; // Loop back to the first video if no more videos left
//     }
//     const nextVideoPath = path.join(__dirname, 'uploads', videoFiles[currentVideoIndex]);
//     const videoSize = fs.statSync(nextVideoPath).size;
    
//     // Send the video file as a stream
//     socket.emit('playVideo', { path: nextVideoPath, size: videoSize });
//   }

//   // Listen for disconnection
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// // Stream video files
// app.get('/stream/:videoFileName', (req, res) => {
//   const videoFileName = decodeURIComponent(req.params.videoFileName);
//   const videoPath = videoFileName; // Use videoFileName directly

//   fs.stat(videoPath, (err, stats) => {
//     if (err) {
//       console.error('Error reading video file:', err);
//       res.status(500).end();
//       return;
//     }

//     const { size } = stats;
//     const range = req.headers.range;

//     if (!range) {
//       res.status(400).send('Requires Range header');
//       return;
//     }

//     const parts = rangeParser(size, range, { combine: true });

//     if (parts === -1 || parts.type !== 'bytes' || parts.length > 1) {
//       res.status(416).send('Range not satisfiable');
//       return;
//     }

//     const start = parts[0].start;
//     const end = parts[0].end;

//     const chunkSize = (end - start) + 1;
//     const fileStream = fs.createReadStream(videoPath, { start, end });

//     res.writeHead(206, {
//       'Content-Range': `bytes ${start}-${end}/${size}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunkSize,
//       'Content-Type': 'video/mp4',
//     });

//     fileStream.pipe(res);
//   });
// });



// // Start the server
// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
















// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const fs = require('fs');
// const path = require('path');

// // Serve static files from the "uploads" folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Serve the HTML and JavaScript client code
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Handle socket.io connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   let currentVideoIndex = -1;
//   let videoFiles = [];

//   // Get the list of video files from the "uploads" folder
//   fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return;
//     }
//     videoFiles = files.filter(file => file.endsWith('.mp4')); // Assuming only MP4 files
//     if (videoFiles.length > 0) {
//       playNextVideo();
//     }
//   });

//   // Play the next video in the sequence
//   function playNextVideo() {
//     currentVideoIndex++;
//     if (currentVideoIndex >= videoFiles.length) {
//       currentVideoIndex = 0; // Loop back to the first video if no more videos left
//     }
//     const nextVideoUrl = `/uploads/${videoFiles[currentVideoIndex]}`;
//     io.emit('playVideo', nextVideoUrl);
//   }

//   // Listen for the 'videoEnded' event from the client
//   socket.on('videoEnded', () => {
//     playNextVideo();
//   });

//   // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });

// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
















// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const fs = require('fs');
// const path = require('path');

// // Serve static files from the "uploads" folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Serve the HTML and JavaScript client code
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Handle socket.io connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   let currentVideoIndex = -1;
//   let videoFiles = [];

//   // Get the list of video files from the "uploads" folder
//   fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return;
//     }
//     videoFiles = files.filter(file => file.endsWith('.mp4')); // Assuming only MP4 files
//     if (videoFiles.length > 0) {
//       playNextVideo();
//     }
//   });

//   // Play the next video in the sequence
//   function playNextVideo() {
//     currentVideoIndex++;
//     if (currentVideoIndex >= videoFiles.length) {
//       currentVideoIndex = 0; // Loop back to the first video if no more videos left
//     }
//     const nextVideoUrl = `/uploads/${videoFiles[currentVideoIndex]}`;
//     io.emit('playVideo', nextVideoUrl);
//   }

//   // Listen for the 'videoEnded' event from the client
//   socket.on('videoEnded', () => {
//     playNextVideo();
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });











// const express = require('express');
// const app = express();
// const path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

// // Serve index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });












// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Serve static files from the public directory
// app.use(express.static('public'));

// // Keep track of connected clients
// let clients = [];

// // Handle signaling messages
// io.on('connection', (socket) => {
//   console.log('Client connected');
//   clients.push(socket.id);

//   // Broadcast new user to existing clients
//   socket.broadcast.emit('newUser', socket.id);

//   // Relay signaling messages
//   socket.on('signal', (data) => {
//     io.to(data.target).emit('signal', {
//       sender: socket.id,
//       signal: data.signal,
//     });
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//     clients = clients.filter((client) => client !== socket.id);
//     socket.broadcast.emit('userLeft', socket.id);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
























// // const express = require('express');
// // const http = require('http');
// // const socketIO = require('socket.io');

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIO(server);

// // // Serve static files from the public directory
// // app.use(express.static('public'));

// // // Keep track of connected clients
// // let clients = [];

// // // Configure Socket.IO to handle WebRTC signaling
// // io.on('connection', (socket) => {
// //   console.log('Client connected');
  
// //   clients.push(socket.id);

// //    // Broadcast new user to existing clients
// //   socket.broadcast.emit('newUser', socket.id);


// //   socket.on('offer', (offer) => {
// //     console.log('Received offer:', offer);
// //     socket.broadcast.emit('offer', offer);
// //   });

// //   socket.on('answer', (answer) => {
// //     console.log('Received answer:', answer);
// //     socket.broadcast.emit('answer', answer);
// //   });

// //   socket.on('icecandidate', (candidate) => {
// //     console.log('Received ICE candidate:', candidate);
// //     socket.broadcast.emit('icecandidate', candidate);
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('Client disconnected');
// //   });
// // });

// // // Start the server
// // const PORT = process.env.PORT || 3000;
// // server.listen(PORT, () => {
// //   console.log(`Server listening on port ${PORT}`);
// //   console.log(`http://localhost:${PORT}/`);
// // });


















// // // Import required libraries
// // const express = require('express');
// // const http = require('http');
// // const { Server } = require('socket.io');
// // const { ExpressPeerServer } = require('peer');

// // // Initialize Express app
// // const app = express();
// // const server = http.createServer(app);

// // // Set up Socket.IO server
// // const io = new Server(server);

// // // Set up PeerJS server
// // const peerServer = ExpressPeerServer(server, {
// //   debug: true
// // });

// // // Serve PeerJS requests
// // app.use('/peerjs', peerServer);

// // // Serve static files
// // app.use(express.static('public'));

// // // Handle WebSocket connections
// // io.on('connection', (socket) => {
// //   console.log('A user connected');

// //   // Handle 'join-room' event
// //   socket.on('join-room', (roomId, userId) => {
// //     socket.join(roomId);
// //     console.log(`User ${userId} joined room ${roomId}`);
    
// //     // Send 'user-connected' event to all other users in the room
// //     socket.to(roomId).broadcast.emit('user-connected', userId);
    
// //     // Handle 'disconnect' event
// //     socket.on('disconnect', () => {
// //       console.log(`User ${userId} disconnected`);
// //       socket.to(roomId).broadcast.emit('user-disconnected', userId);
// //     });
// //   });
  
// //   // Handle 'offer' event
// //   socket.on('offer', (offer, roomId, userId) => {
// //     // Broadcast offer to all users in the room except the sender
// //     socket.to(roomId).broadcast.emit('offer', offer, userId);
// //   });

// //   // Handle 'answer' event
// //   socket.on('answer', (answer, roomId, userId) => {
// //     // Broadcast answer to all users in the room except the sender
// //     socket.to(roomId).broadcast.emit('answer', answer, userId);
// //   });

// //   // Handle 'ice-candidate' event
// //   socket.on('ice-candidate', (candidate, roomId, userId) => {
// //     // Broadcast ICE candidate to all users in the room except the sender
// //     socket.to(roomId).broadcast.emit('ice-candidate', candidate, userId);
// //   });
// // });

// // // Start server
// // const PORT = process.env.PORT || 3000;
// // server.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });














// // var PORT = 5007;
// // var MULTICAST_ADDR = '239.255.255.10'; // Multicast address within site-local scope

// // var dgram = require('dgram');
// // var server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

// // server.on('listening', function () {
// //     var address = server.address();
// //     console.log('UDP Server listening on ' + address.address + ":" + address.port);
// //     server.addMembership(MULTICAST_ADDR);
// // });

// // server.on('message', function (message, remote) {
// //     console.log('Received message from client: ' + message.toString());
// //     console.log('From: ' + remote.address + ':' + remote.port);
// // });

// // server.bind(PORT);








// // // server.js
// // var PORT = 5007;
// // var HOST = '192.168.10.54'; // Example IP address of the Wi-Fi interface

// // var dgram = require('dgram');
// // var server = dgram.createSocket("udp4");

// // server.on('listening', function () {
// //     var address = server.address();
// //     console.log('UDP Server listening on ' + address.address + ":" + address.port);
// // });

// // server.on('message', function (message, remote) {
// //     console.log('Received message from ' + remote.address + ':' + remote.port + ' - ' + message.toString());
// // });

// // server.bind(PORT);











// // var news = [
// //     "Borussia ",
// //     "Tornado warning",
// //     "More weekend",
// //     "Android ",
// //     "iPad2 out",
// //     "Nation's"
// // ];

// // var dgram = require('dgram');
// // var server = dgram.createSocket("udp4");


// // server.bind(function () {
// //     server.setBroadcast(true)
// //     server.setMulticastTTL(128);
// //     server.addMembership('239.255.255.252');
// //     setInterval(broadcastNew, 2000);
// // });

// // function broadcastNew() {
// //     var message = new Buffer.from(news[Math.floor(Math.random() * news.length)]);
// //     server.send(message, 0, message.length, 5007, "239.255.255.252");
// //     console.log(" ")
// //     console.log("Sent => " + message + " .");
// // }