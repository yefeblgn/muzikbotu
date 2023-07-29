const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('devamet')
        .setDescription('Duraklat�lan m�zi�i tekrar ba�lat�r'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer) {
            interaction.reply('M�zik �alm�yor.');
            return;
        }

        connection.audioPlayer.unpause();
        interaction.reply('M�zik tekrar ba�lat�ld�.');
    },
};
