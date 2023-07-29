const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ses')
        .setDescription('Botun ses d�zeyini ayarlar')
        .addIntegerOption(option => option.setName('seviye').setDescription('Ses d�zeyi (0-100)').setRequired(true)),
    async execute(interaction) {
        const seviye = interaction.options.getInteger('seviye');

        if (seviye < 0 || seviye > 100) {
            interaction.reply('L�tfen ge�erli bir ses d�zeyi belirtin (0-100 aral���nda).');
            return;
        }

        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer || !connection.audioPlayer.state.resource) {
            interaction.reply('�u anda herhangi bir m�zik �alm�yor.');
            return;
        }

        connection.audioPlayer.state.resource.volume.setVolume(seviye / 100);

        await entersState(connection, VoiceConnectionStatus.Playing, 5 * 1000);

        interaction.reply(`Ses d�zeyi ayarland�: ${seviye}`);
    },
};
