const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'mute',
    description: 'Mute a user',
    async execute(interaction, client) {
        const member = interaction.options.getMember('user');
        const role = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!role) {
            await interaction.reply({ content: 'There is no muted role!', ephemeral: true });
        }
        if (member.roles.cache.has(role.id)) {
            await interaction.reply({ content: 'User is already muted!', ephemeral: true });
        }
        await member.roles.add(role);
        await interaction.reply({ content: `${member} has been muted!`, ephemeral: true });
    },
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user')
        .addUserOption(option => option.setName('user').setDescription('The user to mute').setRequired(true)),

        async execute(interaction, client) {
            const member = interaction.options.getMember('user');
            const role = interaction.guild.roles.cache.find(r => r.name === 'Muted');
            if (!role) {
                await interaction.reply({ content: 'There is no muted role!', ephemeral: true });
            }
            if (member.roles.cache.has(role.id)) {
                await interaction.reply({ content: 'User is already muted!', ephemeral: true });
            }
            await member.roles.add(role);
            await interaction.reply({ content: `${member} has been muted!`, ephemeral: true });
        }
};