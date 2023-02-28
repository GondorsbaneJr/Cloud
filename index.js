require('dotenv').config();
const { prefix, token, guildId, clientId } = require('./config.json');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { setupMusicCommands } = require('./commands/musicCommands.js');
const { PermissionsBitField } = require('discord.js');
const client = new Client({
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
const path = require('node:path');

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const commands = [];

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))

commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        console.log(`${file} loaded from ${folder}`)
        client.commands.set(props.config.name, props)
    }
});

client.on("messageCreate", async message => {
    //Check if author is a client or the message was sent in dms and return
    if(message.author.client) return;
    if(message.channel.type === "dm") return;

    //get prefix from config and prepare message so it can be read as a command
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //Check for prefix
    if(!cmd.startsWith(prefix)) return;

    //Get the command from the commands collection and then if the command is found run the command file
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('guildMemverAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
})


// multiple activity status 
client.on('ready', () => {
    console.log(`${client.user.username} is online!`);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('-help', { type: 'LISTENING' });
});

setupMusicCommands(client, prefix);

// login via config.json
client.login(token);