require('dotenv').config();
const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const ytdl = require('ytdl-core');
const { setupMusicCommands } = require('./commands/musicCommands.js');
const { PermissionsBitField } = require('discord.js');
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.GUILDS,
        GatewayIntentBits.GUILD_MEMBERS,
        GatewayIntentBits.GUILD_BANS,
        GatewayIntentBits.GUILD_EMOJIS_AND_STICKERS,
        GatewayIntentBits.GUILD_INTEGRATIONS,
        GatewayIntentBits.GUILD_WEBHOOKS,
        GatewayIntentBits.GUILD_INVITES,
        GatewayIntentBits.GUILD_VOICE_STATES,
        GatewayIntentBits.GUILD_PRESENCES,
        GatewayIntentBits.GUILD_MESSAGES,
        GatewayIntentBits.GUILD_MESSAGE_REACTIONS,
        GatewayIntentBits.GUILD_MESSAGE_TYPING,
        GatewayIntentBits.DIRECT_MESSAGES,
        GatewayIntentBits.DIRECT_MESSAGE_REACTIONS,
        GatewayIntentBits.DIRECT_MESSAGE_TYPING,
        GatewayIntentBits.GUILD_PRESENCES
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const fs = require('fs');
const { GatewayIntentBits } = require('discord.js');
client.commands = new Discord.Collection(
    fs.readdirSync('./commands').filter(file => file.endsWith('.js')).map(file => {
        const command = require(`./commands/${file}`);
        return [command.name, command];
    })
);

client.once('ready', () => {
    console.log('Ready!');
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'beep') {
        message.channel.send('Boop.');
    }
});

client.login(token);