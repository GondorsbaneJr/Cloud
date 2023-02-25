const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    config: {
        name: 'ping',
        description: 'Get ping of the bot',
        usage: `!ping`,
    },
    async run (bot,message,args) {
        message.channel.send("My ping is \`" + bot.ws.ping + " ms\`");
    },
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get ping of the bot'),
        
        async execute(interaction, client) {
        interaction.reply("My ping is \`" + client.ws.ping + " ms\`");
    },
}