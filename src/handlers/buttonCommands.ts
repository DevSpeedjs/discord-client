import { DiscordBot } from "../DiscordBot";
import { ButtonInteraction, CacheType } from 'discord.js';

export interface IButtonCommand {
    name: string,
    execute: (client: DiscordBot, button: ButtonInteraction) => void | Promise<void>;
}

export class buttonCommand implements IButtonCommand {
    name: string;
    execute: (client: DiscordBot, button: ButtonInteraction<CacheType>) => void | Promise<void>;


    constructor(createObject: IButtonCommand) {
        this.name = createObject.name;
        this.execute = createObject.execute;
        return this;
    }
}

