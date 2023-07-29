const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVideoInfo } = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

// Müzik sýrasýný saklamak için bir dizi
const musicQueue = [];

// Desteklenen ses filtreleri
const filterOptions = [
    'bassboost',
    'treble',
    'karaoke',
    'nightcore',
    // Diðer ses filtreleri...
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filtre')
        .setDescription('Ses filtresi uygular')
        .addStringOption(option =>
            option.setName('filtre')
                .setDescription('Ses filtresi seçin')
                .setRequired(true)
                .addChoices(
                    filterOptions.map(filter => [filter, filter]) // Seçenekleri diziye dönüþtürme
                )
        ),
    async execute(interaction) {
        const filtre = interaction.options.getString('filtre');

        try {
            const currentSong = musicQueue[0];

            // Þu an oynatýlan þarkýnýn ses kaynaðýný al
            const audioResource = createAudioResource(ytdl(currentSong.url, { filter: 'audioonly', highWaterMark: 1 << 25 }));

            // Seçilen ses filtresini uygula
            audioResource.encoderArgs = ['-af', filtre];

            // Ses kaynaðýný güncelle
            player.play(audioResource);

            const embed = new MessageEmbed()
                .addField('Filtre', filtre)
                .setColor('#ff0000');

            interaction.reply({ content: 'Ses filtresi uygulandý:', embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Bir hata oluþtu. Ses filtresi uygulanýrken bir sorun oluþtu.');
        }
    },
};
