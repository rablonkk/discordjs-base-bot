const { REST, Routes } = require('discord.js');
const path = require('path');
const fs = require('fs');

/**
 *
 * @param {import('discord.js').Client} client - The Discord client instance.
 * @returns {Promise<void>}
 */
exports.deploySlash = async (client) => {
	const commands = [];
	const foldersPath = path.join(__dirname, '../commands');

	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			}
			else {
				console.log(`[deploySlash ERROR] The command at ${filePath} is missing a required 'data' or 'execute' property`);
			};
		}
	};

	const rest = new REST().setToken(client.token);

	(async () => {
		try {
			console.log(`[deploySlash] Started refreshing ${commands.length} application (/) commands`);

			const data = await rest.put(
				Routes.applicationCommands(client.user.id),
				{ body: commands },
			);

			console.log(`[deploySlash] Successfully reloaded ${data.length} application (/) commands`);
		}
		catch (error) {
			console.error(error);
		}
	})();
};