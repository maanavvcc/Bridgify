const socket = io.connect('http://136.57.134.145:80');
const connectionKeyInput = document.getElementById('connection-key');
const statusElement = document.getElementById('status');
const connectedContainer = document.getElementById('connected-container');
const connectionContainer = document.getElementById('connection-container');
const disconnectButton = document.getElementById('disconnect-button');

function connect() {
    const key = connectionKeyInput.value;
    if (key.length === 6) {
    socket.emit('mobile-connect', key);
    } else {
    statusElement.textContent = 'Please enter a 6-digit key.';
    }
}

function buttonPressed(shortcut) {
    const key = connectionKeyInput.value;
    socket.emit('button-pressed', { key, shortcut });
}

function disconnect() {
    socket.emit('mobile-disconnect');
    showDisconnectedStatus();
}

socket.on('connection-error', (message) => {
    statusElement.textContent = message;
});

socket.on('mobile-connected', () => {
    statusElement.textContent = 'Connected to desktop!';
    connectedContainer.style.display = 'block';
    connectionContainer.style.display = 'none';
    disconnectButton.classList.remove('hidden');
});

socket.on('desktop-disconnected', () => {
    showDisconnectedStatus();
});

function showDisconnectedStatus() {
    connectedContainer.style.display = 'none';
    connectionContainer.style.display = 'block';
    disconnectButton.classList.add('hidden');
    statusElement.textContent = 'Disconnected.';
}