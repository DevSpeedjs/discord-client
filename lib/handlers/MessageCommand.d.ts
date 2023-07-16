import { Interfaces } from "../types";
export declare class MessageCommand implements Interfaces.IMessageCommand {
    name: string;
    description?: string;
    aliases?: string[] | undefined;
    cooldown?: string | number | undefined;
    disabled?: boolean | undefined;
    catagory?: string | undefined;
    execute: Interfaces.IMessageCommand['execute'];
    constructor(createOptions: Interfaces.IMessageCommand);
}
