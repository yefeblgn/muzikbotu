const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duraklat')
        .setDescription('Çalýnan müziði duraklatýr'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer) {
            interaction.reply('Müzik çalmýyor.');
            return;
        }

        connection.audioPlayer.pause();
        interaction.reply('Müzik duraklatýldý.');
    },
};
