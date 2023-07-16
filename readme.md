# Documentation

[Invite to My Discord Server](https://discord.gg/sKmfq7DU58)

if you find this package helpful, please consider supporting its development by making a donation:
[Donate](https://www.buymeacoffee.com/netlinedevs)

Please report any issues or bugs on our GitHub page so we can improve our services for everyone. [github](https://github.com/DevSpeedjs/discord-client/issues)

## Requirements

This package require [disocrd.js](https://www.npmjs.com/package/discord.js) to function.

## Get Started

```js
const { Loaders, RecursiveLoader, resgisterGuildCommand } = require("@devspeed/discord-client");
const { Client } = require("discord.js");

const client = new Client({
    intents: ["Guilds"]
});


Loaders.loadEvents(__dirname, { directory: "./events", client })


const { collection, JsonData } = RecursiveLoader.loadSlashCommands(__dirname, { directory: "./slash" });

// returns a collection
const messageCommand = RecursiveLoader.loadMessageCommands(__dirname, { directory: "commands" })

client.slashCommands = collection;

client.messageCommand = messageCommand;

console.log(client.slashCommands)
console.log(client.messageCommand)

resgisterGuildCommand({
    clientId: 'client id goes here',
    guilldId: 'guilid id goes here',
    token: "token goes here",
    commands: JsonData, //  the slash command loader already returns the collection and the jsonData
})

client.login("token goes");
```

The recursive loader will load every file in the specified directory, regardless of how deeply nested it is within your folder structure.If you prefer not to load every file in the specified directory, you can opt to use a regular loader instead **see below for example**

```js
const { Loaders } = require("@devspeed/discord-client");

const collection = Loaders.loadSlashCommand(__dirname, { directory: '/slash'}); 

```

### Adding filter

```js
Loaders.loadSlashCommand(__dirname, { 
    directory: '/slash',
    filter: (file) => file.endsWith(".js") || file.endsWith("ts"), // the default value when filter is undefined
});
```

To extract the exported data object from only certain files within the specified directory, you can use the `filter` function. This function takes the currently iterated file as a parameter and returns a boolean value. If the boolean is `true`, the exported data object will be extracted.

### defining slashCommand

```js
const { SlashCommand } = require("@devspeed/discord-client")
const { SlashCommandBuilder } = require('discord.js');


module.exports = new SlashCommand({
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("help command"),

    async execute(client, interaction) {
        await interaction.reply("pong"); 
    }
})
```

### defining MessageCommand

```js
const { MessageCommand } = require("@devspeed/discord-client");

module.exports = new MessageCommand({
    name: "ping",
    description: "A simple pong command",
    cooldown: 10,
    category: "general",
    enabled: true,
    execute: (client, message, args) => {
        console.log(client, message, args)
    }
})
```

### defining Events

```js
const { EventHandler } = require("@devspeed/discord-client");

module.exports = new EventHandler({
    name: "ready",
    execute(client, interaction) {
       /// console.log(`logined in as ${client.user.tag}`);

      console.log(client.user)
    }
})
```
