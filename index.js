const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');
require('dotenv').config()
const { connection } = require('./system_logic/database');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();

module.exports = { client, connection };

const message = process.env.STATE.toLowerCase() === 'dev' ? '[SYSTEM]: Booted into development mode, this should only be used in a development environment.' : '[SYSTEM]: Booted into production mode, this should only be used in a production environment.';
figlet('Nexeum Studios', (err, data) => {
	if (err) { return console.error('An error occurred while generating figlet text:', err); }
	console.log(chalk.blue("-".repeat(75) + "\n" + data + "\n" + "-".repeat(75)));
	console.log(chalk.green(message));
});

fs.readdirSync('./handler_logic/handlers').forEach((handler) => {
    require(`./handler_logic/handlers/${handler}`)(client)
});

client.login(process.env.TOKEN)