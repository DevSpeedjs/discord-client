import { DiscordBot } from "../DiscordBot";
import { Message } from "discord.js";
export interface IMessageCommand {
    name: string;
    description: string;
    aliases?: string[];
    cooldown?: string | number;
    disabled?: boolean;
    catagory?: string;
    execute: (client: DiscordBot, message: Message, args: string[]) => void | Promise<void>;
}
export declare class MessageCommand implements IMessageCommand {
    name: string;
    description: string;
    aliases?: string[] | undefined;
    cooldown?: string | number | undefined;
    disabled?: boolean | undefined;
    catagory?: string | undefined;
    execute: (client: DiscordBot, message: Message, args: string[]) => void | Promise<void>;
    constructor(createOptions: IMessageCommand);
}
