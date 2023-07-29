const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ses')
        .setDescription('Botun ses düzeyini ayarlar')
        .addIntegerOption(option => option.setName('seviye').setDescription('Ses düzeyi (0-100)').setRequired(true)),
    async execute(interaction) {
        const seviye = interaction.options.getInteger('seviye');

        if (seviye < 0 || seviye > 100) {
            interaction.reply('Lütfen geçerli bir ses düzeyi belirtin (0-100 aralýðýnda).');
            return;
        }

        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer || !connection.audioPlayer.state.resource) {
            interaction.reply('Þu anda herhangi bir müzik çalmýyor.');
            return;
        }

        connection.audioPlayer.state.resource.volume.setVolume(seviye / 100);

        await entersState(connection, VoiceConnectionStatus.Playing, 5 * 1000);

        interaction.reply(`Ses düzeyi ayarlandý: ${seviye}`);
    },
};
