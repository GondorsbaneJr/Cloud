module.exports = {
    name: 'guildMessageDelete',
    execute(message, bot) {
        //Log the deleted message to console
        console.log('Message ' + message.content + ' has been deleted!');
        //sends a message to the log channel
        bot.channels.cache.get('1076828721362780180').send('Message ' + message.content + ' has been deleted!');
    }
}