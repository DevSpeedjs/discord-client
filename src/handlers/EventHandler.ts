import { ClientEvents } from "discord.js";
import { DiscordBot } from "../DiscordBot";

export type EventHandlerOptions<T extends keyof ClientEvents> = {
    name: T;
    once?: boolean,
    run: (client: DiscordBot, event: ClientEvents[T][0]) => void;
};


export class EventHandler<T extends keyof ClientEvents> {
    name: T;
    once?: boolean;
    run: (client: DiscordBot, event: ClientEvents[T][0]) => void;


    constructor(options: EventHandlerOptions<T>) {
        this.name = options.name;
        this.run = options.run;
        this.once = options.once;
        return this;
    }
}

