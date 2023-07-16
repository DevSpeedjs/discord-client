import { Client, ClientEvents } from "discord.js";

export type EventHandlerOptions<clientType extends Client, eventtype extends keyof ClientEvents> = {
    name: eventtype;
    once?: boolean,
    execute: (client: clientType, event: ClientEvents[eventtype][0]) => void;
};


export class EventHandler<clientType extends Client, eventType extends keyof ClientEvents> {
    name: eventType;
    once?: boolean;
    execute: (client: clientType, event: ClientEvents[eventType][0]) => void;


    constructor(options: EventHandlerOptions<clientType, eventType>) {
        this.name = options.name;
        this.execute = options.execute;
        this.once = options.once;
        return this;
    }
}
