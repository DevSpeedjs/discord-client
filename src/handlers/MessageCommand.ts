import { DiscordBot } from "../DiscordBot"
import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, Message } from "discord.js";


export interface IMessageCommand {
    name: string,
    description: string,
    aliases?: string[],
    cooldown?: string | number,
    disabled?: boolean,
    catagory?: string,
    execute: (client: DiscordBot, message: Message, args: string[]) => void | Promise<void>
}
export class MessageCommand implements IMessageCommand {
    name: string;
    description: string;
    aliases?: string[] | undefined;
    cooldown?: string | number | undefined;
    disabled?: boolean | undefined;
    catagory?: string | undefined;
    execute: (client: DiscordBot, message: Message, args: string[]) => void | Promise<void>;

    constructor(createOptions: IMessageCommand) {
        this.name = createOptions.name;
        this.description = createOptions.description;
        this.execute = createOptions.execute;
        if (createOptions.aliases) {
            this.aliases = createOptions.aliases;
        }
        if (createOptions.cooldown) {
            this.cooldown = createOptions.cooldown;
        }
        if (createOptions.disabled) {
            this.disabled = createOptions.disabled;
        }

        if (createOptions.catagory) {
            this.catagory = createOptions.catagory;
        }
        return this;
    }
}