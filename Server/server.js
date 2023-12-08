const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require('path');
const si = require('systeminformation');
const bcrypt = require('bcrypt');
let mobileConnected = 0; // Initialize mobileConnected as a variable

const connections = {};
const cors = require('cors');
app.use(cors());

// Static Serves (Mobile Serves)
app.use(express.static('public'));

app.get('/connections', (req, res) => {
  res.json(connections);
});

app.use('/', express.static(path.join(__dirname, '../', 'WebApp', 'src')));

let serverKey = generateKey();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Initialize connections[socket.id] as an object
  connections[socket.id] = {};

  socket.on('desktop-connect', () => {
    // Generate a new key for the desktop connection
    generateKey().then(({ plaintextKey, hashedKey }) => {
      serverKey = hashedKey; // Update serverKey with hashed key
      connections[socket.id].desktop = socket.id;

      // Inform the desktop client about the new key
      io.to(socket.id).emit('key', plaintextKey);
    });
  });

  // Handle mobile connection
  socket.on('mobile-connect', async (submittedKey) => {
    console.log('Submitted Key:', submittedKey);
    console.log('Server Key:', serverKey);

    try {
      // Compare the submitted key with the hashed key using bcrypt
      const isValidKey = await bcrypt.compare(submittedKey, serverKey);

      // Mobile device trying to connect
      if (mobileConnected === 0 && isValidKey) {
        mobileConnected += 1;
        console.log(mobileConnected);
        connections[socket.id].mobile = socket.id;
        io.to(socket.id).emit('mobile-connected');
        console.log('Mobile connected successfully');
      } else {
        io.to(socket.id).emit('connection-error', 'Invalid key');
        console.log('Invalid key submitted. Connection rejected.');
        socket.disconnect(); // Disconnect the socket on an invalid key
      }
    } catch (error) {
      console.error('Error comparing keys:', error.message);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (connections[socket.id] && connections[socket.id].mobile === socket.id) {
      mobileConnected -= 1;
      console.log(mobileConnected);
    }
    console.log('User disconnected:', socket.id);
    // Optionally, you can remove the connection object when a socket disconnects
    delete connections[socket.id];
  });

  //Handle Info Transfer to Mobile
  socket.on('send-shortcuts', (shortcuts) => {
    console.log('Server is broadcasting this to the mobile ', shortcuts);
    socket.broadcast.emit('shortcut-info', shortcuts);
  });

  //Handle Shortcut Notification to Desktop
  socket.on('shortcut-pressed', (shortcut) => {
    console.log('Server is broadcasting this to the desktop ', shortcut);
    socket.broadcast.emit('activate-shortcut', shortcut);
  });
});

setInterval(async () => {
  try {
    // Fetch CPU information
    const cpuInfo = await si.cpu();
    // Fetch memory information
    const memInfo = await si.mem();
    // Fetch GPU information
    const gpuInfo = await si.graphics();
    // Fetch CPU temperature information
    const cpuTemperature = await si.cpuTemperature();
    // Fetch CPU utilization information
    const cpuLoad = await si.currentLoad();

    // Combine all information into one object
    const systemInfo = {
      cpu: cpuInfo,
      memory: memInfo,
      gpu: gpuInfo,
      temperatures: { cpu: cpuTemperature },
      utilization: { cpu: cpuLoad },
    };

    // Send system information to all connected sockets
    io.emit('system-info', systemInfo);
  } catch (error) {
    console.error('Error fetching system information:', error.message);
  }
}, 2000); // Fetch every 2 seconds

async function generateKey() {
  let plaintextKey = '';

  // Ensure that the generated key has exactly 6 digits
  while (plaintextKey.length < 6) {
    plaintextKey += Math.floor(Math.random() * 10);
  }

  // Hash the plaintext key using bcrypt
  const hashedKey = await bcrypt.hash(plaintextKey, 10);

  return { plaintextKey, hashedKey };
}

const PORT = 80;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
