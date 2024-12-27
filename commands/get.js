const wrapper = require("../wrapper");
const path = require("path");
const {pullIcon} = require("../wrapper");
const {AttachmentBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    execute: async function(interaction, c) {
        const icons = await wrapper.scrapeIcons(false)
        const target_name = interaction.options.getString("query")

        const iconreply = await pullIcon(icons[target_name], target_name)
        if (!iconreply) {
            interaction.reply("Error while gathering your image")
            return
        }

        const attachment = new AttachmentBuilder(path.join(__dirname, "../img.png"));

        const embed = new EmbedBuilder()
            .setTitle("Your Requested Image")
            .setDescription(`Here is the icon you requested for: **${target_name}**`)
            .setColor(0x00AE86)
            .setImage('attachment://img.png')

        await interaction.reply({
            embeds: [embed],
            files: [attachment]
        });
    }
}