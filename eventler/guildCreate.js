module.exports = {
    name: 'guildCreate',
    once: false,
    execute(guild) {
        console.log(`Yeni bir sunucuya katıldım: ${guild.name}`);
        // Yeni sunucuya ilişkin işlemleri burada gerçekleştirebilirsiniz
    },
};
