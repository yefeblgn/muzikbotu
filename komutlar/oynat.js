const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVideoInfo } = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

// M�zik s�ras�n� saklamak i�in bir dizi
const musicQueue = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oynat')
        .setDescription('Belirtilen m�zi�i oynat�r')
        .addStringOption(option => option.setName('sarki').setDescription('M�zik linki veya ismi').setRequired(true)),
    async execute(interaction) {
        const sarki = interaction.options.getString('sarki');

        try {
            const videoInfo = await getVideoInfo(sarki);

            // M�zik s�ras�na �ark�y� ekleme
            musicQueue.push({
                title: videoInfo.videoDetails.title,
                url: sarki,
            });

            // E�er m�zik �alm�yorsa ilk �ark�y� oynat
            if (musicQueue.length === 1) {
                playMusic(interaction.guild.id, interaction.channel);
            }

            const embed = new MessageEmbed()
                .addField('�ark�', videoInfo.videoDetails.title)
                .addField('�zlenme Say�s�', videoInfo.videoDetails.viewCount)
                .setImage(videoInfo.videoDetails.thumbnails[0].url)
                .setColor('#ff0000');

            interaction.reply({ content: '�ark� s�raya eklendi:', embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Bir hata olu�tu. �ark� eklenirken bir sorun olu�tu.');
        }
    },
};

// M�zi�i oynatma i�levi
async function playMusic(guildId, channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();

    try {
        const currentSong = musicQueue[0];
        const audioResource = createAudioResource(ytdl(currentSong.url), { inputType: StreamType.Arbitrary });
        player.play(audioResource);

        // M�zik bitti�inde s�radaki �ark�y� oynatma
        player.on(AudioPlayerStatus.Idle, () => {
            musicQueue.shift(); // Oynat�lan �ark�y� s�radan ��kar

            if (musicQueue.length > 0) {
                const nextSong = musicQueue[0];
                playMusic(guildId, channel); // S�radaki �ark�y� oynat

                const embed = new MessageEmbed()
                    .addField('�ark�', videoInfo.videoDetails.title)
                    .addField('�zlenme Say�s�', videoInfo.videoDetails.viewCount)
                    .setImage(videoInfo.videoDetails.thumbnails[0].url)
                    .setColor('#ff0000');

                channel.send({ content: '�ark� oynat�l�yor:', embeds: [embed] });
            } else {
                connection.destroy(); // S�ra bo�sa ses ba�lant�s�n� kapat
            }
        });

        connection.subscribe(player);
    } catch (error) {
        console.error(error);
    }
}

