const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tekrarla')
        .setDescription('�alan �ark�y� tekrar tekrar oynat�r'),
    execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer || !connection.audioPlayer.state.resource) {
            interaction.reply('�u anda herhangi bir m�zik �alm�yor.');
            return;
        }

        connection.audioPlayer.state.resource.playStream();

        entersState(connection, VoiceConnectionStatus.Playing, 5 * 1000)
            .then(() => {
                interaction.reply('�alan �ark� tekrar oynat�l�yor.');
            })
            .catch((error) => {
                console.error(error);
                interaction.reply('Bir hata olu�tu. �ark� tekrar oynat�lam�yor.');
            });
    },
};
