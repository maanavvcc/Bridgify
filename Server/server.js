const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require('path');

const connections = {};
const cors = require('cors');
app.use(cors());

// Static Serves (Mobile Serves)
app.use(express.static('public'));

app.get('/connections', (req, res) => {
  res.json(connections);
});

app.use('/', express.static(path.join(__dirname, '../', 'WebApp', 'src')));

let serverKey;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Ensure that the current socket doesn't have an existing connection
  if (!connections[socket.id]) {
    connections[socket.id] = { desktop: null, mobile: null };
  }

  socket.on('desktop-connect', () => {
    // Disconnect existing desktop connection if present
    if (connections[socket.id].desktop) {
      io.to(connections[socket.id].desktop).emit('mobile-disconnected');
    }

    // Generate a new key for the desktop connection
    serverKey = generateKey();
    connections[socket.id].desktop = socket.id;
    
    // Inform the desktop client about the new key
    io.to(socket.id).emit('key', serverKey);
  });

  // Handle mobile connection
  socket.on('mobile-connect', (submittedKey) => {
    console.log('Submitted Key:', submittedKey);
    console.log('Server Key:', serverKey);

    // Mobile device trying to connect
    if (submittedKey === serverKey) {
      // Disconnect existing mobile connection if present
      if (connections[socket.id].mobile) {
        io.to(connections[socket.id].mobile).emit('desktop-disconnected');
      }

      connections[socket.id].mobile = socket.id;
      io.to(socket.id).emit('mobile-connected');
      console.log('Mobile connected successfully');
    } else {
      io.to(socket.id).emit('connection-error', 'Invalid key');
      console.log('Invalid key submitted. Connection rejected.');
      socket.disconnect(); // Disconnect the socket on an invalid key
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    if (connections[socket.id]) {
      const desktopSocketId = connections[socket.id].desktop;
      const mobileSocketId = connections[socket.id].mobile;

      if (desktopSocketId) {
        io.to(desktopSocketId).emit('mobile-disconnected');
      }

      if (mobileSocketId) {
        io.to(mobileSocketId).emit('desktop-disconnected');
      }

      // Clean up the connections object
      delete connections[socket.id];
    }
  });
  
  socket.on('reset-connection', () => {
    for (const key in connections) {
      if (connections[key].desktop === socket.id) {
        if (connections[key].mobile) {
          io.to(connections[key].mobile).emit('desktop-disconnected');
          delete connections[key].mobile;
        }
        const newKey = generateKey();
        connections[socket.id].desktop = null; // Update the desktop socket association
        connections[newKey] = { desktop: socket.id, mobile: null };
        socket.emit('key', newKey);
      }
    }
  });

  socket.on('mobile-disconnect', () => {
    console.log('Mobile disconnected:', socket.id);
    for (const key in connections) {
      if (connections[key].mobile === socket.id) {
        if (connections[key].desktop) {
          io.to(connections[key].desktop).emit('mobile-disconnected');
        }
        delete connections[key].mobile;
        break;
      }
    }
  });
});

function generateKey() {
  let key = '';
  for (let i = 0; i < 6; i++) {
    key += Math.floor(Math.random() * 10);
  }
  return key;
}

const PORT = 80;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
