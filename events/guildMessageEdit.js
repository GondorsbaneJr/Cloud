module.exports = {
    name: 'guildMessageEdit',
    execute(oldMessage, newMessage, bot) {
        //Log the edited message to console
        console.log('Message ' + oldMessage.content + ' has been edited to ' + newMessage.content);
        //sends a message to the log channel
        bot.channels.cache.get('1076828721362780180').send('Message ' + oldMessage.content + ' has been edited to ' + newMessage.content);
    }
}