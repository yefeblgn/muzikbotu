    module.exports = {
        name: 'interactionCreate',
        once: false,
        execute(interaction) {
            console.log(`Yeni bir etkileşim alındı: ${interaction.commandName}`);
            // Etkileşimleri işlemek için gerekli işlemleri burada gerçekleştirebilirsiniz
        },
    };
