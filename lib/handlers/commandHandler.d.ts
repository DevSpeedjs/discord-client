import { Message } from "discord.js";
export interface IMessageCommand {
    name: string;
    description: string;
    aliases?: string[];
    cooldown?: string | number;
    disabled?: boolean;
    enabled?: boolean;
    catagory?: string;
    execute: (client: string, message: Message, ...args: string[]) => void | Promise<void>;
}
export declare class MessageCommand implements IMessageCommand {
    name: string;
    description: string;
    aliases?: string[] | undefined;
    cooldown?: string | number | undefined;
    disabled?: boolean | undefined;
    enabled?: boolean | undefined;
    catagory?: string | undefined;
    execute: (client: string, message: Message, ...args: string[]) => void | Promise<void>;
    constructor(createOptions: IMessageCommand);
}
