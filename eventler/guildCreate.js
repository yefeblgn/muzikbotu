module.exports = {
    name: 'guildCreate',
    once: false,
    execute(guild) {
        console.log(`Yeni bir sunucuya katýldým: ${guild.name}`);
        // Yeni sunucuya iliþkin iþlemleri burada gerçekleþtirebilirsiniz
    },
};
