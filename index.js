require("dotenv").config({ path: __dirname + "/.env" });

const cron = require("node-cron");

const { getLifted } = require("./lifting.js");
const { twitterClient } = require("./config/twitter.js");
const { sendTelegramMessage } = require("./config/telegram.js");
const { checkLiftingTvl } = require("./tvl.js");

function formatNumber(number) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(number);
}

const notifyNewLifting = async (eventData) => {
  const formattedAmountEth = formatNumber(eventData.amount);
  const message = `${formattedAmountEth} $EWT lifted from 🟣 EWC to 🔵 EWX`;
  try {
    await twitterClient.v2.tweet(message);
    console.log("Tweet sent successfully!");
    await sendTelegramMessage(message);
    console.log("Telegram message sent successfully!");
  } catch (e) {
    console.error("Failed to send tweet or message:", e);
  }
};

async function notifyLiftingTvl() {
  try {
    const balanceEth = await checkLiftingTvl();
    const formattedBalanceEth = formatNumber(balanceEth);
    const message = `${formattedBalanceEth} $EWT locked on 🔵 EWX`;
    await twitterClient.v2.tweet(message);
    console.log("Tweet sent successfully!");
    await sendTelegramMessage(message);
    console.log("Telegram message sent successfully!");
  } catch (e) {
    console.error("Failed to send tweet or message:", e);
  }
}

getLifted(notifyNewLifting);
cron.schedule(process.env.CRON_TVL, notifyLiftingTvl);

// Keep the Node.js process running by waiting for a signal interruption (e.g., SIGINT from pressing CTRL+C)
process.on("SIGINT", () => {
  console.log("Process interrupted. Exiting gracefully.");
  process.exit(0);
});
