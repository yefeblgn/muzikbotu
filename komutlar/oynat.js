const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVideoInfo } = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

// Müzik sýrasýný saklamak için bir dizi
const musicQueue = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oynat')
        .setDescription('Belirtilen müziði oynatýr')
        .addStringOption(option => option.setName('sarki').setDescription('Müzik linki veya ismi').setRequired(true)),
    async execute(interaction) {
        const sarki = interaction.options.getString('sarki');

        try {
            const videoInfo = await getVideoInfo(sarki);

            // Müzik sýrasýna þarkýyý ekleme
            musicQueue.push({
                title: videoInfo.videoDetails.title,
                url: sarki,
            });

            // Eðer müzik çalmýyorsa ilk þarkýyý oynat
            if (musicQueue.length === 1) {
                playMusic(interaction.guild.id, interaction.channel);
            }

            const embed = new MessageEmbed()
                .addField('Þarký', videoInfo.videoDetails.title)
                .addField('Ýzlenme Sayýsý', videoInfo.videoDetails.viewCount)
                .setImage(videoInfo.videoDetails.thumbnails[0].url)
                .setColor('#ff0000');

            interaction.reply({ content: 'Þarký sýraya eklendi:', embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Bir hata oluþtu. Þarký eklenirken bir sorun oluþtu.');
        }
    },
};

// Müziði oynatma iþlevi
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

        // Müzik bittiðinde sýradaki þarkýyý oynatma
        player.on(AudioPlayerStatus.Idle, () => {
            musicQueue.shift(); // Oynatýlan þarkýyý sýradan çýkar

            if (musicQueue.length > 0) {
                const nextSong = musicQueue[0];
                playMusic(guildId, channel); // Sýradaki þarkýyý oynat

                const embed = new MessageEmbed()
                    .addField('Þarký', videoInfo.videoDetails.title)
                    .addField('Ýzlenme Sayýsý', videoInfo.videoDetails.viewCount)
                    .setImage(videoInfo.videoDetails.thumbnails[0].url)
                    .setColor('#ff0000');

                channel.send({ content: 'Þarký oynatýlýyor:', embeds: [embed] });
            } else {
                connection.destroy(); // Sýra boþsa ses baðlantýsýný kapat
            }
        });

        connection.subscribe(player);
    } catch (error) {
        console.error(error);
    }
}

