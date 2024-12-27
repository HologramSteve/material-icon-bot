const { Client, GatewayIntentBits } = require("discord.js");
const wrapper = require("./wrapper")


// Create the client with necessary intents for slash commands
const c = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages // Needed to listen to message events
    ]
});

c.once("ready", () => {
    console.log(`${c.user.username} is logged in`);
})


c.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return

    const handling = require(`./commands/${interaction.commandName}.js`)
    await handling.execute(interaction, c)
})


c.on("interactionCreate", async (interaction) => {
    if (!interaction.isAutocomplete()) return

    let icons = await wrapper.scrapeIcons()
    icons = Object.keys(icons)
    const focus = interaction.options.getFocused()

    const matches = icons.filter(icon => icon.startsWith(focus.toLowerCase())).slice(0, 25)

    await interaction.respond(
        matches.map(choice => ({ name: choice, value: choice }))
    );

})

const config = require("./config.json")

c.login(config["discord-token"])