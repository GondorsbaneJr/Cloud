const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    config: {
        name: 'kick',
        description: 'Kick a user',
        usage: `-kick <user> <reason>`,
        accessableby: 'Moderators',
        aliases: ['k']
    },
    async run (bot,message,args) {
        //Check if user has permission to kick
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to kick members");
        //Check if bot has permission to kick
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I do not have permission to kick members");
        //Check if user was mentioned
        if(!args[0]) return message.channel.send("Please mention a user to kick");
        //Check if user is valid
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.channel.send("Please mention a valid user to kick");
        //Check if user is not a moderator
        if(target.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot kick a moderator");
        //Check if reason was provided
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given";
        //Kick user
        await target.kick({reason: reason})
        .catch(err => {
            if(err) return message.channel.send("Something went wrong");
        }
        );
        //Send confirmation message
        message.channel.send(`**${target.user.tag}** has been kicked for \`${reason}\``);
    },
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user')
        .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the kick').setRequired(false)),

        async execute(interaction, client) {
        //Check if user has permission to kick
        if(!interaction.member.hasPermission("KICK_MEMBERS")) return interaction.reply("You do not have permission to kick members");
        //Check if bot has permission to kick
        if(!interaction.guild.me.hasPermission("KICK_MEMBERS")) return interaction.reply("I do not have permission to kick members");
        //Check if user was mentioned
        if(!args[0]) return interaction.reply("Please mention a user to kick");
        //Check if user is valid
        let target = interaction.mentions.members.first() || interaction.guild.members.cache.get(args[0]);
        if(!target) return interaction.reply("Please mention a valid user to kick");
        //Check if user is not a moderator
        if(target.hasPermission("KICK_MEMBERS")) return interaction.reply("You cannot kick a moderator");
        //Check if reason was provided
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given";
        //Kick user
        await target.kick({reason: reason})
        .catch(err => { 
            if(err) return interaction.reply("Something went wrong");
        }
        );
        //Send confirmation message
        interaction.reply(`**${target.user.tag}** has been kicked for \`${reason}\``);
    },
}