import { Interaction, Message } from "discord.js";
import { DiscordBot } from "./DiscordBot";

export async function setupInteractionCommand(client: DiscordBot, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
        const commandName = interaction.commandName;

        if (client.SlashCommands.has(commandName)) {
            await client.SlashCommands.get(commandName)?.execute(client, interaction);
        };
    }


    if (interaction.isButton()) {
        const customId = interaction.customId;

        if (client.ButtonsCommands.has(customId)) {
            await client.ButtonsCommands.get(customId)?.execute(client, interaction);
        }
    }
}

export interface IMessageSetupOptions {
    client: DiscordBot,
    message: Message,
    prefix: string,
    handleCommandNotFound?: (commandName: string, message: Message, client: DiscordBot) => void;
}

export async function setupMessageCommand(setupOption: IMessageSetupOptions) {

    if (!setupOption.client && !setupOption.message && !setupOption.prefix) {
        throw new Error("[MISSING_REQUIRED_FIElDS]: SetOption client, message, prefix is required for SetUp to work properly");
    }


    const prefix = setupOption.prefix
    const message = setupOption.message;
    const client = setupOption.client;



    if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
    }


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase() as string;


    const command = client.MessageCommands.get(commandName) || client.MessageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


    if (command) {
        command.execute(client, message, args);
    } else {
        if (setupOption.client && typeof setupOption.handleCommandNotFound === "function") {
            setupOption.handleCommandNotFound(commandName, message, client);
        }
    }
}