const { EmbedBuilder } = require('discord.js');

module.exports = {
    execute: async function (interaction, c) {
        const creator = 'Millionxsam'; // Replace with your Discord username
        const botName = interaction.client.user.username;
        const botAvatar = interaction.client.user.displayAvatarURL();
        const uptime = formatUptime(interaction.client.uptime);

        const embed = new EmbedBuilder()
            .setTitle(`${botName} Information`)
            .setColor(0x7289da) // Discord-themed color
            .setThumbnail(botAvatar)
            .addFields(
                { name: '👤 Creator', value: creator, inline: true },
                { name: '📆 Uptime', value: uptime, inline: true },
                {
                    name: 'ℹ️ `/get` Command Guide',
                    value: '`/get query:<name>`\nUse this command to fetch an icon by name.\nExample: `/get query:discord`',
                    inline: false
                }
            )
            .setFooter({ text: 'Thank you for using the bot!', iconURL: botAvatar });

        await interaction.reply({ embeds: [embed] });
    }
};


function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
}
