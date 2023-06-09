import { Client, ClientOptions, Collection, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { IslashCommand } from "./handlers/slashCommand";
import { IButtonCommand } from "./handlers/buttonCommands";
import { IMessageCommand } from "./handlers/MessageCommand";
export interface IHandlerConfig {
    MessageCommands?: string;
    SlashCommands?: string;
    events?: string;
    ButtonCommands?: string;
}
export interface DiscordBotClientOptions {
    statuslogs?: boolean;
    dirname: string;
    directories: IHandlerConfig | undefined;
    clientOptions: ClientOptions;
}
export declare class DiscordBot extends Client {
    store: any;
    config: DiscordBotClientOptions;
    token: string;
    slashCommandsJson: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    Events: Collection<string, {
        name: string;
        once?: boolean | undefined;
        execute: (client: any, run: any) => void;
    }>;
    SlashCommands: Collection<string, IslashCommand>;
    ButtonsCommands: Collection<string, IButtonCommand>;
    MessageCommands: Collection<string, IMessageCommand>;
    constructor(token: string, configOptions: DiscordBotClientOptions);
    loadEvents(): Promise<void>;
    loadSlashCommands(): Promise<void>;
    loadButtons(): Promise<void>;
    loadMessageCommands(): Promise<void>;
    resgisterGuildCommand(clientId: string, guildId: string): Promise<void>;
    resgisterGlobalCommand(clientId: string): Promise<void>;
    initializeLoaders(): Promise<void>;
    start(): Promise<void>;
}
