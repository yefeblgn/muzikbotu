const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tekrarla')
        .setDescription('Çalan þarkýyý tekrar tekrar oynatýr'),
    execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer || !connection.audioPlayer.state.resource) {
            interaction.reply('Þu anda herhangi bir müzik çalmýyor.');
            return;
        }

        connection.audioPlayer.state.resource.playStream();

        entersState(connection, VoiceConnectionStatus.Playing, 5 * 1000)
            .then(() => {
                interaction.reply('Çalan þarký tekrar oynatýlýyor.');
            })
            .catch((error) => {
                console.error(error);
                interaction.reply('Bir hata oluþtu. Þarký tekrar oynatýlamýyor.');
            });
    },
};
