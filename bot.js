const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

// Logging function
function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('logs.txt', `${timestamp}: ${message}\n`);
}

app.get('/', (req, res) => {
    res.send('Bot is alive!');
});

app.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
});

// Discord bot code
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    log(`Message received: "${message.content}" in channel ${message.channel.id}`);
    if (message.channel.id === '1339404771089711134' && message.content !== '/bump') {
        message.delete().catch(error => {
            log(`Failed to delete message: ${error}`);
        });
    }
});

client.login(process.env.TOKEN).catch(error => {
    log(`Failed to log in: ${error}`);
});

// Keep-alive script
const fetch = require('node-fetch'); // Use node-fetch v2 or axios
setInterval(() => {
    fetch('https://03759031-819b-441b-89c0-ae37e8a99755-00-1zgzfh4oyuch7.kirk.replit.dev/')
        .then(() => log('Pinged server to keep alive'))
        .catch(error => log(`Failed to ping server: ${error}`));
}, 300000); // Ping every 5 minutes (300,000 milliseconds)