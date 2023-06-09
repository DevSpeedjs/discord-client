import { DiscordBot } from "../DiscordBot"
import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, Message } from "discord.js";


export interface IMessageCommand {
    name: string,
    description: string,
    aliases?: string[],
    cooldown?: string | number,
    disabled?: boolean,
    enabled?: boolean,
    catagory?: string,
    execute: (client: string, message: Message, ...args: string[]) => void | Promise<void>
}
export class MessageCommand implements IMessageCommand {
    name: string;
    description: string;
    aliases?: string[] | undefined;
    cooldown?: string | number | undefined;
    disabled?: boolean | undefined;
    enabled?: boolean | undefined;
    catagory?: string | undefined;
    execute: (client: string, message: Message, ...args: string[]) => void | Promise<void>;

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
        if (createOptions.enabled) {
            this.enabled = createOptions.enabled;
        }

        if (createOptions.disabled) {
            this.disabled = createOptions.disabled
        }

        if (createOptions.catagory) {
            this.catagory = createOptions.catagory;
        }
        return this;
    }
}