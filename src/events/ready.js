const { Events, ActivityType } = require('discord.js');
const { deploySlash } = require('../util/deploySlash');

module.exports = {
	name: Events.ClientReady,
	once: true,

	/**
     *
     * @param {import('discord.js').Client} client - The Discord client instance.
     * @returns {Promise<void>}
     */
	async execute(client) {
		/**
         * Logs the client's username when it becomes ready.
         */
		console.log(`[Client] Logged as ${client.user.username}`);

		/**
         * Sets the client's presence status and activity.
         */
		client.user.setPresence({
			activities: [{
				name: 'https://github.com/rablonkk',
				type: ActivityType.Listening,
			}],
			status: 'online',
		});

		/**
         * Deploys slash commands to the Discord API.
         * This function is expected to be located in the '../util/deploySlash' module.
         */
		await deploySlash(client);
	},
};