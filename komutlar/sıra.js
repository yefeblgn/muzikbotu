const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sýra')
        .setDescription('Sýradaki þarkýlarý gösterir'),
    execute(interaction) {
        if (musicQueue.length === 0) {
            interaction.reply('Þu anda müzik sýrasý boþ.');
            return;
        }

        const embed = new MessageEmbed()
            .setTitle('Müzik Sýrasý')
            .setColor('#ff0000');

        musicQueue.forEach((song, index) => {
            embed.addField(`Þarký ${index + 1}`, song.title);
        });

        interaction.reply({ embeds: [embed] });
    },
};
