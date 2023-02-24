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
    }
}