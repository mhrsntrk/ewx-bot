const ethers = require("ethers");
require("dotenv").config();

async function checkLiftingTvl() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.EWC_RPC_URL,
  );
  const balance = await provider.getBalance(process.env.EWC_LIFTING_CONTRACT);
  const balanceEth = ethers.utils.formatEther(balance);
  console.log("tvl: " + balanceEth);
  return balanceEth;
}

module.exports = {
  checkLiftingTvl,
};
