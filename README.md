# EWX-BOT

This project is a Node.js application designed to monitor events on the Energy Web Chain, specifically focusing on a smart contract that handles token lifting operations. It sends notifications via Twitter and Telegram whenever a significant event, such as a token lift, occurs on the monitored smart contract.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/mhrsntrk/ewx-bot.git
cd ewx-bot
npm install
```

## Setting Up Telegram Bot

To send messages via Telegram, you need to set up a Telegram bot:

1. Open Telegram and search for "BotFather".
2. Start a chat and use the `/newbot` command to create a new bot.
3. Follow the instructions to name your bot and get a token.
4. Add the bot to a group or send a direct message to it.
5. Retrieve your chat ID by visiting `https://api.telegram.org/bot<YourBotToken>/getUpdates`.

## Setting Up Twitter API

To set up the Twitter API v2, follow these steps:

1. Go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) and create a new project/app.
2. Navigate to the "Keys and tokens" section and generate your "API Key" and "API Secret Key".
3. Set the required permissions for your app and generate "Access Token" and "Access Token Secret".
4. Add the following environment variables to the `.env` file.

## Add Environment Variables

Create a `.env` file (based on the `.env.example`) in the root directory of your project and update it with your specific details.

## Usage

To run the project locally, use:

```bash
node index.js
```

## Deploy Using Caprover

To deploy the app using Caprover into any VM, follow these steps:

1. Ensure you have CapRover CLI installed.

```bash
npm install -g caprover
```

2. Log in to your CapRover server

```bash
caprover login
```

3. Check `captain-definition` and `Dockerfile` in the repo, modify if necessary.
4. Deploy your app using the CapRover CLI

```bash
caprover deploy
```

5. Configure the app details (env, https, container port, etc.) on the Caprover dashboard.

## Authors

mhrsntrk ([@mhrsntrk](https://github.com/mhrsntrk))
