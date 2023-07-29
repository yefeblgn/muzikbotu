const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVideoInfo } = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

// M�zik s�ras�n� saklamak i�in bir dizi
const musicQueue = [];

// Desteklenen ses filtreleri
const filterOptions = [
    'bassboost',
    'treble',
    'karaoke',
    'nightcore',
    // Di�er ses filtreleri...
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filtre')
        .setDescription('Ses filtresi uygular')
        .addStringOption(option =>
            option.setName('filtre')
                .setDescription('Ses filtresi se�in')
                .setRequired(true)
                .addChoices(
                    filterOptions.map(filter => [filter, filter]) // Se�enekleri diziye d�n��t�rme
                )
        ),
    async execute(interaction) {
        const filtre = interaction.options.getString('filtre');

        try {
            const currentSong = musicQueue[0];

            // �u an oynat�lan �ark�n�n ses kayna��n� al
            const audioResource = createAudioResource(ytdl(currentSong.url, { filter: 'audioonly', highWaterMark: 1 << 25 }));

            // Se�ilen ses filtresini uygula
            audioResource.encoderArgs = ['-af', filtre];

            // Ses kayna��n� g�ncelle
            player.play(audioResource);

            const embed = new MessageEmbed()
                .addField('Filtre', filtre)
                .setColor('#ff0000');

            interaction.reply({ content: 'Ses filtresi uyguland�:', embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Bir hata olu�tu. Ses filtresi uygulan�rken bir sorun olu�tu.');
        }
    },
};
