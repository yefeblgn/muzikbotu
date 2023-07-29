const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('s�ra')
        .setDescription('S�radaki �ark�lar� g�sterir'),
    execute(interaction) {
        if (musicQueue.length === 0) {
            interaction.reply('�u anda m�zik s�ras� bo�.');
            return;
        }

        const embed = new MessageEmbed()
            .setTitle('M�zik S�ras�')
            .setColor('#ff0000');

        musicQueue.forEach((song, index) => {
            embed.addField(`�ark� ${index + 1}`, song.title);
        });

        interaction.reply({ embeds: [embed] });
    },
};
