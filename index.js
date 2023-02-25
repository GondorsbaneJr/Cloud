require('dotenv').config();
const { prefix } = require('./config.json');
const { Client, Intents, Collection, GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { setupMusicCommands } = require('./commands/musicCommands.js');
const bot = new Client({ 
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

const fs = require("fs");

bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)
    console.log(`${file} loaded`)
    bot.commands.set(props.config.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))

commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        console.log(`${file} loaded from ${folder}`)
        bot.commands.set(props.config.name, props)
    }
});

bot.on("messageCreate", async message => {
    //Check if author is a bot or the message was sent in dms and return
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //get prefix from config and prepare message so it can be read as a command
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //Check for prefix
    if(!cmd.startsWith(prefix)) return;

    //Get the command from the commands collection and then if the command is found run the command file
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
});

bot.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

bot.on('guildMemverAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
})


// multiple activity status 
bot.on('ready', () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity('-help', { type: 'LISTENING' });
    bot.user.setStatus('dnd');
});

setupMusicCommands(client, prefix);

// login via config.json
