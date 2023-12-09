const socket = io.connect("http://localhost:80");
const connectionKeyInput = document.getElementById("connection-key");
const statusElement = document.getElementById("status");
const connectedContainer = document.getElementById("connected-container");
const connectionContainer = document.getElementById("connection-container");
const disconnectButton = document.getElementById("disconnect-button");
const statusImage = document.getElementById("status-image");

function connect() {
  const key = connectionKeyInput.value;
  if (key.length === 6) {
    socket.emit("mobile-connect", key);
  } else {
    statusElement.textContent = "Please enter a 6-digit key.";
  }
}

function buttonPressed(shortcut) {
  const key = connectionKeyInput.value;
  socket.emit("button-pressed", { key, shortcut });
}

function disconnect() {
  socket.emit("mobile-disconnect");
  showDisconnectedStatus();
}

socket.on("connection-error", (message) => {
  statusElement.textContent = message;
});

statusImage.onclick = () => {
  if (connectedContainer.style.display === "block") {
    disconnect();
  } else {
    connect();
  }
};

socket.on("mobile-connected", () => {
  document.getElementById("connection-status").innerHTML =
    '<span id="connect-text" class="text-green-500">CONNECTED TO</span> YOUR COMPUTER';
  statusElement.textContent = "Connected to desktop!";
  statusImage.src = "assets/connected.png";
  connectedContainer.style.display = "block";
  connectionContainer.style.display = "none";
  disconnectButton.classList.remove("hidden");
  document.getElementById("cards-container").classList.remove("hidden");
});

socket.on("desktop-disconnected", () => {
  showDisconnectedStatus();
});

function showDisconnectedStatus() {
  document.getElementById("connection-status").innerHTML =
    '<span id="connect-text" class="text-orange-500">CONNECT TO</span> YOUR COMPUTER';
  statusImage.src = "assets/disconnected.png";
  connectedContainer.style.display = "none";
  connectionContainer.style.display = "block";
  disconnectButton.classList.add("hidden");
  statusElement.textContent = "Disconnected.";
  document.getElementById("cards-container").classList.add("hidden");
}

function showCardDetails(cardId) {
  const cardDetailsContainer = document.getElementById(
    "card-details-container"
  );
  const cardDetails = document.getElementById("card-details");

  // Clear previous card details
  cardDetails.innerHTML = "";

  // Add the buttons for the selected card
  if (cardId === "photoshop") {
    const buttonCtrlC = document.createElement("button");
    buttonCtrlC.textContent = "CTRL + C";
    buttonCtrlC.onclick = () => buttonPressed("ctrl-c");
    buttonCtrlC.classList.add(
      "bg-green-500",
      "hover:bg-green-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "m-2"
    );

    const buttonCtrlV = document.createElement("button");
    buttonCtrlV.textContent = "CTRL + V";
    buttonCtrlV.onclick = () => buttonPressed("ctrl-v");
    buttonCtrlV.classList.add(
      "bg-green-500",
      "hover:bg-green-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "m-2"
    );

    // ... [add other buttons as needed] ...

    cardDetails.appendChild(buttonCtrlC);
    cardDetails.appendChild(buttonCtrlV);
  }

  // Show the card details view
  document.getElementById("main-content").classList.add("hidden");
  cardDetailsContainer.classList.remove("hidden");
}

function toggleCard(cardId) {
  const cardButtons = document.getElementById(`${cardId}-buttons`);
  if (cardButtons.classList.contains("hidden")) {
    cardButtons.classList.remove("hidden");
    cardButtons.classList.add("show");
  } else {
    cardButtons.classList.remove("show");
    cardButtons.classList.add("hidden");
  }
}

function hideCardDetails() {
  document.getElementById("main-content").classList.remove("hidden");
  document.getElementById("card-details-container").classList.add("hidden");
}
