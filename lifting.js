const ethers = require("ethers");
const ABI = require("./abi.json");
const cron = require("node-cron");
require("dotenv").config();

async function getLifted(callback) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.EWC_RPC_URL,
  );

  const contract = new ethers.Contract(
    process.env.EWC_LIFTING_CONTRACT,
    ABI,
    provider,
  );

  let lastBlockChecked = await provider.getBlockNumber();

  cron.schedule("*/10 * * * *", async () => {
    // This cron job runs every 10 minutes
    const currentBlock = await provider.getBlockNumber();
    const filter = contract.filters.LogLifted();
    const events = await contract.queryFilter(
      filter,
      lastBlockChecked + 1,
      currentBlock,
    );

    if (events.length > 0) {
      events.forEach((event) => {
        const amountInEth = ethers.utils.formatEther(event.args.amount);
        // Check if the amount is greater than or equal to 1000 ETH
        if (parseFloat(amountInEth) >= 1000) {
          callback({
            token: event.args.token,
            t1Address: event.args.t1Address,
            t2PublicKey: event.args.t2PublicKey,
            amount: amountInEth,
          });
        }
      });
      lastBlockChecked = currentBlock; // Update the last checked block
    }
  });
}

module.exports = { getLifted };
