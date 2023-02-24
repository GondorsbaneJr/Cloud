//urban dictionary search
module.exports = {
    name: 'urban',
    description: 'Searches urban dictionary for a word',
    async execute(message, args) {
        const Discord = require('discord.js');
        const fetch = require('node-fetch');
        const { MessageEmbed } = require('discord.js');
        const { MessageButton, MessageActionRow } = require('discord-buttons');
        const { MessageMenuOption, MessageMenu } = require('discord-buttons');
        const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

        const word = args[0];
        if (!word) return message.channel.send('Please enter a word to search for');

        const url = `https://api.urbandictionary.com/v0/define?term=${word}`;

        let response;
        try {
            response = await fetch(url).then(res => res.json());
        }
        catch (e) {
            return message.channel.send('An error occured, please try again!');
        }

        const [answer] = response.list;

        if (!answer) return message.channel.send(`No results found for **${word}**`);

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: `${answer.definition.length > 1024 ? `${answer.definition.slice(0, 1021)}...` : answer.definition}` },
                { name: 'Example', value: `${answer.example.length > 1024 ? `${answer.example.slice(0, 1021)}...` : answer.example}` },
                { name: 'Rating', value: `👍 ${answer.thumbs_up} | 👎 ${answer.thumbs_down}` },
            );
            
        const button = new MessageButton()
            .setStyle('url')
            .setLabel('View on Urban Dictionary')
            .setURL(answer.permalink);

        message.channel.send(embed, button);
    },
};