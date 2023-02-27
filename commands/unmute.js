const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'unmute',
    description: 'Unmute a user',
    async execute(interaction, client) {
        const member = interaction.options.getMember('user');
        const role = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!role) {
            await interaction.reply({ content: 'There is no muted role!', ephemeral: true });
        }
        if (!member.roles.cache.has(role.id)) {
            await interaction.reply({ content: 'User is not muted!', ephemeral: true });
        }
        await member.roles.remove(role);
        await interaction.reply({ content: `${member} has been unmuted!`, ephemeral: true });
    },
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a user')
        .addUserOption(option => option.setName('user').setDescription('The user to unmute').setRequired(true)),
    
        async execute(interaction, client) {
            const member = interaction.options.getMember('user');
            const role = interaction.guild.roles.cache.find(r => r.name === 'Muted');
            if (!role) {
                await interaction.reply({ content: 'There is no muted role!', ephemeral: true });
            }
            if (!member.roles.cache.has(role.id)) {
                await interaction.reply({ content: 'User is not muted!', ephemeral: true });
            }
            await member.roles.remove(role);
            await interaction.reply({ content: `${member} has been unmuted!`, ephemeral: true });
        }
};
