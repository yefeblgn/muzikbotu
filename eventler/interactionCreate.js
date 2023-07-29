    module.exports = {
        name: 'interactionCreate',
        once: false,
        execute(interaction) {
            console.log(`Yeni bir etkileþim alýndý: ${interaction.commandName}`);
            // Etkileþimleri iþlemek için gerekli iþlemleri burada gerçekleþtirebilirsiniz
        },
    };
