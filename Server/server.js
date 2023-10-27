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


app.use(express.static('public'));

app.get('/connections', (req, res) => {
  res.json(connections);
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../', 'WebApp', 'src'));
// });

app.use('/', express.static(path.join(__dirname, '../', 'WebApp', 'src')))

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle desktop connection
  socket.on('desktop-connect', () => {
    const key = generateKey();
    connections[key] = { desktop: socket.id, mobile: null };
    socket.emit('key', key);
  });

  // Handle mobile connection
  socket.on('mobile-connect', (key) => {
    if (connections[key] && !connections[key].mobile) {
      connections[key].mobile = socket.id;
      io.to(connections[key].desktop).emit('mobile-connected');
      socket.emit('mobile-connected'); // Emit directly to the mobile client
      console.log('Mobile connected to desktop');
    } else {
      socket.emit('connection-error', 'Invalid key or desktop already connected');
    }
  });
  
  

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const key in connections) {
      if (connections[key].desktop === socket.id || connections[key].mobile === socket.id) {
        delete connections[key];
      }
    }
  });

  socket.on('button-pressed', ({ key, shortcut }) => {
    if (connections[key] && connections[key].desktop) {
      io.to(connections[key].desktop).emit('button-pressed', shortcut);
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
