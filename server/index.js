const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*', // Allow any origin to connect
    methods: ['GET', 'POST'], // Allow specified methods
  },
});
const cors = require('cors');

app.use(cors()); // Add the cors middleware to your Express app

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const rooms = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle joining a room
  socket.on('join', ({ roomId, username }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [],
        messages: [],
        randomNumber: null,
      };
    }

    const player = { id: socket.id, username };
    rooms[roomId].players.push(player);
    socket.join(roomId);
    socket.emit('roomState', rooms[roomId]);
  });

  // Handle chat messages
  socket.on('message', ({ roomId, username, message }) => {
    const msg = { username, message };
    rooms[roomId].messages.push(msg);
    io.to(roomId).emit('message', msg);
    console.log(message);
  });

  // Handle number-guessing
  socket.on('submitGuess', ({ roomId, guessedNumber }) => {
    const room = rooms[roomId];

    if (room && guessedNumber === room.randomNumber) {
      io.to(roomId).emit('winner', { username: socket.username });
    }
  });

  // Generate the random number for the room
  const generateRandomNumber = (roomId) => {
    const room = rooms[roomId];

    if (room && room.randomNumber === null) {
      room.randomNumber = Math.floor(Math.random() * 10) + 1;
    }
  };

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
