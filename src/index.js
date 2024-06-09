const { Collection, GatewayIntentBits, Client } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env' });

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions,
	],
	allowedMentions: { parse: ['users'] },
});

process.on('unhandledRejection', async (error) => {
	console.log('[unhandledRejection] ', error);
});

process.on('uncaughtException', async (error) => {
	console.log('[uncaughtException] ', error.message);
});

/**
 * Collection of commands for the bot.
 * @type {Collection<string, Object>}
 */
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolder = fs.readdirSync(foldersPath);

/**
 * Loads commands from the 'commands' folder.
 */
for (const folder of commandFolder) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[Warning] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
		};
	}
};

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

/**
 * Loads events from the 'events' folder.
 */
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};

/**
 * Login the bot with the provided token from.env file.
 */
client.login(process.env.TOKEN);