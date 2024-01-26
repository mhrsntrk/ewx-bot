require("dotenv").config({ path: __dirname + "/.env" });

const cron = require("node-cron");

const { getLifted } = require("./lifting.js");
const { twitterClient } = require("./config/twitter.js");
const { checkLiftingTvl } = require("./tvl.js");

function formatNumber(number) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(number);
}

const tweetNewLifting = async (eventData) => {
  const tweetText = `🚀 ${eventData.amount} has been lifted from 🟣 EWC to 🔵 EWX!`;
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (e) {
    console.error("Failed to send tweet:", e);
  }
};

async function tweetLiftingTvl() {
  try {
    const balanceEth = await checkLiftingTvl();
    const formattedBalanceEth = formatNumber(balanceEth);
    const tweetText = `The total amount of ${formattedBalanceEth} EWT locked on 🔵 EWX!`;
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (e) {
    console.error("Failed to send tweet:", e);
  }
}

getLifted(tweetNewLifting);
cron.schedule("0 */6 * * *", tweetLiftingTvl); // It runs every 6 hours

// Keep the Node.js process running by waiting for a signal interruption (e.g., SIGINT from pressing CTRL+C)
process.on("SIGINT", () => {
  console.log("Process interrupted. Exiting gracefully.");
  process.exit(0);
});
