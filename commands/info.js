// info about bot and server embed
module.exports = {
    name: 'info',
    description: 'Info about the bot and server',
    execute(message, args) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle('Info')
            .setColor('#0099ff')
            .setDescription('Info about the bot and server')
            .addFields(
                { name: 'Bot Name', value: 'Cloud', inline: true },
                { name: 'Bot Version', value: '1.0.0', inline: true },
                { name: 'Server Name', value: message.guild.name, inline: true },
                { name: 'Server Created At', value: message.guild.createdAt, inline: true },
                { name: 'Server Owner', value: message.guild.owner, inline: true },
                { name: 'Bot Coder', value: 'GondorsbaneJr#5799', inline: true },
                { name: 'Bot Owner', value: 'Pigeon#2628', inline: true },
            )
            .setTimestamp()
            .setFooter('Made by @GondorsbaneJr#5799');
        message.channel.send(embed);
    },
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Info about the bot and server'),
    async execute(interaction) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle('Info')
            .setColor('#0099ff')
            .setDescription('Info about the bot and server')
            .addFields(
                { name: 'Bot Name', value: 'Cloud', inline: true },
                { name: 'Bot Version', value: '1.0.0', inline: true },
                { name: 'Server Name', value: interaction.guild.name, inline: true },
                { name: 'Server Created At', value: interaction.guild.createdAt, inline: true },
                { name: 'Server Owner', value: interaction.guild.owner, inline: true },
                { name: 'Bot Coder', value: 'GondorsbaneJr#5799', inline: true },
                { name: 'Bot Owner', value: 'Pigeon#2628', inline: true },
            )
            .setTimestamp()
            .setFooter('Made by @GondorsbaneJr#5799');
        interaction.reply({ embeds: [embed] });
    }
}