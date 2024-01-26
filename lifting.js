const ethers = require("ethers");

const ABI = require("./abi.json");
require("dotenv").config();

async function getLifted(callback) {
  let provider = new ethers.providers.WebSocketProvider(
    process.env.EWC_WSS_RPC_URL,
  );

  let contract = new ethers.Contract(
    process.env.EWC_LIFTING_CONTRACT,
    ABI,
    provider,
  );

  const handleLogLifted = (t1Address, amount) => {
    const amountInEth = ethers.utils.formatEther(amount);
    let liftingEvent = {
      address: t1Address,
      amount: amountInEth,
    };
    console.log(liftingEvent);
    callback(liftingEvent);
  };

  // Attach the event listener
  contract.on("LogLifted", handleLogLifted);

  // Reattach the event listener
  const reattachEventListener = () => {
    contract = new ethers.Contract(
      process.env.EWC_LIFTING_CONTRACT,
      ABI,
      provider,
    );
    contract.on("LogLifted", handleLogLifted);
    console.log("Event listener reattached.");
  };

  // Handle WebSocketProvider events to maintain the connection
  provider._websocket.on("close", () => {
    console.log("WebSocket connection closed. Attempting to reconnect...");
    setTimeout(() => {
      provider = new ethers.providers.WebSocketProvider(
        process.env.EWC_WSS_RPC_URL,
      );
      provider._websocket.on("open", reattachEventListener);
    }, 5000); // Reconnect after 5 seconds
  });

  provider._websocket.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
}

module.exports = { getLifted };
