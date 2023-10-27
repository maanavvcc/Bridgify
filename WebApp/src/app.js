const socket = io.connect('http://136.57.134.145:80');
const connectionKeyInput = document.getElementById('connection-key');
const statusElement = document.getElementById('status');

function connect() {
    const key = connectionKeyInput.value;
    if (key.length === 6) {
        socket.emit('mobile-connect', key);
    } else {
        statusElement.textContent = 'Please enter a 6-digit key.';
    }
}

socket.on('connection-error', (message) => {
    statusElement.textContent = message;
});


function buttonPressed() {
    const key = connectionKeyInput.value;
    socket.emit('button-pressed', key);
}

function buttonPressed(shortcut) {
    const key = connectionKeyInput.value;
    socket.emit('button-pressed', {
        key,
        shortcut
    });
}



socket.on('mobile-connected', () => {
    statusElement.textContent = 'Connected to desktop!';
    console.log("HI");
    document.getElementById('connected-container').style.display = 'block';
});