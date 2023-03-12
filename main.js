require('dotenv/config');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on('ready', () => {
    console.log('Successfully logged in as ' + client.user.tag + '!');
});

client.on('messageCreate', message => {
    if (message.mentions.users.has(client.user.id)) {
        const split = message.content.split(' ');
        let args = {};
        let idx = 0;
        split.forEach((value, index, array) => {
            if (!(value.trim() === ''))
                args[idx++] = value;
        });
        if (args[1] === 'ping') {
            let ms = new Date().getTime() - message.createdTimestamp;
            message.reply('pong: %d ms', ms);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);