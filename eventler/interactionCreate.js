    module.exports = {
        name: 'interactionCreate',
        once: false,
        execute(interaction) {
            console.log(`Yeni bir etkile�im al�nd�: ${interaction.commandName}`);
            // Etkile�imleri i�lemek i�in gerekli i�lemleri burada ger�ekle�tirebilirsiniz
        },
    };
