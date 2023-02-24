module.exports = {
    config: {
        name: 'unban',
        description: 'Unban a user',
        usage: `-unban <user> <reason>`,
        accessableby: 'Moderators',
        aliases: ['ub']
    },
    async run (bot,message,args) {
        //Check if user has permission to unban
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to unban members");
        //Check if bot has permission to unban
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have permission to unban members");
        //Check if user was mentioned
        if(!args[0]) return message.channel.send("Please mention a user to unban");
        //Check if user is valid
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.channel.send("Please mention a valid user to unban");
        //Check if user is not a moderator
        if(target.hasPermission("BAN_MEMBERS")) return message.channel.send("You cannot unban a moderator");
        //Check if reason was provided
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given";
        //Unban user
        await target.unban({reason: reason})
        .catch(err => {
            if(err) return message.channel.send("Something went wrong");
        }
        );
        //Send confirmation message
        message.channel.send(`**${target.user.tag}** has been unbanned for \`${reason}\``);
    }
}