const fs = require('fs');
const chalk = require('chalk');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Stats').setBorder('|', '=', "0", "0")

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
	const slashCommands = []; 

	fs.readdirSync('./slash_commands/').forEach(async dir => {
		const files = fs.readdirSync(`./slash_commands/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
				const slashCommand = require(`../../slash_commands/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
			
				if(slashCommand.name) {
						client.slashCommands.set(slashCommand.name, slashCommand)
						table.addRow(file.split('.js')[0], '✅')
				} else {
						table.addRow(file.split('.js')[0], '⛔')
				}
		}
		
	});
	console.log(chalk.red(table.toString()));

	(async () => {
		try {
			await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });
			console.log(chalk.yellow(`[SLASH-COMMANDS]: Registered ${slashCommands.length} ${slashCommands === 1 ? "command" : "commands"}.`))
		} catch (error) {
			console.error(error);
		}
	})();
};
