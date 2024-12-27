// deploy.js
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('get')
        .setDescription('Get something with autocomplete')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('Type to search')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about the bot')
]
    .map(command => command.toJSON());

const config = require("./config.json")

const token = (config["discord-token"])
const client_id = config.clientid

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(client_id), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();