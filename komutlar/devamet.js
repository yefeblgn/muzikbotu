const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('devamet')
        .setDescription('Duraklatýlan müziði tekrar baþlatýr'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection || !connection.audioPlayer) {
            interaction.reply('Müzik çalmýyor.');
            return;
        }

        connection.audioPlayer.unpause();
        interaction.reply('Müzik tekrar baþlatýldý.');
    },
};
