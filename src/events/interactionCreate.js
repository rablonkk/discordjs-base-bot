const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,

	/**
     * Event listener for the InteractionCreate event.
     * @param {import('discord.js').CommandInteraction} interaction - The interaction object representing the command invocation.
     * @returns {Promise<void>}
     */
	async execute(interaction) {
		// Check if the interaction is a chat input command
		if (!interaction.isChatInputCommand()) return;

		// Get the command associated with the interaction
		const command = interaction.client.commands.get(interaction.commandName);

		// If no command is found, log an error and return
		if (!command) {
			console.log(`[interactionCreate ERROR] No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			// Execute the command
			await command.execute(interaction);
		}
		catch (error) {
			// Log the error
			console.log(`[interactionCreate ERROR] An error occurred: ${error.message}`);

			// Check if the interaction has already been replied to or deferred
			if (interaction.replied || interaction.deferred) {
				// Follow up with an ephemeral error message
				await interaction.followUp({
					embeds: [
						new EmbedBuilder()
							.setDescription('❌ There was an error while executing this command!')
							.setColor(interaction.guild.members.me.displayHexColor),
					],
					ephemeral: true,
				});
			}
			else {
				// Reply with an ephemeral error message
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setDescription('❌ There was an error while executing this command!')
							.setColor(interaction.guild.members.me.displayHexColor),
					],
					ephemeral: true,
				});
			};
		};
	},
};