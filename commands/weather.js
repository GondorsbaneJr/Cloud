const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'weather',
    description: 'Get the weather for a city',
    async execute(message, args) {
        const city = args[0];
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === '404') {
            return message.channel.send('City not found');
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`Weather for ${data.name}`)
            .setColor('#0099ff')
            .setDescription(`**${data.weather[0].main}**`)
            .addFields(
                { name: 'Temperature', value: `${data.main.temp}°C`, inline: true },
                { name: 'Feels Like', value: `${data.main.feels_like}°C`, inline: true },
                { name: 'Humidity', value: `${data.main.humidity}%`, inline: true },
                { name: 'Wind Speed', value: `${data.wind.speed} mph`, inline: true },
            )
            .setTimestamp()
            .setFooter('Powered by OpenWeatherMap and Made by @GondorsbaneJr#5799');
        message.channel.send(embed);
    },
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the weather for a city')
        .addStringOption(option => option.setName('city').setDescription('The city to get the weather for').setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('city');
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === '404') {
            return interaction.reply('City not found');
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`Weather for ${data.name}`)
            .setColor('#0099ff')
            .setDescription(`**${data.weather[0].main}**`)
            .addFields(
                { name: 'Temperature', value: `${data.main.temp}°C`, inline: true },
                { name: 'Feels Like', value: `${data.main.feels_like}°C`, inline: true },
                { name: 'Humidity', value: `${data.main.humidity}%`, inline: true },
                { name: 'Wind Speed', value: `${data.wind.speed} mph`, inline: true },
            )
            .setTimestamp()
            .setFooter('Powered by OpenWeatherMap and Made by @GondorsbaneJr#5799');
        interaction.reply({ embeds: [embed] });
    }
};
