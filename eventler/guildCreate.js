module.exports = {
    name: 'guildCreate',
    once: false,
    execute(guild) {
        console.log(`Yeni bir sunucuya kat�ld�m: ${guild.name}`);
        // Yeni sunucuya ili�kin i�lemleri burada ger�ekle�tirebilirsiniz
    },
};
