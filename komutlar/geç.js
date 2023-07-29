const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('geç')
        .setDescription('Sýradaki þarkýya geçer'),
    execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer || !connection.audioPlayer.state.resource) {
            interaction.reply('Þu anda herhangi bir müzik çalmýyor.');
            return;
        }

        const musicQueue = []; // Müzik sýrasýný tutan bir dizi

        if (musicQueue.length < 1) {
            interaction.reply('Sýrada baþka bir þarký bulunmamaktadýr.');
            return;
        }

        const nextSong = musicQueue.shift(); // Mevcut þarkýyý sýradan kaldýr

        if (musicQueue.length > 0) {
            const embed = createEmbed(nextSong); // Embed oluþtur
            playSong(nextSong); // Sýradaki þarkýyý çal
            interaction.reply({ embeds: [embed], content: `Sýradaki þarkýya geçiliyor: ${nextSong.title}` });
        } else {
            // Sýrada baþka þarký kalmadýðýndan oynatmayý durdurabilirsiniz
            connection.audioPlayer.stop();
            interaction.reply('Sýrada baþka bir þarký bulunmamaktadýr. Müzik oynatma durduruldu.');
        }
    },
};

async function playSong(song) {
    // Þarkýyý çalma iþlemleri burada yapýlýr
}

function createEmbed(song) {
    const embed = new MessageEmbed()
        .setColor('#ff0000')
        .addField('Þarký Adý', song.title)
        .addField('Ýzlenme/Dinlenme Sayýsý', song.views, true)
        .addField('Süre', song.duration, true)
        .addField('Kaynak', song.source)
        .addField('Link', song.url);

    if (song.thumbnail) {
        embed.setThumbnail(song.thumbnail);
    }

    return embed;
}
