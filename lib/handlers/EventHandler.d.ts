import { ClientEvents } from "discord.js";
import { DiscordBot } from "../DiscordBot";
export declare type EventHandlerOptions<T extends keyof ClientEvents> = {
    name: T;
    once?: boolean;
    execute: (client: DiscordBot, event: ClientEvents[T][0]) => void;
};
export declare class EventHandler<T extends keyof ClientEvents> {
    name: T;
    once?: boolean;
    execute: (client: DiscordBot, event: ClientEvents[T][0]) => void;
    constructor(options: EventHandlerOptions<T>);
}
