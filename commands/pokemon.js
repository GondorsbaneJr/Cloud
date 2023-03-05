// search for a specific pokemon in pokedex

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    name: 'pokemon',
    description: 'Search for a specific pokemon in pokedex',
    execute(message, args) {
        const name = args.join(' ');
        if (!name) return message.channel.send('Please specify a name');
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(body => {
                if (!body) return message.channel.send('Could not find any results.');
                const embed = new MessageEmbed()
                    .setTitle(`Pokemon info for ${body.name}`)
                    .setColor('RANDOM')
                    .setThumbnail(body.sprites.front_default)
                    .addFields(
                        { name: 'Height', value: body.height, inline: true },
                        { name: 'Weight', value: body.weight, inline: true },
                        { name: 'Base Experience', value: body.base_experience, inline: true },
                        { name: 'Abilities', value: body.abilities.map(a => a.ability.name).join(', '), inline: true },
                        { name: 'Types', value: body.types.map(t => t.type.name).join(', '), inline: true },
                    );
                message.channel.send({ embeds: [embed] });
            })
            .catch(e => {
                message.channel.send('Could not find any results.');
            });
    },
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Search for a specific pokemon in pokedex')
        .addStringOption(option => option.setName('name').setDescription('The name of the pokemon').setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        if (!name) return interaction.reply('Please specify a name');
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(body => {
                if (!body) return interaction.reply('Could not find any results.');
                const embed = new MessageEmbed()
                    .setTitle(`Pokemon info for ${body.name}`)
                    .setColor('RANDOM')
                    .setThumbnail(body.sprites.front_default)
                    .addFields(
                        { name: 'Height', value: body.height, inline: true },
                        { name: 'Weight', value: body.weight, inline: true },
                        { name: 'Base Experience', value: body.base_experience, inline: true },
                        { name: 'Abilities', value: body.abilities.map(a => a.ability.name).join(', '), inline: true },
                        { name: 'Types', value: body.types.map(t => t.type.name).join(', '), inline: true },
                    );
                interaction.reply({ embeds: [embed] });
            })
            .catch(e => {
                interaction.reply('Could not find any results.');
            });
    }
}