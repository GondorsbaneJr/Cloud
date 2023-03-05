const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'cloud',
    description: 'Cloud command',
    execute(message, args) {
        message.channel.send('Command not ready yet');
    },
    data: new SlashCommandBuilder()
        .setName('cloud')
        .setDescription('Cloud command'),
    async execute(interaction) {
        await interaction.reply('Command not ready yet');
    }
}