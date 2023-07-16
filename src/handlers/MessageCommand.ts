
import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, Message, Client } from "discord.js";
import { Interfaces } from "../types";

type ExecuteFunction<T extends Client> = (client: T, message: Message, ...args: string[]) => Promise<void> | void;

export class MessageCommand implements Interfaces.IMessageCommand {
    name: string;
    description?: string;
    aliases?: string[] | undefined;
    cooldown?: string | number | undefined;
    disabled?: boolean | undefined;
    catagory?: string | undefined;
    execute: Interfaces.IMessageCommand['execute'];

    constructor(createOptions: Interfaces.IMessageCommand) {
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
            this.disabled = createOptions.enabled;
        }

        if (createOptions.category) {
            this.catagory = createOptions.category;
        }
        return this;
    }
}