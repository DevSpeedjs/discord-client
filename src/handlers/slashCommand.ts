
import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, Client } from 'discord.js'
import { Interfaces } from "../types";


export class SlashCommand implements Interfaces.ISlashCommand {
    data: SlashCommandBuilder;
    execute: Interfaces.ISlashCommand["execute"];

    constructor(createOptions: Interfaces.ISlashCommand) {
        this.data = createOptions.data;
        this.execute = createOptions.execute;

        return this;
    }
}