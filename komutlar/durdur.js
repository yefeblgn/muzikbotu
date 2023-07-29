const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('durdur')
        .setDescription('M�zi�i durdurur ve botu sesli kanaldan ��kar�r'),
    execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer || !connection.audioPlayer.state.resource) {
            interaction.reply('�u anda herhangi bir m�zik �alm�yor.');
            return;
        }

        // M�zik s�ras�n� ve oynat�lan �ark�y� temizle
        musicQueue.length = 0;
        connection.destroy();

        interaction.reply('M�zik durduruldu ve bot sesli kanaldan ��kar�ld�.');
    },
};
