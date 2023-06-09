import { DiscordBot } from "../DiscordBot";
import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
export interface IslashCommand {
    data: SlashCommandBuilder;
    execute: (client: DiscordBot, interaction: ChatInputCommandInteraction) => void | Promise<void>;
}
export declare class SlashCommand implements IslashCommand {
    data: SlashCommandBuilder;
    execute: (client: DiscordBot, interaction: ChatInputCommandInteraction<CacheType>) => void | Promise<void>;
    constructor(createOptions: IslashCommand);
}
