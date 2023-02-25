const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');
const { MessageMenuOption } = require('discord.js');


module.exports = {
    config: {
        name: 'ban',
        description: 'Ban a user',
        usage: `-ban <user> <reason>`,
        accessableby: 'Moderators',
        aliases: ['b']
    },
    async run (bot,message,args) {
        //Check if user has permission to ban
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to ban members");
        //Check if bot has permission to ban
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have permission to ban members");
        //Check if user was mentioned
        if(!args[0]) return message.channel.send("Please mention a user to ban");
        //Check if user is valid
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.channel.send("Please mention a valid user to ban");
        //Check if user is not a moderator
        if(target.hasPermission("BAN_MEMBERS")) return message.channel.send("You cannot ban a moderator");
        //Check if reason was provided
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given";
        //Ban user
        await target.ban({reason: reason})
        .catch(err => {
            if(err) return message.channel.send("Something went wrong");
        }
        );
        //Send confirmation message
        message.channel.send(`**${target.user.tag}** has been banned for \`${reason}\``);
    },
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(false)),

        async execute(interaction, client) {
        //Check if user has permission to ban
        if(!interaction.member.hasPermission("BAN_MEMBERS")) return interaction.reply("You do not have permission to ban members");
        //Check if bot has permission to ban
        if(!interaction.guild.me.hasPermission("BAN_MEMBERS")) return interaction.reply("I do not have permission to ban members");
        //Check if user was mentioned
        if(!args[0]) return interaction.reply("Please mention a user to ban");
        //Check if user is valid
        let target = interaction.mentions.members.first() || interaction.guild.members.cache.get(args[0]);
        if(!target) return interaction.reply("Please mention a valid user to ban");
        //Check if user is not a moderator
        if(target.hasPermission("BAN_MEMBERS")) return interaction.reply("You cannot ban a moderator");
        //Check if reason was provided
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given";
        //Ban user
        await target.ban({reason: reason})
        .catch(err => {
            if(err) return interaction.reply("Something went wrong");
        }
        );
        //Send confirmation message
        interaction.reply(`**${target.user.tag}** has been banned for \`${reason}\``);
    }
}
