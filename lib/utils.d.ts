import { Interaction, Message } from "discord.js";
import { DiscordBot } from "./DiscordBot";
export declare function setupInteractionCommand(client: DiscordBot, interaction: Interaction): Promise<void>;
export interface IMessageSetupOptions {
    client: DiscordBot;
    message: Message;
    prefix: string;
    handleCommandNotFound?: (commandName: string, message: Message, client: DiscordBot) => void;
}
export declare function setupMessageCommand(setupOption: IMessageSetupOptions): Promise<void>;
