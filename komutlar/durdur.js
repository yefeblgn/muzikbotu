const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('durdur')
        .setDescription('Müziði durdurur ve botu sesli kanaldan çýkarýr'),
    execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer || !connection.audioPlayer.state.resource) {
            interaction.reply('Þu anda herhangi bir müzik çalmýyor.');
            return;
        }

        // Müzik sýrasýný ve oynatýlan þarkýyý temizle
        musicQueue.length = 0;
        connection.destroy();

        interaction.reply('Müzik durduruldu ve bot sesli kanaldan çýkarýldý.');
    },
};
