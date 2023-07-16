import { SlashCommandBuilder } from 'discord.js';
import { Interfaces } from "../types";
export declare class SlashCommand implements Interfaces.ISlashCommand {
    data: SlashCommandBuilder;
    execute: Interfaces.ISlashCommand["execute"];
    constructor(createOptions: Interfaces.ISlashCommand);
}
