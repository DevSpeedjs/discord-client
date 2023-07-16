import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
interface IGuildCommandConfig {
    guilldId: string;
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    clientId: string;
    token: string;
    log?: true;
}
export declare function resgisterGuildCommand(config: IGuildCommandConfig): Promise<void>;
interface IClientCommandConfig {
    guilldId: string;
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    clientId: string;
    token: string;
    log?: boolean;
}
export declare function resgisterClientCommand(config: IClientCommandConfig): Promise<void>;
export {};
