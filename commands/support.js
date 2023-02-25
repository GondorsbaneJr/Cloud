// variables
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');



module.exports = {
    config : {
        name: 'support',
        description: 'Sends a list of ways to get support for the bot.',
        usage: '-support',
        accessableby: 'Everyone',
        aliases: ['sup']
    },  
        async execute(interaction, client) {
            const bot_owners = 'GondorsbaneJr#5799 & Pigeon#2628'
            const owner_emails = 'gondorsbanejr@outlook.com'
            const { MessageEmbed } = require('discord.js');
            const embed = new MessageEmbed()
                .setTitle('Support')
                .setDescription('Here are some ways to get support for the bot.')
                .addFields(
                    { name: 'Discord Server', value: 'https://discord.gg/Qawn3v6gcd' },
                    { name: 'Owner Contact', value: '${bot_owners} (Discord)' },
                    { name: 'Email Contact', value: '${owner_emails} (Email)' },
                )
            .setTimestamp()
            
        await interaction.reply({ embeds: [embed] });
    },
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Sends a list of ways to get support for the bot.'),

    async execute(interaction, client) {
        const bot_owners = 'GondorsbaneJr#5799 & Pigeon#2628'
        const owner_emails = 'gondorsbanejr@outlook.com & '
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
        .setTitle('Support')
        .setDescription('Here are some ways to get support for the bot.')
        .addfields(
            { name: 'Discord Server', value: 'https://discord.gg/Qawn3v6gcd' },
            { name: 'Owner Contact', value: '${bot_owners} (Discord)' },
            { name: 'Email Contact', value: '${owner_emails} (Email)' },
        )
        .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    },
}