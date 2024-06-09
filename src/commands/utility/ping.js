const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('See API Latency.'),

	/**
     * Executes the ping command.
     * @param {import('discord.js').CommandInteraction} interaction - The interaction that triggered the command.
     * @returns {Promise<void>}
     */
	async execute(interaction) {
		// Create an EmbedBuilder for the ping response
		const pingEmbed = new EmbedBuilder()
			.setDescription(`📡 API Latency: \`${interaction.client.ws.ping}ms\``)
			.setColor(interaction.guild.members.me.displayHexColor);

		// Send the ping response as an ephemeral message
		interaction.reply({
			embeds: [pingEmbed],
			ephemeral: true,
		});
	},
};