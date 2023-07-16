import { SlashCommandBuilder, Client, ChatInputCommandInteraction, ClientEvents, PermissionResolvable, Message } from "discord.js";
export declare namespace Interfaces {
    interface ISlashCommand {
        data: SlashCommandBuilder;
        execute<T extends Client, ReturnType>(client: T, interaction: ChatInputCommandInteraction, ...args: any[]): Promise<void | ReturnType> | void | ReturnType;
    }
    interface IEventHandler<clientType extends Client, EventType extends keyof ClientEvents> {
        name: EventType;
        once: boolean;
        execute(client: clientType, event: ClientEvents[EventType][0]): void | Promise<void>;
    }
    interface IMessageCommand {
        name: string;
        description?: string;
        cooldown?: string | number;
        permissions?: PermissionResolvable;
        aliases?: string[];
        enabled?: boolean;
        category?: string;
        execute<T extends Client>(client: T, messsage: Message, ...args: string[]): any;
    }
    interface ISlashCommandLoadOption {
        filter?: (file: string) => boolean;
        directory: string;
    }
    interface IMessageCommandLoadOptions {
        filter?: (file: string) => boolean;
        directory: string;
    }
    interface IEventLoadOption<T extends Client> {
        directory: string;
        client: T;
        filter?: (file: string) => boolean;
    }
}
