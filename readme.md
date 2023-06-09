# Requirements

This package require [disocrd.js](https://www.npmjs.com/package/discord.js) to function.

## Get Started

```js
// Initialize the Discord bot
const testBot = new DiscordBot("token goes here", {
    clientOptions: {
        intents: ["Guilds"]
    },
    dirname: __dirname, // Set the project directory name; this is required for commands to work
    directories: {
        events: "/events",
        slashCommands: "./slash"
    }, // Set up your command file folders
    statusLogs: true // Enable logging of the loaders' status to the console
});

(() => {
    testBot.loadEvents(); 
    testBot.loadSlashCommands();
    testBot.registerGuildCommand("clientid", "guildid");
    // testBot.registerGlobalCommand(clientId);
})();

testBot.start(); // login and start the bot.

```
After setting up the `__dirname` and directories, you can load the relevant loaders using the testBot instance. Once the slash commands are loaded, you can then register them using `registerGuildCommand(clientId, guildId)` or `registerGlobalCommand(clientId)`.

DiscordClient also makes it easier to create commands. The `SlashCommand(),` MessageCommand, and `EventHandler()`classes make it easier to create slash commands, message commands, and events.

Here's an example of an event handler:

```js
// events/ready.js

const { EventHandler } = require("@devspeed/discord-client");

module.exports = new EventHandler({
    name: "ready",
    run: (client) => {
        console.log(`${client.user.tag} ready`);
    }
});

```

And here's an example of a slash command:
```js
// slash/ping.js

const { SlashCommandBuilder } = require("discord.js");
const { SlashCommand } = require("@devspeed/discord-client");

module.exports = new SlashCommand({
    data: new SlashCommandBuilder()
        .setName("pong")
        .setDescription('hello world'),
    execute(client, interaction) {
        interaction.reply("pong");
    }
});

```


when slash commands loader is called behind the scenes it will set the commands that is being loaded to `SlashCommands` collection and push the json version to `slashCommandsJson[]` array. see below on how to access them

```js
// still using the testBot intance.

testBot.SlashCommands.get("commandName') 
// You specfic the name when you use slash new SlashCommandBuilder().setName("pong")

testBot.MessageCommands.get('commandName);
```

`MessageCommands` is a collection contain all the messages commands including `name`, `description`, `execute(client, message, ...args[])` and more. `SlashCommands` is a collection containing all the slashcommands including `data` which contains the slashcommandbuilder and `execute(client, interaction)`