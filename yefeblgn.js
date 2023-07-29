const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Botunuzun normal iþlevlerini devam ettirin
// ...

const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./komutlar/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`Bot olarak giriþ yapýldý: ${client.user.tag}`);
    // Botun aktivite kýsmý
    client.user.setPresence({
        activities: [{ name: 'Kavinsky - Nightcall', type: 'LISTENING' }],
        status: 'online'
    });

    client.application.commands.set(client.commands.map(cmd => cmd.data));
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Komut çalýþtýrýlýrken bir hata oluþtu.', ephemeral: true });
    }
});
// Botun token kýsmý
client.login(process.env.TOKEN);
