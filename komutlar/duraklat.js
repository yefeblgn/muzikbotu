const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duraklat')
        .setDescription('�al�nan m�zi�i duraklat�r'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer) {
            interaction.reply('M�zik �alm�yor.');
            return;
        }

        connection.audioPlayer.pause();
        interaction.reply('M�zik duraklat�ld�.');
    },
};
