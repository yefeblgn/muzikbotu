const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ge�')
        .setDescription('S�radaki �ark�ya ge�er'),
    execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer || !connection.audioPlayer.state.resource) {
            interaction.reply('�u anda herhangi bir m�zik �alm�yor.');
            return;
        }

        const musicQueue = []; // M�zik s�ras�n� tutan bir dizi

        if (musicQueue.length < 1) {
            interaction.reply('S�rada ba�ka bir �ark� bulunmamaktad�r.');
            return;
        }

        const nextSong = musicQueue.shift(); // Mevcut �ark�y� s�radan kald�r

        if (musicQueue.length > 0) {
            const embed = createEmbed(nextSong); // Embed olu�tur
            playSong(nextSong); // S�radaki �ark�y� �al
            interaction.reply({ embeds: [embed], content: `S�radaki �ark�ya ge�iliyor: ${nextSong.title}` });
        } else {
            // S�rada ba�ka �ark� kalmad���ndan oynatmay� durdurabilirsiniz
            connection.audioPlayer.stop();
            interaction.reply('S�rada ba�ka bir �ark� bulunmamaktad�r. M�zik oynatma durduruldu.');
        }
    },
};

async function playSong(song) {
    // �ark�y� �alma i�lemleri burada yap�l�r
}

function createEmbed(song) {
    const embed = new MessageEmbed()
        .setColor('#ff0000')
        .addField('�ark� Ad�', song.title)
        .addField('�zlenme/Dinlenme Say�s�', song.views, true)
        .addField('S�re', song.duration, true)
        .addField('Kaynak', song.source)
        .addField('Link', song.url);

    if (song.thumbnail) {
        embed.setThumbnail(song.thumbnail);
    }

    return embed;
}
